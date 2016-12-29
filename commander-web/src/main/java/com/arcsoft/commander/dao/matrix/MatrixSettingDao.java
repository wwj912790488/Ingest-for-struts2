package com.arcsoft.commander.dao.matrix;

import java.util.List;

import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.domain.matrix.MatrixSetting;


/**
 * 
 * @author ybzhang
 */
public interface MatrixSettingDao {

	/**
	 * Save new role.
	 * 
	 * @param role - the role to save
	 * @return the role after saved.
	 */
	public MatrixSetting save(MatrixSetting setting);

	/**
	 * Update the specified role.
	 * 
	 * @param role - the role to update
	 * @return the role after updated.
	 */
	public MatrixSetting update(MatrixSetting setting);

	/**
	 * Get the role with the role id.
	 * 
	 * @param roleID - the role id
	 * @return the role with the role id.
	 */
	public MatrixSetting get(Integer id);

	/**
	 * Delete the specified role.
	 * 
	 * @param role - the role to delete
	 */
	public void delete(MatrixSetting setting);

	/**
	 * List the roles with the specified query info.
	 * 
	 * @param info - the specified query info
	 * @return the query result.
	 */
	public List<MatrixSetting> list(QueryInfo info);

	public void saveSettings(List<MatrixSetting> settings);

}
