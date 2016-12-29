package com.arcsoft.commander.cluster.action.task;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseResponse;


/**
 * The response of get media info request.
 * 
 * @author ybzhang
 */
@XmlRootElement
public class GetMediaInfoResponse extends BaseResponse {

	private byte[] info;

	@XmlElement(name = "info")
	public byte[] getInfo() {
		return info;
	}

	public void setInfo(byte[] info) {
		this.info = info;
	}

}
