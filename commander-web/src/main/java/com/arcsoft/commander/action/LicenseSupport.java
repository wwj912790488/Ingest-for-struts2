package com.arcsoft.commander.action;

import java.util.Map;

/**
 * License support.
 * 
 * @author fjli
 */
public interface LicenseSupport {

	/**
	 * Get the license option is enabled or not.
	 * 
	 * @return true if the option is set to 1, false otherwise.
	 */
	boolean isLicenseEnabled(String option);

	/**
	 * Get string value of the license option.
	 * 
	 * @return String value for the option, null if the option is not set.
	 */
	String getLicenseStringValue(String option);

	/**
	 * Get integer value of the license option.
	 * 
	 * @return Integer value for the option, null if the option is not set.
	 */
	Integer getLicenseIntValue(String option);

	Map<String, String> getLimitationMap();

}
