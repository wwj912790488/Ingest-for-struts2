package com.arcsoft.commander.action.record;

import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

import com.arcsoft.arcvideo.web.struts.result.ActionResult;
import com.arcsoft.commander.domain.channel.Channel;
import com.arcsoft.commander.domain.record.FullTimeRecordInfo;
import com.arcsoft.commander.domain.schedule.EndType;
import com.arcsoft.commander.domain.schedule.Schedule;

/**
 * Action for add full time record info.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class AddFullTimeRecordAction extends AddRecordAction<FullTimeRecordInfo> {

	private boolean startNow;
	private boolean alwaysLoop;

	public void setStartNow(boolean startNow) {
		this.startNow = startNow;
	}

	public void setAlwaysLoop(boolean alwaysLoop) {
		this.alwaysLoop = alwaysLoop;
	}

	@Override
	protected FullTimeRecordInfo createTask() {
		return new FullTimeRecordInfo();
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
		recordInfoService.save(task);
		result = new ActionResult(true);
		return SUCCESS;
	}

	public String saveBatchRecord() {

        for (Channel channel : task.getChannels()){
            task.setChannelId(channel.getId());

			try{
				save();
				Thread.sleep(50);
			}catch(Exception e){

			}

        }

        result = new ActionResult(true);
		return SUCCESS;
	}



}
