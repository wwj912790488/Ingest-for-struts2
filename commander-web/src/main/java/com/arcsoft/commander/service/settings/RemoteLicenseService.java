package com.arcsoft.commander.service.settings;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.settings.LicenseInfo;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.settings.InvalidLicenseException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;

/**
 * Service for agent license management.
 * 
 * @author fjli
 */
public interface RemoteLicenseService {

	/**
	 * Get the current license information from the specified agent.
	 * 
	 * @param agent - the specified agent
	 * @return the current license information of the specified agent.
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if service in not available.
	 * @throws RemoteException if execute request failed.
	 */
	LicenseInfo getLicenseInfo(Server agent);

	/**
	 * Update the license of the specified agent.
	 * 
	 * @param agent - the specified agent
	 * @param data - the new license data
	 * @throws InvalidLicenseException if the license is invalid.
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if service is not available.
	 * @throws RemoteException if execute request failed.
	 */
	void updateLicense(Server agent, byte[] data);

}
