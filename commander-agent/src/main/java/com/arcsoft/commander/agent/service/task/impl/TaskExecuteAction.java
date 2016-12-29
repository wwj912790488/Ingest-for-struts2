package com.arcsoft.commander.agent.service.task.impl;

/**
 * Task update action.
 * 
 * @author fjli
 */
public abstract class TaskExecuteAction {

	private TaskInfo taskInfo;

	/**
	 * Get the task info.
	 */
	public TaskInfo getTaskInfo() {
		return taskInfo;
	}

	/**
	 * Set the task info.
	 * 
	 * @param taskInfo - the task info
	 */
	public void setTaskInfo(TaskInfo taskInfo) {
		this.taskInfo = taskInfo;
	}

	/**
	 * Get the task id of this action.
	 * 
	 * @return
	 */
	public Integer getTaskId() {
		return taskInfo.getTaskId();
	}

	/**
	 * Execute this action.
	 */
	public abstract void execute();

}
