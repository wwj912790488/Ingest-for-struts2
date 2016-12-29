package com.arcsoft.commander.domain.record;

import com.arcsoft.commander.domain.task.CommanderTask;

/**
 * Record task.
 * 
 * @author fjli
 */
public class RecordTask extends CommanderTask {

	private static final long serialVersionUID = -439203648847262770L;

	private Integer recordId;
	private Long scheduleEventId;

	public Integer getRecordId() {
		return recordId;
	}

	public void setRecordId(Integer recordId) {
		this.recordId = recordId;
	}

	public Long getScheduleEventId() {
		return scheduleEventId;
	}

	public void setScheduleEventId(Long scheduleEventId) {
		this.scheduleEventId = scheduleEventId;
	}

}
