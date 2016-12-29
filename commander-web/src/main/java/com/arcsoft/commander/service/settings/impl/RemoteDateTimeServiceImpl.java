package com.arcsoft.commander.service.settings.impl;

import java.util.Date;

import com.arcsoft.commander.cluster.action.settings.time.GetNTPRequest;
import com.arcsoft.commander.cluster.action.settings.time.GetNTPResponse;
import com.arcsoft.commander.cluster.action.settings.time.GetTimeZoneRequest;
import com.arcsoft.commander.cluster.action.settings.time.GetTimeZoneResponse;
import com.arcsoft.commander.cluster.action.settings.time.SetDateTimeRequest;
import com.arcsoft.commander.cluster.action.settings.time.SetDateTimeResponse;
import com.arcsoft.commander.cluster.action.settings.time.SetTimeZoneRequest;
import com.arcsoft.commander.cluster.action.settings.time.SetTimeZoneResponse;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.settings.NTPStatus;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.service.remote.RemoteExecutorServiceSupport;
import com.arcsoft.commander.service.settings.RemoteDateTimeService;

/**
 * This service process date time settings for the specified agent.
 * 
 * @author xpeng
 */
public class RemoteDateTimeServiceImpl extends RemoteExecutorServiceSupport implements RemoteDateTimeService {
	private static final int TIMEOUT = 30000;
	
	@Override
	public void setDateTime(Server agent, Date date, NTPStatus ntp) {
		SetDateTimeResponse response = (SetDateTimeResponse) remoteExecutorService
				.remoteExecute(new SetDateTimeRequest(date, ntp), agent, TIMEOUT, TIMEOUT);
		if (!response.isSuccess())
			throw new RemoteException(agent);
	}

	@Override
	public void setTimeZone(Server agent, String timezone) {
		SetTimeZoneResponse response = (SetTimeZoneResponse) remoteExecutorService
				.remoteExecute(new SetTimeZoneRequest(timezone), agent, TIMEOUT, TIMEOUT);
		if (!response.isSuccess())
			throw new RemoteException(agent);
	}

	@Override
	public String getTimezone(Server agent) {
		GetTimeZoneResponse response = (GetTimeZoneResponse) remoteExecutorService
				.remoteExecute(new GetTimeZoneRequest(), agent);
		if (!response.isSuccess())
			throw new RemoteException(agent);
		return response.getTimezone();
	}

	@Override
	public NTPStatus getNTPStatus(Server agent) {
		GetNTPResponse response = (GetNTPResponse) remoteExecutorService
				.remoteExecute(new GetNTPRequest(), agent);
		if (!response.isSuccess())
			throw new RemoteException(agent);
		return response.getNtpStatus();
	}

}
