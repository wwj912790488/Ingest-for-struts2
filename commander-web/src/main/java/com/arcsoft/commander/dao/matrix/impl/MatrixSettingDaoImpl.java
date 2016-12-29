package com.arcsoft.commander.dao.matrix.impl;

import java.util.List;

import com.arcsoft.arcvideo.orm.dao.hibernate.DatabaseDaoHibernateSupport;
import com.arcsoft.commander.dao.matrix.MatrixSettingDao;
import com.arcsoft.commander.domain.matrix.MatrixSetting;


/**
 * 
 * @author ybzhang
 */
public class MatrixSettingDaoImpl extends DatabaseDaoHibernateSupport<MatrixSetting, Integer> implements MatrixSettingDao {

	@Override
	public void saveSettings(List<MatrixSetting> settings) {
		// TODO Auto-generated method stub
		getHibernateTemplate().saveOrUpdateAll(settings);
		getHibernateTemplate().flush();
	}

}
