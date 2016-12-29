package com.arcsoft.commander.domain.schedule;

import java.sql.Time;
import java.sql.Date;
import java.sql.Timestamp;

/**
 * Schedule.
 * 
 * @author fjli
 */
public class Schedule {

	private Long id;
	private String name;
	private String source;
	private ScheduleType scheduleType;
	private StartType startType;
	private Date startDate;
	private Time startTime;
	private EndType endType;
	private Date endDate;
	private Time endTime;
	private RepeatEndType repeatEndType;
	private Date repeatEndDate;
	private int interval;
	private int days;
	private Timestamp firstTime;
	private Timestamp finalTime;
	private Timestamp nextTime;
	private Timestamp lastTime;
	private boolean disabled;
	private boolean finished;
	private Timestamp createdAt;


	public Schedule() {
		setScheduleType(ScheduleType.ONCE);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public ScheduleType getScheduleType() {
		return scheduleType;
	}

	public void setScheduleType(ScheduleType scheduleType) {
		this.scheduleType = scheduleType;
	}

	public StartType getStartType() {
		return startType;
	}

	public void setStartType(StartType startType) {
		this.startType = startType;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Time getStartTime() {
		return startTime;
	}

	public void setStartTime(Time startTime) {
		this.startTime = startTime;
	}

	public EndType getEndType() {
		return endType;
	}

	public void setEndType(EndType endType) {
		this.endType = endType;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public Time getEndTime() {
		return endTime;
	}

	public void setEndTime(Time endTime) {
		this.endTime = endTime;
	}

	public RepeatEndType getRepeatEndType() {
		return repeatEndType;
	}

	public void setRepeatEndType(RepeatEndType repeatEndType) {
		this.repeatEndType = repeatEndType;
	}

	public Date getRepeatEndDate() {
		return repeatEndDate;
	}

	public void setRepeatEndDate(Date repeatEndDate) {
		this.repeatEndDate = repeatEndDate;
	}

	public int getInterval() {
		return interval;
	}

	public void setInterval(int interval) {
		this.interval = interval;
	}

	public int getDays() {
		return days;
	}

	public void setDays(int days) {
		this.days = days;
	}

	public Timestamp getFirstTime() {
		return firstTime;
	}

	public void setFirstTime(Timestamp firstTime) {
		this.firstTime = firstTime;
	}

	public Timestamp getFinalTime() {
		return finalTime;
	}

	public void setFinalTime(Timestamp finalTime) {
		this.finalTime = finalTime;
	}

	public Timestamp getNextTime() {
		return nextTime;
	}

	public void setNextTime(Timestamp nextTime) {
		this.nextTime = nextTime;
	}

	public Timestamp getLastTime() {
		return lastTime;
	}

	public void setLastTime(Timestamp lastTime) {
		this.lastTime = lastTime;
	}

	public boolean getDisabled() {
		return disabled;
	}

	public void setDisabled(boolean disabled) {
		this.disabled = disabled;
	}

	public boolean getFinished() {
		return finished;
	}

	public void setFinished(boolean finished) {
		this.finished = finished;
	}

	public Timestamp getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Timestamp createdAt) {
		this.createdAt = createdAt;
	}

}
