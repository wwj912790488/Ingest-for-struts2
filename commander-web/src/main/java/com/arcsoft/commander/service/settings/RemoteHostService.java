package com.arcsoft.commander.service.settings;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;

/**
 * Service for remote host setting
 * 
 * @author hxiang
 */
public interface RemoteHostService {

	/**
	 * Reboot the specified agent.
	 * 
	 * @param agent - the specified agent.
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if service in not available.
	 * @throws RemoteException if execute request failed.
	 */
	void reboot(Server agent);

	/**
	 * Shutdown the specified agent.
	 * 
	 * @param agent - the specified agent.
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if service in not available.
	 * @throws RemoteException if execute request failed.
	 */
	void shutdown(Server agent);

}
