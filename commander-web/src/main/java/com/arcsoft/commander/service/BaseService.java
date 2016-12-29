package com.arcsoft.commander.service;

import org.apache.log4j.Logger;

import com.arcsoft.arcvideo.spring.event.EventManager;
import com.arcsoft.commander.domain.system.SystemSettings;

/**
 * Base service. This class define some common methods or fields.
 * 
 * @author fjli
 */
public abstract class BaseService {

	/**
	 * Logger instance for current service.
	 */
	protected Logger LOG = Logger.getLogger(getClass());

	/**
	 * System settings.
	 */
	protected SystemSettings systemSettings;

	/**
	 * The event manager.
	 */
	private EventManager eventManager;

	/**
	 * Set system settings.
	 * 
	 * @param systemSettings - the system settings.
	 */
	public void setSystemSettings(SystemSettings systemSettings) {
		this.systemSettings = systemSettings;
	}

	/**
	 * Returns the eventManager
	 */
	public EventManager getEventManager() {
		return eventManager;
	}

	/**
	 * Set the event manager.
	 * 
	 * @param eventManager - the event manager
	 */
	public void setEventManager(EventManager eventManager) {
		this.eventManager = eventManager;
	}

}
