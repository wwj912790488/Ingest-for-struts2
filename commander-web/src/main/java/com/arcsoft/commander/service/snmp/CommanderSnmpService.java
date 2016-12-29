package com.arcsoft.commander.service.snmp;

/**
 * Commander SNMP service
 * 
 * @author fjli
 */
public interface CommanderSnmpService {

	/**
	 * Send trap message.
	 * 
	 * @param message - the trap message to send
	 */
	void sendTrapMessage(String message);

}
