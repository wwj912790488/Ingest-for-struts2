package com.arcsoft.commander.cluster.action.snmp;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseResponse;
import com.arcsoft.transcoder.snmp.SnmpSetting;

/**
 * The response message of the GetSnmpRequest.
 * 
 * @author fjli
 */
@XmlRootElement
public class GetSnmpResponse extends BaseResponse {

	private SnmpSetting snmp;

	/**
	 * Returns the SNMP settings.
	 */
	public SnmpSetting getSnmp() {
		return snmp;
	}

	/**
	 * Set the SNMP settings.
	 * 
	 * @param snmp - the snmp settings
	 */
	public void setSnmp(SnmpSetting snmp) {
		this.snmp = snmp;
	}

}
