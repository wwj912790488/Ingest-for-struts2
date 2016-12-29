package com.arcsoft.commander.service.upgrade;

/**
 * Upgrade service.
 * 
 * <p>
 * This service may include upgrading database , updating the relation data, and updating some configurations.
 * 
 * @author fjli
 */
public interface UpgradeService {

	/**
	 * Upgrade.
	 */
	void upgrade();

}
