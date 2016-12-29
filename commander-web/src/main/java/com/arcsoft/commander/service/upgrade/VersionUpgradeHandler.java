package com.arcsoft.commander.service.upgrade;

import java.util.Map;

import org.apache.log4j.Logger;

/**
 * Upgrade handler for version controlled objects.
 * 
 * @author fjli
 */
public abstract class VersionUpgradeHandler implements UpgradeHandler {

	private Map<Integer, UpgradeHandler> handlers;
	private Logger log = Logger.getLogger(getClass());

	public void setHandlers(Map<Integer, UpgradeHandler> handlers) {
		this.handlers = handlers;
	}

	/**
	 * Get the version before upgrade.
	 */
	protected abstract int getOldVersion();

	/**
	 * Get the new version after upgrade.
	 */
	protected abstract int getNewVersion();

	/**
	 * Upgrade the version to the new version.
	 */
	protected abstract void upgradeVersion();

	@Override
	public void upgrade() {
		int oldVersion = getOldVersion();
		int newVersion = getNewVersion();
		try {
			if (oldVersion < newVersion) {
				log.info("upgrade version from " + oldVersion + " to "  + newVersion);
				for (int i = oldVersion + 1; i <= newVersion; i++) {
					UpgradeHandler handler = handlers.get(i);
					if (handler != null) {
						log.info("start update version from " + (i - 1) + " to " + i);
						handler.upgrade();
						log.info("end update version from " + (i - 1) + " to " + i);
					} else if (oldVersion != 0) {
						throw new RuntimeException("cannot find the upgrade handler for version " + i);
					}
				}
				upgradeVersion();
				log.info("upgrade version done.");
			}
		} catch (Exception e) {
			log.error("execute upgrade failed.", e);
		}
	}

}
