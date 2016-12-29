package com.arcsoft.commander.service.schedule;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import com.arcsoft.commander.domain.schedule.EndType;
import com.arcsoft.commander.domain.schedule.RepeatEndType;
import com.arcsoft.commander.domain.schedule.Schedule;
import com.arcsoft.commander.domain.schedule.ScheduleEvent;
import com.arcsoft.commander.domain.schedule.ScheduleType;

/**
 * Weekly schedule event parser.
 * 
 * @author fjli
 */
public class WeeklyScheduleEventParser implements ScheduleEventParser {

	@Override
	public ScheduleType getScheduleType() {
		return ScheduleType.WEEKLY;
	}

	@Override
	public ScheduleEvent getFirstSchedule(Schedule schedule) {
		Calendar date = getFirstScheduleTime(schedule);
		if (date != null) {
			return createScheduleEvent(schedule, date);
		} else {
			return null;
		}
	}

	@Override
	public ScheduleEvent getFinalSchedule(Schedule schedule) {
		if (schedule.getRepeatEndType() == RepeatEndType.FOREVER) {
			return null;
		} else if (schedule.getRepeatEndType() == RepeatEndType.BYDATE) {
			// Get the first schedule time.
			Calendar date = getFirstScheduleTime(schedule);
			if (date == null) {
				return null;
			}
			// Save date for compare in loop.
			Date firstDate = new Date(date.getTimeInMillis());
			// Jump to the final available week end.
			jumpToFinalAvailableWeekEndBeforeGivenDate(date, schedule.getRepeatEndDate(), schedule.getInterval());
			while (true) {
				if (hasMatchedWeekday(date.get(Calendar.DAY_OF_WEEK), schedule)) {
					// the last available date is found
					return createScheduleEvent(schedule, date);
				} else {
					// try previous day
					date.add(Calendar.DAY_OF_MONTH, -1);
					// check the previous day is before first date.
					if (ScheduleUtils.isBefore(new Date(date.getTimeInMillis()), firstDate)) {
						break;
					}
				}
			}
		} else {
			throw new IllegalArgumentException("Unsupported repeat end type: " + schedule.getRepeatEndType());
		}
		return null;
	}

	@Override
	public ScheduleEvent getNextSchedule(Schedule schedule, Date start) {
		// Get the first schedule time.
		Calendar date = getFirstScheduleTime(schedule);
		if (date == null) {
			return null;
		}
		if (ScheduleUtils.isAfter(start, new Date(date.getTimeInMillis()))) {
			// Jump to the final available week end before start date.
			jumpToFinalAvailableWeekEndBeforeGivenDate(date, start, schedule.getInterval());
			// To calculate the first start date.
			if (ScheduleUtils.isBefore(new Date(date.getTimeInMillis()), start)) {
				// The start is not in available week, so jump to next available day.
				date.add(Calendar.DAY_OF_MONTH, schedule.getInterval() * 7 - 6);
			} else {
				// The start is in available week, use the start date.
				date = ScheduleUtils.toCalendar(start, schedule.getStartTime());
			}
		}

		// If end date is after repeat end date, use repeat end as end date.
		Date end = null;
		if (schedule.getRepeatEndType() == RepeatEndType.BYDATE) {
			end = schedule.getRepeatEndDate();
		}

		// Loop for get the first available events.
		while (true) {
			if (end != null && ScheduleUtils.isAfter(new Date(date.getTimeInMillis()), end)) {
				break;
			}
			int weekday = date.get(Calendar.DAY_OF_WEEK);
			if (hasMatchedWeekday(weekday, schedule)) {
				return createScheduleEvent(schedule, date);
			}
			if (weekday == Calendar.SATURDAY) {
				date.add(Calendar.DAY_OF_MONTH, (schedule.getInterval() - 1) * 7);
			}
			date.add(Calendar.DAY_OF_MONTH, 1);
		}
		return null;
	}

	@Override
	public List<ScheduleEvent> getSchedules(Schedule schedule, Date start, Date end) {
		// Get the first schedule time.
		Calendar date = getFirstScheduleTime(schedule);
		if (date == null) {
			return new ArrayList<>();
		}
		if (ScheduleUtils.isAfter(start, new Date(date.getTimeInMillis()))) {
			// Jump to the final available week end before start date.
			jumpToFinalAvailableWeekEndBeforeGivenDate(date, start, schedule.getInterval());
			// To calculate the first start date.
			if (ScheduleUtils.isBefore(new Date(date.getTimeInMillis()), start)) {
				// The start is not in available week, so jump to next available day.
				date.add(Calendar.DAY_OF_MONTH, schedule.getInterval() * 7 - 6);
			} else {
				// The start is in available week, use the start date.
				date = ScheduleUtils.toCalendar(start, schedule.getStartTime());
			}
		}

		// If end date is after repeat end date, use repeat end as end date.
		if (schedule.getRepeatEndType() == RepeatEndType.BYDATE && ScheduleUtils.isAfter(end, schedule.getRepeatEndDate())) {
			end = schedule.getRepeatEndDate();
		}

		// Loop for get available events.
		List<ScheduleEvent> events = new ArrayList<>();
		while (true) {
			if (ScheduleUtils.isAfter(new Date(date.getTimeInMillis()), end)) {
				break;
			}
			int weekday = date.get(Calendar.DAY_OF_WEEK);
			if (hasMatchedWeekday(weekday, schedule)) {
				events.add(createScheduleEvent(schedule, date));
			}
			if (weekday == Calendar.SATURDAY) {
				date.add(Calendar.DAY_OF_MONTH, (schedule.getInterval() - 1) * 7);
			}
			date.add(Calendar.DAY_OF_MONTH, 1);
		}
		return events;
	}

	private Calendar getFirstScheduleTime(Schedule schedule) {
		Calendar date = ScheduleUtils.toCalendar(schedule.getStartDate(), schedule.getStartTime());
		while (true) {
			int weekday = date.get(Calendar.DAY_OF_WEEK);
			if (hasMatchedWeekday(weekday, schedule)) {
				return date;
			} else {
				date.add(Calendar.DAY_OF_MONTH, 1);
				if (schedule.getRepeatEndType() == RepeatEndType.BYDATE) {
					if (ScheduleUtils.isAfter(new Date(date.getTimeInMillis()), schedule.getRepeatEndDate())) {
						break;
					}
				}
			}
		}
		return null;
	}

	private void jumpToFinalAvailableWeekEndBeforeGivenDate(Calendar date, Date givenDate, int weeklyX) {
		// The first week day (Sunday) of first schedule time.
		date.add(Calendar.DAY_OF_MONTH, -(date.get(Calendar.DAY_OF_WEEK) - 1));
		int datediff = ScheduleUtils.dateDiff(givenDate, new Date(date.getTimeInMillis()));
		int finalWeekEnd = (datediff / (weeklyX * 7)) * weeklyX * 7 + 6;
		// The final available week end before given date
		date.add(Calendar.DAY_OF_MONTH, Math.min(datediff, finalWeekEnd));
	}

	private ScheduleEvent createScheduleEvent(Schedule schedule, Calendar date) {
		Timestamp startTime = ScheduleUtils.toTimestamp(new Date(date.getTimeInMillis()), schedule.getStartTime());
		Timestamp stopTime = null;
		if (schedule.getEndType() == EndType.BYTIME) {
			int days = ScheduleUtils.dateDiff(new Date(startTime.getTime()), schedule.getStartDate());
			Calendar stop = ScheduleUtils.toCalendar(schedule.getEndDate(), schedule.getEndTime());
			stop.add(Calendar.DAY_OF_MONTH, days);
			stopTime = ScheduleUtils.toTimestamp(new Date(stop.getTimeInMillis()), schedule.getEndTime());
		}
		return ScheduleUtils.createScheduleEvent(schedule, startTime, stopTime);
	}

	private boolean hasMatchedWeekday(int weekday, Schedule schedule) {
		int mask = 1 << (weekday - 1);
		return (mask & schedule.getDays()) != 0;
	}

}
