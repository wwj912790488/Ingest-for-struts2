package com.arcsoft.commander.cluster.action.server;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseRequest;

/**
 * Request the slave server as master.
 * 
 * @author fjli
 */
@XmlRootElement
public class SwitchRoleRequest extends BaseRequest {

	private int reason;

	/**
	 * Default construct, for data converter.
	 */
	public SwitchRoleRequest() {
	}

	/**
	 * Returns the reason.
	 */
	public int getReason() {
		return reason;
	}

	/**
	 * Set the reason.
	 * 
	 * @param reason - the specified reason
	 */
	public void setReason(int reason) {
		this.reason = reason;
	}

}
