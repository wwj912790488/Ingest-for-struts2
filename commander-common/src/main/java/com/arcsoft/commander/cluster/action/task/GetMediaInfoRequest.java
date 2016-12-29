package com.arcsoft.commander.cluster.action.task;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseRequest;

/**
 * The request for get media info.
 * 
 * @author ybzhang
 */
@XmlRootElement
public class GetMediaInfoRequest extends BaseRequest {

	private String uri;
	private String eth;

	public String getUri() {
		return uri;
	}

	public void setUri(String uri) {
		this.uri = uri;
	}

	public String getEth() {
		return eth;
	}

	public void setEth(String eth) {
		this.eth = eth;
	}

}
