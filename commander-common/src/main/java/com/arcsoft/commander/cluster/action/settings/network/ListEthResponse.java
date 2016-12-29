package com.arcsoft.commander.cluster.action.settings.network;

import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseResponse;
import com.arcsoft.commander.domain.settings.Eth;
/**
 * Response for get all the eths.
 * @author xpeng
 *
 */
@XmlRootElement
public class ListEthResponse extends BaseResponse {
	private List<Eth> eths;

	public List<Eth> getEths() {
		return eths;
	}

	public void setEths(List<Eth> eths) {
		this.eths = eths;
	}
}
