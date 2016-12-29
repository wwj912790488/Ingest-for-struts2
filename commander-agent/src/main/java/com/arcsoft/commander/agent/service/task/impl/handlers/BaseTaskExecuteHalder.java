package com.arcsoft.commander.agent.service.task.impl.handlers;

import com.arcsoft.commander.agent.service.task.impl.TaskExecuteHandler;
import com.arcsoft.web4transcoder.service.transcoder.DefaultTranscodingService;

/**
 * Base task setting handler.
 * 
 * @author fjli
 */
public abstract class BaseTaskExecuteHalder implements TaskExecuteHandler {

	protected DefaultTranscodingService transcodingService;

	/**
	 * Set transcoding service.
	 * 
	 * @param transcodingService - the transcoding service to set
	 */
	public void setTranscodingService(DefaultTranscodingService transcodingService) {
		this.transcodingService = transcodingService;
	}

}
