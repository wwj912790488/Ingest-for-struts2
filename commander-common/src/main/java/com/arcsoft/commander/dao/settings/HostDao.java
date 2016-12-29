package com.arcsoft.commander.dao.settings;

/**
 * Service for system control.
 * 
 * @author hxiang
 */
public interface HostDao {
	public void reboot();
	public void shutdown();
}
