package com.arcsoft.commander.action.settings;

import java.io.File;
import java.io.IOException;

import org.apache.commons.io.FileUtils;

import com.arcsoft.arcvideo.web.struts.result.ActionResult;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;
import com.arcsoft.commander.service.settings.RemoteLoggingService;

/**
 * Action for upgrade license.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class GroupASLogUpdateAction extends GroupSettingUpdateAction {

	private RemoteLoggingService remoteLoggingService;
	private File file;
	private String data;

	public void setRemoteLoggingService(RemoteLoggingService remoteLoggingService) {
		this.remoteLoggingService = remoteLoggingService;
	}

	public void setFile(File file) {
		this.file = file;
	}

	@Override
	public String execute() {
		// check the upload is success or not.
		if (file == null) {
			setErrorResult(getText("aslog.error.file.not.specified"));
			return SUCCESS;
		}

		// read data
		try {
			data = FileUtils.readFileToString(file, "UTF-8");
		} catch (IOException e) {
			setErrorResult(getText("aslog.error.update.fail"));
			return SUCCESS;
		} finally {
			if (file != null)
				file.delete();
		}

		// check data
		if (data.indexOf("[ASLOG]") == -1) {
			setErrorResult(getText("aslog.error.invalid.file"));
			return SUCCESS;
		}

		// execute group update.
		return super.execute();
	}

	@Override
	protected ActionResult execute(Server server) {
		try {
			remoteLoggingService.updateASLog(server, data);
			return new ActionResult(true);
		} catch (SystemNotInitializedException e) {
			return new ActionResult(false, getActionText("system.not.initialized"));
		} catch (AccessDeniedForSlaveException e) {
			return new ActionResult(false, getActionText("system.slave.access.denied"));
		} catch (ServerNotAvailableException e) {
			return new ActionResult(false, getActionText("msg.error.server.not.available"));
		} catch (Exception e) {
			return new ActionResult(false, getActionText("license.error.update.fail"));
		}
	}

}
