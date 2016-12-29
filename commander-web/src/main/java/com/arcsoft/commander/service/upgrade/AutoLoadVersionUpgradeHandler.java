package com.arcsoft.commander.service.upgrade;

import java.util.Map;
import java.util.Map.Entry;

/**
 * Upgrade handler for version controlled objects, which will auto load upgrade handlers.
 * 
 * @author fjli
 */
public abstract class AutoLoadVersionUpgradeHandler extends VersionUpgradeHandler {

	private int newVersion = 0;
	private UpgradeHandlerLoader upgradeHandlerLoader;

	public void setUpgradeHandlerLoader(UpgradeHandlerLoader upgradeHandlerLoader) {
		this.upgradeHandlerLoader = upgradeHandlerLoader;
	}

	/**
	 * Start load handlers.
	 */
	public void loadHandlers() {
		Map<Integer, UpgradeHandler> map = upgradeHandlerLoader.loadHandlers();
		for (Entry<Integer, UpgradeHandler> entry : map.entrySet()) {
			if (entry.getKey() > newVersion) {
				newVersion = entry.getKey();
			}
			prepare(entry.getValue());
		}
		setHandlers(map);
	}

	@Override
	protected int getNewVersion() {
		return newVersion;
	}

	/**
	 * Prepare handler before upgrade.
	 * 
	 * @param handler - the upgrade handler
	 */
	protected void prepare(UpgradeHandler handler) {
	}

}
