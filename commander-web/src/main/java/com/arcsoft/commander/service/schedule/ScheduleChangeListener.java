package com.arcsoft.commander.service.schedule;

import com.arcsoft.commander.domain.schedule.Schedule;

/**
 * Schedule change listener.
 * 
 * @author fjli
 */
public interface ScheduleChangeListener {

	/**
	 * Notify while schedule is added.
	 * 
	 * @param schedule - the schedule
	 */
	void scheduleAdded(Schedule schedule);

	/**
	 * Notify while schedule is updated.
	 * 
	 * @param schedule - the schedule
	 */
	void scheduleUpdated(Schedule schedule);

	/**
	 * Notify while schedule is removed.
	 * 
	 * @param schedule - the schedule
	 */
	void scheduleRemoved(Schedule schedule);

}
