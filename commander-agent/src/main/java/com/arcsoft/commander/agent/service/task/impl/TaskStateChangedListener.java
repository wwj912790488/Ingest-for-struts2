package com.arcsoft.commander.agent.service.task.impl;

import com.arcsoft.web4transcoder.type.TaskStatus;

/**
 * Task state changed listener.
 * 
 * @author fjli
 */
public interface TaskStateChangedListener {

	/**
	 * Notify event when task state changed.
	 * 
	 * @param task - the task
	 * @param oldState - the old state
	 * @param newState - the new state
	 */
	void onTaskStateChanged(TaskInfo task, TaskStatus oldState, TaskStatus newState);

}
