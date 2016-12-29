package com.arcsoft.commander.service.security.impl;

import java.sql.Timestamp;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.arcvideo.orm.query.Pager;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.dao.security.RoleDao;
import com.arcsoft.commander.domain.security.Account;
import com.arcsoft.commander.domain.security.Role;
import com.arcsoft.commander.domain.security.RoleOperator;
import com.arcsoft.commander.exception.security.RoleNameExistsException;
import com.arcsoft.commander.service.security.ResourceService;
import com.arcsoft.commander.service.security.RoleService;
import com.arcsoft.commander.service.security.SecurityService;


/**
 * The role service implementation.
 * 
 * @author ybzhang
 */
public class RoleServiceImpl  implements RoleService {

	private ResourceService resourceService;
	private SecurityService securityService;
	private RoleDao dao;

	public void setResourceService(ResourceService resourceService) {
		this.resourceService = resourceService;
	}

	public void setSecurityService(SecurityService securityService) {
		this.securityService = securityService;
	}

	public void setDao(RoleDao dao) {
		this.dao = dao;
	}

	@Override
	public void save(Role role, Integer[] reses) throws RoleNameExistsException {
		checkRoleName(role.getName(), null);
		role.setCreateTime(new Timestamp(System.currentTimeMillis()));
		for(int i = 0; i < reses.length; i++){
			RoleOperator rr = new RoleOperator();
			rr.setRole(role);
			rr.setOperatorId(reses[i]);
			role.getRoleOperators().add(rr);
		}
		role.setIsEnabled(true);
		dao.save(role);
		resourceService.loadResourceDefine();
	}

	private void checkRoleName(String roleName, Integer roleId) throws RoleNameExistsException{
		Condition condition = Condition.eq("name", roleName);
		if (roleId != null)
			condition = Condition.and(condition, Condition.ne("id", roleId));
		long total = dao.getTotalRows(condition);
		if (total > 0)
			throw new RoleNameExistsException(roleName);
	}

	@Override
	public void update(Role role, Integer[] reses) throws RoleNameExistsException {
		checkRoleName(role.getName(), role.getId());
		Role oldRole = dao.get(role.getId());
		role.setCancelTime(oldRole.getCancelTime());
		role.setCreateTime(oldRole.getCreateTime());
		role.setIsEnabled(oldRole.getIsEnabled());
		role.setUseres(oldRole.getUseres());
		role.getRoleOperators().clear();
		dao.deleteOpertorsByRoleID( role.getId());
		for(int i = 0; i < reses.length; i++){
			RoleOperator rr = new RoleOperator();
			rr.setRole(role);
			rr.setOperatorId(reses[i]);
			role.getRoleOperators().add(rr);
		}
		dao.update(role);
		syncMemory(role);
	}

	@Override
	public List<Role> listByResourceID(int resID) {
		return ((RoleDao)dao).listByOperatorID(resID);
	}

	@Override
	public void delete(Role role) {
		dao.delete(role);
		syncMemory(role);
	}

	@Override
	public List<Role> list(QueryInfo info) {
		return dao.list(info);
	}

	@Override
	public Pager getRoles(QueryInfo info, int pageIndex, int pageSize) {
		return dao.list(info, pageIndex, pageSize);
	}

	private void syncMemory(Role oldRole) {
		resourceService.loadResourceDefine();
		Set<Account> needUpdateAccounts = oldRole.getUseres();
		for (Iterator<Account> iterator = needUpdateAccounts.iterator(); iterator.hasNext();) {
			Account account = (Account) iterator.next();
			securityService.synToMemory(account.getId());
		}
	}

}
