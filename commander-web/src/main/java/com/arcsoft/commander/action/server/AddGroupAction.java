package com.arcsoft.commander.action.server;

import org.springframework.security.access.prepost.PreAuthorize;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.exception.ObjectAlreadyExistsException;
import com.arcsoft.commander.exception.server.HeatBeatEventNotReceivedException;
import com.arcsoft.commander.exception.server.NameExistsException;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.exception.server.ServerIncompatibleException;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.server.TooManyServerException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;

/**
 * Add group action.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class AddGroupAction extends AddServerSupport {

	/**
	 * Save the group.
	 */
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String save() {
		try {
			serverService.createGroup(group);
		} catch(NameExistsException e) {
			addActionError(getText("server.group.err.name.exists", new String[]{e.getName()}));
			return ERROR;
		} catch(ObjectAlreadyExistsException e) {
			Server server = (Server) e.getObject();
			addActionError(getText("server.group.err.server.added", new String[]{server.getIp()}));
			return ERROR;
		} catch(TooManyServerException e) {
			addActionError(getText("server.group.err.server.toomany"));
			return ERROR;
		} catch(ServerIncompatibleException e) {
			Server server = e.getServer();
			addActionError(getText("server.group.err.server.incompatible", new String[]{server.getIp()}));
			return ERROR;
		} catch (SystemNotInitializedException e) {
			addActionError(getText("system.not.initialized"));
			return ERROR;
		} catch (AccessDeniedForSlaveException e) {
			addActionError(getText("system.slave.access.denied"));
			return ERROR;
		} catch (ServerNotAvailableException e) {
			Server server = e.getServer();
			addActionError(getText("server.group.err.server.unavailable", new String[]{server.getIp()}));
			return ERROR;
		} catch (HeatBeatEventNotReceivedException e) {
			Server server = e.getServer();
			addActionError(getText("server.group.err.heartbeat.no.events", new String[]{server.getIp()}));
			return ERROR;
		} catch(RemoteException e) {
			Server server = e.getServer();
			addActionError(getText("server.group.err.remote", new String[]{server.getIp()}));
			return ERROR;
		}
		return SUCCESS;
	}

}
