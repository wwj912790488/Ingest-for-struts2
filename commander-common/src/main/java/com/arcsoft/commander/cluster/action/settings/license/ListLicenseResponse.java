package com.arcsoft.commander.cluster.action.settings.license;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseResponse;
import com.arcsoft.commander.domain.settings.LicenseInfo;

/**
 * The response message for list license request.
 * 
 * @author fjli
 */
@XmlRootElement
public class ListLicenseResponse extends BaseResponse {

	private LicenseInfo licenseInfo;

	public LicenseInfo getLicenseInfo() {
		return licenseInfo;
	}

	public void setLicenseInfo(LicenseInfo licenseInfo) {
		this.licenseInfo = licenseInfo;
	}

}
