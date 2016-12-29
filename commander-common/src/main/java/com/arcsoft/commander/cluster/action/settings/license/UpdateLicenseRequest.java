package com.arcsoft.commander.cluster.action.settings.license;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseRequest;

/**
 * Update license request.
 * 
 * @author fjli
 */
@XmlRootElement
public class UpdateLicenseRequest extends BaseRequest {

	private byte[] data;

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}

}
