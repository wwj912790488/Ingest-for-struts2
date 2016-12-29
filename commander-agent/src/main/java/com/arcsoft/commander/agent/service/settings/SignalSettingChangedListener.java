package com.arcsoft.commander.agent.service.settings;

import java.util.List;

import com.arcsoft.web4transcoder.domain.input.SignalItem;

/**
 * Signal settings
 * 
 * @author fjli
 */
public interface SignalSettingChangedListener {

	/**
	 * Notify on signal setting changed.
	 * 
	 * @param signalItems - the signal items
	 */
	void onSignalSettingChanged(List<SignalItem> signalItems);

}
