package com.arcsoft.commander.service.server;

import java.util.List;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.exception.ObjectAlreadyExistsException;
import com.arcsoft.commander.exception.ObjectNotExistsException;
import com.arcsoft.commander.exception.server.AccessDeniedException;
import com.arcsoft.commander.exception.server.HeatBeatEventNotReceivedException;
import com.arcsoft.commander.exception.server.NameExistsException;
import com.arcsoft.commander.exception.server.NoServerAvailableException;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.exception.server.ServerIncompatibleException;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.server.SwitchRoleFailedException;
import com.arcsoft.commander.exception.server.TooManyServerException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;

/**
 * Server services.
 * 
 * @author fjli
 */
public interface ServerService {

	/**
	 * List all server groups.
	 * 
	 * @param isIncludeServers - true: also returns servers in group
	 *                           false: only returns group info
	 * @return all server groups.
	 */
	List<ServerGroup> list(boolean isIncludeServers);

	/**
	 * Get group with the specified id.
	 * 
	 * @param id - the specified group id
	 * @param isIncludeServers - true: also returns servers in group
	 *                           false: only returns group info
	 * @return the group with the specified id.
	 */
	ServerGroup getGroup(Integer id, boolean isIncludeServers);

	/**
	 * Check the group with the specified name is exist or not.
	 * 
	 * @param name - the specified group name
	 * @return true if the group with the specified name is exist.
	 */
	boolean isExistsGroupName(String name);

	/**
	 * Create new server group and add all servers which belongs to this group.
	 * 
	 * @param group - the group to be created
	 * @throws SystemNotInitializedException  if system has not initialized
	 * @throws AccessDeniedForSlaveException  if system is slave.
	 * @throws ObjectAlreadyExistsException   if one of the server already added
	 * @throws NameExistsException            if the group name or one of the server name already exists
	 * @throws ServerNotAvailableException    if the server is not available
	 * @throws RemoteException                if execute remote action failed
	 * @throws TooManyServerException         if add too many servers in live group
	 * @throws ServerIncompatibleException    if the added server is incompatible with others
	 * @throws HeatBeatEventNotReceivedException if heart beat event is not received
	 */
	void createGroup(ServerGroup group);

	/**
	 * Add servers to the specified group.
	 * 
	 * @param group - the specified group.
	 * @throws SystemNotInitializedException  if system has not initialized
	 * @throws AccessDeniedForSlaveException  if system is slave.
	 * @throws ObjectNotExistsException       if the group is not exist
	 * @throws ObjectAlreadyExistsException   if one of the server already added
	 * @throws NameExistsException            if the name already exist
	 * @throws ServerNotAvailableException    if the server is not available
	 * @throws RemoteException                if execute remote action failed
	 * @throws TooManyServerException         if add too many servers in live group
	 * @throws ServerIncompatibleException    if the added server is incompatible with others
	 * @throws NoServerAvailableException     if no server is available.
	 * @throws HeatBeatEventNotReceivedException if heart beat event is not received
	 */
	void addServers(ServerGroup group);

	/**
	 * Rename group.
	 * 
	 * @param group - the group to be renamed
	 * @throws ObjectNotExistsException - if the group is not exist
	 * @throws NameExistsException - if the group name already exists
	 */
	void renameGroup(ServerGroup group);

	/**
	 * Delete server group with the specified id.
	 * 
	 * @param id - the specified group id to be deleted
	 * @throws SystemNotInitializedException  if system has not initialized
	 * @throws AccessDeniedForSlaveException  if system is slave.
	 */
	void deleteGroup(Integer id);

	/**
	 * Get server with the specified id.
	 * 
	 * @param id - the specified server id
	 * @return Returns the server with the specified id, or null if not exist.
	 */
	Server getServer(String id);

	/**
	 * Check the server with the specified name is exist or not.
	 * 
	 * @param name - the specified server name
	 * @return true if the server with the specified name is exist.
	 */
	boolean isExistsServerName(String name);

	/**
	 * Rename server.
	 * 
	 * @param server - the server to be renamed.
	 * @throws ObjectNotExistsException - if the server is not exist
	 * @throws NameExistsException - if the name already exist
	 */
	void renameServer(Server server);

	/**
	 * Update the server state.
	 * 
	 * @param server - the server to be updated
	 * @throws ObjectNotExistsException - if the server is not exist
	 */
	void updateState(Server server);

	/**
	 * Update the server ip and port.
	 * 
	 * @param server - the server to be updated
	 * @throws ObjectNotExistsException - if the server is not exist
	 */
	void updateAddress(Server server);

	/**
	 * Update the server online state.
	 * 
	 * @param server - the server to be updated
	 * @throws ObjectNotExistsException - if the server is not exist
	 */
	void updateOnlineState(Server server);

	/**
	 * Enable or disable fault process
	 * 
	 * @param server - the server to be updated
	 * @throws ObjectNotExistsException - if the server is not exist
	 */
	void updateFaultDisabled(Server server);
	
	/**
	 * Update the server's capabilities.
	 * 
	 * @param server - the server to be updated
	 * @throws ObjectNotExistsException - if the server is not exist
	 */
	void updateServerCapabilities(Server server) throws ObjectNotExistsException;

	/**
	 * Remove server.
	 * 
	 * @param server - the server to be removed.
	 * @throws SwitchRoleFailedException      if switch role failed
	 * @throws SystemNotInitializedException  if system has not initialized
	 * @throws AccessDeniedForSlaveException  if system is slave.
	 */
	void removeServer(Server server);

	/**
	 * Reset the status of all servers.
	 */
	void updateServersStatus();

	/**
	 * Switch the slave server role to master, also the previous master server
	 * will switch to slave.
	 * 
	 * @param slave - the slave server id
	 * @throws ObjectNotExistsException if the server is not exist.
	 * @throws AccessDeniedException if the server is not allow for this action.
	 */
	void updateLiveRole(String slave);

	/**
	 * Select a backup server to take over the specified worker server.
	 * Usually for auto operation trigger by server down event
	 * 
	 * @param worker - the specified server to be replaced
	 * @return the selected backup server.
	 * @throws ObjectNotExistsException if the server is not exist.
	 * @throws AccessDeniedException if the server is not allow for this action.
	 */
	Server updateWorkerServer(String worker, int cause);

	/**
	 * Select the specified backup server to take over the specified worker server.
	 * Usually for manual operation
	 * 
	 * @param worker - the specified server to be replaced
	 * @param backup - the specified backup server
	 * @return the selected backup server.
	 * @throws ObjectNotExistsException if the server or the backup server are not exist.
	 * @throws AccessDeniedException if the server or the backup server are not allow for this action.
	 * @throws ServerNotAvailableException if the backup server is not alive.
	 */
	Server updateWorkerServer(String worker, String backup, int cause);

}
