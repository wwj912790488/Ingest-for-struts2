package com.arcsoft.commander.cluster.action.task;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseRequest;

/**
 * Notify the commander to delete task.
 * 
 * @author fjli
 */
@XmlRootElement
public class DeleteTaskRequest extends BaseRequest {

	private Integer id;

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getId() {
		return id;
	}

}
