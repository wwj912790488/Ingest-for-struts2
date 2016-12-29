package com.arcsoft.commander.action;

import com.arcsoft.commander.service.license.CommanderLicenseService;
import com.opensymphony.xwork2.ActionSupport;

import java.util.Map;
/**
 * Base action. This class define global constants and some methods.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public abstract class BaseAction extends ActionSupport implements LicenseSupport {

	/**
	 * Redirect to home page.
	 */
	public static final String HOME = "homepage";

	/**
	 * Redirect to system initialize page.
	 */
	public static final String SYSINIT = "sysinit";

	/**
	 * Action name of system initialize.
	 */
	public static final String ACTION_SYSINIT = "sysinit";
	
	/**
	 * The action result code, success
	 */
	public static final int RC_SUCCESS = 0;	

	public static final int RC_SYSTEM_NOT_INIT = 1000;
	public static final int RC_GROUP_NAME_EXIST = 1001;
	public static final int RC_GROUP_NOT_EXIST = 1002;
	public static final int RC_SERVER_NAME_EXIST = 1003;
	public static final int RC_SERVER_NOT_EXIST = 1004;
	public static final int RC_SERVER_BUSY = 1005;
	public static final int RC_SWITCH_ROLE_FAILED = 1006;
	public static final int RC_SYSTEM_SLAVE_ACCESS_DENIED = 1007;

	private CommanderLicenseService licenseService;

	public void setLicenseService(CommanderLicenseService licenseService) {
		this.licenseService = licenseService;
	}

	public CommanderLicenseService getLicenseService() {
		return licenseService;
	}

	@Override
	public boolean isLicenseEnabled(String option) {
		return licenseService.isLicenseEnabled(option);
	}

	@Override
	public String getLicenseStringValue(String option) {
		return licenseService.getLicenseStringValue(option);
	}

	@Override
	public Integer getLicenseIntValue(String option) {
		return licenseService.getLicenseIntValue(option);
	}

	@Override
	public Map<String, String> getLimitationMap() {
		return licenseService.getLimitationMap();
	}

}
