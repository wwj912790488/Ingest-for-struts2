package com.arcsoft.commander.domain.schedule;

public class ScheduleTriggerEvent {

	private Schedule schedule;
	private ScheduleEvent event;
	private ScheduleTrigger trigger;

	public ScheduleTriggerEvent(Schedule schedule, ScheduleEvent event, ScheduleTrigger trigger) {
		this.schedule = schedule;
		this.event = event;
		this.trigger = trigger;
	}

	public Schedule getSchedule() {
		return schedule;
	}

	public ScheduleEvent getScheduleEvent() {
		return event;
	}

	public ScheduleTrigger getScheduleTrigger() {
		return trigger;
	}

}
