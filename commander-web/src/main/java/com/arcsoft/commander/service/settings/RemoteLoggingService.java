package com.arcsoft.commander.service.settings;

import com.arcsoft.arcvideo.logging.conf.LoggingSetting;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;

/**
 * Service for agent license management.
 * 
 * @author fjli
 */
public interface RemoteLoggingService {

	/**
	 * Get the logging setting in the specified agent.
	 * 
	 * @param agent - the specified agent
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if service is not available.
	 * @throws RemoteException if execute request failed.
	 * @return the logging setting in the specified agent.
	 */
	LoggingSetting getLoggingSetting(Server agent);

	/**
	 * Update the logging setting in the specified agent.
	 * 
	 * @param agent - the specified agent
	 * @param setting - the logging setting
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if service is not available.
	 * @throws RemoteException if execute request failed.
	 */
	void updateLoggingSetting(Server agent, LoggingSetting setting);

	/**
	 * Update the ASLog setting of the specified agent.
	 * 
	 * @param agent - the specified agent
	 * @param data - the new license data
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if service is not available.
	 * @throws RemoteException if execute request failed.
	 */
	void updateASLog(Server agent, String data);

}
