package com.arcsoft.commander.dao.settings.impl;

import java.io.StringWriter;

import org.apache.log4j.Logger;

import com.arcsoft.commander.dao.settings.HostDao;
import com.arcsoft.commons.utils.app.App;

/**
 * Implement SystemServiceImpl for centOS.
 * 
 * @author hxiang
 */
public class HostDaoImplRHEL implements HostDao {

	private Logger log = Logger.getLogger(getClass());

	public void reboot() {
		String cmd = "reboot";

		try {
			StringWriter sw = new StringWriter();
			App.syncExec(null, cmd, sw);
		} catch (Exception e) {
			log.error("execute command failed: " + cmd, e);
		}
	}

	public void shutdown() {
		String cmd = "shutdown -P 0";

		try {
			StringWriter sw = new StringWriter();
			App.syncExec(null, cmd, sw);
		} catch (Exception e) {
			log.error("execute command failed: " + cmd, e);
		}
	}

}
