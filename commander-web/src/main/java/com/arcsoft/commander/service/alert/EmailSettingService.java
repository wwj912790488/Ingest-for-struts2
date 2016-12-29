package com.arcsoft.commander.service.alert;

import com.arcsoft.commander.domain.alert.EmailSetting;

/**
 * Email setting service.
 * 
 * @author fjli
 */
public interface EmailSettingService {

	/**
	 * Test the email sender is enabled or not.
	 */
	boolean isFeatureEnabled();

	/**
	 * Load email setting.
	 * 
	 * @return the email setting.
	 * @throws Exception if load setting failed.
	 */
	EmailSetting loadSetting() throws Exception;

	/**
	 * Save email setting.
	 * 
	 * @param setting - the email setting to save
	 * @throws Exception if save setting failed.
	 */
	void saveSetting(EmailSetting setting) throws Exception;

	/**
	 * Send test email with the specified setting.
	 * 
	 * @param subject - the test email subject
	 * @param content - the test email content
	 */
	void sendTestEmail(String subject, String content);

	/**
	 * Send test email with the specified setting.
	 * 
	 * @param setting - the email setting to send
	 * @param subject - the test email subject
	 * @param content - the test email content
	 */
	void sendTestEmail(EmailSetting setting, String subject, String content);

}
