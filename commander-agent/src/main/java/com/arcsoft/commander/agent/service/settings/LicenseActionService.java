package com.arcsoft.commander.agent.service.settings;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;

import com.arcsoft.cluster.app.ActionException;
import com.arcsoft.cluster.app.Request;
import com.arcsoft.cluster.app.Response;
import com.arcsoft.commander.agent.MessageHandler;
import com.arcsoft.commander.agent.service.license.LicenseChangedListener;
import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.ActionHandler;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.settings.license.ListLicenseRequest;
import com.arcsoft.commander.cluster.action.settings.license.ListLicenseResponse;
import com.arcsoft.commander.cluster.action.settings.license.UpdateLicenseRequest;
import com.arcsoft.commander.cluster.action.settings.license.UpdateLicenseResponse;
import com.arcsoft.commander.domain.settings.LicenseInfo;
import com.arcsoft.web4transcoder.service.license.LicenseService;
import com.arcsoft.web4transcoder.service.license.LicenseServiceImpl;

/**
 * License manager service.
 * 
 * @author fjli
 */
public class LicenseActionService implements ActionHandler, MessageHandler {

	private LicenseService licenseService;
	private List<LicenseChangedListener> listeners;

	public void setLicenseService(LicenseService licenseService) {
		this.licenseService = licenseService;
	}

	public void setListeners(List<LicenseChangedListener> listeners) {
		this.listeners = listeners;
	}

	/**
	 * Returns all license actions.
	 */
	@Override
	public int[] getActions() {
		return new int[] {
				Actions.LICENSE_LIST,
				Actions.LICENSE_UPDATE,
			};
	}

	/**
	 * Receive license relation requests, and dispatch request to process methods.
	 * 
	 * @param request - the license request
	 * @return returns the response
	 * @throws ActionException if process request failed.
	 */
	@Override
	public Response execute(Request request) throws ActionException {
		if (request instanceof ListLicenseRequest) {
			return listLicense();
		} else if (request instanceof UpdateLicenseRequest) {
			return updateLicense((UpdateLicenseRequest) request);
		}
		return null;
	}

	/**
	 * Get current license information.
	 * 
	 * @return returns reponse including the license information.
	 */
	private ListLicenseResponse listLicense() {
		LicenseInfo licenseInfo = new LicenseInfo();
		licenseInfo.setProductType(licenseService.getLimitation(LicenseService.PRODUCT));
		licenseInfo.setLicenseId(licenseService.getLicenseId());
		ListLicenseResponse response = new ListLicenseResponse();
		response.setErrorCode(ActionErrorCode.SUCCESS);
		response.setLicenseInfo(licenseInfo);
		return response;
	}

	/**
	 * Update license.
	 * 
	 * @param request - the license update request
	 * @return returns response indicate the action is success or not.
	 */
	private UpdateLicenseResponse updateLicense(UpdateLicenseRequest request) {
		UpdateLicenseResponse response = new UpdateLicenseResponse();

		// Test the request data is valid.
		byte[] data = request.getData();
		if (data == null || data.length == 0) {
			response.setErrorCode(ActionErrorCode.INVALID_LICENSE);
			return response;
		}

		// Save data to a temporary file.
		FileOutputStream fos = null;
		File file = null;
		try {
			file = File.createTempFile("_license_", ".license");
			fos = new FileOutputStream(file);
			fos.write(data);
		} catch(IOException e) {
			if (file != null)
				file.delete();
			response.setErrorCode(ActionErrorCode.IO_ERROR);
			return response;
		} finally {
			if (fos != null) {
				try {
					fos.close();
				} catch(IOException e) {
				}
			}
		}

		try {
			// Verify the license file.
			String savePath = file.getAbsolutePath();
			if (!licenseService.validateLicense(savePath)) {
				response.setErrorCode(ActionErrorCode.INVALID_LICENSE);
			} else {
				// Update the license file.
				licenseService.updateLicense(savePath);
				response.setErrorCode(ActionErrorCode.SUCCESS);
				notifyLicenseChangedEvents();
			}
		} finally {
			file.delete();
		}

		return response;
	}

	private void notifyLicenseChangedEvents() {
		if (listeners != null) {
			for (LicenseChangedListener listener : listeners) {
				try {
					listener.licenseChanged();
				} catch (Exception e) {
				}
			}
		}
	}

	@Override
	public Map<String, String> getCommands() {
		Map<String, String> commandMap = new TreeMap<>();
		commandMap.put("license list", "List the license.");
		commandMap.put("license reload", "Reload the license.");
		return commandMap;
	}

	@Override
	public void processCommand(String[] args, PrintStream out) {
		if ("license".equalsIgnoreCase(args[0])) {
			if ("list".equalsIgnoreCase(args[1])) {
				Map<String, String> maps = licenseService.getLimitationMap();
				for (Entry<String, String> entry : maps.entrySet()) {
					out.println(entry.getKey() + "=" + entry.getValue());
				}
			} else if ("reload".equalsIgnoreCase(args[1])) {
				if (licenseService instanceof LicenseServiceImpl) {
					((LicenseServiceImpl) licenseService).init();
					out.println("OKAY");
				} else {
					out.println("FAIL, unsupport reload action.");
				}
			}
		}
	}

}
