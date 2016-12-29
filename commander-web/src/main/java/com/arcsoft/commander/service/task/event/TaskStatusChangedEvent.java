package com.arcsoft.commander.service.task.event;

import com.arcsoft.web4transcoder.domain.Task;
import com.arcsoft.web4transcoder.type.TaskStatus;

/**
 * This event will be delivered when task's status is changed.
 * 
 * @author fjli
 */
public class TaskStatusChangedEvent extends TaskEvent {

	private static final long serialVersionUID = 7875404341792529603L;

	/**
	 * Construct new event instance.
	 * 
	 * @param task - the task
	 */
	public TaskStatusChangedEvent(Task task) {
		super(task);
	}

	/**
	 * Returns the task new status.
	 */
	public TaskStatus getStatus() {
		return getTask().getStatus();
	}

}
