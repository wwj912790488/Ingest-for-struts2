package com.arcsoft.commander.action.settings;

import org.springframework.security.access.prepost.PreAuthorize;

import com.arcsoft.commander.action.BaseAction;
import com.arcsoft.commander.service.server.ServerService;

/**
 * Base action for server setting
 * 
 * @author xpeng
 * 
 */
@SuppressWarnings("serial")
public class BaseServerSettingAction extends BaseAction {
	protected ServerService serverService;
	protected Boolean isLocal;
	protected String id;

	public void setServerService(ServerService serverService) {
		this.serverService = serverService;
	}

	public Boolean getIsLocal() {
		return isLocal;
	}

	public void setIsLocal(Boolean isLocal) {
		this.isLocal = isLocal;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String execute(){
		return SUCCESS;
	}
}
