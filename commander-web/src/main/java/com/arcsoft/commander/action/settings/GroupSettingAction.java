package com.arcsoft.commander.action.settings;

import com.arcsoft.commander.action.BaseAction;
import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.service.server.ServerService;

/**
 * Base group settings action.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class GroupSettingAction extends BaseAction {

	protected ServerService serverService;
	protected ServerGroup group;

	/**
	 * Set the server service.
	 * 
	 * @param serverService
	 */
	public void setServerService(ServerService serverService) {
		this.serverService = serverService;
	}

	/**
	 * Returns the server group.
	 */
	public ServerGroup getGroup() {
		return group;
	}

	/**
	 * Set the server group.
	 * 
	 * @param group - the group to be set
	 */
	public void setGroup(ServerGroup group) {
		this.group = group;
	}

}
