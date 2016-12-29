package com.arcsoft.commander.cluster.action.task;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseRequest;


/**
 * Request the specified server to get the task progress of specified task.
 * 
 * @author zw
 */
@XmlRootElement
public class GetTaskProgressRequest extends BaseRequest {
	
	private Integer id;
	
	/**
	 * This property can be null.
	 * @see ITranscodingTracker#getProgressInfo(byte[] filters)
	 */
	private byte[] filters;

	public Integer getId() {
		return id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}

	
	public byte[] getFilters() {
		return filters;
	}

	
	public void setFilters(byte[] filters) {
		this.filters = filters;
	}
	
	

}
