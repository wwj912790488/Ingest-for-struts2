package com.arcsoft.commander.cluster.action.settings.network;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseResponse;

/**
 * Response for get firewall status.
 *
 * @author hxiang
 */
@XmlRootElement
public class GetFirewallStatusResponse extends BaseResponse {
	private boolean isServiceOn = false;

	public boolean isServiceOn() {
		return isServiceOn;
	}

	public void setServiceOn(boolean isServiceOn) {
		this.isServiceOn = isServiceOn;
	}
}
