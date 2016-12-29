package com.arcsoft.commander.cluster.action.settings.network;

import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseRequest;
import com.arcsoft.commander.domain.server.NioBinding;
/**
 * @author wtsun
 * Request for update netowrk input-output bindings
 */
@XmlRootElement
public class UpdateNioBindingRequest extends BaseRequest {
	private List<NioBinding> niobs = null;
	
	public UpdateNioBindingRequest() {
	}
	
	public UpdateNioBindingRequest(List<NioBinding> niobs) {
		this.niobs = niobs;
	}

	public List<NioBinding> getNioBindings() {
		return niobs;
	}

	public void setNioBindings(List<NioBinding> niobs) {
		this.niobs = niobs;
	}
}
