package com.arcsoft.commander.service.task.event;

import com.arcsoft.web4transcoder.domain.Task;

/**
 * This event will be delivered when task is modified.
 * 
 * @author fjli
 */
public class TaskModifiedEvent extends TaskEvent {

	private static final long serialVersionUID = 6803585395240726001L;

	/**
	 * Construct new event instance.
	 * 
	 * @param task - the task
	 */
	public TaskModifiedEvent(Task task) {
		super(task);
	}

}
