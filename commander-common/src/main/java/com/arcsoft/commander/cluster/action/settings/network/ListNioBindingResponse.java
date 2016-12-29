package com.arcsoft.commander.cluster.action.settings.network;

import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseResponse;
import com.arcsoft.commander.domain.server.NioBinding;
/**
 * @author wtsun
 * Response for list network input-output bindings
 */
@XmlRootElement
public class ListNioBindingResponse extends BaseResponse {
	private List<NioBinding> niobs = null;
	
	public List<NioBinding> getNioBindings() {
		return niobs;
	}

	public void setNioBindings(List<NioBinding> niobs) {
		this.niobs = niobs;
	}	
}
