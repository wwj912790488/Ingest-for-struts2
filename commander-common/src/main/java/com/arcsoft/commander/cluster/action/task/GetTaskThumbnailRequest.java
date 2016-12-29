package com.arcsoft.commander.cluster.action.task;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseRequest;


/**
 * Request the specified server to get the task thumbnail of specified task.
 * 
 * @author zw
 */
@XmlRootElement
public class GetTaskThumbnailRequest extends BaseRequest {
	
	private Integer id;
	
	private Integer width;

	
	public Integer getId() {
		return id;
	}

	
	public void setId(Integer id) {
		this.id = id;
	}

	
	public Integer getWidth() {
		return width;
	}

	
	public void setWidth(Integer width) {
		this.width = width;
	}
}
