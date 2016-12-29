package com.arcsoft.commander.dao.operationlog.impl;

import com.arcsoft.arcvideo.orm.dao.hibernate.DatabaseDaoHibernateSupport;
import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.arcvideo.orm.query.Pager;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.dao.operationlog.OperationLogDao;
import com.arcsoft.commander.domain.operationlog.OperationLog;

/**
 * The implementation for OperationLogDao
 * 
 * @author xpeng
 * 
 */
public class OperationLogDaoImpl extends DatabaseDaoHibernateSupport<OperationLog, Integer> implements OperationLogDao {

	@Override
	public Pager getLogs(QueryInfo info, int pageIndex, int pageSize, boolean includeAttachment) {
		if (includeAttachment) {
			return list(info, pageIndex, pageSize);
		} else {
			String hql = "select new OperationLog(t.id as id, t.user as user, t.type as type, "
					+ "t.description as description, t.createdAt as createdAt, "
					+ "(case when t.attachment is null then false else true end) as hasAttachment) "
					+ "from OperationLog t";
			return list(info, hql, "t", pageIndex, pageSize);
		}
	}

	@Override
	public String getLogAttachment(Integer id) {
		return getValue("attachment", Condition.eq("id", id));
	}

}
