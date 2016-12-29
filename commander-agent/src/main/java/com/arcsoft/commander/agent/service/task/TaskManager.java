package com.arcsoft.commander.agent.service.task;

import java.util.Map;

/**
 * Task Manager.
 * 
 * @author fjli
 */
public interface TaskManager {

	/**
	 * Returns all tasks.
	 */
	Map<Integer, String> getTasks();

	/**
	 * Enable/disable task output.
	 * 
	 * @param enable - the flag to be set
	 */
	void enableOutput(boolean enable);

	/**
	 * Enable/disable notify task status to commander.
	 * 
	 * @param enable
	 */
	void enableNotifyStatus(boolean enable);

	/**
	 * Stop all tasks, all tasks will be removed.
	 */
	void stopAll();

	/**
	 * Notify task information to commander manually.
	 */
	void notifyTasksInfo();

	/**
	 * Enable/disable auto restart the specified task.
	 * 
	 * @param taskId - the task id
	 * @param enable - true: enabled, false: disabled
	 */
	void enableTaskAutoRestart(int taskId, boolean enable);

}
