package com.arcsoft.commander.action.settings;

import java.io.File;
import java.io.IOException;

import org.apache.commons.io.FileUtils;

import com.arcsoft.arcvideo.web.struts.result.ActionResult;
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
public class GroupLicenseUpdateAction extends GroupSettingUpdateAction {

	private RemoteLicenseService remoteLicenseService;
	private File licenseFile;
	private byte[] data;

	/**
	 * Set the remote license service.
	 * 
	 * @param remoteLicenseService - the remote license service
	 */
	public void setRemoteLicenseService(RemoteLicenseService remoteLicenseService) {
		this.remoteLicenseService = remoteLicenseService;
	}

	/**
	 * Set the uploaded license file.
	 * 
	 * @param licenseFile - the license file
	 */
	public void setLicenseFile(File licenseFile) {
		this.licenseFile = licenseFile;
	}

	@Override
	public String execute() {
		// check the upload is success or not.
		if (licenseFile == null) {
			setErrorResult(getText("license.error.file.not.specified"));
			return SUCCESS;
		}

		// read data.
		try {
			data = FileUtils.readFileToByteArray(licenseFile);
		} catch (IOException e) {
			setErrorResult(getText("license.error.update.fail"));
			return SUCCESS;
		} finally {
			if (licenseFile != null)
				licenseFile.delete();
		}

		// execute group update.
		return super.execute();
	}

	@Override
	protected ActionResult execute(Server server) {
		try {
			remoteLicenseService.updateLicense(server, data);
			return new ActionResult(true);
		} catch (InvalidLicenseException e) {
			return new ActionResult(false, getActionText("license.error.invalid.file"));
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
