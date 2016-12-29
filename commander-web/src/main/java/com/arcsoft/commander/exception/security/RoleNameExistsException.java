package com.arcsoft.commander.exception.security;

import com.arcsoft.commander.exception.ObjectAlreadyExistsException;

/**
 * This exception will be thrown when rename or create role.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class RoleNameExistsException extends ObjectAlreadyExistsException {

	/**
	 * Construct new NameExistsException.
	 * 
	 * @param name - the specified name
	 */
	public RoleNameExistsException(String name) {
		super(name);
	}

	/**
	 * Returns the exist name.
	 */
	public String getName() {
		return (String) getObject();
	}

}
