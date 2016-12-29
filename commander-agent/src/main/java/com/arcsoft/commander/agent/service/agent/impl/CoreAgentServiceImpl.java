package com.arcsoft.commander.agent.service.agent.impl;

import java.io.IOException;

import com.arcsoft.commander.agent.service.agent.AgentServer;
import com.arcsoft.commander.agent.service.agent.CoreAgent;
import com.arcsoft.commander.agent.service.agent.CoreAgentConfiguration;

/**
 * Core agent service.
 * 
 * @author fjli
 */
public class CoreAgentServiceImpl extends BaseAgentService {

	@Override
	protected AgentServer createAgent() throws IOException {
		CoreAgentConfiguration config = new CoreAgentConfiguration();
		loadAgentConfig(config);
		return new CoreAgent(config);
	}

	@Override
	protected void onAddToCommander(boolean isFirstAdd) {
		super.onAddToCommander(isFirstAdd);
		if (!isFirstAdd)
			taskManager.notifyTasksInfo();
	}

	protected void onRemoveFromCommander() {
		taskManager.stopAll();
		super.onRemoveFromCommander();
	}

	@Override
	protected void processNetworkError(boolean inputError, boolean outputError, boolean haError) {
		if (inputError || outputError) {
			noitfyStopAllTasksAsync();
		}
	}

}
