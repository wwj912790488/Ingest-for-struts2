package com.arcsoft.commander.service.settings.impl;

import java.util.List;

import com.arcsoft.arcvideo.spring.event.EventReceiver;
import com.arcsoft.commander.cluster.action.task.UpdateSignalSettingRequest;
import com.arcsoft.commander.cluster.action.task.UpdateSignalSettingResponse;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.service.remote.RemoteExecutorServiceSupport;
import com.arcsoft.commander.service.server.event.ServerStateChangedEvent;
import com.arcsoft.commander.service.settings.RemoteSignalSettingService;
import com.arcsoft.web4transcoder.domain.input.SignalItem;
import com.arcsoft.web4transcoder.domain.input.SourceSwitchCondition;
import com.arcsoft.web4transcoder.service.SourceSignalSettingsService;

/**
 * The implementation of signal setting for the specific agent.
 * 
 * @author fjli
 */
public class RemoteSignalSettingServiceImpl extends RemoteExecutorServiceSupport implements RemoteSignalSettingService {

	private SourceSignalSettingsService sourceSignalSettingsService;

	public void setSourceSignalSettingsService(SourceSignalSettingsService sourceSignalSettingsService) {
		this.sourceSignalSettingsService = sourceSignalSettingsService;
	}

	@Override
	public void updateSignalSettings(Server agent, List<SignalItem> items) {
		LOG.info("update signal settings to agent " + agent.getIp());
		UpdateSignalSettingRequest request = new UpdateSignalSettingRequest();
		request.setSignalItems(items);
		UpdateSignalSettingResponse response = (UpdateSignalSettingResponse) remoteExecute(request, agent);
		if (!response.isSuccess())
			throw new RemoteException(agent);
	}

	@EventReceiver(value = ServerStateChangedEvent.class)
	public void onServerStateChanged(ServerStateChangedEvent event) {
		Server server = event.getServer();
		if (server.isAlive()) {
			SourceSwitchCondition condition = sourceSignalSettingsService.getSettings();
			if (condition != null) {
				updateSignalSettings(server, condition.getSignalItems());
			}
		}
	}

}
