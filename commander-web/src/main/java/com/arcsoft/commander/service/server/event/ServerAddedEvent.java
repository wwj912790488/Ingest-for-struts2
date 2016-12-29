package com.arcsoft.commander.service.server.event;

import java.util.List;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerGroup;

/**
 * This event will be delivered when some servers are added to group.
 * 
 * @author fjli
 */
public class ServerAddedEvent extends ServerGroupEvent {

	private static final long serialVersionUID = -315579974637112353L;

	/**
	 * Construct new event instance.
	 * 
	 * @param group - the group with added servers
	 */
	public ServerAddedEvent(ServerGroup group) {
		super(group);
	}

	/**
	 * Returns the added groups.
	 */
	public List<Server> getAddedServers() {
		return getGroup().getServers();
	}

}
