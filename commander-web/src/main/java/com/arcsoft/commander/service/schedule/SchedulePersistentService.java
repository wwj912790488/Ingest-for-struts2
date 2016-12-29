package com.arcsoft.commander.service.schedule;

import java.sql.Timestamp;
import java.util.List;

import com.arcsoft.commander.domain.schedule.Schedule;
import com.arcsoft.commander.domain.schedule.ScheduleEvent;
import com.arcsoft.commander.domain.schedule.ScheduleTrigger;

/**
 * Schedule service.
 * 
 * @author fjli
 */
public interface SchedulePersistentService {

	Schedule get(Long id);


	void save(Schedule schedule);

	void update(Schedule schedule);

	void delete(Schedule ...schedule);

	void updateFinished(Schedule schedule);

	ScheduleEvent getEvent(Long eventId);

	void saveEvent(Schedule schedule, ScheduleEvent event);

	void deleteEvent(ScheduleEvent event);

	void updateFinished(ScheduleTrigger trigger);

	List<ScheduleTrigger> findUnTriggeredTriggers(Timestamp time);

	void updateTriggered(ScheduleTrigger trigger);

	void updateThisTriggered(ScheduleTrigger trigger);

}
