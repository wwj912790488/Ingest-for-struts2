package com.arcsoft.commander.action.settings;

import com.arcsoft.arcvideo.logging.conf.LoggingSetting;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;

/**
 * Update logging setting.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class LoggingSettingUpdateAction extends LoggingSettingActionSupport {

	@Override
	public String execute() {
		// commander has not logging currently.
		if (isLocal) {
			addActionError(getText("logging.error.update.fail"));
			return SUCCESS;
		}

		// check the server is exist or not.
		Server agent = serverService.getServer(id);
		if (agent == null) {
			addActionError(getText("msg.error.server.not.available"));
			return SUCCESS;
		}

		// update setting.
		try {
			if (magicPasswordKey.equalsIgnoreCase(setting.getCompress().getPassword())) {
				LoggingSetting oldSetting = remoteLoggingService.getLoggingSetting(agent);
				if (oldSetting != null && oldSetting.getCompress() != null)
					setting.getCompress().setPassword(oldSetting.getCompress().getPassword());
			}
			remoteLoggingService.updateLoggingSetting(agent, setting);
			return SUCCESS;
		} catch (SystemNotInitializedException e) {
			addActionError(getText("system.not.initialized"));
		} catch (AccessDeniedForSlaveException e) {
			addActionError(getText("system.slave.access.denied"));
		} catch (ServerNotAvailableException e) {
			addActionError(getText("msg.error.server.not.available"));
		} catch (Exception e) {
			addActionError(getText("logging.error.update.fail"));
		}
		return SUCCESS;
	}

}
