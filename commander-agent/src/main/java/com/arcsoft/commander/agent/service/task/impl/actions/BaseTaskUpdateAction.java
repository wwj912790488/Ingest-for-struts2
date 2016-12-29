package com.arcsoft.commander.agent.service.task.impl.actions;

import com.arcsoft.commander.agent.service.task.impl.TaskExecuteAction;
import com.arcsoft.commander.domain.task.TaskChangedInfo;
import com.arcsoft.transcoder.ITranscodingTracker;
import com.arcsoft.web4transcoder.service.transcoder.DefaultTranscodingService;

/**
 * Base task update action.
 * 
 * @author fjli
 */
public abstract class BaseTaskUpdateAction extends TaskExecuteAction {

	protected DefaultTranscodingService transcodingService;
	protected TaskChangedInfo taskChangedInfo;

	/**
	 * Set the task changed info.
	 * 
	 * @param taskChangedInfo - the task changed info to set
	 */
	public void setTaskChangedInfo(TaskChangedInfo taskChangedInfo) {
		this.taskChangedInfo = taskChangedInfo;
	}

	/**
	 * Set transcoding service.
	 * 
	 * @param transcodingService - the transcoding service
	 */
	public void setTranscodingService(DefaultTranscodingService transcodingService) {
		this.transcodingService = transcodingService;
	}

	/**
	 * Get transcoding tracker for the task this action association to.
	 */
	protected ITranscodingTracker getTranscodingTracker() {
		return transcodingService.getTranscodingTracker(getTaskId());
	}

}
