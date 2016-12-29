package com.arcsoft.commander.service.schedule;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.TimeZone;

import com.arcsoft.commander.domain.schedule.Schedule;
import com.arcsoft.commander.domain.schedule.ScheduleEvent;
import com.arcsoft.commander.domain.schedule.ScheduleTrigger;

public class ScheduleUtils {

	private static final int ONE_DAY = 86400000;

	public static Calendar toCalendar(Date date, Time time) {
		Calendar c = Calendar.getInstance();
		c.setTimeInMillis(date.getTime());
		Calendar c1 = Calendar.getInstance();
		c1.setTimeInMillis(time.getTime());
		c.set(Calendar.HOUR_OF_DAY, c1.get(Calendar.HOUR_OF_DAY));
		c.set(Calendar.MINUTE, c1.get(Calendar.MINUTE));
		c.set(Calendar.SECOND, c1.get(Calendar.SECOND));
		return c;
	}

	public static Timestamp toTimestamp(Date date, Time time) {
		Calendar c = toCalendar(date, time);
		return new Timestamp(c.getTimeInMillis());
	}

	public static ScheduleEvent createScheduleEvent(Schedule schedule, Timestamp startTime, Timestamp stopTime) {
		ScheduleEvent event = new ScheduleEvent();
		event.setSchedule(schedule);
		List<ScheduleTrigger> triggers = new ArrayList<>();
		event.setTriggers(triggers);
		triggers.add(new ScheduleTrigger(event, startTime));
		if (stopTime != null) {
			triggers.add(new ScheduleTrigger(event, stopTime));
		}
		return event;
	}

	public static int dateDiff(Date date1, Date date2) {
		int zoneOffset1 = TimeZone.getDefault().getOffset(date1.getTime());
		int zoneOffset2 = TimeZone.getDefault().getOffset(date2.getTime());
		long time1 = (date1.getTime() + zoneOffset1) / ONE_DAY;
		long time2 = (date2.getTime() + zoneOffset2) / ONE_DAY;
		return (int) (time1 - time2);
	}

	public static boolean isBefore(Date date1, Date date2) {
		return dateDiff(date1, date2) < 0;
	}

	public static boolean isAfter(Date date1, Date date2) {
		return dateDiff(date1, date2) > 0;
	}

	public static boolean isEquals(Date date1, Date date2) {
		return dateDiff(date1, date2) == 0;
	}

	public static Date getDatePartOnly(long millis) {
		Calendar c = Calendar.getInstance();
		c.setTimeInMillis(millis);
		return getDatePartOnly(c);
	}

	public static Date getDatePartOnly(Calendar c) {
		c.set(Calendar.HOUR_OF_DAY, 0);
		c.set(Calendar.MINUTE, 0);
		c.set(Calendar.SECOND, 0);
		c.set(Calendar.MILLISECOND, 0);
		return new Date(c.getTimeInMillis());
	}

}
