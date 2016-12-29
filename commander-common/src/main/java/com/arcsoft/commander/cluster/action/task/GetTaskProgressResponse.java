package com.arcsoft.commander.cluster.action.task;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseResponse;


/**
 * Response message for {@link GetTaskProgressRequest}.
 * 
 * @author zw
 */
@XmlRootElement
public class GetTaskProgressResponse extends BaseResponse {

	/**
	 * The xml string of  {@link TranscodingInfo}
	 */
	private String xml;
	
	public String getXml() {
		return xml;
	}

	
	public void setXml(String xml) {
		this.xml = xml;
	}
	
	
	
}
