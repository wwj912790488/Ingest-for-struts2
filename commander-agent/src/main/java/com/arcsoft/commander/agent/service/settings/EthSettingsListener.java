package com.arcsoft.commander.agent.service.settings;


/**
 * Notify when Ethernet settings changed.
 * 
 * @author fjli
 */
public interface EthSettingsListener {

	/**
	 * Notify when settings changed.
	 * 
	 * @param settings - the network settings.
	 */
	void ethSettingsChanged(NetworkConfiguration settings);

}
