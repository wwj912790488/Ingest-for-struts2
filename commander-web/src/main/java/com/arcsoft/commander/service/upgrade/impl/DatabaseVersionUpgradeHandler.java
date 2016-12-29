package com.arcsoft.commander.service.upgrade.impl;

import com.arcsoft.arcvideo.common.utils.StringHelper;
import com.arcsoft.commander.dao.system.SystemDao;
import com.arcsoft.commander.dao.upgrade.UpgradeDao;
import com.arcsoft.commander.service.upgrade.AutoLoadVersionUpgradeHandler;
import com.arcsoft.commander.service.upgrade.UpgradeHandler;

/**
 * Database version upgrade handler.
 * 
 * @author fjli
 */
public class DatabaseVersionUpgradeHandler extends AutoLoadVersionUpgradeHandler {

	private SystemDao systemDao;
	private String versionKey;
	private UpgradeDao upgradeDao;

	public void setVersionKey(String versionKey) {
		this.versionKey = versionKey;
	}

	public void setSystemDao(SystemDao systemDao) {
		this.systemDao = systemDao;
	}

	public void setUpgradeDao(UpgradeDao upgradeDao) {
		this.upgradeDao = upgradeDao;
	}

	@Override
	protected int getOldVersion() {
		return StringHelper.toDefaultIfNull(systemDao.getInteger(versionKey), 0);
	}

	@Override
	protected void upgradeVersion() {
		systemDao.setInteger(versionKey, getNewVersion());
	}

	@Override
	protected void prepare(UpgradeHandler handler) {
		if (handler instanceof DatabaseUpgradeHandlerSupport) {
			DatabaseUpgradeHandlerSupport dbhandler = (DatabaseUpgradeHandlerSupport) handler;
			dbhandler.setUpgradeDao(upgradeDao);
		}
	}

}
