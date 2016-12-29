package com.arcsoft.commander.service.server.impl;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.BeanUtils;

import com.arcsoft.arcvideo.common.utils.StringHelper;
import com.arcsoft.cluster.app.ActionException;
import com.arcsoft.cluster.app.Request;
import com.arcsoft.cluster.app.Response;
import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.ActionHandler;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.server.CapabilitiesChangedRequest;
import com.arcsoft.commander.cluster.action.server.CapabilitiesChangedResponse;
import com.arcsoft.commander.cluster.action.server.LiveRoleSwitchRequest;
import com.arcsoft.commander.cluster.action.server.LiveRoleSwitchResponse;
import com.arcsoft.commander.cluster.action.server.StateReportRequest;
import com.arcsoft.commander.cluster.action.server.StateReportResponse;
import com.arcsoft.commander.dao.server.ServerDao;
import com.arcsoft.commander.dao.server.ServerGroupDao;
import com.arcsoft.commander.domain.server.AgentDesc;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.domain.server.ServerStateInfo;
import com.arcsoft.commander.exception.ObjectAlreadyExistsException;
import com.arcsoft.commander.exception.ObjectNotExistsException;
import com.arcsoft.commander.exception.server.AccessDeniedException;
import com.arcsoft.commander.exception.server.NameExistsException;
import com.arcsoft.commander.exception.server.NoServerAvailableException;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.exception.server.ServerIncompatibleException;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.server.SwitchRoleFailedException;
import com.arcsoft.commander.exception.server.TooManyServerException;
import com.arcsoft.commander.service.BaseService;
import com.arcsoft.commander.service.Transaction;
import com.arcsoft.commander.service.server.ServerBindingService;
import com.arcsoft.commander.service.server.ServerService;
import com.arcsoft.commander.service.server.event.ServerAddedEvent;
import com.arcsoft.commander.service.server.event.ServerAliveChangedEvent;
import com.arcsoft.commander.service.server.event.ServerCapabilitiesChangedEvent;
import com.arcsoft.commander.service.server.event.ServerGroupAddedEvent;
import com.arcsoft.commander.service.server.event.ServerGroupRemovedEvent;
import com.arcsoft.commander.service.server.event.ServerRemovedEvent;
import com.arcsoft.commander.service.server.event.ServerRoleSwitchEvent;
import com.arcsoft.commander.service.server.event.ServerStateChangedEvent;
import com.arcsoft.commander.service.server.event.ServerTakeOverEvent;

/**
 * The implementation class for ServerService.
 * 
 * @author fjli
 */
public class ServerServiceImpl extends BaseService implements ServerService, ActionHandler, Transaction {

	private ServerDao serverDao;
	private ServerGroupDao serverGroupDao;
	private ServerBindingService serverBindingService;

	public void setServerDao(ServerDao serverDao) {
		this.serverDao = serverDao;
	}

	public void setServerGroupDao(ServerGroupDao serverGroupDao) {
		this.serverGroupDao = serverGroupDao;
	}

	public void setServerBindingService(ServerBindingService serverBindingService) {
		this.serverBindingService = serverBindingService;
	}
	
	@Override
	public List<ServerGroup> list(boolean isIncludeServers) {
		// Find the group and servers from database.
		List<ServerGroup> groups = serverGroupDao.list();

		// Fill the server state from runtime server list.
		if (groups != null && isIncludeServers) {
			for (ServerGroup group : groups) {
				List<Server> servers = serverDao.getServersInGroup(group.getId());
				group.setServers(servers);
			}
		}

		// Returns the server groups.
		return groups;
	}

	@Override
	public ServerGroup getGroup(Integer id, boolean isIncludeServers) {
		// Get the group from database.
		ServerGroup group = serverGroupDao.getGroup(id);

		// Fill the server state from runtime server list.
		if (group != null && isIncludeServers) {
			List<Server> servers = serverDao.getServersInGroup(id);
			group.setServers(servers);
		}

		// Returns the server group.
		return group;
	}

	@Override
	public boolean isExistsGroupName(String name) {
		return serverGroupDao.isExistsGroupName(name);
	}

	/**
	 * Create enumeration for generating unique server names.
	 */
	private Enumeration<String> getUniqueServerNames() {
		return new Enumeration<String>() {
			private int i = 0;
			private String name;
			@Override
			public String nextElement() {
				while (true) {
					name = "ArcVideo" + (++i);
					if (!isExistsServerName(name))
						return name;
				}
			}
			@Override
			public boolean hasMoreElements() {
				return true;
			}
		};
	}

	/**
	 * Add servers to the specified group.
	 * 
	 * @param group - the specified group
	 */
	private void addServersToGroup(ServerGroup group) {
		for (Server server : group.getServers()) {
			if (server.getState() == null)
				server.setState(Server.STATE_OK);
			if (!StringHelper.isBlank(server.getName())) {
				server.setGroup(group);
				server.setAlive(true);
				serverDao.addServer(server);
			}
		}

		Enumeration<String> names = getUniqueServerNames();
		for (Server server : group.getServers()) {
			if (server.getState() == null)
				server.setState(Server.STATE_OK);
			if (StringHelper.isBlank(server.getName())) {
				server.setName(names.nextElement());
				server.setGroup(group);
				server.setAlive(true);
				serverDao.addServer(server);
			}
		}
	}

	@Override
	public void createGroup(ServerGroup group)
			throws ObjectAlreadyExistsException, NameExistsException,
			ServerNotAvailableException, RemoteException,
			TooManyServerException, ServerIncompatibleException {
		// The servers in 1+1 live group must less than or equals 2.
		List<Server> servers = group.getServers();
		boolean isLiveGroup = (group.getType() == ServerGroup.TYPE_LIVE);
		if (isLiveGroup && servers != null && servers.size() > 2)
			throw new TooManyServerException();

		// Save to database.
		serverGroupDao.createGroup(group);

		if (servers != null && !servers.isEmpty()) {
			// Add servers to database.
			addServersToGroup(group);

			// For the servers in 1+1 live group, bind each other first.
			if (group.getType() == ServerGroup.TYPE_LIVE) {
				if (servers.size() == 2) {
					boolean isSlave = servers.get(0).isBackup();
					Server master = isSlave ? servers.get(1) : servers.get(0);
					Server slave = isSlave ? servers.get(0) : servers.get(1);
					serverBindingService.bind(master, slave);
				}
			} else if (servers.size() > 1){
				// For the servers in m+n group, Check the capabilities is
				// compatible or not.
				AgentDesc desc = null;
				for (Server server : servers) {
					AgentDesc newDesc = serverBindingService.getAgentDesc(server);
					if (desc == null) {
						desc = newDesc;
					} else if (!desc.isCompatible(newDesc)) {
						throw new ServerIncompatibleException(server);
					}
				}
			}
			// For all servers, link with commander.
			for (Server server : servers) {
				serverBindingService.addAgent(server);
			}
		}

		// Send group added event.
		getEventManager().submit(new ServerGroupAddedEvent(copy(group)));
	}

	@Override
	public void addServers(ServerGroup group) throws ObjectNotExistsException,
			ObjectAlreadyExistsException, NameExistsException,
			ServerNotAvailableException, RemoteException,
			TooManyServerException, ServerIncompatibleException,
			NoServerAvailableException {
		// Skip empty servers.
		List<Server> servers = group.getServers();
		if (servers == null || servers.size() == 0)
			return;

		// Check the group is exist or not.
		ServerGroup existGroup = getGroup(group.getId(), false);
		if (existGroup == null)
			throw new ObjectNotExistsException(group);

		// The servers in 1+1 live group must less than or equals 2.
		boolean isLiveGroup = (existGroup.getType() == ServerGroup.TYPE_LIVE);
		if (isLiveGroup && servers.size() > 2)
			throw new TooManyServerException();

		// Get the exists servers.
		List<Server> existServers = serverDao.getServersInGroup(group.getId());

		// The servers in 1+1 live group must less than or equals 2.
		if (isLiveGroup) {
			if (existServers.size() + servers.size() > 2)
				throw new TooManyServerException();
		}

		// Save to database.
		addServersToGroup(group);

		if (isLiveGroup) {
			// For the servers in 1+1 live group, bind each other first.
			if (existServers.size() > 0) {
				// The size must be 1 here.
				Server master = existServers.get(0);
				Server slave = servers.get(0);
				serverBindingService.bind(master, slave);
			} else if (servers.size() == 2) {
				// If add two new servers.
				boolean isSlave = servers.get(0).isBackup();
				Server master = isSlave ? servers.get(1) : servers.get(0);
				Server slave = isSlave ? servers.get(0) : servers.get(1);
				serverBindingService.bind(master, slave);
			}
		} else if (existServers.size() + servers.size() > 1) {
			// For the servers in m+n group, check the servers capabilities.
			AgentDesc desc = null;
			if (existServers.size() > 0) {
				for (Server server : existServers) {
					try {
						desc = serverBindingService.getAgentDesc(server);
						break;
					} catch(ServerNotAvailableException e) {
						continue;
					}
				}
				// If all servers are not available.
				if (desc == null)
					throw new NoServerAvailableException();
			}

			// Check the capabilities is compatible or not.
			for (Server server : servers) {
				AgentDesc newDesc = serverBindingService.getAgentDesc(server);
				if (desc == null) {
					desc = newDesc;
				} else if (!desc.isCompatible(newDesc)) {
					throw new ServerIncompatibleException(server);
				}
			}
		}

		// For all servers, link with commander.
		for (Server server : servers) {
			serverBindingService.addAgent(server);
		}

		// Send server added event.
		ServerGroup eventGroup = copy(existGroup);
		eventGroup.setServers(copy(group.getServers(), group));
		getEventManager().submit(new ServerAddedEvent(eventGroup));
	}

	@Override
	public void renameGroup(ServerGroup group) throws ObjectNotExistsException, NameExistsException {
		serverGroupDao.renameGroup(group);
	}

	@Override
	public void deleteGroup(Integer id) {
		// Find the group and servers by id.
		ServerGroup group = getGroup(id, true);
		if (group == null)
			return;

		// Remove all the servers.
		List<Server> servers = group.getServers();
		if (servers != null) {
			// Remove from database.
			for (Server server : servers) {
				serverDao.removeServer(server);
			}
		}

		// Delete the group.
		serverGroupDao.deleteGroup(group);

		if (servers != null && !servers.isEmpty()) {
			if (servers.size() > 1) {
				// Remove link between the agents and commander.
				ExecutorService queueExecutor = Executors.newCachedThreadPool();
				for (final Server server : servers) {
					queueExecutor.execute(new Runnable() {
						@Override
						public void run() {
							removeAgent(server);
						}
					});
				}
				// wait for all tasks done.
				queueExecutor.shutdown();
				try {
					queueExecutor.awaitTermination(Integer.MAX_VALUE, TimeUnit.MILLISECONDS);
				} catch (InterruptedException e) {
				}
			} else {
				// Remove link between the agent and commander.
				removeAgent(servers.get(0));
			}
		}

		// Send group removed event
		getEventManager().submit(new ServerGroupRemovedEvent(copy(group)));
	}

	/**
	 * Request the remote agent to remove from this commander.
	 */
	private void removeAgent(Server server) {
		try {
			serverBindingService.removeAgent(server);
		} catch(ServerNotAvailableException e) {
			LOG.warn("server is not available when remove agent " + server.getIp(), e);
		}
	}

	@Override
	public Server getServer(String id) {
		return serverDao.getServer(id);
	}

	@Override
	public boolean isExistsServerName(String name) {
		return serverDao.isExistsServerName(name);
	}

	@Override
	public void renameServer(Server server) throws ObjectNotExistsException, NameExistsException{
		serverDao.renameServer(server);
	}

	@Override
	public void updateState(Server server) throws ObjectNotExistsException {
		serverDao.updateState(server);

		// Send state change event.
		Server newServer = getServer(server.getId());
		if (newServer != null) {
			ServerGroup eventGroup = copy(newServer.getGroup());
			getEventManager().submit(new ServerStateChangedEvent(copy(newServer, eventGroup)));
		}
	}

	@Override
	public void updateAddress(Server server) throws ObjectNotExistsException {
		serverDao.updateAddress(server);
	}

	@Override
	public void updateOnlineState(Server server) throws ObjectNotExistsException {
		serverDao.updateOnlineState(server);

		// Send alive state change event.
		Server newServer = getServer(server.getId());
		if (newServer != null) {
			ServerGroup eventGroup = copy(newServer.getGroup());
			getEventManager().submit(new ServerAliveChangedEvent(copy(newServer, eventGroup)));
		}
	}

	@Override
	public void updateFaultDisabled(Server server) {
		serverDao.updateFaultDisabled(server);
	}

	@Override
	public void updateServerCapabilities(Server server) throws ObjectNotExistsException {
		serverDao.updateServerCapabilities(server);

		// Send server capabilities changed event.
		Server newServer = getServer(server.getId());
		if (newServer != null) {
			ServerGroup eventGroup = copy(newServer.getGroup());
			getEventManager().submit(new ServerCapabilitiesChangedEvent(copy(newServer, eventGroup)));
		}
	}

	@Override
	public void removeServer(Server server) throws SwitchRoleFailedException {
		// Check the server is exists or not, skip not exist server.
		Server newServer = getServer(server.getId());
		if (newServer == null)
			return;

		ServerGroup group = newServer.getGroup();
		boolean isLiveGroup = group.getType() == ServerGroup.TYPE_LIVE;
		boolean isLiveMaster =  isLiveGroup && !newServer.isBackup();

		// If the server is a master, switch role first.
		if (isLiveMaster) {
			List<Server> servers = serverDao.getServersInGroup(group.getId());
			if (servers.size() > 1) {
				try {
					serverBindingService.switchRole(newServer);
				} catch(ServerNotAvailableException e) {
					LOG.warn("server is not available when remove agent " + newServer.getIp(), e);
				} catch(RemoteException e) {
					throw new SwitchRoleFailedException();
				}
			}
		}

		// Remove from database.
		serverDao.removeServer(server);

		// Remove link between the agent and commander.
		try {
			serverBindingService.removeAgent(newServer);
		} catch(ServerNotAvailableException e) {
			LOG.warn("server is not available when remove agent " + newServer.getIp(), e);
			if (isLiveGroup && newServer.isBackup()) {
				// Notify master agent clear bound information.
				List<Server> servers = serverDao.getServersInGroup(group.getId());
				for (Server agent : servers) {
					if (!agent.isBackup()) {
						try {
							serverBindingService.unbind(agent);
						} catch(ServerNotAvailableException e1) {
						}
					}
				}
			}
		}

		// Send server removed event.
		ServerGroup eventGroup = copy(group);
		List<Server> servers = new ArrayList<>();
		servers.add(copy(newServer, eventGroup));
		eventGroup.setServers(servers);
		getEventManager().submit(new ServerRemovedEvent(eventGroup));
	}

	@Override
	public void updateServersStatus() {
		serverDao.resetServersStatus();
	}

	@Override
	public void updateLiveRole(String slave) throws ObjectNotExistsException, AccessDeniedException {
		// Get the slave server with the specified id.
		Server slaveServer = getServer(slave);
		if (slaveServer == null)
			throw new ObjectNotExistsException(slaveServer);

		// If the server is not a slave, access is denied.
		if (!slaveServer.isBackup())
			throw new AccessDeniedException();

		// If the group is not 1+1 live group, access is denied.
		Integer groupId = slaveServer.getGroup().getId();
		ServerGroup group = getGroup(groupId, false);
		if (group.getType() != ServerGroup.TYPE_LIVE)
			throw new AccessDeniedException();

		// Switch the role of master and slave.
		ServerGroup eventGroup = copy(group);
		List<Server> servers = copy(serverDao.getServersInGroup(groupId), eventGroup);
		eventGroup.setServers(servers);
		for (Server server : servers) {
			boolean isSlave = server.getId().equals(slave);
			server.setBackup(isSlave ? false : true);
			serverDao.updateBackupFlag(server, server.isBackup());
		}

		// Send role switch event
		getEventManager().submit(new ServerRoleSwitchEvent(eventGroup));
	}

	/**
	 * Check the server state.
	 */
	private boolean checkServerAvailable(Server server) {
		try {
			AgentDesc desc = serverBindingService.getAgentDesc(server);
			Map<String, Boolean> networkState = desc.getNetworkState();
			if (networkState.containsKey("input")) {
				if (!networkState.get("input").booleanValue())
					return false;
			}
			if (networkState.containsKey("output")) {
				if (!networkState.get("output").booleanValue())
					return false;
			}
			Boolean gpuState = desc.getGpuState();
			if (gpuState != null && !gpuState.booleanValue()) {
				return false;
			}
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public Server updateWorkerServer(String worker, int cause) throws ObjectNotExistsException, AccessDeniedException {
		LOG.info("ServerServiceImpl:updateWorkerServer worker=" + worker + ",cause=" + cause);
		// Get the worker server with the specified id.
		Server agent = getServer(worker);
		if (agent == null)
			throw new ObjectNotExistsException(agent);

		// If the server a backup server or the group is not M+N group.
		ServerGroup group = agent.getGroup();
		if (agent.isBackup() || group.getType() != ServerGroup.TYPE_DEFAULT)
			throw new AccessDeniedException();

		// Select a available backup server.
		List<Server> servers = serverDao.getServersInGroup(group.getId());
		for (Server server : servers) {
			// skip worker servers.
			if (!server.isBackup())
				continue;
			// check the agent is available.
			if (!server.isAlive())
				continue;
			// check the server state
			if (!checkServerAvailable(server))
				continue;
			// switch the servers role.
			serverDao.updateBackupFlag(agent, true);
			serverDao.updateBackupFlag(server, false);
			LOG.info("The server " + server.getIp() + " is selected to take over the server " + agent.getIp());

			// Send take over event.
			ServerGroup eventGroup = copy(group);
			Server oldServer = copy(agent, eventGroup);
			Server newServer = copy(server, eventGroup);
			getEventManager().submit(new ServerTakeOverEvent(eventGroup, oldServer, newServer, cause));
			return server;
		}
		//Send take over event with newServer null.
		ServerGroup eventGroup = copy(group);
		getEventManager().submit(new ServerTakeOverEvent(eventGroup, copy(agent, eventGroup), null, cause));
		// No backup server is available.
		LOG.info("NO backup server is available!");
		return null;
	}

	@Override
	public Server updateWorkerServer(String worker, String backup, int cause) throws ObjectNotExistsException, AccessDeniedException, ServerNotAvailableException {
		LOG.info("ServerServiceImpl:updateWorkerServer worker=" + worker + ",backup=" + backup + ",cause=" + cause);
		// Get the worker server with the specified id.
		Server agent = getServer(worker);
		if (agent == null)
			throw new ObjectNotExistsException(agent);

		// If the server a backup server or the group is not M+N group.
		ServerGroup group = agent.getGroup();
		if (agent.isBackup() || group.getType() != ServerGroup.TYPE_DEFAULT)
			throw new AccessDeniedException();

		// Get the backup server.
		Server server = getServer(backup);
		if (server == null)
			throw new ObjectNotExistsException(server);

		// skip worker servers.
		if (!server.isBackup())
			throw new AccessDeniedException();

		// check the agent is available.
		if (!server.isAlive())
			throw new ServerNotAvailableException(server);

		// check the server state
		if (!checkServerAvailable(server))
			throw new ServerNotAvailableException(server);

		// switch the servers role.
		serverDao.updateBackupFlag(agent, true);
		serverDao.updateBackupFlag(server, false);
		LOG.info("The server " + server.getIp() + " is selected to take over the server " + agent.getIp());

		// Send take over event.
		ServerGroup eventGroup = copy(group);
		Server oldServer = copy(agent, eventGroup);
		Server newServer = copy(server, eventGroup);
		getEventManager().submit(new ServerTakeOverEvent(eventGroup, oldServer, newServer, cause));
		return server;
	}

	/**
	 * Copy group and servers.
	 */
	private ServerGroup copy(ServerGroup group) {
		ServerGroup newGroup = new ServerGroup();
		BeanUtils.copyProperties(group, newGroup);
		if (group.getServers() != null)
			newGroup.setServers(copy(group.getServers(), group));
		return newGroup;
	}

	/**
	 * Copy list of servers, and set the group.
	 */
	private List<Server> copy(List<Server> servers, ServerGroup group) {
		List<Server> list = new ArrayList<>();
		for (Server server : servers)
			list.add(copy(server, group));
		return list;
	}

	/**
	 * Copy server and set the group.
	 */
	private Server copy(Server server, ServerGroup group) {
		Server newServer = new Server();
		BeanUtils.copyProperties(server, newServer);
		newServer.setGroup(group);
		return newServer;
	}

	@Override
	public int[] getActions() {
		return new int[] {
			Actions.LIVE_ROLE_SWITCH_EVENT,
			Actions.STATE_REPORT,
			Actions.CAPS_CHANGED,
		};
	}

	@Override
	public Response execute(Request request) throws ActionException {
		if (request instanceof LiveRoleSwitchRequest) {
			return processRoleSwitchRequest((LiveRoleSwitchRequest)request);
		} else if (request instanceof StateReportRequest) {
			return processStateReport((StateReportRequest) request);
		} else if (request instanceof CapabilitiesChangedRequest) {
			return processCapsChanged((CapabilitiesChangedRequest) request);
		}
		return null;
	}

	/**
	 * Update the server state when role switch.
	 */
	private LiveRoleSwitchResponse processRoleSwitchRequest(LiveRoleSwitchRequest request) {
		LOG.info("The slave agent switch role to master, id=" + request.getId());
		try {
			updateLiveRole(request.getId());
		} catch(Exception e) {
			LOG.error("switch role failed: " + e.getMessage(), e);
		}
		LiveRoleSwitchResponse response = new LiveRoleSwitchResponse();
		response.setErrorCode(ActionErrorCode.SUCCESS);
		return response;
	}

	/**
	 * Process state report request.
	 */
	private StateReportResponse processStateReport(StateReportRequest request) {
		ServerStateInfo stateInfo = request.getStateInfo();
		Map<String, Boolean> networkState = stateInfo.getNetworkState();
		LOG.info("process state report: " + request.getId() + ", " + networkState);
		int state = Server.STATE_OK;
		if (networkState != null) {
			if ((networkState.containsKey("input") && !networkState.get("input"))
					|| (networkState.containsKey("output") && !networkState.get("output"))) {
				LOG.info("process state report: hasError=true");
				state |= Server.STATE_NETWORK_ERROR;
			}
		}
		Boolean gpuState = stateInfo.getGpuState();
		if (gpuState != null && !gpuState.booleanValue()) {
			state |= Server.STATE_GPU_ERROR;
		}
		Server server = new Server();
		server.setId(request.getId());
		server.setState(state);
		try {
			updateState(server);
		} catch (ObjectNotExistsException e) {
			LOG.error("update state failed", e);
		}
		StateReportResponse response = new StateReportResponse();
		response.setErrorCode(ActionErrorCode.SUCCESS);
		return response;
	}

	/**
	 * Process server capabilities report request.
	 */
	private CapabilitiesChangedResponse processCapsChanged(CapabilitiesChangedRequest request) {
		try {
			Server server = new Server();
			server.setId(request.getId());
			server.setCapabilities(request.getCapabilities());
			updateServerCapabilities(server);
		} catch (Exception e) {
			LOG.warn("updateCapabilities failed.", e);
		}
		CapabilitiesChangedResponse response = new CapabilitiesChangedResponse();
		response.setErrorCode(ActionErrorCode.SUCCESS);
		return response;
	}

}
