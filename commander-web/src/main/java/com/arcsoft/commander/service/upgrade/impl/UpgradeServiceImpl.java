package com.arcsoft.commander.service.upgrade.impl;

import java.util.List;

import org.apache.log4j.Logger;

import com.arcsoft.commander.service.upgrade.UpgradeHandler;
import com.arcsoft.commander.service.upgrade.UpgradeService;

/**
 * Upgrade service implementation.
 * 
 * @author fjli
 */
public class UpgradeServiceImpl implements UpgradeService {

	public static final String DB_VERSION = "db.version";
	private Logger log = Logger.getLogger(getClass());
	private List<UpgradeHandler> handlers;

	public void setHandlers(List<UpgradeHandler> handlers) {
		this.handlers = handlers;
	}

	@Override
	public void upgrade() {
		log.info("start software upgrade.");
		for (UpgradeHandler handler : handlers)
			handler.upgrade();
		log.info("software upgrade finished.");
	}

}
