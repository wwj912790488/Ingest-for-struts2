package com.arcsoft.commander.service.record.impl;

import java.util.List;

import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.dao.record.ScheduleDeleteFileDao;
import com.arcsoft.commander.domain.record.ScheduleDeleteFile;
import com.arcsoft.commander.service.Transaction;
import com.arcsoft.commander.service.record.ScheduleDeleteFileService;

/**
 * Schedule delete file service.
 * 
 * @author fjli
 */
public class ScheduleDeleteFileServiceImpl implements ScheduleDeleteFileService, Transaction {

	private ScheduleDeleteFileDao scheduleDeleteFileDao;

	public void setScheduleDeleteFileDao(ScheduleDeleteFileDao scheduleDeleteFileDao) {
		this.scheduleDeleteFileDao = scheduleDeleteFileDao;
	}

	@Override
	public List<ScheduleDeleteFile> list(QueryInfo info) {
		return scheduleDeleteFileDao.list(info);
	}

	@Override
	public void save(ScheduleDeleteFile file) {
		scheduleDeleteFileDao.save(file);
	}

	@Override
	public void deleteAll(List<Long> ids) {
		if (!ids.isEmpty()) {
			scheduleDeleteFileDao.deleteAll(Condition.in("id", ids));
		}
	}

}
