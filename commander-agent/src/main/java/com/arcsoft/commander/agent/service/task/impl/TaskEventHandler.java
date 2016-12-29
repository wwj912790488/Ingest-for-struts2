package com.arcsoft.commander.agent.service.task.impl;

import java.util.List;

/**
 * Task event handler.
 * 
 * @author fjli
 */
public interface TaskEventHandler {

	/**
	 * Get the event codes for this handler.
	 */
	List<Integer> getEventCodes();

	/**
	 * Process task event.
	 * 
	 * @param info - the task info
	 * @param code - the event code
	 * @param message - the event message
	 */
	void processTaskEvent(TaskInfo info, int code, String message);

}
