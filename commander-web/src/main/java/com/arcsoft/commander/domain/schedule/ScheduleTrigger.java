package com.arcsoft.commander.domain.schedule;

import java.sql.Timestamp;

/**
 * Schedule trigger.
 * 
 * @author fjli
 */
public class ScheduleTrigger {

	private long id;
	private ScheduleEvent event;
	private Timestamp scheduleTime;
	private boolean triggered;
	private boolean finished;


	public ScheduleTrigger() {
	}

	public ScheduleTrigger(ScheduleEvent event, Timestamp scheduleTime) {
		this.event = event;
		this.scheduleTime = scheduleTime;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public ScheduleEvent getEvent() {
		return event;
	}

	public void setEvent(ScheduleEvent event) {
		this.event = event;
	}

	public Timestamp getScheduleTime() {
		return scheduleTime;
	}

	public void setScheduleTime(Timestamp scheduleTime) {
		this.scheduleTime = scheduleTime;
	}

	public Boolean getTriggered() {
		return triggered;
	}

	public void setTriggered(boolean triggered) {
		this.triggered = triggered;
	}

	public boolean getFinished() {
		return finished;
	}

	public void setFinished(boolean finished) {
		this.finished = finished;
	}

}
