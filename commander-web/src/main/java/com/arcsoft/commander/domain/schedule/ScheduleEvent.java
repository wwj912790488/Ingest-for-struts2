package com.arcsoft.commander.domain.schedule;

import java.util.List;

/**
 * Schedule event.
 * 
 * @author fjli
 */
public class ScheduleEvent {

	private Long id;
	private Schedule schedule;
	private List<ScheduleTrigger> triggers;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Schedule getSchedule() {
		return schedule;
	}

	public void setSchedule(Schedule schedule) {
		this.schedule = schedule;
	}

	public List<ScheduleTrigger> getTriggers() {
		return triggers;
	}

	public void setTriggers(List<ScheduleTrigger> triggers) {
		this.triggers = triggers;
	}

}
