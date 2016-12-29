package com.arcsoft.commander.cluster.action.settings.network;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseRequest;
import com.arcsoft.commander.domain.settings.Eth;
/**
 * Request for bond or update specific eth.
 * @author xpeng
 *
 */
@XmlRootElement
public class BondAndUpdateEthRequest extends BaseRequest {

	private Eth eth;
	private String slaveId;

	public BondAndUpdateEthRequest() {
	}

	public BondAndUpdateEthRequest(Eth eth, String slaveId) {
		this.eth = eth;
		this.slaveId = slaveId;
	}

	public Eth getEth() {
		return eth;
	}

	public void setEth(Eth eth) {
		this.eth = eth;
	}

	public String getSlaveId() {
		return slaveId;
	}

	public void setSlaveId(String slaveId) {
		this.slaveId = slaveId;
	}

}
