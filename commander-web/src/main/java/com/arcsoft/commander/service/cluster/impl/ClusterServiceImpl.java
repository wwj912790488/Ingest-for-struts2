package com.arcsoft.commander.service.cluster.impl;

import java.io.IOException;
import java.util.Enumeration;
import java.util.Hashtable;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import com.arcsoft.arcvideo.ha.HAService;
import com.arcsoft.cluster.app.ActionException;
import com.arcsoft.cluster.app.Request;
import com.arcsoft.cluster.app.RequestHandler;
import com.arcsoft.cluster.app.Response;
import com.arcsoft.cluster.heartbeat.HeartBeatSession;
import com.arcsoft.cluster.heartbeat.HeartBeatSessionEvent;
import com.arcsoft.cluster.heartbeat.HeartBeatSessionListener;
import com.arcsoft.cluster.heartbeat.HeartBeatSessionTimeoutEvent;
import com.arcsoft.cluster.net.ConnectOptions;
import com.arcsoft.cluster.node.NodeDescription;
import com.arcsoft.cluster.node.NodeListener;
import com.arcsoft.cluster.node.NodeSearcher;
import com.arcsoft.cluster.node.RemoteNode;
import com.arcsoft.commander.cluster.RemoteNodeInfo;
import com.arcsoft.commander.cluster.ServerType;
import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.ActionHandler;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequest;
import com.arcsoft.commander.cluster.action.BaseResponse;
import com.arcsoft.commander.cluster.action.fault.GetFaultDescRequest;
import com.arcsoft.commander.cluster.action.fault.GetFaultDescResponse;
import com.arcsoft.commander.cluster.action.server.AddAgentRequest;
import com.arcsoft.commander.cluster.action.server.ErrorReportRequest;
import com.arcsoft.commander.cluster.action.server.ErrorReportResponse;
import com.arcsoft.commander.cluster.action.server.GetAgentDescRequest;
import com.arcsoft.commander.cluster.action.server.GetAgentDescResponse;
import com.arcsoft.commander.cluster.action.server.GroupBindRequest;
import com.arcsoft.commander.cluster.action.server.GroupBindResponse;
import com.arcsoft.commander.cluster.action.server.RemoveAgentRequest;
import com.arcsoft.commander.cluster.action.server.RoleSwitchReason;
import com.arcsoft.commander.cluster.action.server.SwitchRoleRequest;
import com.arcsoft.commander.cluster.action.server.SwitchRoleResponse;
import com.arcsoft.commander.cluster.action.server.UnbindRequest;
import com.arcsoft.commander.cluster.action.server.UnbindResponse;
import com.arcsoft.commander.domain.server.AgentDesc;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.domain.server.SwitchCause;
import com.arcsoft.commander.exception.ObjectNotExistsException;
import com.arcsoft.commander.exception.server.HeatBeatEventNotReceivedException;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;
import com.arcsoft.commander.service.BaseService;
import com.arcsoft.commander.service.cluster.ClusterService;
import com.arcsoft.commander.service.cluster.fault.FaultAlertEvent;
import com.arcsoft.commander.service.cluster.fault.FaultEvent;
import com.arcsoft.commander.service.cluster.fault.FaultListener;
import com.arcsoft.commander.service.cluster.fault.FaultSession;
import com.arcsoft.commander.service.license.CommanderLicenseService;
import com.arcsoft.commander.service.remote.RemoteExecutorService;
import com.arcsoft.commander.service.server.FaultService;
import com.arcsoft.commander.service.server.ServerBindingService;
import com.arcsoft.commander.service.server.ServerService;
import com.arcsoft.commander.service.server.ServerSwitchService;
import com.arcsoft.commander.service.system.SystemContext;
import com.arcsoft.commander.service.system.SystemContextListener;
import com.arcsoft.commons.utils.SystemHelper;

/**
 * Service for cluster.
 * 
 * @author fjli
 */
public class ClusterServiceImpl extends BaseService implements ClusterService,
		RemoteExecutorService, ServerBindingService, SystemContextListener, ActionHandler {
	private CommanderServer server;
	private ServerService serverService;
	private ServerSwitchService serverSwitchService;
	private Hashtable<String, HeartBeatSession> heartBeatSessions = new Hashtable<String, HeartBeatSession>();
	private ScheduledExecutorService executor;
	private List<ActionHandler> actionHandlers;
	private Hashtable<String, FaultSession> faultSessions = new Hashtable<String, FaultSession>();
	private FaultService faultService;
	private CommanderLicenseService licenseService;
	private boolean slave;

	public void setLicenseService(CommanderLicenseService licenseService) {
		this.licenseService = licenseService;
	}
	
	public void setServerService(ServerService serverService) {
		this.serverService = serverService;
	}

	public void setServerSwitchService(ServerSwitchService serverSwitchService) {
		this.serverSwitchService = serverSwitchService;
	}

	public void setActionHandlers(List<ActionHandler> actionHandlers) {
		this.actionHandlers = actionHandlers;
	}

	public void setFaultService(FaultService faultService) {
		this.faultService = faultService;
	}

	@Override
	public synchronized void contextInit(SystemContext context) {
		LOG.info("initialize cluster service.");

		if (context.isHAEnabled() && context.getRole() == HAService.ROLE_SLAVE) {
			LOG.info("Cluster service not initialized: this commander is slave.");
			slave = true;
			return;
		} else {
			slave = false;
		}

		// create configuration from system settings.
		int clusterType = systemSettings.getClusterType();
		CommanderConfiguration config = new CommanderConfiguration(clusterType);
		config.setClusterIp(systemSettings.getClusterIp());
		config.setClusterPort(systemSettings.getClusterPort());
		config.setServerId(SystemHelper.os.getSystemUUID());
		config.setServerName(SystemHelper.os.getHostName());
		config.setBindAddr(systemSettings.getBindAddr());
		config.setTimeToLive(systemSettings.getTimeToLive());
		config.setClusterSearchType(systemSettings.getClusterSearchType());

		// create commander server and start it.
		server = new CommanderServer(config);

		// register action handlers.
		registerActions(this);
		if (actionHandlers != null) {
			for (ActionHandler handler : actionHandlers)
				registerActions(handler);
		}

		// start commander.
		try {
			server.start();
			LOG.info("cluster service started.");
		} catch (IOException e) {
			LOG.fatal("start cluster service failed.", e);
		}

		// reconnect all agents.
		reconnectAgents();
	}

	@Override
	public synchronized void contextDestory(SystemContext context) {
		LOG.info("destroy cluster service.");

		// shutdown executor.
		if (executor != null) {
			executor.shutdown();
			try {
				executor.awaitTermination(10000, TimeUnit.SECONDS);
			} catch (InterruptedException e) {
			}
		}

		stopHeartBeatSessions();

		stopFaultSessions();

		if (server != null) {
			server.stop();
			server = null;
		}
	}

	/**
	 * Register all actions with the specified handler.
	 * 
	 * @param handler - the specified handler
	 */
	private void registerActions(final ActionHandler handler) {
		int[] actions = handler.getActions();
		if (actions != null && actions.length > 0) {
			RequestHandler proxy = new RequestHandler() {
				@Override
				public Response execute(Request request) throws ActionException {
					return actionInterceptor(request, handler);
				}
			};
			for (int action : actions) {
				server.addHandler(action, proxy);
			}
		}
	}

	/**
	 * Action intercepter, all actions will pass through here.
	 * 
	 * @param request - the request to be processed
	 */
	private Response actionInterceptor(Request request, ActionHandler handler) throws ActionException {
		LOG.info("Request received: " + request.getClass().getName());
		return handler.execute(request);
	}

	@Override
	public int[] getActions() {
		return new int[] {
			Actions.ERROR_REPORT,
		};
	}

	@Override
	public Response execute(Request request) throws ActionException {
		if (request instanceof ErrorReportRequest) {
			return processErrorReport((ErrorReportRequest) request);
		}
		return null;
	}

	/**
	 * Process error report request.
	 */
	private ErrorReportResponse processErrorReport(ErrorReportRequest request) {
		int errorCode = request.getErrorCode();
		if (errorCode == ActionErrorCode.NETWORK_ERROR_DETECTED ) {
			LOG.error("network error dectected for the agent " + request.getId());
			if (!faultService.isFaultProcess(request.getId())) {
				updateWorkerServer(request.getId(), SwitchCause.NETWORK_ERROR);
			}
		} else if (errorCode == ActionErrorCode.GPU_ERROR_DETECTED ) {
			LOG.error("gpu error dectected for the agent " + request.getId());
			updateWorkerServer(request.getId(), SwitchCause.GPU_ERROR);
		}
		ErrorReportResponse response = new ErrorReportResponse();
		response.setErrorCode(ActionErrorCode.SUCCESS);
		return response;
	}

	private void updateWorkerServer(String serverId, int cause) {
		try {
			serverSwitchService.updateWorkerServer(serverId, cause);
		} catch (Exception e) {
			LOG.error("add task of switch server failed: " + e.getMessage(), e);
		}
	}

	@Override
	public Enumeration<RemoteNode> search(final long timeout) throws IOException {
		if (slave)
			throw new AccessDeniedForSlaveException();
		if (server == null)
			throw new SystemNotInitializedException();
		final Object lock = new Object();
		final LinkedList<RemoteNode> list = new LinkedList<RemoteNode>();
		final NodeSearcher searcher = server.searchAgents(new NodeListener() {
			@Override
			public void nodeReceived(RemoteNode node) {
				// ensure the node is valid.
				NodeDescription desc = node.getDescription();
				if (desc == null || desc.getId() == null)
					return;
				// filter the same node.
				String nodeId = desc.getId();
				for (RemoteNode existNode : list) {
					if (nodeId.equals(existNode.getDescription().getId()))
						return;
				}
				// add new node to the list.
				list.add(node);
				synchronized (lock) {
					lock.notify();
				}
			}
		});
		return new Enumeration<RemoteNode>() {
			private void waitForNext() {
				synchronized (lock) {
					try {
						lock.wait(timeout);
					} catch (InterruptedException e) {
					}
				}
			}

			@Override
			public boolean hasMoreElements() {
				if (!list.isEmpty())
					return true;
				waitForNext();
				if (!list.isEmpty())
					return true;
				searcher.stop();
				return false;
			}

			@Override
			public RemoteNode nextElement() {
				if (!list.isEmpty())
					return list.removeFirst();
				waitForNext();
				if (!list.isEmpty())
					return list.removeFirst();
				searcher.stop();
				return null;
			}
		};
	}

	/**
	 * Reconnect all agents when commander restart.
	 */
	private void reconnectAgents() {
		// reset all servers status to no connected.
		serverService.updateServersStatus();

		// connect each server in the database.
		List<ServerGroup> groups = serverService.list(true);
		executor = Executors.newScheduledThreadPool(1);
		for (ServerGroup group : groups) {
			List<Server> servers = group.getServers();
			if (servers != null && !servers.isEmpty()) {
				for (final Server server : servers) {
					final ScheduledExecutorService executor = this.executor;
					executor.execute(new Runnable() {
						@Override
						public void run() {
							if (executor.isShutdown())
								return;
							addAgentWithRetry(server);
						}
					});
				}
			}
		}

		LOG.info("reconnect agents finished!");
	}

	/**
	 * Add agent to this commander. If add failed, retry it later.
	 * 
	 * @param server - the specified agent server
	 */
	private void addAgentWithRetry(Server server) {
		try {
			addAgent(server);
			updateOnlineState(server.getId(), true);
		} catch(Exception e) {
			LOG.error("Cannot add agent " + server.getIp() + " to this commander.", e);
			retryLater(server.getId());
		}
	}

	/**
	 * Retry connection to server.
	 * 
	 * @param serverId - the specified server id
	 */
	private void retryLater(final String serverId) {
		LOG.debug("Test agent " + serverId + " is available 5s later.");
		try {
			final ScheduledExecutorService executor = this.executor;
			executor.schedule(new Runnable() {
				@Override
				public void run() {
					if (executor.isShutdown())
						return;
					Server server = serverService.getServer(serverId);
					if (server != null) {
						addAgentWithRetry(server);
					} else {
						LOG.debug("The server " + serverId + " is already removed, stop retry.");
					}
				}
			}, 5000, TimeUnit.MILLISECONDS);
		} catch(Exception e) {
			LOG.error("schedule retry failed.", e);
		}
	}

	/**
	 * Update online state.
	 * 
	 * @param nodeId - the node id
	 * @param alive - alive state
	 */
	private void updateOnlineState(String nodeId, boolean alive) {
		try {
			Server server = new Server();
			server.setId(nodeId);
			server.setAlive(alive);
			serverService.updateOnlineState(server);
		} catch (ObjectNotExistsException e) {
		}
	}

	/**
	 * Create heart beat session for live agent.
	 * 
	 * @param target - the target node
	 * @return created heart beat session.
	 */
	private HeartBeatSession createLiveHeartBeatSession(Server agent) {
		RemoteNode target = server.createRemoteNode(agent);
		HeartBeatSession session = new HeartBeatSession(server.getNode(), target);
		ConnectOptions options = new ConnectOptions();
		options.setString(ConnectOptions.OPTION_BIND_ADDR, server.getNode().getDescription().getIp());
		options.setInt(ConnectOptions.OPTION_CONNECT_TIMEOUT, 1000);
		options.setInt(ConnectOptions.OPTION_READ_TIMEOUT, 2000);
		session.setConnectOptions(options);
		session.setInterval(systemSettings.getHeartbeatInterval());
		session.setTimeout(systemSettings.getHeartbeatTimeout());
		return session;
	}

	/**
	 * Stop heart beat of the specified server.
	 * 
	 * @param nodeId - the specified server id
	 */
	private void stopHeartBeat(String nodeId) {
		HeartBeatSession session = heartBeatSessions.remove(nodeId);
		if (session != null) {
			session.stop();
			LOG.debug("heart beat session stopped, nodeId=" + nodeId);
		}
	}

	/**
	 * Stop all heart beat sessions.
	 */
	private void stopHeartBeatSessions() {
		Enumeration<String> keys = heartBeatSessions.keys();
		while (keys.hasMoreElements()) {
			stopHeartBeat(keys.nextElement());
		}
	}

	public void startFaultMonitor(String serverId) {
		if (faultSessions.get(serverId) == null) {
			Server server = serverService.getServer(serverId);
			if (server != null) {
				server.setFaultDisabled(false);
				startFaultSession(server);
			}
		}
	}
	
	public void stopFaultMonitor(String serverId) {
		stopFaultSession(serverId);
	}

	public boolean isFaultMonitoring(String serverId) {
		if (faultSessions.get(serverId) != null)
			return true;
		return false;
	}
	
	/**
	 * Start fault of the specified server.
	 * 
	 * @param agent - the specified server
	 */	
	private void startFaultSession(Server agent) {
		// check existed
		if (faultSessions.get(agent.getId()) != null) {
			LOG.info("fault session existed");
			return;
		}
		// process
		if (licenseService.isLicenseEnabled(CommanderLicenseService.FAULT_SETTING) && agent.isFaultDisabled() == false) {
			GetFaultDescRequest request = new GetFaultDescRequest();
			GetFaultDescResponse response = (GetFaultDescResponse) remoteExecute(request, agent);
			if (!response.isSuccess()) {
				LOG.info("Get fault desc failed");
				getEventManager().submit(new FaultAlertEvent(agent, FaultAlertEvent.MONITOR_FAILED, null, 0, null));
				return;
			}
			
			if (response.getPort() <= 0) {
				LOG.info("fault port is invalid, maybe the fault service doesn't installed");
				getEventManager().submit(new FaultAlertEvent(agent, FaultAlertEvent.MONITOR_FAILED, null, 0, null));
				return;
			}
			
			FaultSession faultSession = new FaultSession(agent.getId(), agent.getIp(), response.getPort(), 10);
			faultSession.addListener(new FaultListener() {
				@Override
				public void faultEventReceived(FaultEvent event) {
					processFaultEvent(event);
				}
			});
			
			try {
				faultSessions.put(faultSession.getId(), faultSession);
				faultSession.start();
			} catch(Exception e) {
				stopFaultSession(agent.getId());
			}
		}
	}

	/**
	 * Stop fault of the specified server.
	 * 
	 * @param nodeId - the specified server id
	 */
	private void stopFaultSession(String nodeId) {
		FaultSession session = faultSessions.remove(nodeId);
		if (session != null) {
			session.stop();
			LOG.debug("Fault session stopped, nodeId=" + nodeId);
		}
	}

	/**
	 * Stop all fault sessions.
	 */
	private void stopFaultSessions() {
		Enumeration<String> keys = faultSessions.keys();
		while (keys.hasMoreElements()) {
			stopFaultSession(keys.nextElement());
		}
	}
	
	/**
	 * Update the server state when the heart beat session timeout.
	 * 
	 * @param event - the timeout event
	 */
	private void processHeartBeatTimeoutEvent(HeartBeatSessionTimeoutEvent event) {
		HeartBeatSession session = event.getSession();
		NodeDescription desc = session.getTarget().getDescription();
		String nodeId = desc.getId();
		LOG.error("heart beat session timeout, ip=" + desc.getIp());
		heartBeatSessions.remove(nodeId);
		updateOnlineState(nodeId, false);
		retryLater(nodeId);
		//Select a slave service to take over the master server.
		updateWorkerServer(nodeId, SwitchCause.HEART_BEAT_TIMEOUT);
	}

	private void processFaultEvent(FaultEvent event) {
		String nodeId = event.getNodeId();
		LOG.error("fault event received, server=" + nodeId);
		getEventManager().submit(new FaultAlertEvent(serverService.getServer(nodeId), FaultAlertEvent.FAULT_DETECTED, null, 0, null));
		
		stopFaultSession(nodeId);
		faultService.faultProcess(serverService.getServer(nodeId));
	}

	@Override
	public AgentDesc getAgentDesc(Server agent) {
		GetAgentDescRequest request = new GetAgentDescRequest();
		GetAgentDescResponse response = (GetAgentDescResponse) remoteExecute(request, agent);
		if (!response.isSuccess())
			throw new RemoteException(agent);
		return response.getAgentDesc();
	}

	@Override
	public void addAgent(Server agent) {
		if (slave)
			throw new AccessDeniedForSlaveException();
		if (server == null)
			throw new SystemNotInitializedException();

		// create heart beat session.
		HeartBeatSession session = createLiveHeartBeatSession(agent);
		heartBeatSessions.put(agent.getId(), session);
		try {
			session.start();
		} catch (IOException e) {
			stopHeartBeat(agent.getId());
			throw new RemoteException(agent);
		}

		// create add agent request.
		AddAgentRequest request = new AddAgentRequest();
		RemoteNodeInfo commander = new RemoteNodeInfo();
		NodeDescription desc = server.getNode().getDescription();
		commander.setId(desc.getId());
		commander.setIp(desc.getIp());
		commander.setPort(desc.getPort());
		request.setCommander(commander);

		// get the server type.
		ServerGroup group = serverService.getGroup(agent.getGroup().getId(), false);
		switch(group.getType()) {
		case ServerGroup.TYPE_DEFAULT:
			request.setAgentType(ServerType.TYPE_M_N);
			break;
		case ServerGroup.TYPE_LIVE:
			request.setAgentType(ServerType.TYPE_1_1);
			break;
		}

		// send add agent request to the agent.
		try {
			remoteExecute(request, agent);
		} catch (RuntimeException e) {
			stopHeartBeat(agent.getId());
			throw e;
		}

		try {
			// NOTE: to avoid process timeout logic if the agent has problem on heart beat at adding agent period or
			// retry connection period.
			if (session.getInterval() <= 5000) {
				long maxWaitingTime = Math.min(session.getTimeout(), 5000);
				if (session.waitForEvent(maxWaitingTime)) {
					session.addListener(new HeartBeatSessionListener() {
						@Override
						public void sessionEventReceived(HeartBeatSessionEvent event) {
							if (event instanceof HeartBeatSessionTimeoutEvent) {
								processHeartBeatTimeoutEvent((HeartBeatSessionTimeoutEvent) event);
							}
						}
					});
				} else {
					stopHeartBeat(agent.getId());
					throw new HeatBeatEventNotReceivedException(agent);
				}
			} else {
				LOG.debug("The heart beat interval is too larger, so skip check heart beat event.");
			}
		} catch (InterruptedException e) {
			stopHeartBeat(agent.getId());
			throw new RemoteException(agent);
		}
		
		// 
		try {
			startFaultSession(agent);
		} catch (RuntimeException e) {
			// suppress exception of remoteExecute(old version agent) and other
			// to avoid addagentretry 
			e.printStackTrace();
		}
	}

	@Override
	public void removeAgent(Server agent) {
		// stop heart beat session
		stopHeartBeat(agent.getId());

		// stop fault session
		stopFaultSession(agent.getId());
		
		// send remove agent request to the agent.
		RemoveAgentRequest request = new RemoveAgentRequest();
		remoteExecute(request, agent);
	}

	@Override
	public void bind(Server master, Server slave) {
		RemoteNodeInfo slaveInfo = new RemoteNodeInfo();
		slaveInfo.setId(slave.getId());
		slaveInfo.setIp(slave.getIp());
		slaveInfo.setPort(slave.getPort());
		GroupBindRequest request = new GroupBindRequest();
		request.setSlave(slaveInfo);
		GroupBindResponse response = (GroupBindResponse) remoteExecute(request, master);
		if (!response.isSuccess()) {
			switch (response.getErrorCode()) {
			case ActionErrorCode.SLAVE_NOT_AVAILABLE:
				throw new ServerNotAvailableException(slave);
			default:
				throw new RemoteException(master);
			}
		}
	}

	@Override
	public void unbind(Server agent) {
		UnbindRequest request = new UnbindRequest();
		UnbindResponse response = (UnbindResponse) remoteExecute(request, agent);
		if (!response.isSuccess())
			throw new RemoteException(agent);
	}

	@Override
	public void switchRole(Server master) {
		SwitchRoleRequest request = new SwitchRoleRequest();
		request.setReason(RoleSwitchReason.REASON_USER);
		SwitchRoleResponse response = (SwitchRoleResponse) remoteExecute(request, master);
		if (!response.isSuccess())
			throw new RemoteException(master);
	}

	@Override
	public BaseResponse remoteExecute(BaseRequest request, Server agent) {
		if (slave)
			throw new AccessDeniedForSlaveException();
		if (server == null)
			throw new SystemNotInitializedException();
		return server.execute(request, agent);
	}

	@Override
	public BaseResponse remoteExecute(BaseRequest request, Server agent, int connectTimeout, int readTimeout) {
		if (slave)
			throw new AccessDeniedForSlaveException();
		if (server == null)
			throw new SystemNotInitializedException();
		return server.execute(request, agent, connectTimeout, readTimeout);
	}

}
