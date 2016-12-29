package com.arcsoft.commander.dao.server;

import java.util.List;

import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.exception.ObjectNotExistsException;
import com.arcsoft.commander.exception.server.NameExistsException;

/**
 * Server group DAO.
 * 
 * @author fjli
 */
public interface ServerGroupDao {

	/**
	 * Returns all the server groups.
	 */
	List<ServerGroup> list();

	/**
	 * Create new server group.
	 * 
	 * @param group - the group to be created
	 */
	void createGroup(ServerGroup group) throws NameExistsException;

	/**
	 * Rename group.
	 * 
	 * @param group - the group to be renamed
	 */
	void renameGroup(ServerGroup group) throws ObjectNotExistsException, NameExistsException;

	/**
	 * Delete new server group.
	 * 
	 * @param group - the group to be deleted
	 */
	void deleteGroup(ServerGroup group);

	/**
	 * Get group with the specified id.
	 * 
	 * @param id - the specified id
	 * @return the group with the specified id.
	 */
	ServerGroup getGroup(Integer id);

	/**
	 * Check the group with the specified name is exist or not.
	 * 
	 * @param name - the specified group name
	 * @return true if the group with the specified name is exist.
	 */
	boolean isExistsGroupName(String name);

}
