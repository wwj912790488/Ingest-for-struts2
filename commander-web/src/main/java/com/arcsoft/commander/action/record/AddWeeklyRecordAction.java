package com.arcsoft.commander.action.record;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.Date;
import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import com.arcsoft.arcvideo.web.struts.result.ActionResult;
import com.arcsoft.arcvideo.web.struts.view.Group;
import com.arcsoft.arcvideo.web.struts.view.GroupGenerator;
import com.arcsoft.arcvideo.web.struts.view.GroupView;
import com.arcsoft.commander.domain.record.*;
import com.arcsoft.commander.domain.schedule.*;
import com.arcsoft.commander.service.record.WeeklyParser;
import com.arcsoft.commander.service.record.WeeklyParserFactory;
import com.arcsoft.commander.service.schedule.ScheduleUtils;

/**
 * Add EPG record info.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class AddWeeklyRecordAction extends AddRecordAction<WeeklyRecordInfo> {

	private WeeklyParserFactory weeklyParserFactory;
	private File weeklyFile;
	private GroupView<WeeklyItemRecordInfo> groupView;

	public void setWeeklyParserFactory(WeeklyParserFactory weeklyParserFactory) {
		this.weeklyParserFactory = weeklyParserFactory;
	}

	public void setWeeklyFile(File weeklyFile) {
		this.weeklyFile = weeklyFile;
	}

	public GroupView<WeeklyItemRecordInfo> getGroupView() {
		return groupView;
	}

	@Override
	public String add() {
		// parse the uploaded EPG file.
		WeeklyParser parser = weeklyParserFactory.getParser(null);
		WeeklyList weeklyList = null;
		try {
			weeklyList = parser.parse(weeklyFile.getAbsolutePath());
		} catch (IOException e) {
			return ERROR;
		} finally {
			weeklyFile.delete();
		}

		task = new WeeklyRecordInfo();
		List<WeeklyItemRecordInfo> weeklyItems = new ArrayList<>();
		task.setWeeklyItemRecordInfos(weeklyItems);
		for (WeeklyItem item : weeklyList.getItems()) {
			WeeklyItemRecordInfo recordInfo = new WeeklyItemRecordInfo();
			recordInfo.setName(item.getName());
			Schedule schedule = new Schedule();
			schedule.setStartDate(ScheduleUtils.getDatePartOnly(item.getStartTime().getTime()));
			schedule.setStartTime(new Time(item.getStartTime().getTime()));
			schedule.setEndTime(new Time(item.getEndTime().getTime()));
			schedule.setSource("RECORD");
			schedule.setStartType(StartType.SCHEDULE);
			schedule.setEndType(EndType.BYTIME);
			schedule.setDisabled(true);
			recordInfo.setSchedule(schedule);
			weeklyItems.add(recordInfo);
		}

		// group view.
		groupView = new GroupView<>();
		groupView.setDataList(weeklyItems, new GroupGenerator<WeeklyItemRecordInfo>() {
			@Override
			public Group<WeeklyItemRecordInfo> generate(WeeklyItemRecordInfo item) {
				String date = item.getSchedule().getStartDate().toString();
				int weekday = getWeekOfDate(item.getSchedule().getStartDate());
				return new Group<>(String.valueOf(weekday), date);
			}
		});

		// prepare other data.
		super.add();
		return SUCCESS;
	}

	@Override
	protected WeeklyRecordInfo createTask() {
		return new WeeklyRecordInfo();
	}

	private int getWeekOfDate(Date dt) {
		int[] weekDays = {1, 2, 4, 8, 16, 32, 64};
		Calendar cal = Calendar.getInstance();
		cal.setTime(dt);
		int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
		if (w < 0)
			w = 0;
		return weekDays[w];
	}

	@Override
	public String save() {
		// set record info.
		for (WeeklyItemRecordInfo info : task.getWeeklyItemRecordInfos()) {
			RecordInfo current = new RecordInfo();
			current.setName(info.getName());
			current.setChannelId(task.getChannelId());
			current.setProfile(task.getProfile());
			current.setFileName(task.getFileName());
			current.setOutputPath(task.getOutputPath());
			current.setGenerateThumb(task.getGenerateThumb()==null?false:task.getGenerateThumb());
			current.setThumbWidth(task.getThumbWidth());
			current.setThumbHeight(task.getThumbHeight());
			current.setRecordType(RecordType.SCHEDULE);

			Schedule schedule = info.getSchedule();
			schedule.setName(info.getName());
			schedule.setSource("RECORD");
			if(task.isWeeklyRecord()){
				schedule.setScheduleType(ScheduleType.WEEKLY);
				schedule.setStartType(StartType.SCHEDULE);
				schedule.setEndType(EndType.BYTIME);
				schedule.setRepeatEndType(RepeatEndType.BYDATE);
				schedule.setRepeatEndDate(task.getRepeatEndDate());
				schedule.setInterval(1);
			}else {
				schedule.setScheduleType(ScheduleType.ONCE);
				schedule.setStartType(StartType.SCHEDULE);
				schedule.setEndType(EndType.BYTIME);
			}

			if (schedule.getEndTime().before(schedule.getStartTime())) {
				Calendar c = Calendar.getInstance();
				c.setTime(schedule.getStartDate());
				c.add(Calendar.DAY_OF_MONTH, 1);
				schedule.setEndDate(new Date(c.getTimeInMillis()));
			} else {
				schedule.setEndDate(schedule.getStartDate());
			}

			current.setSchedule(info.getSchedule());
			// save record info.
			recordInfoService.save(current);
		}

		result = new ActionResult(true);
		return SUCCESS;
	}
}
