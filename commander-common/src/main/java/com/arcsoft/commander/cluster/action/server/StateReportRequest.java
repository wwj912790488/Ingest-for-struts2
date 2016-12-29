package com.arcsoft.commander.cluster.action.server;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseRequest;
import com.arcsoft.commander.domain.server.ServerStateInfo;

/**
 * Report the agent state to commander.
 * 
 * @author fjli
 */
@XmlRootElement
public class StateReportRequest extends BaseRequest {

	private String id;
	private ServerStateInfo stateInfo;

	/**
	 * Returns the agent id.
	 */
	public String getId() {
		return id;
	}

	/**
	 * Set the agent id.
	 * 
	 * @param id - the agent id
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * Returns the state info.
	 */
	public ServerStateInfo getStateInfo() {
		return stateInfo;
	}

	/**
	 * Set the state info.
	 * 
	 * @param stateInfo - the sate info
	 */
	public void setStateInfo(ServerStateInfo stateInfo) {
		this.stateInfo = stateInfo;
	}

}
