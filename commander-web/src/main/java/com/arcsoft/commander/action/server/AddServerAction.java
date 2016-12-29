package com.arcsoft.commander.action.server;

import org.springframework.security.access.prepost.PreAuthorize;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.exception.ObjectAlreadyExistsException;
import com.arcsoft.commander.exception.ObjectNotExistsException;
import com.arcsoft.commander.exception.server.HeatBeatEventNotReceivedException;
import com.arcsoft.commander.exception.server.NameExistsException;
import com.arcsoft.commander.exception.server.NoServerAvailableException;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.exception.server.ServerIncompatibleException;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.server.TooManyServerException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;

/**
 * Add servers to the specified group.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class AddServerAction extends AddServerSupport {

	public boolean isEditMode() {
		return true;
	}

	/**
	 * For add page.
	 */
	@Override
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String execute() {
		group = serverService.getGroup(group.getId(), false);
		if (group.getType() == ServerGroup.TYPE_LIVE) {
			group = serverService.getGroup(group.getId(), true);
		}
		return SUCCESS;
	}

	/**
	 * Save the servers.
	 */
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String save() {
		try {
			serverService.addServers(group);
		} catch(ObjectNotExistsException e) {
			addActionError(getText("server.group.err.not.exists"));
			return ERROR;
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
		} catch(ServerNotAvailableException e) {
			Server server = e.getServer();
			addActionError(getText("server.group.err.server.unavailable", new String[]{server.getIp()}));
			return ERROR;
		} catch (NoServerAvailableException e) {
			addActionError(getText("server.group.err.all.unavailable"));
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
