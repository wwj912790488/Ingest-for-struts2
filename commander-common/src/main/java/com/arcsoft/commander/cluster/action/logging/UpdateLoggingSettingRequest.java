package com.arcsoft.commander.cluster.action.logging;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseRequest;

/**
 * Update logging settings request.
 * 
 * @author fjli
 */
@XmlRootElement
public class UpdateLoggingSettingRequest extends BaseRequest {

	private String setting;

	public String getSetting() {
		return setting;
	}

	public void setSetting(String setting) {
		this.setting = setting;
	}

}
