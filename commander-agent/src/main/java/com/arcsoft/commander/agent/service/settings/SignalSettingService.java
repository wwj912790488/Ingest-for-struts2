package com.arcsoft.commander.agent.service.settings;

import java.util.List;

import org.apache.log4j.Logger;

import com.arcsoft.cluster.app.ActionException;
import com.arcsoft.cluster.app.Request;
import com.arcsoft.cluster.app.Response;
import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.ActionHandler;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.task.UpdateSignalSettingRequest;
import com.arcsoft.commander.cluster.action.task.UpdateSignalSettingResponse;
import com.arcsoft.web4transcoder.domain.input.SignalItem;
import com.arcsoft.web4transcoder.domain.input.SourceSwitchCondition;
import com.arcsoft.web4transcoder.service.SourceSignalSettingsService;

/**
 * Signal setting service.
 * 
 * @author fjli
 */
public class SignalSettingService implements SourceSignalSettingsService, ActionHandler {

	private Logger log = Logger.getLogger(SignalSettingService.class);
	private List<SignalItem> signalItems;
	private List<SignalSettingChangedListener> listeners;

	public void setListeners(List<SignalSettingChangedListener> listeners) {
		this.listeners = listeners;
	}

	@Override
	public int[] getActions() {
		return new int[] { Actions.UPDATE_SIGNAL_SETTINGS };
	}

	@Override
	public Response execute(Request request) throws ActionException {
		if (request instanceof UpdateSignalSettingRequest) {
			return updateSignalSettings((UpdateSignalSettingRequest) request);
		}
		return null;
	}

	@Override
	public void saveSettings(SourceSwitchCondition condition) {
		throw new UnsupportedOperationException();
	}

	@Override
	public SourceSwitchCondition getSettings() {
		SourceSwitchCondition condition = new SourceSwitchCondition();
		condition.setSignalItems(signalItems);
		return condition;
	}

	private UpdateSignalSettingResponse updateSignalSettings(UpdateSignalSettingRequest request) {
		log.info("update signal settings.");
		this.signalItems = request.getSignalItems();
		if (listeners != null) {
			for (SignalSettingChangedListener listener : listeners) {
				listener.onSignalSettingChanged(signalItems);
			}
		}
		UpdateSignalSettingResponse response = new UpdateSignalSettingResponse();
		response.setErrorCode(ActionErrorCode.SUCCESS);
		return response;
	}

}
