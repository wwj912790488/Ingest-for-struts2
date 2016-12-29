package com.arcsoft.commander.action.alert;

import java.util.Arrays;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import com.arcsoft.arcvideo.common.utils.StringHelper;
import com.arcsoft.commander.domain.alert.EmailSetting;
import com.arcsoft.commander.service.alert.EmailSettingService;
import com.arcsoft.commander.service.alert.SysAlertService;
import com.opensymphony.xwork2.ActionSupport;

/**
 * Email setting action.
 * 
 * @author fjli
 */
public class AlertSettingAction extends ActionSupport {

	private static final long serialVersionUID = -5319022383620010556L;
	
	private static String PASSWORD_NOT_CHANGED = "PASSWORD_NOT_CHANGED";
	private SysAlertService sysAlertService;
	private Integer deleteBeforeDays;
	private EmailSetting emailSetting;
	private EmailSettingService emailSettingService;
	private String recv;
	private boolean emailAlertEnabled;

	public void setSysAlertService(SysAlertService sysAlertService) {
		this.sysAlertService = sysAlertService;
	}

	public boolean isEmailAlertEnabled() {
		return emailAlertEnabled;
	}

	public Integer getDeleteBeforeDays() {
		return deleteBeforeDays;
	}

	public void setDeleteBeforeDays(Integer deleteBeforeDays) {
		this.deleteBeforeDays = deleteBeforeDays;
	}

	public void setEmailSettingService(EmailSettingService emailSettingService) {
		this.emailSettingService = emailSettingService;
	}

	public EmailSetting getEmailSetting() {
		return emailSetting;
	}

	public void setEmailSetting(EmailSetting emailSetting) {
		this.emailSetting = emailSetting;
	}

	public String getRecv() {
		return recv;
	}

	public void setRecv(String recv) {
		this.recv = recv;
	}

	public String load() {
		try {
			deleteBeforeDays = sysAlertService.getAutoDeleteBeforeDays();
			emailAlertEnabled = emailSettingService.isFeatureEnabled();
			if (emailAlertEnabled == true) {
				emailSetting = emailSettingService.loadSetting();
				if (emailSetting.getReceivers() != null) {
					recv = StringUtils.join(emailSetting.getReceivers(), ",");
				}
				if (StringHelper.isNotEmpty(emailSetting.getSmtpPassword()))
					emailSetting.setSmtpPassword(PASSWORD_NOT_CHANGED);
			}
			return SUCCESS;
		} catch (Exception e) {
			return ERROR;
		}
	}

	public String save() {
		emailAlertEnabled = emailSettingService.isFeatureEnabled();
		if (emailAlertEnabled == true) {
			if (recv != null) {
				List<String> receivers = Arrays.asList(recv.trim().split("\\s*,\\s*"));
				emailSetting.setReceivers(receivers);
			}
			if (PASSWORD_NOT_CHANGED.equals(emailSetting.getSmtpPassword()))
				emailSetting.setSmtpPassword(null);
		}
		try {
			if (emailAlertEnabled == true) 
				emailSettingService.saveSetting(emailSetting);
			sysAlertService.setAutoDeleteBeforeDays(deleteBeforeDays);
			return SUCCESS;
		} catch (Exception e) {
			return ERROR;
		}
	}

	public String sendTestEmail() {
		emailAlertEnabled = emailSettingService.isFeatureEnabled();
		if (emailAlertEnabled == true) {
			if (recv != null) {
				List<String> receivers = Arrays.asList(recv.trim().split("\\s*,\\s*"));
				emailSetting.setReceivers(receivers);
			}
			if (PASSWORD_NOT_CHANGED.equals(emailSetting.getSmtpPassword()))
				emailSetting.setSmtpPassword(null);
		}
		try {
			String subject = getText("alert.config.mail.test.subject");
			String content = getText("alert.config.mail.test.content");
			emailSettingService.sendTestEmail(emailSetting, subject, content);
			return SUCCESS;
		} catch (Exception e) {
			return ERROR;
		}
	}
}
