package com.arcsoft.commander.service.schedule;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import com.arcsoft.commander.domain.schedule.EndType;
import com.arcsoft.commander.domain.schedule.Schedule;
import com.arcsoft.commander.domain.schedule.ScheduleEvent;
import com.arcsoft.commander.domain.schedule.ScheduleType;
import com.arcsoft.commander.domain.schedule.StartType;

public class OnceScheduleEventParser implements ScheduleEventParser {

	@Override
	public ScheduleType getScheduleType() {
		return ScheduleType.ONCE;
	}

	@Override
	public ScheduleEvent getFirstSchedule(Schedule schedule) {
		Timestamp startTime = ScheduleUtils.toTimestamp(schedule.getStartDate(), schedule.getStartTime());
		Timestamp stopTime = null;
		if (schedule.getEndType() == EndType.BYTIME) {
			stopTime = ScheduleUtils.toTimestamp(schedule.getEndDate(), schedule.getEndTime());
		}
		return ScheduleUtils.createScheduleEvent(schedule, startTime, stopTime);
	}

	@Override
	public ScheduleEvent getFinalSchedule(Schedule schedule) {
		return getFirstSchedule(schedule);
	}

	@Override
	public List<ScheduleEvent> getSchedules(Schedule schedule, Date start, Date end) {
		List<ScheduleEvent> events = new ArrayList<>();
		if (schedule.getStartType() != StartType.SCHEDULE) {
			throw new IllegalArgumentException("invalid schedule type: " + schedule.getStartType());
		}
		if (ScheduleUtils.isBefore(end, schedule.getStartDate())) {
			return events;
		}
		if (schedule.getEndType() == EndType.BYTIME && ScheduleUtils.isAfter(start, schedule.getEndDate())) {
			return events;
		}
		events.add(getFirstSchedule(schedule));
		return events;
	}

	@Override
	public ScheduleEvent getNextSchedule(Schedule schedule, Date start) {
		if (!ScheduleUtils.isAfter(start, schedule.getStartDate())) {
			return getFirstSchedule(schedule);
		}
		return null;
	}

}
