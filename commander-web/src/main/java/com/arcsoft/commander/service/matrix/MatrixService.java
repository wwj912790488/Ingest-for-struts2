package com.arcsoft.commander.service.matrix;

import java.util.List;

import com.arcsoft.arcvideo.matrix.domain.Crosspoint;
import com.arcsoft.arcvideo.matrix.domain.LevelInfo;
import com.arcsoft.arcvideo.matrix.exception.MethodUnSupportException;
import com.arcsoft.arcvideo.matrix.exception.UnSupportException;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.domain.matrix.Matrix;


/**
 * 
 * @author ybzhang
 */
public interface MatrixService {

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

	public List<Matrix> list(Integer groupId);
	
	public void coQuery(Matrix matrix,Crosspoint cp);
	
	public List<LevelInfo> queryLevel(Matrix matrix);
	
	public void sendCmd(Matrix matrix) throws UnSupportException, MethodUnSupportException;

}
