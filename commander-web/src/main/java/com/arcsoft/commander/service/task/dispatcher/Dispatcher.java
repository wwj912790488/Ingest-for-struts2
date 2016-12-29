package com.arcsoft.commander.service.task.dispatcher;

import com.arcsoft.commander.domain.task.TaskReceiver;
import com.arcsoft.commander.exception.task.DispatchException;
import com.arcsoft.web4transcoder.domain.Task;

/**
 * Task dispatcher.
 * 
 * @author fjli
 */
public interface Dispatcher {

	/**
	 * Dispatch task to the specified receiver.
	 * 
	 * @param task - the task to be dispatched
	 * @param receiver - the specified task receiver
	 */
	void dispatch(Task task, TaskReceiver receiver) throws DispatchException;

}
