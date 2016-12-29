package com.arcsoft.commander.action.server;

import java.util.Map;
import java.util.TreeMap;

import org.springframework.security.access.prepost.PreAuthorize;

import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.service.license.CommanderLicenseService;

/**
 * Add servers to group support.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public abstract class AddServerSupport extends BaseServerAction {

	protected ServerGroup group;

	public ServerGroup getGroup() {
		return group;
	}

	public void setGroup(ServerGroup group) {
		this.group = group;
	}

	public Map<Integer, String> getGroupTypes() {
		Map<Integer, String> map = new TreeMap<Integer, String>();
		if (isLicenseEnabled(CommanderLicenseService.LIVE_GROUP_M_N))
			map.put(ServerGroup.TYPE_DEFAULT, "M+N");
		if (isLicenseEnabled(CommanderLicenseService.LIVE_GROUP_1_1))
			map.put(ServerGroup.TYPE_LIVE, "1+1");
		return map;
	}

	public boolean isEditMode() {
		return false;
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String execute() {
		return SUCCESS;
	}

}
