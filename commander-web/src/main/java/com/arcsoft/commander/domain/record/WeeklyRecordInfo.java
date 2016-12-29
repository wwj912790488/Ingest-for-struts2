package com.arcsoft.commander.domain.record;

import java.sql.Date;
import java.util.List;

/**
 * Fulltime record info.
 * 
 * @author fjli
 */
public class WeeklyRecordInfo extends RecordInfo {

	private List<WeeklyItemRecordInfo> weeklyItemRecordInfos;

	public WeeklyRecordInfo() {
		setRecordType(RecordType.SCHEDULE);
	}

	private boolean weeklyRecord;
	private Date repeatEndDate;

	public List<WeeklyItemRecordInfo> getWeeklyItemRecordInfos() {
		return weeklyItemRecordInfos;
	}

	public void setWeeklyItemRecordInfos(List<WeeklyItemRecordInfo> weeklyItemRecordInfos) {
		this.weeklyItemRecordInfos = weeklyItemRecordInfos;
	}

	public boolean isWeeklyRecord() {
		return weeklyRecord;
	}

	public void setWeeklyRecord(boolean weeklyRecord) {
		this.weeklyRecord = weeklyRecord;
	}

	public Date getRepeatEndDate() {
		return repeatEndDate;
	}

	public void setRepeatEndDate(Date repeatEndDate) {
		this.repeatEndDate = repeatEndDate;
	}
}
