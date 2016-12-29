package com.arcsoft.commander.service.schedule.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.dao.schedule.ScheduleDao;
import com.arcsoft.commander.dao.schedule.ScheduleEventDao;
import com.arcsoft.commander.dao.schedule.ScheduleTriggerDao;
import com.arcsoft.commander.domain.schedule.Schedule;
import com.arcsoft.commander.domain.schedule.ScheduleEvent;
import com.arcsoft.commander.domain.schedule.ScheduleTrigger;
import com.arcsoft.commander.service.BaseService;
import com.arcsoft.commander.service.Transaction;
import com.arcsoft.commander.service.TransactionUtils;
import com.arcsoft.commander.service.schedule.ScheduleChangeListener;
import com.arcsoft.commander.service.schedule.SchedulePersistentService;

/**
 * Schedule service.
 * 
 * @author fjli
 */
public class SchedulePersistentServiceImpl extends BaseService implements SchedulePersistentService, Transaction {

	private ScheduleDao scheduleDao;
	private ScheduleEventDao scheduleEventDao;
	private ScheduleTriggerDao scheduleTriggerDao;
	private ScheduleChangeListener scheduleChangeListener;

	public void setScheduleDao(ScheduleDao scheduleDao) {
		this.scheduleDao = scheduleDao;
	}

	public void setScheduleEventDao(ScheduleEventDao scheduleEventDao) {
		this.scheduleEventDao = scheduleEventDao;
	}

	public void setScheduleTriggerDao(ScheduleTriggerDao scheduleTriggerDao) {
		this.scheduleTriggerDao = scheduleTriggerDao;
	}

	public void setScheduleChangeListener(ScheduleChangeListener scheduleChangeListener) {
		this.scheduleChangeListener = scheduleChangeListener;
	}

	@Override
	public Schedule get(Long id) {
		return scheduleDao.get(id);
	}


	@Override
	public void save(final Schedule schedule) {
		scheduleDao.save(schedule);
		sendEvent(schedule, "save");
	}

	private void sendEvent(final Schedule schedule, final String action) {
		TransactionUtils.executeAfterCommit(new Runnable() {
			@Override
			public void run() {
				if ("save".equals(action)) {
					scheduleChangeListener.scheduleAdded(schedule);
				} else if ("update".equals(action)) {
					scheduleChangeListener.scheduleUpdated(schedule);
				} else if ("delete".equals(action)) {
					scheduleChangeListener.scheduleRemoved(schedule);
				}
			}
		});
	}

	@Override
	public void update(Schedule schedule) {
		scheduleDao.update(schedule);
		sendEvent(schedule, "update");
	}

	@Override
	public void delete(Schedule ...schedules) {
		List<Long> ids = new ArrayList<>();
		for (Schedule schedule : schedules) {
			ids.add(schedule.getId());
		}
		scheduleDao.deleteAll(Condition.in("id", ids));
		for (Schedule schedule : schedules) {
			sendEvent(schedule, "delete");
		}
	}

	@Override
	public void updateFinished(Schedule schedule) {
		scheduleDao.updateFinished(schedule.getId(), true);
	}

	@Override
	public ScheduleEvent getEvent(Long eventId) {
		return scheduleEventDao.get(eventId);
	}

	@Override
	public void saveEvent(Schedule schedule, ScheduleEvent event) {
		scheduleEventDao.save(event);
		scheduleDao.update(schedule);
	}

	@Override
	public void deleteEvent(ScheduleEvent event) {
		scheduleEventDao.delete(event);
	}

	@Override
	public void updateFinished(ScheduleTrigger trigger) {
		scheduleTriggerDao.updateFinished(trigger.getId(), true);
	}

	@Override
	public List<ScheduleTrigger> findUnTriggeredTriggers(Timestamp time) {
		QueryInfo info = new QueryInfo();
		info.setCondition(Condition.and(
				Condition.ne("triggered", Boolean.TRUE),
				Condition.lt("scheduleTime", time)
			));
		return scheduleTriggerDao.list(info);
	}

	@Override
	public void updateTriggered(ScheduleTrigger trigger) {
		scheduleTriggerDao.updateTriggered(trigger.getId(), true);
	}


	@Override
	public void updateThisTriggered(ScheduleTrigger trigger) {
		scheduleTriggerDao.update(trigger);
	}
}
