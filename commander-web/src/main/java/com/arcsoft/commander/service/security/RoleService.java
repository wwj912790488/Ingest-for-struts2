package com.arcsoft.commander.service.security;

import java.util.List;

import com.arcsoft.arcvideo.orm.query.Pager;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.domain.security.Role;
import com.arcsoft.commander.exception.security.RoleNameExistsException;


/**
 * Role service.
 * 
 * @author ybzhang
 */
public interface RoleService {

	/**
	 * Save a new role and the relation resources.
	 * 
	 * @param role - the role
	 * @param reses - the resources
	 * @throws RoleNameExistsException if role name already exist
	 */
	public void save(Role role, Integer[] reses);

	/**
	 * Update the specified role and the relation resources.
	 * 
	 * @param role - the role
	 * @param reses - the resources
	 * @throws RoleNameExistsException if role name already exist
	 */
	public void update(Role role, Integer[] reses);

	/**
	 * List all roles by resource id.
	 * 
	 * @param resID - the specified resource id.
	 * @return list of all roles with the resource id.
	 */
	public List<Role> listByResourceID(int resID);

	/**
	 * Delete the specified role.
	 * 
	 * @param role - the role to delete
	 */
	public void delete(Role role);

	/**
	 * List the roles with the specified query info.
	 * 
	 * @param info - the specified query info
	 * @return the query result.
	 */
	public List<Role> list(QueryInfo info);

	/**
	 * List the roles by page with the specified query info and page info
	 * 
	 * @param info - the specified query info
	 * @param pageIndex - the page index
	 * @param pageSize - the page size
	 * @return the query result.
	 */
	public Pager getRoles(QueryInfo info, int pageIndex, int pageSize);

}
