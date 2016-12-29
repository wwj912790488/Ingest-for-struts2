package com.arcsoft.commander.service.settings;

import java.util.Date;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.settings.NTPStatus;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;

/**
 * This service is used to set the date/time of the agent.
 *  
 * @author xpeng
 */
public interface RemoteDateTimeService {

	/**
	 * Set date and time of the specific agent.
	 * 
	 * @param agent - the specific agent
	 * @param date - the date and time
	 * @param ntp - the NTP status
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if the server is not available.
	 * @throws RemoteException if the server cannot update time.
	 */
	void setDateTime(Server agent, Date date, NTPStatus ntp);

	/**
	 * Set time zone of the specific agent.
	 * 
	 * @param agent - the specific agent
	 * @param timezone - the time zone, e.g. Asia/ShangHai
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if the server is not available.
	 * @throws RemoteException if the server cannot set time zone
	 */
	void setTimeZone(Server agent, String timezone);

	/**
	 * Get the system's time zone.
	 * 
	 * @param agent - the specific agent
	 * @return the time zone.
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if the server is not available.
	 * @throws RemoteException if the server cannot get time zone.
	 */
	String getTimezone(Server agent);

	/**
	 * Get the system's NTP service status.
	 * 
	 * @param agent - the specific agent
	 * @return the NTP service status.
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if the server is not available.
	 * @throws RemoteException if the server cannot get the status.
	 */
	NTPStatus getNTPStatus(Server agent);

}
