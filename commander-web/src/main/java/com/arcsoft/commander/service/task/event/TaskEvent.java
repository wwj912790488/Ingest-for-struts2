package com.arcsoft.commander.service.task.event;

import java.util.EventObject;

import com.arcsoft.web4transcoder.domain.Task;

/**
 * The base event for task service.
 * 
 * @author fjli
 */
public abstract class TaskEvent extends EventObject {

	private static final long serialVersionUID = -4907951999377673518L;

	/**
	 * Construct new event instance.
	 * 
	 * @param source - the event source object
	 */
	public TaskEvent(Task task) {
		super(task);
	}

	/**
	 * Returns the task.
	 */
	public Task getTask() {
		return (Task) getSource();
	}

}
