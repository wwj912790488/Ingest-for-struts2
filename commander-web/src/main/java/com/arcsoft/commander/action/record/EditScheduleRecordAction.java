package com.arcsoft.commander.action.record;

import java.sql.Date;
import java.util.Calendar;

import com.arcsoft.arcvideo.web.struts.result.ActionResult;
import com.arcsoft.commander.domain.record.RecordInfo;
import com.arcsoft.commander.domain.schedule.EndType;
import com.arcsoft.commander.domain.schedule.Schedule;

/**
 * Task for edit record task.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class EditScheduleRecordAction extends EditRecordAction<RecordInfo> {

	@Override
	public String update() {
		Schedule schedule = task.getSchedule();
		if (schedule != null && schedule.getEndType() == EndType.BYTIME) {
			if (schedule.getEndTime().before(schedule.getStartTime())) {
				Calendar c = Calendar.getInstance();
				c.setTime(schedule.getStartDate());
				c.add(Calendar.DAY_OF_MONTH, 1);
				schedule.setEndDate(new Date(c.getTimeInMillis()));
			} else {
				schedule.setEndDate(schedule.getStartDate());
			}
		}
		recordInfoService.update(task);
		result = new ActionResult(true);
		return SUCCESS;
	}

}
