package com.arcsoft.commander.service.server.event;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.domain.server.SwitchCause;

/**
 * This event will be delivered when a slave server take over a master server.
 * 
 * @author fjli
 */
public class ServerTakeOverEvent extends ServerGroupEvent {

	private static final long serialVersionUID = -7876681623400494923L;

	private Server oldServer;
	private Server newServer;
	private int cause;

	/**
	 * Construct new event instance.
	 * 
	 * @param oldServer - the old server
	 * @param newServer - the new server
	 */
	public ServerTakeOverEvent(ServerGroup group, Server oldServer, Server newServer) {
		super(group);
		this.oldServer = oldServer;
		this.newServer = newServer;
		this.cause = SwitchCause.MANUAL;
	}
	
	/**
	 * Construct new event instance.
	 * 
	 * @param oldServer - the old server
	 * @param newServer - the new server
	 */
	public ServerTakeOverEvent(ServerGroup group, Server oldServer, Server newServer, int cause) {
		super(group);
		this.oldServer = oldServer;
		this.newServer = newServer;
		this.cause = cause;
	}

	/**
	 * Returns the old server.
	 */
	public Server getOldServer() {
		return oldServer;
	}

	/**
	 * Return the new server.
	 */
	public Server getNewServer() {
		return newServer;
	}

	/**
	 * @return the switch cause
	 */
	public int getCause() {
		return cause;
	}
}
