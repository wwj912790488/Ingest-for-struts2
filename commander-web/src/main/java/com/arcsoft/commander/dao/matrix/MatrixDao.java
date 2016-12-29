package com.arcsoft.commander.dao.matrix;

import java.util.List;

import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.domain.matrix.Matrix;


/**
 * 
 * @author ybzhang
 */
public interface MatrixDao {

	/**
	 * Save new role.
	 * 
	 * @param role - the role to save
	 * @return the role after saved.
	 */
	public Matrix save(Matrix matrix);

	/**
	 * Update the specified role.
	 * 
	 * @param role - the role to update
	 * @return the role after updated.
	 */
	public Matrix update(Matrix matrix);

	/**
	 * Get the role with the role id.
	 * 
	 * @param roleID - the role id
	 * @return the role with the role id.
	 */
	public Matrix get(Integer id);

	/**
	 * Delete the specified role.
	 * 
	 * @param role - the role to delete
	 */
	public void delete(Matrix matrix);

	/**
	 * List the roles with the specified query info.
	 * 
	 * @param info - the specified query info
	 * @return the query result.
	 */
	public List<Matrix> list(QueryInfo info);

	/**
	 * @param groupId
	 * @return
	 */
	public List<Matrix> list(Integer groupId);

}
