package com.arcsoft.commander.exception.security;

import org.springframework.security.access.AccessDeniedException;

/**
 * Exception that account has unregistered
 * 
 * @author hxiang
 *
 */
@SuppressWarnings("serial")
public class AccountHasUnRegisteredException extends AccessDeniedException{

	public AccountHasUnRegisteredException(String message) {
		super(message);
	}

}
