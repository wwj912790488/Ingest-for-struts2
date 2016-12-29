package com.arcsoft.commander.service.system;

/**
 * System context listener. This listener will be notified when system context
 * is initialized or destroyed.
 * 
 * @author fjli
 */
public interface SystemContextListener {

	/**
	 * Notify when system context initialized.
	 */
	void contextInit(SystemContext context);

	/**
	 * Notify when system context destroyed.
	 */
	void contextDestory(SystemContext context);

}
