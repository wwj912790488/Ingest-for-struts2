package com.arcsoft.commander.action.record;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import com.arcsoft.arcvideo.web.struts.result.ActionResult;
import com.arcsoft.commander.domain.channel.Channel;
import com.arcsoft.commander.domain.record.RecordInfo;
import com.arcsoft.commander.domain.record.RecordType;
import com.arcsoft.commander.domain.schedule.EndType;
import com.arcsoft.commander.domain.schedule.Schedule;

/**
 * Task for add schedule task.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class AddScheduleRecordAction extends AddRecordAction<RecordInfo> {

	@Override
	protected RecordInfo createTask() {
		RecordInfo info = new RecordInfo();
		info.setRecordType(RecordType.SCHEDULE);
		return info;
	}

	@Override
	public String add() {
		super.add();

		List<Channel> channels = new ArrayList<>();
		task.setChannels(channels);
		return SUCCESS;
	}

	@Override
	public String save() {
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

		// save record info.
		recordInfoService.save(task);
		result = new ActionResult(true);
		return SUCCESS;
	}

	public String saveBatchRecord() {

		for (Channel channel : task.getChannels()){
			task.setChannelId(channel.getId());
			save();
		}

		result = new ActionResult(true);
		return SUCCESS;
	}
}
