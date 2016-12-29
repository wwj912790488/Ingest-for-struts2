package com.arcsoft.commander.cluster.action.server;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseRequest;
import com.arcsoft.commander.domain.server.ServerCapabilities;

/**
 * Report the server caps changed.
 * 
 * @author fjli
 */
@XmlRootElement
public class CapabilitiesChangedRequest extends BaseRequest {

	private String id;
	private ServerCapabilities capabilities;

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
	 * Returns the agent capabilities.
	 */
	public ServerCapabilities getCapabilities() {
		return capabilities;
	}

	/**
	 * Set the agent capabilities.
	 * 
	 * @param capabilities - the caps to set
	 */
	public void setCapabilities(ServerCapabilities capabilities) {
		this.capabilities = capabilities;
	}

}
