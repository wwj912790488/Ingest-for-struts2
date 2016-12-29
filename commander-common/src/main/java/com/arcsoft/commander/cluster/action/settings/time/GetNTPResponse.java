package com.arcsoft.commander.cluster.action.settings.time;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseResponse;
import com.arcsoft.commander.domain.settings.NTPStatus;

/**
 * The response message for get ntp service status
 * 
 * @author xpeng
 */
@XmlRootElement
public class GetNTPResponse extends BaseResponse {
	private NTPStatus ntpStatus;

	public NTPStatus getNtpStatus() {
		return ntpStatus;
	}

	public void setNtpStatus(NTPStatus ntpStatus) {
		this.ntpStatus = ntpStatus;
	}


}
