package com.arcsoft.commander.dao.settings;

import java.util.List;

import com.arcsoft.commander.domain.settings.Switch;

public interface SwitchDao {
	
	List<Switch> getSwitchList(String serverId);	
	boolean save(String serverId, List<Switch> switchList);
}