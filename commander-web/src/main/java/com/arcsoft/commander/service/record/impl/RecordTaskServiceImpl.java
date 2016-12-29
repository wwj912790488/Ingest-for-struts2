package com.arcsoft.commander.service.record.impl;

import java.util.Arrays;
import java.util.List;

import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.dao.record.RecordTaskDao;
import com.arcsoft.commander.domain.record.RecordTask;
import com.arcsoft.commander.service.Transaction;
import com.arcsoft.commander.service.record.RecordTaskService;

/**
 * Record task service.
 * 
 * @author fjli
 */
public class RecordTaskServiceImpl implements RecordTaskService, Transaction {

	private RecordTaskDao recordTaskDao;

	public void setRecordTaskDao(RecordTaskDao recordTaskDao) {
		this.recordTaskDao = recordTaskDao;
	}

	@Override
	public RecordTask getRecordTaskById(Integer taskId) {
		return  recordTaskDao.get(taskId);
	}

	@Override
	public RecordTask getRecordTaskByEventId(Long eventId) {
		QueryInfo queryInfo = new QueryInfo();
		queryInfo.setCondition(Condition.eq("scheduleEventId", eventId));
		return recordTaskDao.find(queryInfo);
	}

	@Override
	public List<RecordTask> getRecordTasksByRecordId(Integer ...recordId) {
		QueryInfo queryInfo = new QueryInfo();
		queryInfo.setCondition(Condition.in("recordId", Arrays.asList(recordId)));
		return recordTaskDao.list(queryInfo);
	}

	@Override
	public void deleteTasksByRecordId(Integer... recordId) {
		recordTaskDao.deleteAll(Condition.in("recordId", Arrays.asList(recordId)));
	}

}
