package com.arcsoft.commander.service.settings;

/**
 * Service for host setting
 * 
 * @author hxiang
 */
public interface LocalHostService {

	void reboot() throws Exception;

	void shutdown() throws Exception;

}
