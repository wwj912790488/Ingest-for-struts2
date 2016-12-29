package com.arcsoft.commander.agent.service.settings;

import java.io.IOException;

/**
 * Network config service.
 * 
 * @author fjli
 */
public interface NetworkConfigService {

	/**
	 * Read the network configuration.
	 * 
	 * @throws IOException if read failed.
	 */
	NetworkConfiguration readConfig() throws IOException;

}
