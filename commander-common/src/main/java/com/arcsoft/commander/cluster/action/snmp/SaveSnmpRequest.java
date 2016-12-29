package com.arcsoft.commander.cluster.action.snmp;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseRequest;
import com.arcsoft.transcoder.snmp.SnmpSetting;

/**
 * Save the SNMP settings.
 * 
 * @author fjli
 */
@XmlRootElement
public class SaveSnmpRequest extends BaseRequest {

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
