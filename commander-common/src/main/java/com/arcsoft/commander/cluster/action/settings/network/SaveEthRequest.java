package com.arcsoft.commander.cluster.action.settings.network;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseRequest;
import com.arcsoft.commander.domain.settings.Eth;
/**
 * Request for update specific eth.
 * @author xpeng
 *
 */
@XmlRootElement
public class SaveEthRequest extends BaseRequest {

	private Eth eth;

	public SaveEthRequest() {
	}

	public SaveEthRequest(Eth eth) {
		this.eth = eth;
	}

	public Eth getEth() {
		return eth;
	}

	public void setEth(Eth eth) {
		this.eth = eth;
	}

}
