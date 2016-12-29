package com.arcsoft.commander.cluster.action.settings.network;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseResponse;

/**
 * Response for get specific eth's used rate
 * 
 * @author xpeng
 * 
 */
@XmlRootElement
public class StatEthResponse extends BaseResponse {
	private int usedRate;

	public int getUsedRate() {
		return usedRate;
	}

	public void setUsedRate(int usedRate) {
		this.usedRate = usedRate;
	}
}
