package com.arcsoft.commander.cluster.action.task;


import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseRequest;
import com.arcsoft.commander.domain.task.TaskState;

/**
 * Notify commander that the specified task state changes.
 * 
 * @author fjli
 */
@XmlRootElement
public class StateChangeRequest extends BaseRequest {
	
	private List<TaskState> states;
	
	/**Indicate current master server id*/
	private String serverId;
	
	public String getServerId() {
		return serverId;
	}
	
	public void setServerId(String serverId) {
		this.serverId = serverId;
	}

	public List<TaskState> getStates() {
		return states;
	}
	
	public void setStates(List<TaskState> states) {
		this.states = states;
	}
	
	public void add(TaskState state){
		if(this.states == null){
			this.states = new ArrayList<>();
		}
		this.states.add(state);
	}
	

}
