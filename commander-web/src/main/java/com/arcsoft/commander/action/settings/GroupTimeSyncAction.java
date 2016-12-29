package com.arcsoft.commander.action.settings;

import java.util.Date;

import com.arcsoft.arcvideo.web.struts.result.ActionResult;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.settings.NTPStatus;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;
import com.arcsoft.commander.service.settings.RemoteDateTimeService;

/**
 * Action for sync time.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class GroupTimeSyncAction extends GroupSettingUpdateAction {

	private RemoteDateTimeService remoteDateTimeService;
	private NTPStatus ntpStatus;
	private Date date;

	public void setRemoteDateTimeService(RemoteDateTimeService remoteDateTimeService) {
		this.remoteDateTimeService = remoteDateTimeService;
	}

	public NTPStatus getNtpStatus() {
		return ntpStatus;
	}

	public void setNtpStatus(NTPStatus ntpStatus) {
		this.ntpStatus = ntpStatus;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	@Override
	protected ActionResult execute(Server server) {
		try {
			remoteDateTimeService.setDateTime(server, date, ntpStatus);
			return new ActionResult(true);
		} catch (SystemNotInitializedException e) {
			return new ActionResult(false, getActionText("system.not.initialized"));
		} catch (AccessDeniedForSlaveException e) {
			return new ActionResult(false, getActionText("system.slave.access.denied"));
		} catch (ServerNotAvailableException e) {
			return new ActionResult(false, getActionText("msg.error.server.not.available"));
		} catch (Exception e) {
			return new ActionResult(false, getActionText("msg.error.server.save.time"));
		}
	}

}
