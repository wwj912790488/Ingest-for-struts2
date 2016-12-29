package com.arcsoft.commander.action.settings;

import com.arcsoft.arcvideo.logging.conf.LoggingSetting;
import com.arcsoft.commander.service.settings.RemoteLoggingService;

/**
 * Logging settting action support.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class LoggingSettingActionSupport extends BaseServerSettingAction {

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

	public String getMagicPasswordKey() {
		return magicPasswordKey;
	}

}
