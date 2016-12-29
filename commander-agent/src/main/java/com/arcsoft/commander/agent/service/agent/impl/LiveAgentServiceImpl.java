package com.arcsoft.commander.agent.service.agent.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang.ArrayUtils;
import org.apache.log4j.Logger;

import com.arcsoft.cluster.app.ActionException;
import com.arcsoft.cluster.app.ErrorCode;
import com.arcsoft.cluster.app.Request;
import com.arcsoft.cluster.app.Response;
import com.arcsoft.cluster.heartbeat.HeartBeatSession;
import com.arcsoft.cluster.heartbeat.HeartBeatSessionEvent;
import com.arcsoft.cluster.heartbeat.HeartBeatSessionListener;
import com.arcsoft.cluster.heartbeat.HeartBeatSessionTimeoutEvent;
import com.arcsoft.cluster.node.RemoteNode;
import com.arcsoft.commander.agent.config.AppConfig;
import com.arcsoft.commander.agent.service.agent.AgentServer;
import com.arcsoft.commander.agent.service.agent.LiveAgent;
import com.arcsoft.commander.agent.service.agent.LiveAgentConfiguration;
import com.arcsoft.commander.cluster.RemoteNodeInfo;
import com.arcsoft.commander.cluster.ServerRole;
import com.arcsoft.commander.cluster.ServerType;
import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.ActionHandler;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseResponse;
import com.arcsoft.commander.cluster.action.server.BindRequest;
import com.arcsoft.commander.cluster.action.server.BindResponse;
import com.arcsoft.commander.cluster.action.server.GroupBindRequest;
import com.arcsoft.commander.cluster.action.server.GroupBindResponse;
import com.arcsoft.commander.cluster.action.server.LiveRoleSwitchRequest;
import com.arcsoft.commander.cluster.action.server.RoleSwitchReason;
import com.arcsoft.commander.cluster.action.server.SwitchRoleRequest;
import com.arcsoft.commander.cluster.action.server.SwitchRoleResponse;
import com.arcsoft.commander.cluster.action.server.UnbindRequest;
import com.arcsoft.commander.cluster.action.server.UnbindResponse;
import com.arcsoft.commander.cluster.action.task.StartTaskRequest;
import com.arcsoft.commander.cluster.action.task.StartTaskResponse;
import com.arcsoft.commander.cluster.action.task.StopTaskRequest;
import com.arcsoft.commander.cluster.action.task.UpdateTaskInfoRequest;

/**
 * This service maintains the live agent life cycle and the request handlers.
 * 
 * @author fjli
 */
public class LiveAgentServiceImpl extends BaseAgentService {

	private static final int DEFAULT_HEART_BEAT_INTERVAL = 100;
	private static final int DEFAULT_HEART_BEAT_TIMEOUT = 1000;

	private Logger log = Logger.getLogger(LiveAgentServiceImpl.class);
	private LiveAgent agent;
	private HeartBeatSession liveSession;
	private LiveBoundInfoFile boundInfoFile = new LiveBoundInfoFile();
	private Object switchLock = new Object();

	protected AgentServer createAgent() throws IOException {
		LiveAgentConfiguration config = new LiveAgentConfiguration();
		loadAgentConfig(config);
		agent = new LiveAgent(config);
		return agent;
	}

	@Override
	public void init() throws IOException {
		// Initialize service.
		super.init();

		// If backup configuration exists, load it.
		if (boundInfoFile.exists()) {
			boundInfoFile.load();
			rebindToTarget();
		}
	}

	@Override
	public void destroy() {
		// stop heart beat session.
		stopLiveHeartBeat();
		// destroy others.
		super.destroy();
	}

	/**
	 * Returns all live agent actions.
	 */
	@Override
	public int[] getActions() {
		return ArrayUtils.addAll(super.getActions(), new int[] {
			Actions.GROUP_LIVE_BIND,
			Actions.LIVE_BIND,
			Actions.LIVE_UNBIND,
			Actions.LIVE_SWITCH_ROLE,
		});
	}

	@Override
	public Response execute(Request request) throws ActionException {
		if (request instanceof GroupBindRequest) {
			return groupBind((GroupBindRequest) request);
		} else if (request instanceof BindRequest) {
			return liveBind((BindRequest) request);
		} else if (request instanceof UnbindRequest) {
			return liveUnbind();
		} else if (request instanceof SwitchRoleRequest) {
			return switchRole((SwitchRoleRequest) request);
		} else {
			return super.execute(request);
		}
	}

	/**
	 * Action intercepter, all actions will pass through here.
	 * 
	 * @param request - the request to be processed
	 */
	protected Response actionInterceptor(Request request, ActionHandler handler) throws ActionException {
		if (agent.isBound() && agent.getRole() == ServerRole.ROLE_MASTER) {
			if (isSyncRequiredRequest(request)) {
				syncTaskRequestToSlave(request);
			}
		}
		return super.actionInterceptor(request, handler);
	}

	/**
	 * Test the request is need sync to salve or not.
	 */
	private boolean isSyncRequiredRequest(Request request) {
		return request instanceof StartTaskRequest
				|| request instanceof StopTaskRequest
				|| request instanceof UpdateTaskInfoRequest;
	}

	@Override
	protected void onAddToCommander(boolean isFirstAdd) {
		super.onAddToCommander(isFirstAdd);

		// Refresh tasks status when reconnected. Don't notify if this agent is slave.
		if (!isFirstAdd && (!agent.isBound() || agent.getRole() != ServerRole.ROLE_SLAVE))
			taskManager.notifyTasksInfo();
		// Sync the 1+1 backup role to commander.
		if (agent.getRole() == ServerRole.ROLE_MASTER && boundInfoFile.exists()) {
			RemoteNodeInfo target = boundInfoFile.getBindingTarget();
			if (target != null && target.getId() != null)
				notifyRoleSwitch();
		}
	}

	@Override
	protected void onRemoveFromCommander() {
		stopLiveHeartBeat();

		// Stop all tasks.
		taskManager.stopAll();

		// Reset task manager settings.
		taskManager.enableOutput(true);
		taskManager.enableNotifyStatus(true);

		if (agent.isBound()) {
			if (agent.getRole() == ServerRole.ROLE_MASTER) {
				// Send role switch request to slave if this is master.
				notifySlaveSwitchRoleAsync(agent.getBindingNode(), RoleSwitchReason.REASON_MASTER_DELETED);
			} else {
				// Notify master to clean the binding information.
				notifyMasterUnbind(agent.getBindingNode());
			}
		}

		// remove bind information.
		boundInfoFile.delete();
	}

	/**
	 * Bind this agent with the specified agent.
	 *  
	 * @param request - the group bind request.
	 * @return returns response indicating the action is success or not.
	 * @throws ActionException if bind failed
	 */
	private GroupBindResponse groupBind(GroupBindRequest request) throws ActionException {
		GroupBindResponse resp = new GroupBindResponse();

		if (request.isAutoRebind()) {
			// If this request is an auto rebind request and if remote node is not the previous node, skip this request.
			RemoteNodeInfo prevNode = boundInfoFile.getBindingTarget();
			if (prevNode == null || prevNode.getId() == null) {
				resp.setErrorCode(ActionErrorCode.NO_BINDING_INFO);
				log.info("Cannot rebind, binding information does not exist.");
				return resp;
			} else if (!request.getSlave().getId().equals(prevNode.getId())) {
				resp.setErrorCode(ActionErrorCode.BINDING_INFO_NOT_MATCH);
				log.info("Cannot rebind, binding information does not match.");
				return resp;
			}
		} else {
			// If this request is from commander, check the bound state first.
			if (agent.isBound()) {
				resp.setErrorCode(ActionErrorCode.ALREADY_BOUND);
				return resp;
			}
		}

		// send bind request to slave.
		RemoteNode slave = agent.createRemoteNode(request.getSlave());
		BindRequest bindRequest = new BindRequest(agent.getNode().getDescription());
		BindResponse response = (BindResponse) agent.execute(bindRequest, slave);
		resp.setErrorCode(response.getErrorCode());
		if (response.isSuccess()) {
			// If this request is auto rebind, send role switch to commander.
			if (request.isAutoRebind() && agent.getRole() != ServerRole.ROLE_MASTER) {
				notifyRoleSwitch();
			}
			// slave is bound success, this agent will server as master.
			bindMaster(slave);
			// start sync tasks
			syncTasksToSlave(slave);
		}

		return resp;
	}

	/**
	 * Bind with the specified master agent. This agent must be slave agent.
	 * 
	 * @param request - the live bind request
	 * @return returns response indicating the action is success or not.
	 */
	private BindResponse liveBind(BindRequest request) {
		BindResponse resp = new BindResponse();

		// If agent is already bound, return error.
		if (agent.isBound()) {
			resp.setErrorCode(ActionErrorCode.ALREADY_BOUND);
			return resp;
		}

		// TODO: checking binding conditions
		// ...

		// binding to the master, this agent will act as a slave.
		try {
			RemoteNode master = agent.createRemoteNode(request.getMaster());
			bindSlave(master);
			resp.setErrorCode(ActionErrorCode.SUCCESS);
		} catch (IOException e) {
			resp.setErrorCode(ActionErrorCode.CREATE_HEART_BEAT_FAILED);
		}

		return resp;
	}

	/**
	 * Unbind with the target agent.
	 * 
	 * @return returns response indicating the action is success or not.
	 */
	private UnbindResponse liveUnbind() {
		UnbindResponse response = new UnbindResponse();
		if (agent.isBound() && agent.getRole() == ServerRole.ROLE_MASTER) {
			// clean the bond information.
			agent.setBound(false);
			agent.setBindingNode(null);
			boundInfoFile.delete();
			response.setErrorCode(ActionErrorCode.SUCCESS);
		}
		return response;
	}

	/**
	 * Switch role.
	 * 
	 * @param request - the switch role request
	 * @return returns response indicating the action is success or not.
	 */
	private SwitchRoleResponse switchRole(SwitchRoleRequest request) {
		SwitchRoleResponse response = new SwitchRoleResponse();
		if (agent.isBound()) {
			int reason = request.getReason();
			if (agent.getRole() == ServerRole.ROLE_MASTER) {
				if (reason == RoleSwitchReason.REASON_USER) {
					int errorCode = notifySlaveSwitchRole(agent.getBindingNode(), RoleSwitchReason.REASON_USER);
					response.setErrorCode(errorCode);
				}
			} else {
				if (hasNetworkError()) {
					// Either input/output network error, will case switch role failed.
					response.setErrorCode(ActionErrorCode.NETWORK_ERROR_DETECTED);
				} else {
					switchSlaveToMaster(reason);
					response.setErrorCode(ActionErrorCode.SUCCESS);
				}
			}
		}
		return response;
	}

	/**
	 * Process bind request on slave side.
	 * 
	 * @param master - the master agent
	 * @throws IOException - if create heart beat failed.
	 */
	private void bindSlave(RemoteNode master) throws IOException {
		// start heart beat.
		startLiveHeartBeat(master);
		// save binding information.
		agent.setBound(true);
		agent.setRole(ServerRole.ROLE_SLAVE);
		agent.setBindingNode(master);
		saveBindingInfo(master);
		// disable task output.
		taskManager.enableOutput(false);
		// disable notifying status to commander.
		taskManager.enableNotifyStatus(false);
	}

	/**
	 * Process bind request on master side.
	 * 
	 * @param slave - the slave agent
	 */
	private void bindMaster(RemoteNode slave) {
		// save binding information.
		agent.setBound(true);
		agent.setRole(ServerRole.ROLE_MASTER);
		agent.setBindingNode(slave);
		saveBindingInfo(slave);
	}

	/**
	 * Start live heart beat.
	 */
	private void startLiveHeartBeat(RemoteNode target) throws IOException {
		// if there is heart beat session exists, stop it first.
		stopLiveHeartBeat();

		// create new heart beat session.
		log.info("start heart beat to: " + target.getDescription().getIp());
		liveSession = new HeartBeatSession(agent.getNode(), target);
		liveSession.setInterval(AppConfig.getInt("backup.heartbeat.interval", DEFAULT_HEART_BEAT_INTERVAL));
		liveSession.setTimeout(AppConfig.getInt("backup.heartbeat.timeout", DEFAULT_HEART_BEAT_TIMEOUT));
		liveSession.addListener(new HeartBeatSessionListener() {
			@Override
			public void sessionEventReceived(HeartBeatSessionEvent event) {
				if (event instanceof HeartBeatSessionTimeoutEvent) {
					log.warn("Heart beat session timeout.");
					switchSlaveToMaster(RoleSwitchReason.REASON_HEARTBEAT);
				}
			}
		});

		// start heart beat.
		liveSession.start();
	}

	/**
	 * Stop heart beat session.
	 */
	private void stopLiveHeartBeat() {
		if (liveSession != null) {
			log.info("stop heart beat");
			liveSession.stop();
			liveSession = null;
		}
	}

	/**
	 * Switch slave to master.
	 */
	private void switchSlaveToMaster(int reason) {
		log.info("switch this server to master.");
		switch(reason) {
		case RoleSwitchReason.REASON_HEARTBEAT:
			// clear bound state.
			agent.setBound(false);
			agent.setBindingNode(null);
			break;
		case RoleSwitchReason.REASON_MASTER_DELETED:
			// stop heart beat.
			stopLiveHeartBeat();
			// clear bound state
			agent.setBound(false);
			agent.setBindingNode(null);
			// remove binding information.
			boundInfoFile.delete();
			break;
		case RoleSwitchReason.REASON_MASTER_NETWORK_ERROR:
		case RoleSwitchReason.REASON_MASTER_GPU_ERROR:
			// stop heart beat.
			stopLiveHeartBeat();
			// keep bound state.
			break;
		case RoleSwitchReason.REASON_USER:
			// stop heart beat.
			stopLiveHeartBeat();
			// keep bound state.
			break;
		}

		// switch role to master.
		agent.setRole(ServerRole.ROLE_MASTER);

		// enable task output.
		taskManager.enableOutput(true);

		// enable task status notify.
		taskManager.enableNotifyStatus(true);

		// notify tasks info to commander.
		taskManager.notifyTasksInfo();

		// send role switch request to commander.
		notifyRoleSwitch();
	}

	/**
	 * Save binding informatioin.
	 * 
	 * @param target - the binding target
	 */
	private void saveBindingInfo(RemoteNode target) {
		try {
			RemoteNodeInfo remote = new RemoteNodeInfo(target.getDescription());
			boundInfoFile.setBindingTarget(remote);
			boundInfoFile.save();
		} catch (IOException e) {
			log.error("save binding info failed.", e);
		}
	}

	/**
	 * Rebind to the target.
	 */
	private void rebindToTarget() {
		executor.execute(new Runnable() {
			@Override
			public void run() {
				try {
					RemoteNodeInfo target = boundInfoFile.getBindingTarget();
					log.debug("auto rebind to the target " + target.getIp() + ":" + target.getPort());
					GroupBindRequest request = new GroupBindRequest(agent.getNode().getDescription());
					request.setAutoRebind(true);
					RemoteNode remote = agent.createRemoteNode(target);
					BaseResponse response = (BaseResponse) agent.execute(request, remote);
					if (!response.isSuccess()) {
						String errorCode = Integer.toHexString(response.getErrorCode());
						log.error("rebind to target failed, error code: 0x" + errorCode);
						boundInfoFile.delete();
					}
				} catch (ActionException e) {
					log.error("rebind to target failed.", e);
				}
			}
		});
	}

	/**
	 * Notify the master to clear the bind information.
	 */
	private void notifyMasterUnbind(final RemoteNode node) {
		executor.execute(new Runnable() {
			@Override
			public void run() {
				try {
					agent.execute(new UnbindRequest(), node);
				} catch (ActionException e) {
					log.error(String.format("execute unbind request failed: error=0x%08x, skip it.", e.getErrorCode()));
				}
			}
		});
	}

	/**
	 * Notify slave to switch role to master.
	 * 
	 * @param slave - the slave
	 * @param reason - the reason
	 */
	private int notifySlaveSwitchRole(RemoteNode slave, int reason) {
		synchronized (switchLock) {
			log.info("notify slave " + slave.getDescription().getIp() + " to switch role to master, reason code: " + reason);
			boolean notifyOnly = (reason == RoleSwitchReason.REASON_MASTER_DELETED);
			if (!notifyOnly)
				taskManager.enableOutput(false);
			try {
				// send request to slave.
				SwitchRoleRequest request = new SwitchRoleRequest();
				request.setReason(reason);
				SwitchRoleResponse response = (SwitchRoleResponse) agent.execute(request, slave);
				if (!response.isSuccess()) {
					log.error("Swich role failed: send to slave error, error code=0x" + Integer.toHexString(response.getErrorCode()));
					if (!notifyOnly)
						taskManager.enableOutput(true);
					return response.getErrorCode();
				}
			} catch (ActionException e) {
				log.error("Swich role failed: send to slave error.", e);
				if (!notifyOnly)
					taskManager.enableOutput(true);
				if (e.getErrorCode() == ErrorCode.SEND_REQUEST_FAILED)
					return ActionErrorCode.SLAVE_NOT_AVAILABLE;
				return e.getErrorCode();
			}
			if (!notifyOnly) {
				agent.setRole(ServerRole.ROLE_SLAVE);
				taskManager.enableNotifyStatus(false);
				try {
					startLiveHeartBeat(slave);
				} catch(IOException e) {
					log.error("Create heart beat failed.", e);
				}
			}
			return ActionErrorCode.SUCCESS;
		}
	}

	/**
	 * Async notify slave to switch role to master.
	 * 
	 * @param slave - the slave
	 * @param reason - the reason
	 */
	private void notifySlaveSwitchRoleAsync(final RemoteNode slave, final int reason) {
		executor.execute(new Runnable() {
			@Override
			public void run() {
				notifySlaveSwitchRole(slave, reason);
			}
		});
	}

	/**
	 * Notify role switch event to commander.
	 */
	private void notifyRoleSwitch() {
		executor.execute(new Runnable() {
			@Override
			public void run() {
				try {
					LiveRoleSwitchRequest request = new LiveRoleSwitchRequest();
					request.setId(agent.getNode().getDescription().getId());
					remoteExecute(request);
				} catch(ActionException e) {
					log.error("send role switch failed.", e);
				}
			}
		});
	}

	/**
	 * Sync all tasks to slave.
	 * 
	 * @param slave - the slave server
	 */
	private void syncTasksToSlave(RemoteNode slave) {
		try {
			Map<Integer, String> tasks = taskManager.getTasks();
			if (tasks != null && !tasks.isEmpty()) {
				List<Integer> ids = new ArrayList<>();
				List<String> datas = new ArrayList<>();
				for (Entry<Integer, String> entry : tasks.entrySet()) {
					ids.add(entry.getKey());
					datas.add(entry.getValue());
				}
				StartTaskRequest request = new StartTaskRequest();
				request.setIds(ids);
				request.setDatas(datas);
				StartTaskResponse response = (StartTaskResponse) agent.execute(request, slave);
				if (!response.isSuccess()) {
					log.error("sync task error: error code=0x" + Integer.toHexString(response.getErrorCode()));
				}
			}
		} catch(ActionException e) {
			log.error("sync tasks failed.", e);
		}
	}

	/**
	 * Sync start/stop task request to slave.
	 * 
	 * @param request - the request to be sync
	 */
	private void syncTaskRequestToSlave(final Request request) {
		executor.execute(new Runnable() {
			@Override
			public void run() {
				try {
					RemoteNode slave = agent.getBindingNode();
					BaseResponse response = (BaseResponse) agent.execute(request, slave);
					if (!response.isSuccess()) {
						log.error("sync task error: error code=0x" + Integer.toHexString(response.getErrorCode()));
					}
				} catch(ActionException e) {
					log.error("sync task request failed.", e);
				}
			}
		});
	}

	@Override
	protected void processNetworkError(boolean inputError, boolean outputError, boolean haError) {
		boolean stopTasksNotified = false;
		if (log.isInfoEnabled())
			log.info("process network error: input=" + inputError + ", output=" + outputError + ", ha=" + haError);
		if (inputError || outputError) {
			// If the agent is m+n agent, stop all tasks.
			if (agent.getServerType() == ServerType.TYPE_M_N) {
				if (log.isInfoEnabled())
					log.info("notify stop all tasks for input or output network error.");
				stopTasksNotified = true;
				noitfyStopAllTasksAsync();
			}

			// If the master has network inactive, notify slave to switch role.
			if (agent.isBound() && agent.getRole() == ServerRole.ROLE_MASTER) {
				notifySlaveSwitchRoleAsync(agent.getBindingNode(), RoleSwitchReason.REASON_MASTER_NETWORK_ERROR);
			}
		}

		// If the agent is m+n agent and the cluster network is down, stop all tasks.
		if (haError && agent.getServerType() == ServerType.TYPE_M_N) {
			if (!stopTasksNotified) {
				if (log.isInfoEnabled())
					log.info("notify stop all tasks for cluster network error.");
				noitfyStopAllTasksAsync();
			}
		}
	}

	@Override
	protected void processGPUError() {
		// If the master has network inactive, notify slave to switch role.
		if (agent.isBound() && agent.getRole() == ServerRole.ROLE_MASTER) {
			notifySlaveSwitchRoleAsync(agent.getBindingNode(), RoleSwitchReason.REASON_MASTER_GPU_ERROR);
		}
	}

}
