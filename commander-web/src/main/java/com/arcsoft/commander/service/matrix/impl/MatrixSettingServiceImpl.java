package com.arcsoft.commander.service.matrix.impl;

import java.util.List;

import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.dao.matrix.MatrixSettingDao;
import com.arcsoft.commander.domain.matrix.MatrixSetting;
import com.arcsoft.commander.service.matrix.MatrixSettingService;


/**
 * 
 * @author ybzhang
 */
public class MatrixSettingServiceImpl implements MatrixSettingService {

	private MatrixSettingDao matrixSettingDao;
	
	
	/**
	 * @param matrixSettingDao the matrixSettingDao to set
	 */
	public void setMatrixSettingDao(MatrixSettingDao matrixSettingDao) {
		this.matrixSettingDao = matrixSettingDao;
	}
	
	@Override
	public MatrixSetting save(MatrixSetting setting) {
		// TODO Auto-generated method stub
		return matrixSettingDao.save(setting);
	}

	@Override
	public MatrixSetting update(MatrixSetting setting) {
		// TODO Auto-generated method stub
		return matrixSettingDao.update(setting);
	}

	@Override
	public MatrixSetting get(Integer id) {
		// TODO Auto-generated method stub
		return matrixSettingDao.get(id);
	}

	@Override
	public void delete(MatrixSetting setting) {
		// TODO Auto-generated method stub
		matrixSettingDao.delete(setting);
	}

	@Override
	public List<MatrixSetting> list(QueryInfo info) {
		// TODO Auto-generated method stub
		return matrixSettingDao.list(info);
	}

	@Override
	public void saveSettings(List<MatrixSetting> settings) {
		// TODO Auto-generated method stub
		matrixSettingDao.saveSettings(settings);
	}

}
