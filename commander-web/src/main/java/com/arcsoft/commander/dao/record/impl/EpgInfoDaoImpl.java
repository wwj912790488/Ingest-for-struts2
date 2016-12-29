package com.arcsoft.commander.dao.record.impl;



import com.arcsoft.arcvideo.orm.dao.hibernate.DatabaseDaoHibernateSupport;
import com.arcsoft.arcvideo.orm.query.Condition;

import com.arcsoft.commander.dao.record.EpgInfoDao;
import com.arcsoft.commander.domain.record.EpgInfo;

/**
 * Epg info dao.
 * 
 * @author jt
 */
public class EpgInfoDaoImpl extends DatabaseDaoHibernateSupport<EpgInfo, Integer> implements EpgInfoDao {

	
	 @Override
	 public void delete(Integer id) {
	 	deleteAll(Condition.eq("id", id));
	 }
	
}
