package com.arcsoft.commander.dao.operationlog;

import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.arcvideo.orm.query.Pager;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.domain.operationlog.OperationLog;

/**
 * Dao for operation log
 * 
 * @author xpeng
 * 
 */
public interface OperationLogDao {

	Pager getLogs(QueryInfo info, int pageIndex, int pageSize, boolean includeAttachment);

	String getLogAttachment(Integer id);

	OperationLog save(OperationLog log);

	void delete(OperationLog log);

	void deleteAll(Condition condition);

}
