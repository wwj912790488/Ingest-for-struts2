package com.arcsoft.commander.service.settings;

import java.util.List;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;
import com.arcsoft.web4transcoder.domain.input.SignalItem;


/**
 * Remote signal setting service.
 * 
 * @author fjli
 */
public interface RemoteSignalSettingService {

	/**
	 * Update signal items to the agent.
	 * 
	 * @param agent - the specified agent
	 * @param items - the signal items
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if service in not available.
	 * @throws RemoteException if execute request failed.
	 */
	void updateSignalSettings(Server agent, List<SignalItem> items);

}
