package com.arcsoft.commander.action.settings;

/**
 * Action for showing the group settings page.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class GroupSettingPageAction extends GroupSettingAction {

	@Override
	public String execute() {
		group = serverService.getGroup(group.getId(), false);
		if (group == null) {
			addActionError(getText("server.group.err.not.exists"));
			return ERROR;
		}
		return SUCCESS;
	}

}
