package com.arcsoft.commander.service.server.event;

import com.arcsoft.commander.domain.server.Server;

/**
 * This event will be delivered when the server state is changed.
 * 
 * @author fjli
 */
public class ServerStateChangedEvent extends ServerEvent {

	private static final long serialVersionUID = -4955593401103799039L;

	/**
	 * Construct new event instance.
	 * 
	 * @param server - the server who's state is changed
	 */
	public ServerStateChangedEvent(Server server) {
		super(server);
	}

}
