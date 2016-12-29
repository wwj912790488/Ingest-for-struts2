package com.arcsoft.commander.dao.server;

import java.util.List;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.exception.ObjectAlreadyExistsException;
import com.arcsoft.commander.exception.ObjectNotExistsException;
import com.arcsoft.commander.exception.server.NameExistsException;

/**
 * Server DAO.
 * 
 * @author fjli
 */
public interface ServerDao {

	/**
	 * Query all servers.
	 */
	List<Server> listAll();

	/**
	 * Get all servers in the specified group.
	 * 
	 * @param groupId - the group id
	 * @return the servers list in the specified group.
	 */
	List<Server> getServersInGroup(Integer groupId);

	/**
	 * Find the server with the specified id.
	 * 
	 * @param id - the specified server id
	 * @return Returns the server with the specified id, or null if not found.
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
	 * Add server.
	 * 
	 * @param server - the server to be added
	 * @throws ObjectNotExistsException if the group is not exist.
	 * @throws ObjectAlreadyExistsException if the server is already added
	 * @throws NameExistsException if the name already exist
	 */
	void addServer(Server server) throws ObjectNotExistsException, ObjectAlreadyExistsException, NameExistsException;

	/**
	 * Rename server.
	 * 
	 * @param server - the server to be renamed.
	 * @throws ObjectNotExistsException - if the server is not exist
	 * @throws NameExistsException - if the name already exist
	 */
	void renameServer(Server server) throws ObjectNotExistsException, NameExistsException;

	/**
	 * Update the server state.
	 * 
	 * @param server - the server to be updated
	 * @throws ObjectNotExistsException - if the server is not exist
	 */
	void updateState(Server server) throws ObjectNotExistsException;

	/**
	 * Update the server ip and port.
	 * 
	 * @param server - the server to be updated
	 * @throws ObjectNotExistsException - if the server is not exist
	 */
	void updateAddress(Server server) throws ObjectNotExistsException;

	/**
	 * Update the server online state.
	 * 
	 * @param server - the server to be updated
	 * @throws ObjectNotExistsException - if the server is not exist
	 */
	void updateOnlineState(Server server) throws ObjectNotExistsException;

	/**
	 * Update the server backup flag.
	 * 
	 * @param server - the server to be updated
	 * @param backupFlag - the backup flag
	 * @throws ObjectNotExistsException - if the server is not exist
	 */
	void updateBackupFlag(Server server, boolean backupFlag) throws ObjectNotExistsException;

	/**
	 * Update the server's capabilities.
	 * 
	 * @param server - the server to be updated
	 * @throws ObjectNotExistsException - if the server is not exist
	 */
	void updateServerCapabilities(Server server) throws ObjectNotExistsException;

	/**
	 * Enable or disable the server's fault process
	 * 
	 * @param server - the server to be updated
	 * @throws ObjectNotExistsException - if the server is not exist
	 */
	void updateFaultDisabled(Server server) throws ObjectNotExistsException;

	/**
	 * Remove server.
	 * 
	 * @param server - the server to be removed
	 */
	void removeServer(Server server);

	/**
	 * Reset the status of all servers.
	 */
	void resetServersStatus();

}
