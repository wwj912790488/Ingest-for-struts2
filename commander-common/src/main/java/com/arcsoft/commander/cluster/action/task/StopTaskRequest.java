package com.arcsoft.commander.cluster.action.task;

import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseRequest;

/**
 * Request the specified server to stop the specified task.
 * 
 * @author fjli
 */
@XmlRootElement
public class StopTaskRequest extends BaseRequest {

	private List<Integer> ids;
	private Boolean stopAll;

	public List<Integer> getIds() {
		return ids;
	}

	public void setIds(List<Integer> ids) {
		this.ids = ids;
	}

	public Boolean getStopAll() {
		return stopAll;
	}

	public void setStopAll(Boolean stopAll) {
		this.stopAll = stopAll;
	}

}
