package com.arcsoft.commander.cluster.action;

import com.arcsoft.cluster.app.RequestHandler;

/**
 * Process the specified actions.
 * 
 * @author fjli
 */
public interface ActionHandler extends RequestHandler {

	/**
	 * Returns all supported actions.
	 */
	int[] getActions();

}
