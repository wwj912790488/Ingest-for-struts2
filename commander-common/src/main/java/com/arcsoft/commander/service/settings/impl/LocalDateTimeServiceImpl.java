package com.arcsoft.commander.service.settings.impl;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import com.arcsoft.commander.dao.settings.TimeDao;
import com.arcsoft.commander.domain.settings.NTPStatus;
import com.arcsoft.commander.service.settings.LocalDateTimeService;
import com.arcsoft.commons.utils.app.ShellException;

/**
 * The implementation of LocalDateTimeService
 * 
 * @author xpeng
 */
public class LocalDateTimeServiceImpl implements LocalDateTimeService {

	private TimeDao timeDao;

	public void setTimeDao(TimeDao timeDao) {
		this.timeDao = timeDao;
	}

	@Override
	public List<String> listTimeZone(String main) throws ShellException, IOException {
		return timeDao.listTimeZone(main);
	}

	@Override
	public void setTimezone(String timezone) throws ShellException, IOException {
		timeDao.setTimezone(timezone);
	}

	@Override
	public void setSystemTime(Date date) throws ShellException, IOException {
		timeDao.setSystemTime(date);
	}

	@Override
	public void syncWithNTP(NTPStatus ntp) throws ShellException, IOException {
		timeDao.syncWithNTP(ntp);
	}

	@Override
	public String getTimezone() throws ShellException, IOException {
		return timeDao.getTimezone();
	}

	@Override
	public NTPStatus getNTPStatus() throws ShellException, IOException {
		return timeDao.getNTPStatus();
	}

}
