package com.arcsoft.commander.service.schedule;

import java.sql.Date;
import java.util.List;

import com.arcsoft.commander.domain.schedule.Schedule;
import com.arcsoft.commander.domain.schedule.ScheduleEvent;
import com.arcsoft.commander.domain.schedule.ScheduleType;

/**
 * Schedule event parser.
 * 
 * @author fjli
 */
public interface ScheduleEventParser {

	ScheduleType getScheduleType();

	ScheduleEvent getFirstSchedule(Schedule schedule);

	ScheduleEvent getFinalSchedule(Schedule schedule);

	ScheduleEvent getNextSchedule(Schedule schedule, Date start);

	List<ScheduleEvent> getSchedules(Schedule schedule, Date start, Date end);

}
