package com.arcsoft.commander.cluster.action.settings.network;

import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseRequest;
import com.arcsoft.commander.domain.settings.DNS;

/**
 * @author hxiang
 *
 */
@XmlRootElement
public class DeleteDNSRequest extends BaseRequest {
	private List<DNS> dnsList = null;
	
	public DeleteDNSRequest(){
		
	}
	
	public DeleteDNSRequest(List<DNS> dnsList){
		this.dnsList = dnsList;
	}

	public void setDNSList(List<DNS> dnsList){
		this.dnsList = dnsList;
	}
	
	public List<DNS> getDNSList(){
		return this.dnsList;
	}
}
