package com.arcsoft.commander.action.server;

import com.arcsoft.commander.action.BaseAction;
import com.arcsoft.commander.service.server.ServerService;

/**
 * Base server action.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class BaseServerAction extends BaseAction {

	protected ServerService serverService;

	public void setServerService(ServerService serverService) {
		this.serverService = serverService;
	}

}
