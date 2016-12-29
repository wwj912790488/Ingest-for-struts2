package com.arcsoft.commander.exception.server;

import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.exception.ApplicationException;

/**
 * This exception will be thrown when execute remote action failed.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class RemoteException extends ApplicationException {

	private Server server;
	private int errorCode;

	/**
	 * Construct new exception.
	 * 
	 * @param server - the cause server.
	 */
	public RemoteException(Server server) {
		this(server, ActionErrorCode.UNKNOWN_ERROR);
	}

	/**
	 * Construct new exceptio with error code.
	 * 
	 * @param server - the cause server.
	 */
	public RemoteException(Server server, int errorCode) {
		this.server = server;
		this.errorCode = errorCode;
	}

	/**
	 * Returns the cause server.
	 */
	public Server getServer() {
		return server;
	}

	/**
	 * Returns error code.
	 */
	public int getErrorCode() {
		return errorCode;
	}

}
