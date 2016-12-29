package com.arcsoft.commander.service.task.event;

import com.arcsoft.web4transcoder.domain.Task;

/**
 * This event will be delivered when task is deleted.
 * 
 * @author fjli
 */
public class TaskDeletedEvent extends TaskEvent {

	private static final long serialVersionUID = 6466020156195699395L;

	/**
	 * Construct new event instance.
	 * 
	 * @param task - the task
	 */
	public TaskDeletedEvent(Task task) {
		super(task);
	}

}
