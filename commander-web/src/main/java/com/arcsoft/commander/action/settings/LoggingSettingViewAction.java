package com.arcsoft.commander.action.settings;

import com.arcsoft.arcvideo.common.utils.StringHelper;
import com.arcsoft.arcvideo.logging.conf.LoggingSetting;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.settings.InvalidLoggingSettingException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;

/**
 * Get the logging setting of the specified server.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class LoggingSettingViewAction extends LoggingSettingActionSupport {

	@Override
	public String execute() {
		// commander has not logging currently.
		if (isLocal) {
			addActionError(getText("logging.error.get.fail"));
			return ERROR;
		}

		// check the server is exist or not.
		Server agent = serverService.getServer(id);
		if (agent == null) {
			addActionError(getText("msg.error.server.not.available"));
			return ERROR;
		}

		// get logging setting information.
		try {
			setting = remoteLoggingService.getLoggingSetting(agent);
			if (setting.getCompress() != null) {
				if (StringHelper.isNotEmpty(setting.getCompress().getPassword()))
					setting.getCompress().setPassword(getMagicPasswordKey());
			}
			return SUCCESS;
		} catch (InvalidLoggingSettingException e) {
			// case the file is invalid
			setting = new LoggingSetting();
			return SUCCESS;
		} catch (SystemNotInitializedException e) {
			addActionError(getText("system.not.initialized"));
			return ERROR;
		} catch (AccessDeniedForSlaveException e) {
			addActionError(getText("system.slave.access.denied"));
			return ERROR;
		} catch (ServerNotAvailableException e) {
			addActionError(getText("msg.error.server.not.available"));
			return ERROR;
		} catch (Exception e) {
			addActionError(getText("logging.error.get.fail"));
			return ERROR;
		}
	}

}
