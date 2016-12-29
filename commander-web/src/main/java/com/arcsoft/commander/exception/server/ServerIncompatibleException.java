package com.arcsoft.commander.exception.server;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.exception.ApplicationException;

/**
 * This is exception will be thrown when the agent server is incompatible.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class ServerIncompatibleException extends ApplicationException {

	private Server server;

	/**
	 * Construct new exception.
	 * 
	 * @param server - the cause server.
	 */
	public ServerIncompatibleException(Server server) {
		this.server = server;
	}

	/**
	 * Returns the cause server.
	 */
	public Server getServer() {
		return server;
	}

}
