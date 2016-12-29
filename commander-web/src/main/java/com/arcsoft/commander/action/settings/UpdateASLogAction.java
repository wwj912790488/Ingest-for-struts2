package com.arcsoft.commander.action.settings;

import java.io.File;
import java.io.IOException;

import org.apache.commons.io.FileUtils;
import org.springframework.security.access.prepost.PreAuthorize;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;
import com.arcsoft.commander.service.settings.RemoteLoggingService;

/**
 * Action for update ASLOG.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class UpdateASLogAction extends BaseServerSettingAction {

	private RemoteLoggingService remoteLoggingService;
	private File file;
	private boolean success;

	public void setRemoteLoggingService(RemoteLoggingService remoteLoggingService) {
		this.remoteLoggingService = remoteLoggingService;
	}

	public void setFile(File file) {
		this.file = file;
	}

	public boolean isSuccess() {
		return success;
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String execute() {
		try {
			this.success = update();
		} catch(Exception e) {
			this.success = false;
			addActionError(getText("aslog.error.update.fail"));
		} finally {
			if (file != null)
				file.delete();
		}
		return SUCCESS;
	}

	private boolean update() {
		// commander has not logging currently.
		if (isLocal) {
			addActionError(getText("aslog.error.update.fail"));
			return false;
		}

		// check the upload is success or not.
		if (file == null) {
			addActionError(getText("aslog.error.file.not.specified"));
			return false;
		}

		// read data.
		String data = null;
		try {
			data = FileUtils.readFileToString(file, "UTF-8");
		} catch (IOException e) {
			addActionError(getText("aslog.error.update.fail"));
			return false;
		}

		// check data
		if (data.indexOf("[ASLOG]") == -1) {
			addActionError(getText("aslog.error.invalid.file"));
			return false;
		}

		// check the server is exist or not.
		Server agent = serverService.getServer(id);
		if (agent == null) {
			addActionError(getText("msg.error.server.not.available"));
			return false;
		}

		// update aslog file.
		try {
			remoteLoggingService.updateASLog(agent, data);
			return true;
		} catch (SystemNotInitializedException e) {
			addActionError(getText("system.not.initialized"));
		} catch (AccessDeniedForSlaveException e) {
			addActionError(getText("system.slave.access.denied"));
		} catch (ServerNotAvailableException e) {
			addActionError(getText("msg.error.server.not.available"));
		} catch (Exception e) {
			addActionError(getText("aslog.error.update.fail"));
		}

		return false;
	}

}
