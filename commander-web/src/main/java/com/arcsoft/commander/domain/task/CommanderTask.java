package com.arcsoft.commander.domain.task;

import com.arcsoft.web4transcoder.domain.Task;

public class CommanderTask extends Task {

	private static final long serialVersionUID = 6490775529428168117L;

	private Integer type;
	private Integer groupId;
	private String curServerId;

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public Integer getGroupId() {
		return groupId;
	}

	public void setGroupId(Integer groupId) {
		this.groupId = groupId;
	}

	public String getCurServerId() {
		return curServerId;
	}

	public void setCurServerId(String curServerId) {
		this.curServerId = curServerId;
	}

}
