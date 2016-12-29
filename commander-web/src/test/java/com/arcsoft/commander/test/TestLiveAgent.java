package com.arcsoft.commander.test;

import java.io.IOException;

import com.arcsoft.cluster.app.ActionException;
import com.arcsoft.cluster.app.Request;
import com.arcsoft.cluster.app.RequestHandler;
import com.arcsoft.cluster.app.Response;
import com.arcsoft.cluster.heartbeat.HeartBeatSession;
import com.arcsoft.cluster.heartbeat.HeartBeatSessionEvent;
import com.arcsoft.cluster.heartbeat.HeartBeatSessionListener;
import com.arcsoft.cluster.heartbeat.HeartBeatSessionTimeoutEvent;
import com.arcsoft.cluster.node.RemoteNode;
import com.arcsoft.commander.cluster.ClusterServer;
import com.arcsoft.commander.cluster.Configuration;
import com.arcsoft.commander.cluster.ServerRole;
import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.server.AddAgentRequest;
import com.arcsoft.commander.cluster.action.server.AddAgentResponse;
import com.arcsoft.commander.cluster.action.server.BindRequest;
import com.arcsoft.commander.cluster.action.server.BindResponse;
import com.arcsoft.commander.cluster.action.server.GetAgentDescRequest;
import com.arcsoft.commander.cluster.action.server.GetAgentDescResponse;
import com.arcsoft.commander.cluster.action.server.GroupBindRequest;
import com.arcsoft.commander.cluster.action.server.GroupBindResponse;
import com.arcsoft.commander.cluster.action.server.LiveRoleSwitchRequest;
import com.arcsoft.commander.cluster.action.server.RemoveAgentRequest;
import com.arcsoft.commander.cluster.action.server.RemoveAgentResponse;
import com.arcsoft.commander.cluster.action.server.UnbindRequest;
import com.arcsoft.commander.cluster.action.server.UnbindResponse;
import com.arcsoft.commander.domain.server.AgentDesc;
import com.arcsoft.commander.domain.server.Server;

/**
 * Live Agent for testing.
 * 
 * @author fjli
 */
public class TestLiveAgent extends ClusterServer implements RequestHandler {

	protected RemoteNode commander;
	private HeartBeatSession liveSession;
	private RemoteNode target;
	private Object bindingLock = new Object();

	/**
	 * Construct test live agent.
	 * 
	 * @param config - the specified live configuration
	 */
	public TestLiveAgent(Configuration config) {
		super(config);
		addHandler(Actions.GET_AGENT_DESC, this);
		addHandler(Actions.ADD_AGENT, this);
		addHandler(Actions.REMOVE_AGENT, this);
		addHandler(Actions.GROUP_LIVE_BIND, this);
		addHandler(Actions.LIVE_BIND, this);
		addHandler(Actions.LIVE_UNBIND, this);
	}

	/**
	 * Create new server represent current agent.
	 */
	public Server getServer() {
		Server server = new Server(getNode().getDescription());
		return server;
	}

	/**
	 * Set the commander this server added to.
	 * 
	 * @param commander - the commander.
	 */
	public void setCommander(RemoteNode commander) {
		this.commander = commander;
	}

	/**
	 * Return the commander this agent added to.
	 */
	public RemoteNode getCommander() {
		return this.commander;
	}

	/**
	 * Reset all, as if the server just started and without connected to
	 * commander.
	 */
	public void resetAll() {
		unbind();
		this.commander = null;
	}

	/**
	 * Return the server this server binding to.
	 */
	public RemoteNode getBindingNode() {
		return target;
	}

	/**
	 * Indicate the agent is already bound or not.
	 */
	public boolean isBound() {
		synchronized (bindingLock) {
			return this.target != null;
		}
	}

	/**
	 * Bind to the target.
	 * 
	 * @param role - the role this server will act as
	 * @param target - the target this server will bind to
	 * @throws IOException if create heart beat session failed.
	 */
	public void bind(int role, RemoteNode target) throws IOException {
		synchronized (bindingLock) {
			// heart beat session is created by slave.
			if (role == ServerRole.ROLE_SLAVE)
				startLiveHeartBeat(target);
			// bind done.
			setRole(role);
			this.target = target;
		}
	}

	/**
	 * Unbind with the target.
	 */
	public void unbind() {
		synchronized (bindingLock) {
			// stop heart beat
			stopLiveHeartBeat();

			// if the role is slave, switch to unknown
			// if the role is master, keep the role.
			if (getRole() == ServerRole.ROLE_SLAVE)
				setRole(ServerRole.ROLE_UNKNOWN);
			this.target = null;
		}
	}

	/**
	 * Start live heart beat.
	 */
	private void startLiveHeartBeat(RemoteNode target) throws IOException {
		// if there is heart beat session exists, stop it first.
		stopLiveHeartBeat();

		// create new heart beat session.
		log.info("start heart beat to: " + target.getDescription().getIp());
		liveSession = new HeartBeatSession(node, target);
		liveSession.setInterval(100);
		liveSession.setTimeout(500);
		liveSession.addListener(new HeartBeatSessionListener() {
			@Override
			public void sessionEventReceived(HeartBeatSessionEvent event) {
				if (event instanceof HeartBeatSessionTimeoutEvent) {
					heartBeatTimeout();
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
	 * Process on heart beat timeout.
	 */
	private void heartBeatTimeout() {
		log.warn("heart beat timeout, switch this server to master.");

		// clean binding information.
		target = null;

		// now this server server as master.
		setRole(ServerRole.ROLE_MASTER);

		// TODO: enable task output.
		// ...

		// send role switch request to commander.
		try {
			LiveRoleSwitchRequest request = new LiveRoleSwitchRequest();
			request.setId(node.getDescription().getId());
			execute(request, commander);
		} catch(ActionException e) {
			log.error("send role switch failed: ", e);
		}
	}

	@Override
	public Response execute(Request request) throws ActionException {
		if (request instanceof GetAgentDescRequest) {
			return getAgentDesc();
		} else if (request instanceof AddAgentRequest) {
			return addAgent((AddAgentRequest) request);
		} else if (request instanceof RemoveAgentRequest) {
			return removeAgent();
		} else if (request instanceof GroupBindRequest) {
			return groupBind((GroupBindRequest) request);
		} else if (request instanceof BindRequest) {
			return liveBind((BindRequest) request);
		} else if (request instanceof UnbindRequest) {
			return liveUnbind();
		}
		return null;
	}

	/**
	 * Get agent description.
	 * 
	 * @return returns response describing this agent.
	 */
	private GetAgentDescResponse getAgentDesc() {
		GetAgentDescResponse response = new GetAgentDescResponse();
		response.setErrorCode(ActionErrorCode.SUCCESS);
		response.setAgentDesc(new AgentDesc());
		return response;
	}

	/**
	 * Add agent to the specified commander.
	 * 
	 * @param request - the add agent request
	 * @return returns response indicating the action is success or not.
	 */
	private AddAgentResponse addAgent(AddAgentRequest request) {
		RemoteNode commander = this.createRemoteNode(request.getCommander());
		this.setCommander(commander);
		AddAgentResponse response = new AddAgentResponse();
		response.setErrorCode(ActionErrorCode.SUCCESS);
		return response;
	}

	/**
	 * Remove agent from the commander.
	 * 
	 * @param request - the remove request.
	 * @return returns response indicating the action is success or not.
	 */
	private RemoveAgentResponse removeAgent() {
		this.resetAll();
		RemoveAgentResponse response = new RemoveAgentResponse();
		response.setErrorCode(ActionErrorCode.SUCCESS);
		return response;
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

		// check the agent is already bound or not.
		if (this.isBound()) {
			resp.setErrorCode(ActionErrorCode.ALREADY_BOUND);
		} else {
			// send bind request to slave.
			GroupBindRequest groupReq = (GroupBindRequest) request;
			RemoteNode slave = this.createRemoteNode(groupReq.getSlave());
			BindRequest bindRequest = new BindRequest(this.getNode().getDescription());
			BindResponse response = (BindResponse) this.execute(bindRequest, slave);
			resp.setErrorCode(response.getErrorCode());
			if (response.isSuccess()) {
				// slave is bound success, this agent will server as master.
				try {
					this.bind(ServerRole.ROLE_MASTER, slave);
					resp.setErrorCode(ActionErrorCode.SUCCESS);
				} catch (IOException e) {
					resp.setErrorCode(ActionErrorCode.UNKNOWN_ERROR);
				}
			}
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
		if (this.isBound()) {
			resp.setErrorCode(ActionErrorCode.ALREADY_BOUND);
			return resp;
		}

		// TODO: checking binding conditions
		// ...

		// binding to the master, this agent will act as a slave.
		try {
			RemoteNode master = this.createRemoteNode(request.getMaster());
			this.bind(ServerRole.ROLE_SLAVE, master);
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
		this.unbind();
		UnbindResponse response = new UnbindResponse();
		response.setErrorCode(ActionErrorCode.SUCCESS);
		return response;
	}

}
