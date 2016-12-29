package com.arcsoft.commander.service.license;

import com.arcsoft.web4transcoder.service.license.LicenseService;

/**
 * Commander license service.
 * 
 * @author fjli
 */
public interface CommanderLicenseService extends LicenseService {

	public static final String LIVE_GROUP_1_1 = "LIVE_GROUP_1_1";
	public static final String LIVE_GROUP_M_N = "LIVE_GROUP_M_N";

	public static final String DEVICE_MANAGEMENT = "DEVICE_MANAGEMENT";
	public static final String TASK_MANAGEMENT = "TASK_MANAGEMENT";
	public static final String TEMPLATE_PROFILE = "TEMPLATE_PROFILE";
	public static final String TEMPLATE_PRESET = "TEMPLATE_PRESET";
	public static final String SECURITY_USERS = "SECURITY_USERS";
	public static final String SECURITY_ROLES = "SECURITY_ROLES";
	public static final String OPERATION_LOG = "OPERATION_LOG";
	public static final String ALERT_MANAGEMENT = "ALERT_MANAGEMENT";

	public static final String SDI_MATRIX_CONTROL = "SDI_MATRIX_CONTROL";
	public static final String MANUAL_SWITCH_M_N = "MANUAL_SWITCH_M_N";
	public static final String LICENSE_SETTING = "LICENSE_SETTING";
	public static final String NETWORK_SETTING = "NETWORK_SETTING";
	public static final String NETWORK_IP_SETTING = "NETWORK_IP_SETTING";
	public static final String NETWORK_IO_SETTING = "NETWORK_IO_SETTING";
	public static final String FIREWALL_SETTING = "FIREWALL_SETTING";
	public static final String DNS_SETTING = "DNS_SETTING";
	public static final String ROUTE_SETTING = "ROUTE_SETTING";
	public static final String SNMP_SETTING = "SNMP_SETTING";
	public static final String TIME_SETTING = "TIME_SETTING";
	public static final String STORAGE_SETTING = "STORAGE_SETTING";
	public static final String LOGGING_SETTING = "LOGGING_SETTING";
	public static final String FAULT_SETTING = "FAULT_SETTING";
	public static final String FAULT_IPMI_SETTING = "FAULT_IPMI_SETTING";
	public static final String FAULT_SWITCH_SETTING = "FAULT_SWITCH_SETTING";

	public static final String SHOW_TRANSCODING_TIME = "SHOW_TRANSCODING_TIME";

	/**
	 * Test the specified license option is enabled or not.
	 * 
	 * @param option - the specified license option to test
	 * @return true if the option is enabled.
	 */
	boolean isLicenseEnabled(String option);

	/**
	 * Get String value of the specified license option.
	 * 
	 * @param option - the specified license option to test
	 * @return String value of the option, null if the option is not set.
	 */
	String getLicenseStringValue(String option);

	/**
	 * Get integer value of the specified license option.
	 * 
	 * @param option - the specified license option to test
	 * @return Integer value of the option, null if the option is not set.
	 */
	Integer getLicenseIntValue(String option);

}
