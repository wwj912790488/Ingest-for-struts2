package com.arcsoft.commander.action.settings;

import com.arcsoft.arcvideo.logging.conf.LoggingSetting;
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
public class GroupLoggingUpdateAction extends GroupSettingUpdateAction {

	protected RemoteLoggingService remoteLoggingService;
	protected LoggingSetting setting;
	protected String magicPasswordKey = "KEEP-PASSWORD-UNCHANGED";

	public void setRemoteLoggingService(RemoteLoggingService remoteLoggingService) {
		this.remoteLoggingService = remoteLoggingService;
	}

	public LoggingSetting getSetting() {
		return setting;
	}

	public void setSetting(LoggingSetting setting) {
		this.setting = setting;
	}

	@Override
	protected ActionResult execute(Server server) {
		// update setting.
		try {
			if (magicPasswordKey.equalsIgnoreCase(setting.getCompress().getPassword())) {
				LoggingSetting oldSetting = remoteLoggingService.getLoggingSetting(server);
				if (oldSetting != null && oldSetting.getCompress() != null)
					setting.getCompress().setPassword(oldSetting.getCompress().getPassword());
			}
			remoteLoggingService.updateLoggingSetting(server, setting);
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
