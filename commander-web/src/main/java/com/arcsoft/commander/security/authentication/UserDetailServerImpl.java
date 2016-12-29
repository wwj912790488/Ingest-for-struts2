package com.arcsoft.commander.security.authentication;

import org.springframework.context.MessageSource;
import org.springframework.context.MessageSourceAware;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.security.core.SpringSecurityMessageSource;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.arcsoft.commander.dao.security.UserDao;
import com.arcsoft.commander.domain.security.Account;
import com.arcsoft.commander.security.authentication.CustomUserDetails;
import com.arcsoft.commander.service.security.SecurityService;

/**
 * @author hxiang
 * 
 */
public class UserDetailServerImpl implements UserDetailsService,MessageSourceAware {
	protected MessageSourceAccessor messages = SpringSecurityMessageSource.getAccessor();
	private UserDao dao;
	private SecurityService securityService;

	public UserDao getDao() {
		return dao;
	}

	public void setDao(UserDao dao) {
		this.dao = dao;
	}

	@Override
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException {
		Account user = dao.findByName(username);
		if (user == null) {
			throw new UsernameNotFoundException(messages.getMessage("security.error.userNotExist","User not found"));
		}
		CustomUserDetails userDetails = new CustomUserDetails(user);
		securityService.updateUserAuths(userDetails);
		return userDetails;
	}

	@Override
	public void setMessageSource(MessageSource messageSource) {
		this.messages = new MessageSourceAccessor(messageSource);
	}

	
	/**
	 * @param securityService the securityService to set
	 */
	public void setSecurityService(SecurityService securityService) {
		this.securityService = securityService;
	}
}
