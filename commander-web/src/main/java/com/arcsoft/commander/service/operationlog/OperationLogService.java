package com.arcsoft.commander.service.operationlog;

import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.arcvideo.orm.query.Pager;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.domain.operationlog.OperationLog;

/**
 * The service of operation log
 * 
 * @author xpeng
 * 
 */
public interface OperationLogService {

	Pager getLogs(QueryInfo query, int pageIndex, int pageSize, boolean includeAttachment);

	String getLogAttachment(Integer id);

	void addLog(OperationLog log);

	void deleteLog(OperationLog log);

	void deleteLogs(Condition condition);
}
