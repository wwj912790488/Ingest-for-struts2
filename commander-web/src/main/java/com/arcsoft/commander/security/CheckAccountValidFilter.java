package com.arcsoft.commander.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.springframework.context.MessageSource;
import org.springframework.context.MessageSourceAware;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.security.authentication.AuthenticationTrustResolver;
import org.springframework.security.authentication.AuthenticationTrustResolverImpl;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.SpringSecurityMessageSource;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.GenericFilterBean;

/**
 * To validate the account.
 * 
 * @author hxiang
 * 
 */
public class CheckAccountValidFilter extends GenericFilterBean implements	MessageSourceAware {
	protected MessageSourceAccessor messages = SpringSecurityMessageSource.getAccessor();
	private final AuthenticationTrustResolver authenticationTrustResolver = new AuthenticationTrustResolverImpl();
	   
	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (requireValid(auth)){
			UserDetails details = (UserDetails) auth.getPrincipal();
			if (!details.isEnabled()) {
				 SecurityContextHolder.clearContext();
		//		throw new AccountHasUnRegisteredException(messages.getMessage("security.error.userHasUnregistered", "User has unregistered"));
			}
		}
		chain.doFilter(request, response);
	}

	@Override
	public void setMessageSource(MessageSource messageSource) {
		this.messages = new MessageSourceAccessor(messageSource);
	}
	
	private boolean requireValid(Authentication authentication){
		return authentication != null && !authenticationTrustResolver.isAnonymous(authentication);
	}
}
