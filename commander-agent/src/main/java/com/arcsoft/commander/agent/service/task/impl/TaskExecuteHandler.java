package com.arcsoft.commander.agent.service.task.impl;

/**
 * Update action handler.
 * 
 * @author fjli
 */
public interface TaskExecuteHandler {

	/**
	 * Update some settings for the specified task.
	 * 
	 * @param info - the task info
	 */
	void doUpdateTask(TaskInfo info);

}
