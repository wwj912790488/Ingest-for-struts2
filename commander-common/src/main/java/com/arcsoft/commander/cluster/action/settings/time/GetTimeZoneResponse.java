package com.arcsoft.commander.cluster.action.settings.time;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseResponse;

/**
 * The response message for get timezone
 * 
 * @author xpeng
 */
@XmlRootElement
public class GetTimeZoneResponse extends BaseResponse {
	private String timezone;
	
	public GetTimeZoneResponse(){		
	}
	
	public GetTimeZoneResponse(String timezone){
		this.timezone = timezone;
	}

	public String getTimezone() {
		return timezone;
	}

	public void setTimezone(String timezone) {
		this.timezone = timezone;
	}
}
