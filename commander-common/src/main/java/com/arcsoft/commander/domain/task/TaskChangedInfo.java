package com.arcsoft.commander.domain.task;

/**
 * Task changed information.
 * 
 * @author fjli
 */
public class TaskChangedInfo {

	private Integer taskId;
	private Boolean allowProgramIdChanged;
	private Integer signalSwitchMode;
	private String taskXml;

	/**
	 * Get task id.
	 */
	public Integer getTaskId() {
		return taskId;
	}

	/**
	 * Set task id.
	 * 
	 * @param taskId - the task id
	 */
	public void setTaskId(Integer taskId) {
		this.taskId = taskId;
	}

	/**
	 * Return program id change is allowed or not.
	 */
	public Boolean getAllowProgramIdChanged() {
		return allowProgramIdChanged;
	}

	/**
	 * Set program id change is allowed or not.
	 * 
	 * @param allowProgramIdChanged - the allow changed flag
	 */
	public void setAllowProgramIdChanged(Boolean allowProgramIdChanged) {
		this.allowProgramIdChanged = allowProgramIdChanged;
	}

	/**
	 * Return the signal switch mode.
	 */
	public Integer getSignalSwitchMode() {
		return signalSwitchMode;
	}

	/**
	 * Set the signal switch mode.
	 * 
	 * @param signalSwitchMode - the mode to set
	 */
	public void setSignalSwitchMode(Integer signalSwitchMode) {
		this.signalSwitchMode = signalSwitchMode;
	}

	/**
	 * Get the new task xml.
	 */
	public String getTaskXml() {
		return taskXml;
	}

	/**
	 * Set the new task xml.
	 * 
	 * @param taskXml - the task xml
	 */
	public void setTaskXml(String taskXml) {
		this.taskXml = taskXml;
	}

}
