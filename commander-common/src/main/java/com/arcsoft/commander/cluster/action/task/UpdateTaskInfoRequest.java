package com.arcsoft.commander.cluster.action.task;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseRequest;
import com.arcsoft.commander.domain.task.TaskChangedInfo;

/**
 * Update task info request.
 * 
 * @author fjli
 */
@XmlRootElement
public class UpdateTaskInfoRequest extends BaseRequest {

	private TaskChangedInfo changedInfo;

	/**
	 * Return task changed information.
	 */
	public TaskChangedInfo getChangedInfo() {
		return changedInfo;
	}

	/**
	 * Set the task changed information.
	 * 
	 * @param changedInfo - the changedInfo to set
	 */
	public void setChangedInfo(TaskChangedInfo changedInfo) {
		this.changedInfo = changedInfo;
	}

}
