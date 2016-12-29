package com.arcsoft.commander.service.alert;

import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.arcvideo.orm.query.Pager;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.domain.alert.SysAlert;

import java.util.Date;
import java.util.List;

/**
 * The service of alert
 * 
 * @author xpeng
 * 
 */
public interface SysAlertService {

	Pager getAlerts(QueryInfo query, int pageIndex, int pageSize);

	 List<SysAlert> queryList(Date beginTime,Date endTime,int pageIndex,int pageSize);

	void addAlert(SysAlert alert);

	void deleteAlert(SysAlert alert);

	void deleteAlerts(Condition condition);

	int  getAutoDeleteBeforeDays();
	
	void setAutoDeleteBeforeDays(int deleteBeforeDays);
}
