package com.arcsoft.commander.service.server;

import com.arcsoft.commander.domain.server.Server;


/**
 * Fault services.
 * 
 * @author wtsun
 */
public interface FaultService {

	void faultProcess(Server server);
	boolean isFaultProcess(String serverId);
}
