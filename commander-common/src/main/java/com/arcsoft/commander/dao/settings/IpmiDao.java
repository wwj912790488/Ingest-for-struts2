package com.arcsoft.commander.dao.settings;

import com.arcsoft.commander.domain.settings.IPMI;

public interface IpmiDao {
	
	IPMI get(String id);		
	boolean delete(String id);
	boolean update(IPMI ipmi);
}