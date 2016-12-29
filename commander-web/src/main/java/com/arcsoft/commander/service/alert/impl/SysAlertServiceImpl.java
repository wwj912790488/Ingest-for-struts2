package com.arcsoft.commander.service.alert.impl;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.arcsoft.arcvideo.common.utils.StringHelper;
import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.arcvideo.orm.query.Pager;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.dao.alert.SysAlertDao;
import com.arcsoft.commander.dao.system.SystemDao;
import com.arcsoft.commander.domain.alert.SysAlert;
import com.arcsoft.commander.service.BaseService;
import com.arcsoft.commander.service.alert.SysAlertService;

/**
 * The implementation for AlertService.
 * 
 * @author xpeng
 * 
 */
public class SysAlertServiceImpl extends BaseService implements SysAlertService {
	private static String AUTO_DELETE_DAYS = "alert.auto-delete.days";
	private static String AUTO_DELETE_TIME = "alert.auto-delete.time";
	private SysAlertDao sysAlertDao;

	private SystemDao systemDao;
	private ScheduledExecutorService autoDeleteSchedule;
	private ScheduledFuture<?> autoDeleteTask;
	private int MinutesRun = 23 * 60 + 30; // default is 23:30

	protected void init() {
		autoDeleteSchedule = Executors.newScheduledThreadPool(1);

		// Get the auto delete time from database, the format is HH:mm (23:30).
		String autoDeleteTime = systemDao.getString(AUTO_DELETE_TIME);
		if (autoDeleteTime != null) {
			Pattern p = Pattern.compile("^([0-1]?[0-9]|[2][0-3])\\:([0-5]?[0-9])$");
			Matcher m = p.matcher(autoDeleteTime);
			if (m.find()) {
				MinutesRun = Integer.parseInt(m.group(1)) * 60;
				MinutesRun += Integer.parseInt(m.group(2));
				LOG.info("The alert auto delete time is " + autoDeleteTime);
			} else {
				LOG.warn("Invalid alert delete time " + autoDeleteTime + ", the default value will be used.");
			}
		} else {
			LOG.info("The alert auto delete time has not set, the default value will be used.");
		}

		int deleteBeforeDays = StringHelper.toDefaultIfNull(systemDao.getInteger(AUTO_DELETE_DAYS), 0);
		setAutoDeleteBeforeDays(deleteBeforeDays);
	}

	protected void destroy() {
		if (autoDeleteTask != null) {
			autoDeleteTask.cancel(false);
		}

		if (autoDeleteSchedule != null) {
			autoDeleteSchedule.shutdown();
		}		
	}
	
	public void setSystemDao(SystemDao systemDao) {
		this.systemDao = systemDao;
	}

	public SysAlertDao getAlertDao() {
		return sysAlertDao;
	}

	public void setAlertDao(SysAlertDao sysAlertDao) {
		this.sysAlertDao = sysAlertDao;
	}

	@Override
	public Pager getAlerts(QueryInfo query, int pageIndex, int pageSize) {
		return sysAlertDao.list(query, pageIndex, pageSize);
	}

	@Override
	public List<SysAlert> queryList(Date beginTime,Date endTime,int pageIndex,int pageSize) {
		return sysAlertDao.queryList( beginTime,endTime,pageIndex,pageSize);
	}


	@Override
	public void addAlert(SysAlert alert) {
		sysAlertDao.save(alert);
	}

	@Override
	public void deleteAlert(SysAlert alert) {
		sysAlertDao.delete(alert);
	}

	@Override
	public void deleteAlerts(Condition condition) {
		sysAlertDao.deleteAll(condition);
	}

	@Override
	public int getAutoDeleteBeforeDays() {
		return StringHelper.toDefaultIfNull(systemDao.getInteger(AUTO_DELETE_DAYS), 0);
	}

	@Override
	public void setAutoDeleteBeforeDays(int deleteBeforeDays) {
		systemDao.setInteger(AUTO_DELETE_DAYS, deleteBeforeDays);
		
		if (deleteBeforeDays > 0) {
			// add the schedule task to delete history records 
			try {
				// 23:30:00
				Calendar with = Calendar.getInstance();
				with.setTime(new Date());
				int hour = with.get(Calendar.HOUR_OF_DAY);
				int Minutes = with.get(Calendar.MINUTE);

				int MinutesPassed = hour * 60 + Minutes;
				int OneDayMinutes = 24 * 60;
				long DelayInMinutes = MinutesPassed <= MinutesRun ? MinutesRun - MinutesPassed : OneDayMinutes - (MinutesPassed - MinutesRun);

				if (autoDeleteTask != null)
					autoDeleteTask.cancel(false);
				autoDeleteTask = autoDeleteSchedule.scheduleAtFixedRate(new DeleteHistoryRecordsTask(sysAlertDao, deleteBeforeDays), DelayInMinutes, OneDayMinutes, TimeUnit.MINUTES);
			} catch (Exception e) {
			    e.getStackTrace();  
			}  
		}
		else {
			// remove the schedule task to delete history records 
			if (autoDeleteTask != null) {
				autoDeleteTask.cancel(false);
				autoDeleteTask = null;
			}
		}
	}

	class DeleteHistoryRecordsTask implements Runnable{
		private static final long TIME_DAY_MILLISECONDS = 86400000;
		private SysAlertDao sysAlertDao;
		private int autoDeleteBeforeDays;
		
		DeleteHistoryRecordsTask(SysAlertDao sysAlertDao, int autoDeleteBeforeDays) {
			this.sysAlertDao = sysAlertDao;
			this.autoDeleteBeforeDays = autoDeleteBeforeDays;			
		}

		public void run() {
			Date now = new Date();
			Date dtEnd = new Date(now.getTime() - autoDeleteBeforeDays * TIME_DAY_MILLISECONDS);
			Condition cond = Condition.lt("createdAt", dtEnd);
			try {
				sysAlertDao.deleteAll(cond);
			} catch (Exception e) {
			}
			
		}  
	}  

}
