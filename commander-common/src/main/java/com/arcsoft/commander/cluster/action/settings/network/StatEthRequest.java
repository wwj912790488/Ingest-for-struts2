package com.arcsoft.commander.cluster.action.settings.network;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseRequest;
/**
 * Request for get specific eth's network used rate
 * @author xpeng
 *
 */
@XmlRootElement
public class StatEthRequest extends BaseRequest {
	private String ethId;

	public StatEthRequest(){
		
	}
	
	public StatEthRequest(String ethId) {
		this.ethId = ethId;
	}

	public String getEthId() {
		return ethId;
	}

	public void setEthId(String ethId) {
		this.ethId = ethId;
	}

}
