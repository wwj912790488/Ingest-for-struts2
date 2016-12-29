package com.arcsoft.commander.cluster.action.settings.network;

import java.util.List;
import javax.xml.bind.annotation.XmlRootElement;
import com.arcsoft.commander.cluster.action.BaseRequest;
import com.arcsoft.commander.domain.settings.DNS;

/**
 * Request for save dns;
 * 
 * @author hxiang
 *
 */
@XmlRootElement
public class AddDNSRequest extends BaseRequest {
	private List<DNS> dnsList = null;
	
	public AddDNSRequest(){
		
	}
	
	public AddDNSRequest(List<DNS> dnsList){
		this.dnsList = dnsList;
	}

	public void setDNSList(List<DNS> dnsList){
		this.dnsList = dnsList;
	}
	
	public List<DNS> getDNSList(){
		return this.dnsList;
	}
}
