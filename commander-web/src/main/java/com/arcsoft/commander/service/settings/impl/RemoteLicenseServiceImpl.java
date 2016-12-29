package com.arcsoft.commander.service.settings.impl;

import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.settings.license.ListLicenseRequest;
import com.arcsoft.commander.cluster.action.settings.license.ListLicenseResponse;
import com.arcsoft.commander.cluster.action.settings.license.UpdateLicenseRequest;
import com.arcsoft.commander.cluster.action.settings.license.UpdateLicenseResponse;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.settings.LicenseInfo;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.exception.settings.InvalidLicenseException;
import com.arcsoft.commander.service.remote.RemoteExecutorServiceSupport;
import com.arcsoft.commander.service.settings.RemoteLicenseService;

/**
 * This service process license relation requests for the specified agent.
 * 
 * @author fjli
 */
public class RemoteLicenseServiceImpl extends RemoteExecutorServiceSupport implements RemoteLicenseService {

	@Override
	public LicenseInfo getLicenseInfo(Server agent) {
		ListLicenseRequest request = new ListLicenseRequest();
		ListLicenseResponse response = (ListLicenseResponse) remoteExecutorService.remoteExecute(request, agent);
		if (!response.isSuccess())
			throw new RemoteException(agent, response.getErrorCode());
		return response.getLicenseInfo();
	}

	@Override
	public void updateLicense(Server agent, byte[] data) {
		UpdateLicenseRequest request = new UpdateLicenseRequest();
		request.setData(data);
		UpdateLicenseResponse response = (UpdateLicenseResponse) remoteExecutorService.remoteExecute(request, agent);
		if (!response.isSuccess()) {
			if (response.getErrorCode() == ActionErrorCode.INVALID_LICENSE)
				throw new InvalidLicenseException();
			else
				throw new RemoteException(agent, response.getErrorCode());
		}
	}

}
