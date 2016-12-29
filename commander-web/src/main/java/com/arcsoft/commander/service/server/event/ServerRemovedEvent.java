package com.arcsoft.commander.service.server.event;

import java.util.List;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerGroup;

/**
 * This event will be delivered when some servers are removed from group.
 * 
 * @author fjli
 */
public class ServerRemovedEvent extends ServerGroupEvent {

	private static final long serialVersionUID = -315579974637112353L;

	/**
	 * Construct new event instance.
	 * 
	 * @param group - the specified group with removed servers
	 */
	public ServerRemovedEvent(ServerGroup group) {
		super(group);
	}

	/**
	 * Returns the removed servers.
	 */
	public List<Server> getRemovedServers() {
		return getGroup().getServers();
	}

}
