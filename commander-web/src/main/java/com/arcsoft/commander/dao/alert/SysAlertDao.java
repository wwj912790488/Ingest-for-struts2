package com.arcsoft.commander.dao.alert;

import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.arcvideo.orm.query.Pager;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.domain.alert.SysAlert;

import java.util.Date;
import java.util.List;

/**
 * Dao for alert
 * 
 * @author xpeng
 * 
 */
public interface SysAlertDao {

	Pager list(QueryInfo info, int pageIndex, int pageSize);

	List<SysAlert> queryList(Date beginTime,Date endTime,int pageIndex,int pageSize);

	SysAlert save(SysAlert alert);

	void delete(SysAlert alert);

	void deleteAll(Condition condition);

}
