package com.arcsoft.commander.cluster.action.settings.time;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseRequest;

/**
 * Request for set the server's timezone
 * 
 * @author xpeng
 */
@XmlRootElement
public class SetTimeZoneRequest extends BaseRequest {
	private String timezone;
	
	public SetTimeZoneRequest(){		
	}
	
	public SetTimeZoneRequest(String timezone){
		this.timezone = timezone;
	}

	public String getTimezone() {
		return timezone;
	}

	public void setTimezone(String timezone) {
		this.timezone = timezone;
	}


	


}
