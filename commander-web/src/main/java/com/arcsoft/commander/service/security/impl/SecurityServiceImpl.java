package com.arcsoft.commander.service.security.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionRegistry;

import com.arcsoft.arcvideo.orm.query.Pager;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.dao.security.UserDao;
import com.arcsoft.commander.domain.security.Account;
import com.arcsoft.commander.domain.security.Resource;
import com.arcsoft.commander.security.authentication.CustomUserDetails;
import com.arcsoft.commander.service.security.ResourceService;
import com.arcsoft.commander.service.security.SecurityService;

/**
 * An securityService implementation.
 * 
 * @author hxiang
 * 
 */
public class SecurityServiceImpl implements SecurityService {

	UserDao dao;
	SessionRegistry registry;
	private ResourceService resourceService;

	public UserDao getDao() {
		return dao;
	}

	public void setDao(UserDao dao) {
		this.dao = dao;
	}
	
	public SessionRegistry getRegistry() {
		return registry;
	}

	public void setRegistry(SessionRegistry registry) {
		this.registry = registry;
	}

	public Pager list(QueryInfo info, int pageIndex, int pageSize) {
		return dao.list(info, pageIndex, pageSize);
	}

	public List<Account> list(QueryInfo info) {
		return dao.list(info);
	}

	@Override
	public Account getLoginAccount() {
		Authentication auth = SecurityContextHolder.getContext()
				.getAuthentication();
		if (auth != null) {
			CustomUserDetails details = (CustomUserDetails) auth.getPrincipal();
			return details.getUser();
		}
		return null;
	}

	@Override
	public void updateAccount(Account user, String password) {
		
		// update the account password in memory
		for (Account loginUser : getAllLoginAccount()){
			if (loginUser.getId().equals(user.getId())) {
				loginUser.setPassword(password);
				break;
			}
		}
		
		//update the database
		dao.updatePassword(user.getId(),password);
	}

	@Override
	public void updateAccount(Account user) {
		// update the account info in database;
		dao.update(user);
		synToMemory(user.getId());
	}

	@Override
	public void unRegisterAccount(Account user) {
		user.setUnRegisterTime(new Timestamp(System.currentTimeMillis()));
		dao.deleteUser(user);
		synToMemory(user.getId());
	}

	@Override
	public void appendAccount(Account user) {
		user.setRegisterTime(new Timestamp(System.currentTimeMillis()));
		user.setIsEnabled(true);
		dao.save(user);
	}

	@Override
	public List<Account> getAllLoginAccount() {
		List<Account> ret = new ArrayList<Account>();
		for (Object obj : registry.getAllPrincipals()) {
			if (obj instanceof CustomUserDetails) {
				ret.add(((CustomUserDetails) obj).getUser());
			}
		}
		return ret;
	}

	@Override
	public void updateAccount(int userId, int roleId, String realName, String remarks) {	
		dao.updateUser(userId, roleId, realName, remarks);
		synToMemory(userId);
	}

	@Override
	public Account findAccountByName(String name) {
		return dao.findByName(name);
	}
	
	@Override
	public void synToMemory(int userId){
		for (Object obj : registry.getAllPrincipals()) {
			if (obj instanceof CustomUserDetails) {
				if (((CustomUserDetails)obj).getUser().getId() == userId){
					Account newUser = dao.get(userId);
					((CustomUserDetails) obj).update(newUser);
					updateUserAuths((CustomUserDetails) obj);
				}
			}
		}
	}

	@Override
	@SuppressWarnings("unchecked")
	public void updateUserAuths(CustomUserDetails userDetail) {
		if(userDetail == null)
			return;
		List<SimpleGrantedAuthority> authoritys = ((List<SimpleGrantedAuthority>) userDetail.getAuthorities());
		authoritys.clear();
		Account user = userDetail.getUser();
		if (user.getRole().getIsEnabled()) {
			if (user.getRole().getId() == 1) {
				authoritys.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
			} else {
				List<Resource> resources = resourceService.getResources(user.getRole());
				for (Resource rr : resources) {
					authoritys.add(new SimpleGrantedAuthority(rr.getKey()));
				}
			}
		}
	}
	
	@Override
	public Account findAccount(int userId) {
		return dao.get(userId);
	}

	
	/**
	 * @param resourceService the resourceService to set
	 */
	public void setResourceService(ResourceService resourceService) {
		this.resourceService = resourceService;
	}

}
