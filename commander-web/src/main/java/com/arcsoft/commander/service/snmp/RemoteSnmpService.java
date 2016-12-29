package com.arcsoft.commander.service.snmp;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;
import com.arcsoft.transcoder.snmp.SnmpSetting;

/**
 * This service is used to get/set the SNMP settings of the agent.
 * 
 * @author fjli
 */
public interface RemoteSnmpService {

	/**
	 * Get the SNMP settings of the specified agent.
	 * 
	 * @param agent - the specific agent
	 * @return the SNMP settings.
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if the server is not available.
	 * @throws RemoteException if the server cannot get the settings.
	 */
	SnmpSetting getSetting(Server agent);

	/**
	 * Set SNMP settings of the specific agent.
	 * 
	 * @param agent - the specific agent
	 * @param settings - the SNMP settings
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if the server is not available.
	 * @throws RemoteException if the server cannot save the SNMP settings.
	 */
	void setSetting(Server agent, SnmpSetting settings);

}
