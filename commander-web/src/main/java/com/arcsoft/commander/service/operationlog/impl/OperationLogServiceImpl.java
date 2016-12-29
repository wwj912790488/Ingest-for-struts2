package com.arcsoft.commander.service.operationlog.impl;

import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.arcvideo.orm.query.Pager;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.dao.operationlog.OperationLogDao;
import com.arcsoft.commander.domain.operationlog.OperationLog;
import com.arcsoft.commander.service.BaseService;
import com.arcsoft.commander.service.operationlog.OperationLogService;

/**
 * The implementation for OperationLogService.
 * 
 * @author xpeng
 * 
 */
public class OperationLogServiceImpl extends BaseService implements OperationLogService {

	private OperationLogDao operationLogDao;

	public OperationLogDao getOperationLogDao() {
		return operationLogDao;
	}

	public void setOperationLogDao(OperationLogDao operationLogDao) {
		this.operationLogDao = operationLogDao;
	}

	@Override
	public Pager getLogs(QueryInfo info, int pageIndex, int pageSize, boolean includeAttachment) {
		return operationLogDao.getLogs(info, pageIndex, pageSize, includeAttachment);
	}

	@Override
	public String getLogAttachment(Integer id) {
		return operationLogDao.getLogAttachment(id);
	}

	@Override
	public void addLog(OperationLog log) {
		operationLogDao.save(log);
	}

	@Override
	public void deleteLog(OperationLog log) {
		operationLogDao.delete(log);
	}

	@Override
	public void deleteLogs(Condition condition) {
		operationLogDao.deleteAll(condition);
	}

}
