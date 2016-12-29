package com.arcsoft.commander.service.record.impl;

import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.arcvideo.orm.query.SortOrder;
import com.arcsoft.commander.dao.record.EpgInfoDao;
import com.arcsoft.commander.domain.record.*;
import com.arcsoft.commander.service.record.EpgInfoService;
import com.arcsoft.commander.service.BaseService;
import com.arcsoft.commander.service.Transaction;

import java.util.List;


/**
 * Record info service.
 * 
 * @author jt
 */
public class EpgInfoServiceImpl extends BaseService implements EpgInfoService, Transaction {

	private EpgInfoDao epgInfoDao;

	public void setEpgInfoDao(EpgInfoDao epgInfoDao) {
		this.epgInfoDao = epgInfoDao;
	}

	@Override
	public EpgInfo get(int id) {
		return epgInfoDao.get(id);
	}

	@Override
	public EpgInfo save(EpgInfo info) {
		EpgInfo newInfo = epgInfoDao.save(info);
		return newInfo;
	}

	@Override
	public EpgInfo update(EpgInfo info) {
		return epgInfoDao.update(info);
	}

	@Override
	public void delete(Integer id) {
		EpgInfo info = epgInfoDao.get(id);
	}

	@Override
	public EpgInfo findByChannelId(Integer channelId){
		QueryInfo info = new QueryInfo();
		info.setCondition(Condition.eq("channelId", channelId));
		List<EpgInfo> list = epgInfoDao.list(info);
		if (list != null && !list.isEmpty()) {
			return list.get(0);
		} else {
			return null;
		}
	}

	@Override
	public List<EpgInfo> list(){
		QueryInfo query = new QueryInfo();
		query.addSortOrder(SortOrder.asc("channelId"));
		return epgInfoDao.list(query);
	}

}
