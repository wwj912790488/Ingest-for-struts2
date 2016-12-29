package com.arcsoft.commander.service.server.event;

import com.arcsoft.commander.domain.server.Server;

/**
 * This event will be delivered when the server capabilities is changed.
 * 
 * @author fjli
 */
public class ServerCapabilitiesChangedEvent extends ServerEvent {

	private static final long serialVersionUID = 7885283364550151337L;

	/**
	 * Construct new event instance.
	 * 
	 * @param server - the server which the capabilities changed
	 */
	public ServerCapabilitiesChangedEvent(Server server) {
		super(server);
	}

}
