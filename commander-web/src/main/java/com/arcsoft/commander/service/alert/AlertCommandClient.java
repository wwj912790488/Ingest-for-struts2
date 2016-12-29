package com.arcsoft.commander.service.alert;

import com.arcsoft.commander.domain.alert.AlertData;

/**
 * Send system alert data.
 * 
 * @author fjli
 */
public interface AlertCommandClient {

	/**
	 * Send data to mail server.
	 * 
	 * @param data - the data to send
	 */
	void send(AlertData data);

}
