package com.arcsoft.commander.service.server.event;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerGroup;

/**
 * The event will be delivered when the server role switch in 1+1 group.
 * 
 * @author fjli
 */
public class ServerRoleSwitchEvent extends ServerGroupEvent {

	private static final long serialVersionUID = -766739574302398070L;

	private Server master;
	private Server slave;

	/**
	 * Construct new event instance.
	 */
	public ServerRoleSwitchEvent(ServerGroup group) {
		super(group);

		if (group.getServers() != null) {
			for (Server server : group.getServers()) {
				if (server.isBackup()) {
					slave = server;
				} else {
					master = server;
				}
			}
		}
	}

	/**
	 * Returns the master server.
	 */
	public Server getMaster() {
		return master;
	}

	/**
	 * Return the slave server.
	 */
	public Server getSlave() {
		return slave;
	}

}
