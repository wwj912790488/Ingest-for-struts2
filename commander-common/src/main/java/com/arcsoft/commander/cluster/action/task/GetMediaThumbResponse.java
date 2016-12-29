package com.arcsoft.commander.cluster.action.task;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseResponse;

/**
 * The response for get media thumbnail.
 * 
 * @author fjli
 */
@XmlRootElement
public class GetMediaThumbResponse extends BaseResponse {

	private byte[] data;

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}

}
