package com.arcsoft.commander.agent.service.agent;

import com.arcsoft.cluster.node.RemoteNode;
import com.arcsoft.commander.cluster.ClusterServer;
import com.arcsoft.commander.cluster.ServerType;

/**
 * Base agent server.
 * 
 * @author fjli
 */
public abstract class AgentServer extends ClusterServer {

	protected RemoteNode commander;

	/**
	 * Construct new agent server with the specified configuration.
	 * 
	 * @param config - the specified configuration
	 */
	public AgentServer(AgentConfiguration config) {
		super(config);
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
		setServerType(ServerType.TYPE_UNKNOWN);
		this.commander = null;
	}

}
