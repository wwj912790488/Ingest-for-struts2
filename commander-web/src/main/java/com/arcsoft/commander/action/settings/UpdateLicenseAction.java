package com.arcsoft.commander.action.settings;

import java.io.File;
import java.io.IOException;

import org.apache.commons.io.FileUtils;
import org.springframework.security.access.prepost.PreAuthorize;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.settings.InvalidLicenseException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;
import com.arcsoft.commander.service.settings.RemoteLicenseService;

/**
 * Action for upgrade license.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class UpdateLicenseAction extends BaseServerSettingAction {

	private RemoteLicenseService remoteLicenseService;
	private File licenseFile;
	private boolean success;

	public void setRemoteLicenseService(RemoteLicenseService remoteLicenseService) {
		this.remoteLicenseService = remoteLicenseService;
	}

	public void setLicenseFile(File licenseFile) {
		this.licenseFile = licenseFile;
	}

	public boolean isSuccess() {
		return success;
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String execute() {
		try {
			this.success = update();
		} catch(Exception e) {
			this.success = false;
			addActionError(getText("license.error.update.fail"));
		} finally {
			if (licenseFile != null)
				licenseFile.delete();
		}
		return SUCCESS;
	}

	private boolean update() {
		// check the upload is success or not.
		if (licenseFile == null) {
			addActionError(getText("license.error.file.not.specified"));
			return false;
		}

		if (isLocal) {
			// Verify the license file.
			String savePath = licenseFile.getAbsolutePath();
			if (!getLicenseService().validateLicense(savePath)) {
				addActionError(getText("license.error.invalid.file"));
				return false;
			} else {
				// Update the license file.
				getLicenseService().updateLicense(savePath);
				return true;
			}
		}

		// read data.
		byte[] data = null;
		try {
			data = FileUtils.readFileToByteArray(licenseFile);
		} catch (IOException e) {
			addActionError(getText("license.error.update.fail"));
			return false;
		}

		// check the server is exist or not.
		Server agent = serverService.getServer(id);
		if (agent == null) {
			addActionError(getText("msg.error.server.not.available"));
			return false;
		}

		// update license.
		try {
			remoteLicenseService.updateLicense(agent, data);
			return true;
		} catch (InvalidLicenseException e) {
			addActionError(getText("license.error.invalid.file"));
		} catch (SystemNotInitializedException e) {
			addActionError(getText("system.not.initialized"));
		} catch (AccessDeniedForSlaveException e) {
			addActionError(getText("system.slave.access.denied"));
		} catch (ServerNotAvailableException e) {
			addActionError(getText("msg.error.server.not.available"));
		} catch (Exception e) {
			addActionError(getText("license.error.update.fail"));
		}

		return false;
	}

}
