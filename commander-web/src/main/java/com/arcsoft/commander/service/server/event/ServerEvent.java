package com.arcsoft.commander.service.server.event;

import com.arcsoft.commander.domain.server.Server;

/**
 * The server event.
 * 
 * @author fjli
 */
public abstract class ServerEvent extends ServerServiceEvent {

	private static final long serialVersionUID = 442301543768459907L;

	/**
	 * Construct new event instance.
	 * 
	 * @param server - the specified server
	 */
	public ServerEvent(Server server) {
		super(server);
	}

	/**
	 * Returns the server.
	 */
	public Server getServer() {
		return (Server) getSource();
	}

}
