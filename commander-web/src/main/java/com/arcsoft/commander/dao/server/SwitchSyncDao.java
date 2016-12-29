package com.arcsoft.commander.dao.server;

import com.arcsoft.commander.domain.server.SwitchSync;

public interface SwitchSyncDao {
	void add(SwitchSync switchSync);
	void del(SwitchSync switchSync);
	boolean isExists(String serverId);
}