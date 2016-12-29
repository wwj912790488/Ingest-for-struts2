package com.arcsoft.commander.cluster.action.settings.network;

import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseResponse;
import com.arcsoft.commander.domain.settings.DNS;
/**
 * @author hxiang
 * Response for get dns list;
 */
@XmlRootElement
public class ListDNSResponse extends BaseResponse {
	private List<DNS> dnsList = null;

	public List<DNS> getDnsList() {
		return dnsList;
	}

	public void setDnsList(List<DNS> dnsList) {
		this.dnsList = dnsList;
	}
	
}
