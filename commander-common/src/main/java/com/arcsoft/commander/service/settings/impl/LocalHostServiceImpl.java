package com.arcsoft.commander.service.settings.impl;

import com.arcsoft.commander.dao.settings.HostDao;
import com.arcsoft.commander.service.settings.LocalHostService;

/**
 * The implementation of LocalHostService
 * 
 * @author hxiang
 */
public class LocalHostServiceImpl implements LocalHostService {

	private HostDao hostDao;

	public void setHostDao(HostDao hostDao) {
		this.hostDao = hostDao;
	}

	@Override
	public void reboot() throws Exception {
		hostDao.reboot();
	}

	@Override
	public void shutdown() throws Exception {
		hostDao.shutdown();
	}

}
