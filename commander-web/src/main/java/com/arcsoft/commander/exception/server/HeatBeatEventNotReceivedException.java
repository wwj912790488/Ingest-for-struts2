package com.arcsoft.commander.exception.server;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.exception.ApplicationException;

/**
 * This exception will be raised if the heat beat event is not received after start heart beat session.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class HeatBeatEventNotReceivedException extends ApplicationException {

	private Server server;

	/**
	 * Construct a HeatBeatEventNotReceivedException.
	 * 
	 * @param server - the cause server.
	 */
	public HeatBeatEventNotReceivedException(Server server) {
		this.server = server;
	}

	/**
	 * Returns the cause server.
	 */
	public Server getServer() {
		return server;
	}

}
