package com.arcsoft.commander.agent.service.settings;

import java.io.IOException;
import java.util.Date;

import com.arcsoft.cluster.app.ActionException;
import com.arcsoft.cluster.app.Request;
import com.arcsoft.cluster.app.Response;
import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.ActionHandler;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.settings.time.GetNTPRequest;
import com.arcsoft.commander.cluster.action.settings.time.GetNTPResponse;
import com.arcsoft.commander.cluster.action.settings.time.GetTimeZoneRequest;
import com.arcsoft.commander.cluster.action.settings.time.GetTimeZoneResponse;
import com.arcsoft.commander.cluster.action.settings.time.SetDateTimeRequest;
import com.arcsoft.commander.cluster.action.settings.time.SetDateTimeResponse;
import com.arcsoft.commander.cluster.action.settings.time.SetTimeZoneRequest;
import com.arcsoft.commander.cluster.action.settings.time.SetTimeZoneResponse;
import com.arcsoft.commander.domain.settings.NTPStatus;
import com.arcsoft.commander.service.settings.LocalDateTimeService;
import com.arcsoft.commons.utils.app.ShellException;

/**
 * This service processes all date/time relation requests.
 * 
 * @author xpeng
 * @author fjli
 */
public class DateTimeService implements ActionHandler {

	private LocalDateTimeService localDateTimeService;

	public void setLocalDateTimeService(LocalDateTimeService localDateTimeService) {
		this.localDateTimeService = localDateTimeService;
	}

	/**
	 * Returns all date/time actions. 
	 */
	@Override
	public int[] getActions() {
		return new int[] {
				Actions.SYSTEM_SET_TIMEZONE,
				Actions.SYSTEM_GET_TIMEZONE,
				Actions.SYSTEM_SET_TIME,
				Actions.SYSTEM_GET_NTP
			};
	}

	/**
	 * Receive date/time requests, and dispatch request to process methods.
	 * 
	 * @param request - the task request
	 * @return returns the response
	 * @throws ActionException if process request failed.
	 */
	@Override
	public Response execute(Request request) throws ActionException {
		if (request instanceof SetTimeZoneRequest) {
			return setTimeZone((SetTimeZoneRequest) request);
		} else if (request instanceof GetTimeZoneRequest) {
			return getTimeZone();
		} else if (request instanceof GetNTPRequest) {
			return getNTPStatus();
		} else if (request instanceof SetDateTimeRequest) {
			return setDataTime((SetDateTimeRequest) request);
		}
		return null;
	}

	/**
	 * Set time zone.
	 * 
	 * @param request - the set time zone request
	 * @return returns response indicate the action is success or not.
	 */
	private SetTimeZoneResponse setTimeZone(SetTimeZoneRequest request) {
		SetTimeZoneResponse resp = new SetTimeZoneResponse();
		try {
			localDateTimeService.setTimezone(request.getTimezone());
			resp.setErrorCode(ActionErrorCode.SUCCESS);
		} catch (ShellException e) {
			resp.setErrorCode(ActionErrorCode.RUN_SHELL_FAILED);
		} catch (IOException e) {
			resp.setErrorCode(ActionErrorCode.IO_ERROR);
		}
		return resp;
	}

	/**
	 * Get time zone.
	 * 
	 * @param request - the get time zone request
	 * @return returns response including the time zone.
	 */
	private GetTimeZoneResponse getTimeZone() {
		GetTimeZoneResponse resp = new GetTimeZoneResponse();
		try {
			resp.setTimezone(localDateTimeService.getTimezone());
			resp.setErrorCode(ActionErrorCode.SUCCESS);
		} catch (ShellException e) {
			resp.setErrorCode(ActionErrorCode.RUN_SHELL_FAILED);
		} catch (IOException e) {
			resp.setErrorCode(ActionErrorCode.IO_ERROR);
		}
		return resp;
	}

	/**
	 * Get NTP service status.
	 * 
	 * @param request - the get NPT status request
	 * @return returns response including the NTP status.
	 */
	private GetNTPResponse getNTPStatus() {
		GetNTPResponse resp = new GetNTPResponse();
		try {
			resp.setNtpStatus(localDateTimeService.getNTPStatus());
			resp.setErrorCode(ActionErrorCode.SUCCESS);
		} catch (ShellException e) {
			resp.setErrorCode(ActionErrorCode.RUN_SHELL_FAILED);
		} catch (IOException e) {
			resp.setErrorCode(ActionErrorCode.IO_ERROR);
		}
		return resp;
	}

	/**
	 * Save date/time settings.
	 * 
	 * @param request - the set date/time request
	 * @return returns response indicate the action success or not.
	 */
	private SetDateTimeResponse setDataTime(SetDateTimeRequest request) {
		SetDateTimeResponse resp = new SetDateTimeResponse();
		try {
			Date date = request.getDate();
			NTPStatus ntp = request.getNtpStatus();
			if (ntp.getIsServiceOn()) {
				localDateTimeService.syncWithNTP(ntp);
			} else {
				localDateTimeService.setSystemTime(date);
			}
			resp.setErrorCode(ActionErrorCode.SUCCESS);
		} catch (ShellException e) {
			resp.setErrorCode(ActionErrorCode.RUN_SHELL_FAILED);
		} catch (IOException e) {
			resp.setErrorCode(ActionErrorCode.IO_ERROR);
		}
		return resp;
	}

}
