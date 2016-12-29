package com.arcsoft.commander.exception.server;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.exception.ApplicationException;

/**
 * This is exception will be thrown when the agent server is not available.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class ServerNotAvailableException extends ApplicationException {

	private Server server;

	/**
	 * Construct new exception.
	 * 
	 * @param server - the cause server.
	 */
	public ServerNotAvailableException(Server server) {
		this.server = server;
	}

	/**
	 * Returns the cause server.
	 */
	public Server getServer() {
		return server;
	}

}
