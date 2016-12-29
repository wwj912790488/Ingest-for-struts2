package com.arcsoft.commander.cluster.action.server;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.cluster.node.NodeDescription;
import com.arcsoft.commander.cluster.RemoteNodeInfo;
import com.arcsoft.commander.cluster.ServerType;
import com.arcsoft.commander.cluster.action.BaseRequest;

/**
 * This request is used to add the agent to the specified commander.
 * 
 * @author fjli
 */
@XmlRootElement
public class AddAgentRequest extends BaseRequest {

	private RemoteNodeInfo commander;
	private int agentType = ServerType.TYPE_UNKNOWN;

	/**
	 * Default construct, for data converter.
	 */
	public AddAgentRequest() {
	}

	/**
	 * Construct set commander request with the specified commander.
	 * 
	 * @param commander - the specified commander
	 */
	public AddAgentRequest(NodeDescription commander) {
		this.commander = new RemoteNodeInfo();
		this.commander.setId(commander.getId());
		this.commander.setIp(commander.getIp());
		this.commander.setPort(commander.getPort());
	}

	/**
	 * Returns the commander node info.
	 */
	public RemoteNodeInfo getCommander() {
		return commander;
	}

	/**
	 * Set the commander node info.
	 * 
	 * @param commander - the commander node info
	 */
	public void setCommander(RemoteNodeInfo commander) {
		this.commander = commander;
	}

	/**
	 * Returns the agent type.
	 */
	public int getAgentType() {
		return agentType;
	}

	/**
	 * Set the agent type.
	 * 
	 * @param agentType - the agent type
	 */
	public void setAgentType(int agentType) {
		this.agentType = agentType;
	}

}
