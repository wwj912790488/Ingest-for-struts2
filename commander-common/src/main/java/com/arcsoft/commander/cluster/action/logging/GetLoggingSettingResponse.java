package com.arcsoft.commander.cluster.action.logging;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseResponse;

/**
 * Get logging settings response.
 * 
 * @author fjli
 */
@XmlRootElement
public class GetLoggingSettingResponse extends BaseResponse {

	private String setting;

	public String getSetting() {
		return setting;
	}

	public void setSetting(String setting) {
		this.setting = setting;
	}

}
