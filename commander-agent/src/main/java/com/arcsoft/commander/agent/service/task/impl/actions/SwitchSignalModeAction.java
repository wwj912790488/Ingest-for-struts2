package com.arcsoft.commander.agent.service.task.impl.actions;

import org.apache.log4j.Logger;

/**
 * Switch signal mode action.
 * 
 * @author fjli
 */
public class SwitchSignalModeAction extends BaseTaskUpdateAction {

	private final static Logger LOG = Logger.getLogger(SwitchSignalModeAction.class);

	@Override
	public void execute() {
		transcodingService.switchSignalMode(getTaskId(), taskChangedInfo.getSignalSwitchMode());
		LOG.error("set task(id=" + getTaskId() + ") signal switch mode to " + taskChangedInfo.getSignalSwitchMode());
	}

}
