package com.arcsoft.commander.service.task.event;

import com.arcsoft.web4transcoder.domain.Task;

/**
 * This event will be delivered when task is created.
 * 
 * @author fjli
 */
public class TaskCreatedEvent extends TaskEvent {

	private static final long serialVersionUID = 7875404341792529603L;

	/**
	 * Construct new event instance.
	 * 
	 * @param task - the task
	 */
	public TaskCreatedEvent(Task task) {
		super(task);
	}

}
