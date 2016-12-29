package com.arcsoft.commander.service.upgrade;

import java.util.Map;

/**
 * Upgrade handler loader.
 * 
 * @author fjli
 */
public interface UpgradeHandlerLoader {

	/**
	 * Load upgrade handlers.
	 */
	Map<Integer, UpgradeHandler> loadHandlers();

}
