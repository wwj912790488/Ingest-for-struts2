package com.arcsoft.commander.cluster.action.task;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseResponse;


/**
 * Response message for {@link GetTaskThumbnailRequest}.
 * 
 * @author zw
 */
@XmlRootElement
public class GetTaskThumbnailResponse extends BaseResponse {
	
	/**
	 * Image as byte array.
	 */
	private byte[] data;

	
	public byte[] getData() {
		return data;
	}
	
	public void setData(byte[] data) {
		this.data = data;
	}
	
	
	
}
