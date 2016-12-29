package com.arcsoft.commander.agent.service.task.impl.handlers;

import org.apache.log4j.Logger;

import com.arcsoft.commander.agent.service.task.impl.TaskInfo;
import com.arcsoft.transcoder.ITranscodingTracker;

/**
 * Task Output setting handler.
 * 
 * @author fjli
 */
public class OutputSettingHandler extends BaseTaskExecuteHalder {

	private static final Logger LOG = Logger.getLogger(OutputSettingHandler.class);
	private boolean enableOutput;

	public OutputSettingHandler(boolean enableOutput) {
		this.enableOutput = enableOutput;
	}

	@Override
	public void doUpdateTask(TaskInfo info) {
		ITranscodingTracker tracker = transcodingService.getTranscodingTracker(info.getTaskId());
		if (tracker != null) {
			int ret = tracker.notifyStartOutput(enableOutput);
			LOG.info((enableOutput ? "enable" : "disable") + " task(id=" + info.getTaskId() + ") output, ret=" + ret);
		}
	}

}
