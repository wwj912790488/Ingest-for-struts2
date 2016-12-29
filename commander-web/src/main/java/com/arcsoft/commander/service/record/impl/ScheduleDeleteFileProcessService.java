package com.arcsoft.commander.service.record.impl;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.apache.log4j.Logger;

import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.cluster.app.ActionException;
import com.arcsoft.cluster.app.Request;
import com.arcsoft.cluster.app.Response;
import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.ActionHandler;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.record.ScheduleDeleteFileRequest;
import com.arcsoft.commander.cluster.action.record.ScheduleDeleteFileResponse;
import com.arcsoft.commander.domain.record.ScheduleDeleteFile;
import com.arcsoft.commander.service.record.ScheduleDeleteFileService;

public class ScheduleDeleteFileProcessService implements ActionHandler, Runnable {

	private Logger log = Logger.getLogger(ScheduleDeleteFileProcessService.class);
	private ScheduleDeleteFileService scheduleDeleteFileService;
	private ScheduledExecutorService schedule;

	public void setScheduleDeleteFileService(ScheduleDeleteFileService scheduleDeleteFileService) {
		this.scheduleDeleteFileService = scheduleDeleteFileService;
	}

	public void init() {
		log.info("init schedule delete file process service.");
		schedule = Executors.newSingleThreadScheduledExecutor();
		schedule.scheduleAtFixedRate(this, 1, 1, TimeUnit.MINUTES);
	}

	public void destroy() {
		log.info("destroy schedule delete file process service.");
		schedule.shutdown();
	}

	@Override
	public void run() {
		try {
			QueryInfo info = new QueryInfo();
			info.setCondition(Condition.lt("deleteAt", new Date()));
			List<ScheduleDeleteFile> schedules = scheduleDeleteFileService.list(info);
			List<Long> deletedIds = new ArrayList<>();
			for (ScheduleDeleteFile scheduleFile : schedules) {
				File file = new File(scheduleFile.getFileName());
				if (file.exists()) {
					// remove thumb
					String thumbName = scheduleFile.getFileName().substring(0,
							scheduleFile.getFileName().lastIndexOf("."))+"jpg";
					File thumbFile = new File(thumbName);
					if(thumbFile.exists()){
						thumbFile.delete();
					}

					if (file.delete()) {
						log.info("delete success: " + scheduleFile.getFileName());
						deletedIds.add(scheduleFile.getId());
					} else {
						log.info("delete failed: " + scheduleFile.getFileName());
					}
				} else {
					log.info("file not exist: " + scheduleFile.getFileName());
					deletedIds.add(scheduleFile.getId());
				}
			}
			if (!deletedIds.isEmpty()) {
				scheduleDeleteFileService.deleteAll(deletedIds);
			}
		} catch (Exception e) {
			log.error("execute scan failed.", e);
		}
	}

	@Override
	public int[] getActions() {
		return new int[] { Actions.ADD_DELETE_FILE_SCHEDULE };
	}

	@Override
	public Response execute(Request request) throws ActionException {
		Response response = null;
		if (request instanceof ScheduleDeleteFileRequest) {
			response = processRequest((ScheduleDeleteFileRequest) request);
		}
		return response;
	}

	private ScheduleDeleteFileResponse processRequest(ScheduleDeleteFileRequest request) {
		ScheduleDeleteFileResponse response = new ScheduleDeleteFileResponse();
		try {
			ScheduleDeleteFile file = new ScheduleDeleteFile();
			file.setFileName(request.getFileName());
			file.setDeleteAt(request.getDeleteAt());
			scheduleDeleteFileService.save(file);
			log.info("add new file: " + request.getFileName());
			response.setErrorCode(ActionErrorCode.SUCCESS);
		} catch (Exception e) {
			log.error("save schedule delete file failed: " + request.getFileName(), e);
			response.setErrorCode(ActionErrorCode.UNKNOWN_ERROR);
		}
		return response;
	}

}
