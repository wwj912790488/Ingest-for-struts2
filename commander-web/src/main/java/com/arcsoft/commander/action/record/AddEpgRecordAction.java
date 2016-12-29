package com.arcsoft.commander.action.record;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import com.arcsoft.arcvideo.web.struts.result.ActionResult;
import com.arcsoft.arcvideo.web.struts.view.Group;
import com.arcsoft.arcvideo.web.struts.view.GroupGenerator;
import com.arcsoft.arcvideo.web.struts.view.GroupView;
import com.arcsoft.commander.domain.record.EpgItem;
import com.arcsoft.commander.domain.record.EpgItemRecordInfo;
import com.arcsoft.commander.domain.record.EpgList;
import com.arcsoft.commander.domain.record.EpgRecordInfo;
import com.arcsoft.commander.domain.schedule.*;
import com.arcsoft.commander.service.record.EpgParser;
import com.arcsoft.commander.service.record.EpgParserFactory;
import com.arcsoft.commander.service.schedule.ScheduleUtils;

/**
 * Add EPG record info.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class AddEpgRecordAction extends AddRecordAction<EpgRecordInfo> {

	private EpgParserFactory epgParserFactory;
	private File epgFile;
	private GroupView<EpgItemRecordInfo> groupView;
	private String epgFilePath;
	private Integer selectChannelId;

	public void setEpgParserFactory(EpgParserFactory epgParserFactory) {
		this.epgParserFactory = epgParserFactory;
	}

	public void setEpgFile(File epgFile) {
		this.epgFile = epgFile;
	}

	public GroupView<EpgItemRecordInfo> getGroupView() {
		return groupView;
	}

	public String getEpgFilePath() {
		return epgFilePath;
	}

	public void setEpgFilePath(String epgFilePath) {
		this.epgFilePath = epgFilePath;
	}

	public Integer getSelectChannelId() {
		return selectChannelId;
	}

	public void setSelectChannelId(Integer selectChannelId) {
		this.selectChannelId = selectChannelId;
	}

	@Override
	public String add() {
		// parse the uploaded EPG file.
		EpgParser parser = epgParserFactory.getParser(null);
		EpgList epgList = null;
		try {
			epgList = parser.parse(epgFile.getAbsolutePath());
		} catch (IOException e) {
			return ERROR;
		} finally {
			epgFile.delete();
		}

		task = new EpgRecordInfo();
		List<EpgItemRecordInfo> epgItems = new ArrayList<>();
		task.setEpgItemRecordInfos(epgItems);
		for (EpgItem item : epgList.getItems()) {
			EpgItemRecordInfo recordInfo = new EpgItemRecordInfo();
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
			epgItems.add(recordInfo);
		}

		// group view.
		groupView = new GroupView<>();
		groupView.setDataList(epgItems, new GroupGenerator<EpgItemRecordInfo>() {
			@Override
			public Group<EpgItemRecordInfo> generate(EpgItemRecordInfo item) {
				String date = item.getSchedule().getStartDate().toString();
				return new Group<>(date, date);
			}
		});

		// prepare other data.
		super.add();
		return SUCCESS;
	}

	@Override
	protected EpgRecordInfo createTask() {
		return new EpgRecordInfo();
	}

//	private int getWeekOfDate(Date dt) {
//		int[] weekDays = {1, 2, 4, 8, 16, 32, 64};
//		Calendar cal = Calendar.getInstance();
//		cal.setTime(dt);
//		int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
//		if (w < 0)
//			w = 0;
//		return weekDays[w];
//	}

	@Override
	public String save() {
		// set record info.
		for (EpgItemRecordInfo info : task.getEpgItemRecordInfos()) {
			info.setParent(task);
			info.setChannelId(task.getChannelId());
			info.setProfile(task.getProfile());
			info.setFileName(task.getFileName());
			info.setOutputPath(task.getOutputPath());
			info.setGenerateThumb(task.getGenerateThumb());
			info.setThumbWidth(task.getThumbWidth());
			info.setThumbHeight(task.getThumbHeight());

			Schedule schedule = info.getSchedule();
			schedule.setName(info.getName());
			schedule.setScheduleType(ScheduleType.ONCE);
			schedule.setStartType(StartType.SCHEDULE);
			schedule.setEndType(EndType.BYTIME);

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

	public String addFile() {
		// parse the uploaded EPG file.
		File file = new File(epgFilePath);

		EpgParser parser = epgParserFactory.getParser(null);
		EpgList epgList = null;
		try {
			epgList = parser.parse(file.getAbsolutePath());
		} catch (IOException e) {
			return ERROR;
		} finally {
			//file.delete();
		}

		task = new EpgRecordInfo();
		List<EpgItemRecordInfo> epgItems = new ArrayList<>();
		task.setEpgItemRecordInfos(epgItems);
		for (EpgItem item : epgList.getItems()) {
			EpgItemRecordInfo recordInfo = new EpgItemRecordInfo();
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
			epgItems.add(recordInfo);
		}

		// group view.
		groupView = new GroupView<>();
		groupView.setDataList(epgItems, new GroupGenerator<EpgItemRecordInfo>() {
			@Override
			public Group<EpgItemRecordInfo> generate(EpgItemRecordInfo item) {
				String date = item.getSchedule().getStartDate().toString();
				return new Group<>(date, date);
			}
		});

		// prepare other data.
		super.add();
		return SUCCESS;
	}
}
