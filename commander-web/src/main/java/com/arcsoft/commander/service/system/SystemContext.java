package com.arcsoft.commander.service.system;

/**
 * System context.
 * 
 * @author fjli
 */
public interface SystemContext {

	/**
	 * Returns the HA is enabled or not.
	 */
	boolean isHAEnabled();

	/**
	 * Returns the role of the commander.
	 */
	int getRole();

}
