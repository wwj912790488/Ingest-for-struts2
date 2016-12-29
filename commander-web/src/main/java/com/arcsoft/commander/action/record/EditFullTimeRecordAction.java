package com.arcsoft.commander.action.record;

import java.sql.Date;
import java.sql.Time;

import com.arcsoft.arcvideo.web.struts.result.ActionResult;
import com.arcsoft.commander.domain.record.FullTimeRecordInfo;
import com.arcsoft.commander.domain.schedule.EndType;
import com.arcsoft.commander.domain.schedule.Schedule;

/**
 * Task for edit record task.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class EditFullTimeRecordAction extends EditRecordAction<FullTimeRecordInfo> {

	private boolean alwaysLoop;
	private boolean startNow;

	public void setStartNow(boolean startNow) {
		this.startNow = startNow;
	}

	public boolean isAlwaysLoop() {
		return alwaysLoop;
	}

	public void setAlwaysLoop(boolean alwaysLoop) {
		this.alwaysLoop = alwaysLoop;
	}

	@Override
	public String edit() {
		String result = super.edit();
		if (result.equals(SUCCESS)) {
			alwaysLoop = task.getSchedule().getEndType() != EndType.BYTIME;
		}
		return result;
	}

	@Override
	public String update() {
		Schedule schedule = task.getSchedule();
		if (startNow) {
			long current = System.currentTimeMillis();
			schedule.setStartDate(new Date(current));
			schedule.setStartTime(new Time(current));
		}
		if (alwaysLoop) {
			schedule.setEndType(EndType.CONTINUOUS);
			schedule.setEndDate(null);
			schedule.setEndTime(null);
		} else {
			schedule.setEndType(EndType.BYTIME);
		}
		recordInfoService.update(task);
		result = new ActionResult(true);
		return SUCCESS;
	}

}
