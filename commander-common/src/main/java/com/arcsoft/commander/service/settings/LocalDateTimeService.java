package com.arcsoft.commander.service.settings;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import com.arcsoft.commander.domain.settings.NTPStatus;
import com.arcsoft.commons.utils.app.ShellException;

/**
 * Service for date and time setting
 * 
 * @author xpeng
 *
 */
public interface LocalDateTimeService {
	/**
	 * List all sub timezones in specific main timezone. eg. Shanghai etc.
	 * 
	 * @param main
	 *            the main timezone, eg. Asia
	 * @return
	 * @throws ShellException
	 * @throws IOException
	 */
	List<String> listTimeZone(String main) throws ShellException, IOException;

	/**
	 * Set the system's timezone
	 * 
	 * @param timezone
	 *            eg. Asia/Shanghai
	 * @throws ShellException
	 *             if shell run error in linux os.
	 * @throws IOException
	 *             if I/O operation run error
	 */
	void setTimezone(String timezone) throws ShellException, IOException;

	/**
	 * Get the system's timezone
	 * 
	 * @return the timezone 
	 * @throws ShellException
	 *             if shell run error in linux os.
	 * @throws IOException
	 *             if I/O operation run error
	 */
	String getTimezone() throws ShellException, IOException;

	/**
	 * Set the system's time
	 * 
	 * @param date
	 *            the date and time to set
	 * @throws ShellException
	 *             if shell run error in linux os.
	 * @throws IOException
	 *             if I/O operation run error
	 */
	void setSystemTime(Date date) throws ShellException, IOException;

	/**
	 * Sync with ntp server
	 * 
	 * @param ntp
	 *            the ntp status
	 * @throws ShellException
	 *             if shell run error in linux os.
	 * @throws IOException
	 *             if I/O operation run error
	 */
	void syncWithNTP(NTPStatus ntp) throws ShellException, IOException;
	
	/**
	 * Get the ntp service status
	 * 
	 * @return the ntp service status
	 * @throws ShellException
	 *             if shell run error in linux os.
	 * @throws IOException
	 *             if I/O operation run error
	 */
	NTPStatus getNTPStatus() throws ShellException, IOException;	
	
}
