package com.arcsoft.commander.service.settings;

import java.io.IOException;
import java.net.UnknownHostException;
import java.util.List;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.settings.Switch;

public interface SwitchService {
	List<Switch> getSwitchList(String serverId);
	void saveSwitchList(String serverId, List<Switch> switchList);
	
	void up(Server server);
	void down(Server server);

	boolean up(Switch switchSetting) throws IOException, InterruptedException, UnknownHostException;
	boolean down(Switch switchSetting)  throws IOException, InterruptedException, UnknownHostException;
	boolean get(Switch switchSetting) throws IOException, InterruptedException, UnknownHostException;
}
