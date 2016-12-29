package com.arcsoft.commander.service.snmp.impl;

import com.arcsoft.commander.cluster.action.snmp.GetSnmpRequest;
import com.arcsoft.commander.cluster.action.snmp.GetSnmpResponse;
import com.arcsoft.commander.cluster.action.snmp.SaveSnmpRequest;
import com.arcsoft.commander.cluster.action.snmp.SaveSnmpResponse;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.service.remote.RemoteExecutorServiceSupport;
import com.arcsoft.commander.service.snmp.RemoteSnmpService;
import com.arcsoft.transcoder.snmp.SnmpSetting;

/**
 * The implementation of RemoteSnmpService for the specific agent.
 * 
 * @author fjli
 */
public class RemoteSnmpServiceImpl extends RemoteExecutorServiceSupport implements RemoteSnmpService {

	@Override
	public SnmpSetting getSetting(Server agent) {
		GetSnmpRequest request = new GetSnmpRequest();
		GetSnmpResponse response = (GetSnmpResponse) remoteExecutorService.remoteExecute(request, agent);
		if (!response.isSuccess())
			throw new RemoteException(agent);
		return response.getSnmp();
	}

	@Override
	public void setSetting(Server agent, SnmpSetting settings) {
		SaveSnmpRequest request = new SaveSnmpRequest();
		request.setSnmp(settings);
		SaveSnmpResponse response = (SaveSnmpResponse) remoteExecutorService.remoteExecute(request, agent);
		if (!response.isSuccess())
			throw new RemoteException(agent);
	}

}
