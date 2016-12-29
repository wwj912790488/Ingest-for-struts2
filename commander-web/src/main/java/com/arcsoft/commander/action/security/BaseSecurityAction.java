package com.arcsoft.commander.action.security;



import java.util.ArrayList;
import java.util.List;

import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.arcvideo.orm.query.SortOrder;
import com.arcsoft.commander.action.BaseAction;
import com.arcsoft.commander.domain.security.Role;
import com.arcsoft.commander.service.security.ResourceService;
import com.arcsoft.commander.service.security.RoleService;
import com.arcsoft.commander.service.security.SecurityService;

/**
 * Base security action
 * 
 * @author hxiang
 * 
 */
@SuppressWarnings("serial")
public class BaseSecurityAction extends BaseAction {
	protected SecurityService securityService;

	protected ResourceService resourceService;
	
	protected RoleService roleService;
	
	
	/**
	 * @return the roles
	 */
	public List<Role> getRoles() {
		QueryInfo info = new QueryInfo();
		List<Condition> conditions = new ArrayList<>();
		conditions.add(Condition.ne("id", Integer.valueOf(1)));
		conditions.add(Condition.eq("isEnabled", Boolean.valueOf(true)));
		info.setCondition(Condition.and(conditions));
		info.addSortOrder(SortOrder.desc("id"));
		
		return roleService.list(info);
	}

	/**
	 * @param roleService the roleService to set
	 */
	public void setRoleService(RoleService roleService) {
		this.roleService = roleService;
	}

	/**
	 * @param resourceService the resourceService to set
	 */
	public void setResourceService(ResourceService resourceService) {
		this.resourceService = resourceService;
	}

	public SecurityService getSecurityService() {
		return securityService;
	}

	public void setSecurityService(SecurityService securityService) {
		this.securityService = securityService;
	}

}
