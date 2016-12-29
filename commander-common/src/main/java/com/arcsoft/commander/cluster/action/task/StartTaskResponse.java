package com.arcsoft.commander.cluster.action.task;

import java.util.Map;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseResponse;

/**
 * Response message for StartTaskRequest.
 * 
 * @author fjli
 */
@XmlRootElement
public class StartTaskResponse extends BaseResponse {
	
	/**
	 * This value contains task id as key and error code as value
	 */
	private Map<Integer, Integer> errorCodeAndTaskId = null;

	public Map<Integer, Integer> getErrorCodeAndTaskId() {
		return errorCodeAndTaskId;
	}
	
	public void setErrorCodeAndTaskId(Map<Integer, Integer> errorCodeAndTaskId) {
		this.errorCodeAndTaskId = errorCodeAndTaskId;
	}
	
	

}
