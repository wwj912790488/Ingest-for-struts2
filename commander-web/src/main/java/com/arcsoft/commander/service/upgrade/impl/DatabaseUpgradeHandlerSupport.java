package com.arcsoft.commander.service.upgrade.impl;

import org.apache.log4j.Logger;

import com.arcsoft.commander.dao.upgrade.UpgradeDao;
import com.arcsoft.commander.service.upgrade.UpgradeHandler;

/**
 * Database upgrade handler support.
 * 
 * @author fjli
 */
public abstract class DatabaseUpgradeHandlerSupport implements UpgradeHandler {

	protected Logger log = Logger.getLogger(getClass());
	protected UpgradeDao upgradeDao;

	public void setUpgradeDao(UpgradeDao upgradeDao) {
		this.upgradeDao = upgradeDao;
	}

}
