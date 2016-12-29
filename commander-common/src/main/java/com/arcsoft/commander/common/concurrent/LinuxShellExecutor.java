package com.arcsoft.commander.common.concurrent;

import org.apache.log4j.Logger;

/**
 * Linux shell executor.
 * 
 * @author fjli
 */
public class LinuxShellExecutor implements Runnable {

	private Logger log = Logger.getLogger(getClass());
	private String command;

	public void setCommand(String command) {
		this.command = command;
	}

	@Override
	public void run() {
		try {
			String[] cmd = new String[] { "/bin/sh", "-c", command };
			Runtime.getRuntime().exec(cmd);
		} catch (Throwable t) {
			log.debug("execute command failed: " + command);
		}
	}

}
