package com.arcsoft.commander.exception.server;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.exception.ApplicationException;

/**
 * This is exception will be thrown when delete a server which is busy.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class ServerBusyException extends ApplicationException {

	private Server server;

	/**
	 * Construct a ServerBusyException.
	 * 
	 * @param server - the cause server.
	 */
	public ServerBusyException(Server server) {
		this.server = server;
	}

	/**
	 * Returns the cause server.
	 */
	public Server getServer() {
		return server;
	}

}
