package com.arcsoft.commander.cluster.action.server;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseResponse;
import com.arcsoft.commander.domain.server.AgentDesc;

/**
 * The response message for get agent description request.
 * 
 * @author fjli
 */
@XmlRootElement
public class GetAgentDescResponse extends BaseResponse {

	private AgentDesc agentDesc;

	/**
	 * Returns agent description.
	 */
	public AgentDesc getAgentDesc() {
		return agentDesc;
	}

	/**
	 * Set agent description.
	 * 
	 * @param agentDesc - the agent description
	 */
	public void setAgentDesc(AgentDesc agentDesc) {
		this.agentDesc = agentDesc;
	}

}
