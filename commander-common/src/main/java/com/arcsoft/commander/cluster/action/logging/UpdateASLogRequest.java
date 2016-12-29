package com.arcsoft.commander.cluster.action.logging;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseRequest;

/**
 * Update aslog settings request.
 * 
 * @author fjli
 */
@XmlRootElement
public class UpdateASLogRequest extends BaseRequest {

	private String data;

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

}
