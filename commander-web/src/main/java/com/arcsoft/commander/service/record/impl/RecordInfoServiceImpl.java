package com.arcsoft.commander.service.record.impl;

import java.util.ArrayList;
import java.util.List;

import com.arcsoft.web4transcoder.service.TaskService;
import org.apache.log4j.Logger;
import org.springframework.beans.BeanUtils;

import com.arcsoft.arcvideo.common.utils.StringHelper;
import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.arcvideo.orm.query.Pager;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.dao.record.RecordInfoDao;
import com.arcsoft.commander.dao.system.SystemDao;
import com.arcsoft.commander.domain.record.EpgItemRecordInfo;
import com.arcsoft.commander.domain.record.EpgRecordInfo;
import com.arcsoft.commander.domain.record.RecordInfo;
import com.arcsoft.commander.domain.record.RecordSetting;
import com.arcsoft.commander.domain.record.RecordTask;
import com.arcsoft.commander.domain.record.RecordType;
import com.arcsoft.commander.domain.schedule.Schedule;
import com.arcsoft.commander.service.BaseService;
import com.arcsoft.commander.service.Transaction;
import com.arcsoft.commander.service.record.RecordInfoService;
import com.arcsoft.commander.service.record.RecordTaskService;
import com.arcsoft.commander.service.schedule.SchedulePersistentService;
import com.arcsoft.commander.service.task.TaskExecuteService;
import com.arcsoft.util.SystemExecutor;

/**
 * Record info service.
 * 
 * @author fjli
 */
public class RecordInfoServiceImpl extends BaseService implements RecordInfoService, Transaction {

	private RecordInfoDao recordInfoDao;
	private SchedulePersistentService schedulePersistentService;
	private RecordTaskService recordTaskService;
	private TaskExecuteService taskExecuteService;
	private SystemDao systemDao;
	private TaskService taskService;

	private Logger log = Logger.getLogger(RecordInfoServiceImpl.class);

	public void setRecordInfoDao(RecordInfoDao recordInfoDao) {
		this.recordInfoDao = recordInfoDao;
	}

	public void setRecordTaskService(RecordTaskService recordTaskService) {
		this.recordTaskService = recordTaskService;
	}

	public void setSchedulePersistentService(SchedulePersistentService schedulePersistentService) {
		this.schedulePersistentService = schedulePersistentService;
	}

	public void setTaskExecuteService(TaskExecuteService taskExecuteService) {
		this.taskExecuteService = taskExecuteService;
	}

	public void setSystemDao(SystemDao systemDao) {
		this.systemDao = systemDao;
	}

	public void setTaskService(TaskService taskService) {
		this.taskService = taskService;
	}

	@Override
	public Pager list(QueryInfo info, int pageIndex, int pageSize) {
		return recordInfoDao.list(info, pageIndex, pageSize);
	}

	@Override
	public RecordInfo find(Long scheduleId) {
		QueryInfo info = new QueryInfo();
		info.setCondition(Condition.eq("schedule.id", scheduleId));
		List<RecordInfo> list = recordInfoDao.list(info);
		if (list != null && !list.isEmpty()) {
			return list.get(0);
		} else {
			return null;
		}
	}

	@Override
	public RecordInfo get(int id) {
		return recordInfoDao.get(id);
	}

	@Override
	public RecordInfo save(RecordInfo info) {
		if (info.getSchedule() != null) {
			info.getSchedule().setName(info.getName());
			info.getSchedule().setSource("RECORD");
			schedulePersistentService.save(info.getSchedule());
		}
		RecordInfo newInfo = recordInfoDao.save(info);
		if (newInfo instanceof EpgRecordInfo) {
			EpgRecordInfo epgInfo = (EpgRecordInfo) info;
			for (EpgItemRecordInfo epgItem : epgInfo.getEpgItemRecordInfos()) {
				epgItem.setParent((EpgRecordInfo) newInfo);
				this.save(epgItem);
			}
		}
		return newInfo;
	}

	@Override
	public RecordInfo update(RecordInfo info) {
		if (info.getSchedule() != null) {
			info.getSchedule().setName(info.getName());
			info.getSchedule().setSource("RECORD");
			schedulePersistentService.update(info.getSchedule());
		}
		return recordInfoDao.update(info);
	}

	private List<RecordInfo> getEpgRecordInfos(Integer id) {
		QueryInfo queryInfo = new QueryInfo();
		queryInfo.setCondition(Condition.eq("parent.id", id));
		List<RecordInfo> epgItems = recordInfoDao.list(queryInfo);
		return epgItems;
	}

	@Override
	public void delete(Integer id) {
		RecordInfo info = recordInfoDao.get(id);
		if (info != null) {
			// delete EPG record items.
			if (info instanceof EpgRecordInfo) {
				List<RecordInfo> epgItems = getEpgRecordInfos(id);
				recordInfoDao.deleteEpgItems(id);
				deleteScheduleAndTasks(epgItems.toArray(new RecordInfo[0]));
			}

			// delete record.
			recordInfoDao.delete(info.getId());
			deleteScheduleAndTasks(info);
		}
	}

	private void deleteScheduleAndTasks(RecordInfo ...records) {
		List<Schedule> schedules = new ArrayList<>();
		List<Integer> recordIds = new ArrayList<>();
		for (RecordInfo record : records) {
			if (record.getSchedule() != null) {
				schedules.add(record.getSchedule());
			}
			recordIds.add(record.getId());
		}
		Integer[] ids = recordIds.toArray(new Integer[0]);
		if (!schedules.isEmpty()) {
			schedulePersistentService.delete(schedules.toArray(new Schedule[0]));
		}
		stopAndRemoveRelationTasks(ids);
	}

	private void stopAndRemoveRelationTasks(final Integer[] ids) {
		final List<RecordTask> tasks = recordTaskService.getRecordTasksByRecordId(ids);
        for ( RecordTask task : tasks){
            log.info("stopAndRemoveRelationTasks task id=" + task.getId());
            taskService.deleteTask(task.getId());
        }
		recordTaskService.deleteTasksByRecordId(ids);
		if (tasks != null && !tasks.isEmpty()) {
			SystemExecutor.getThreadPoolExecutor().execute(new Runnable() {
				@Override
				public void run() {
					taskExecuteService.stopTasks(tasks);
				}
			});
		}
	}

	@Override
	public void updateSchedule(Integer id) {
		RecordInfo info = recordInfoDao.get(id);
		if (info != null && info.getSchedule() != null
				&& (info.getRecordType() == RecordType.FULLTIME || info.getRecordType() == RecordType.SCHEDULE)) {
			// delete schedule and tasks.
			recordInfoDao.deleteSchedule(id);
			deleteScheduleAndTasks(info);

			// add new schedule
			Schedule newSchedule = copySchedule(info.getSchedule());
			schedulePersistentService.save(newSchedule);
			info.setSchedule(newSchedule);
			recordInfoDao.update(info);
		}
	}

	private Schedule copySchedule(Schedule schedule) {
		Schedule newSchedule = new Schedule();
		BeanUtils.copyProperties(schedule, newSchedule);
		newSchedule.setDisabled(false);
		newSchedule.setFinished(false);
		newSchedule.setNextTime(null);
		newSchedule.setLastTime(null);
		newSchedule.setFirstTime(null);
		newSchedule.setFinalTime(null);
		return newSchedule;
	}

	@Override
	public RecordSetting getSetting() {
		RecordSetting setting = new RecordSetting();
		setting.setStartOffsetTime(StringHelper.toDefaultIfNull(systemDao.getInteger("record.offset.start"), 60));
		setting.setStopOffsetTime(StringHelper.toDefaultIfNull(systemDao.getInteger("record.offset.stop"), 60));
		setting.setEnableTempExtension(StringHelper.toDefaultIfNull(systemDao.getBoolean("record.temp.extension.enabled"), Boolean.TRUE));
		setting.setTempExtension(StringHelper.toDefaultIfNull(systemDao.getString("record.temp.extension"), ".arcls"));

		setting.setThumbWidth(StringHelper.toDefaultIfNull(systemDao.getInteger("record.thumb.width"), 640));
		setting.setEnableThumb(StringHelper.toDefaultIfNull(systemDao.getBoolean("record.thumb.enabled"), false));

		setting.setFulltimeFilePath(StringHelper.toDefaultIfNull(systemDao.getString("record.fulltime.filepath"), ""));
		setting.setFulltimeFileName(StringHelper.toDefaultIfNull(systemDao.getString("record.fulltime.filename"), "收录-#{channel.name}-${yyyy}${MM}${dd}-${HH}${mm}${ss}"));
		setting.setFulltimeKeepTimes(systemDao.getInteger("record.fulltime.keeptimes"));

		setting.setScheduleFilePath(StringHelper.toDefaultIfNull(systemDao.getString("record.schedule.filepath"), ""));
		setting.setScheduleFileName(StringHelper.toDefaultIfNull(systemDao.getString("record.schedule.filename"), "收录-#{channel.name}-#{name}-#{starttime|yyyyMMddHHmmss}"));

		setting.setEpgFilePath(StringHelper.toDefaultIfNull(systemDao.getString("record.epg.filepath"), ""));
		setting.setEpgFileName(StringHelper.toDefaultIfNull(systemDao.getString("record.epg.filename"), "收录-#{channel.name}-#{name}-#{starttime|yyyyMMddHHmmss}"));

		setting.setFtpip(StringHelper.toDefaultIfNull(systemDao.getString("record.ftp.ip"), ""));
		setting.setFtpuser(StringHelper.toDefaultIfNull(systemDao.getString("record.ftp.username"), ""));
		setting.setFtppass(StringHelper.toDefaultIfNull(systemDao.getString("record.ftp.password"), ""));
		setting.setFtpPath(StringHelper.toDefaultIfNull(systemDao.getString("record.ftp.path"), ""));

		return setting;
	}

	@Override
	public void saveSetting(RecordSetting setting) {
		systemDao.setInteger("record.offset.start", setting.getStartOffsetTime());
		systemDao.setInteger("record.offset.stop", setting.getStopOffsetTime());
		systemDao.setBoolean("record.temp.extension.enabled", setting.getEnableTempExtension());
		systemDao.setString("record.temp.extension", StringHelper.trim(setting.getTempExtension()));

		systemDao.setInteger("record.thumb.width", setting.getThumbWidth());
		systemDao.setBoolean("record.thumb.enabled", setting.getEnableThumb());

		systemDao.setString("record.fulltime.filepath", StringHelper.trim(setting.getFulltimeFilePath()));
		systemDao.setString("record.fulltime.filename", StringHelper.trim(setting.getFulltimeFileName()));
		systemDao.setInteger("record.fulltime.keeptimes", setting.getFulltimeKeepTimes());

		systemDao.setString("record.schedule.filepath", StringHelper.trim(setting.getScheduleFilePath()));
		systemDao.setString("record.schedule.filename", StringHelper.trim(setting.getScheduleFileName()));

		systemDao.setString("record.epg.filepath", StringHelper.trim(setting.getEpgFilePath()));
		systemDao.setString("record.epg.filename", StringHelper.trim(setting.getEpgFileName()));

		systemDao.setString("record.ftp.ip", StringHelper.trim(setting.getFtpip()));
		systemDao.setString("record.ftp.username", StringHelper.trim(setting.getFtpuser()));
		systemDao.setString("record.ftp.password", StringHelper.trim(setting.getFtppass()));
		systemDao.setString("record.ftp.path", StringHelper.trim(setting.getFtpPath()));

	}

}
