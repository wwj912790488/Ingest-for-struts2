package com.arcsoft.commander.cluster.action.task;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseRequest;

/**
 * The request for get media thumnail.
 * 
 * @author fjli
 */
@XmlRootElement
public class GetMediaThumbRequest extends BaseRequest {

	private String uri;
	private String eth;
	private Integer width;

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

	public Integer getWidth() {
		return width;
	}

	public void setWidth(Integer width) {
		this.width = width;
	}

}
