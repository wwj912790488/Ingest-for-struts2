package com.arcsoft.commander.dao.security;

import java.util.List;

import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.arcvideo.orm.query.Pager;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.domain.security.Role;


/**
 * Role DAO.
 * 
 * @author ybzhang
 */
public interface RoleDao {

	/**
	 * Get the count of entities matched the condition.
	 * 
	 * @param condition - the condition
	 * @return the count of entities matched the condition.
	 */
	public Long getTotalRows(Condition condition);

	/**
	 * List all roles by resource id.
	 * 
	 * @param resID - the specified resource id
	 * @return the roles with the resource id.
	 */
	public List<Role> listByOperatorID(int resID);

	/**
	 * Save new role.
	 * 
	 * @param role - the role to save
	 * @return the role after saved.
	 */
	public Role save(Role role);

	/**
	 * Update the specified role.
	 * 
	 * @param role - the role to update
	 * @return the role after updated.
	 */
	public Role update(Role role);

	/**
	 * Delete operators by the specified role id.
	 * 
	 * @param roleID - the specified role id
	 */
	public void deleteOpertorsByRoleID(int roleID);

	/**
	 * Get the role with the role id.
	 * 
	 * @param roleID - the role id
	 * @return the role with the role id.
	 */
	public Role get(Integer roleID);

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
	public Pager list(QueryInfo info, int pageIndex, int pageSize);

}
