package com.arcsoft.commander.action.settings;

import org.springframework.security.access.prepost.PreAuthorize;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.settings.LicenseInfo;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;
import com.arcsoft.commander.service.settings.RemoteLicenseService;
import com.arcsoft.web4transcoder.service.license.LicenseService;

/**
 * Action for upgrade license.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class ListLicenseAction extends BaseServerSettingAction {

	private RemoteLicenseService remoteLicenseService;
	private LicenseInfo licenseInfo;

	public void setRemoteLicenseService(RemoteLicenseService remoteLicenseService) {
		this.remoteLicenseService = remoteLicenseService;
	}

	public LicenseInfo getLicenseInfo() {
		return licenseInfo;
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String execute() {
		// commander has not license currently.
		if (isLocal) {
			licenseInfo = new LicenseInfo();
			licenseInfo.setLicenseId(getLicenseService().getLicenseId());
			licenseInfo.setProductType(getLicenseService().getLimitation(LicenseService.PRODUCT));
			return SUCCESS;
		}

		// check the server is exist or not.
		Server agent = serverService.getServer(id);
		if (agent == null) {
			addActionError(getText("msg.error.server.not.available"));
			return ERROR;
		}

		// fetch license information.
		try {
			licenseInfo = remoteLicenseService.getLicenseInfo(agent);
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
			addActionError(getText("license.error.list.fail"));
			return ERROR;
		}
	}

}
