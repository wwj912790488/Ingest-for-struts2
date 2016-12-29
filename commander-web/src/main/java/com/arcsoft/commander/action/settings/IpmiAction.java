package com.arcsoft.commander.action.settings;

import org.springframework.security.access.prepost.PreAuthorize;

import com.arcsoft.commander.domain.settings.IPMI;
import com.arcsoft.commander.service.settings.IpmiService;

/**
 * Action for ipmi setting.
 * 
 * @author wtsun
 */
@SuppressWarnings("serial")
public class IpmiAction extends BaseServerSettingAction {
	private IpmiService ipmiService;
	private IPMI ipmi;

	public void setIpmiService(IpmiService ipmiService) {
		this.ipmiService = ipmiService;
	}

	public IPMI getIpmi() {
		return ipmi;
	}

	public void setIpmi(IPMI ipmi) {
		this.ipmi = ipmi;
	}


	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String get() {
		ipmi = ipmiService.getIpmi(id);
		return SUCCESS;
	}

	private boolean isValidIP(String ip) {
		String regex = "((2[0-4]\\d|25[0-5]|[01]?\\d\\d?)\\.){3}(2[0-4]\\d|25[0-5]|[01]?\\d\\d?)";
		if (ip.matches(regex)) {
			return true;
		}
		return false;
	}
	
	public void validateSave() {
		String v;
		v = ipmi.getIp();
		if (!isValidIP(v)) {
			addFieldError("ip", getText("settings.err.invalid.ip"));
		}
		v = ipmi.getUser();
		if (v == null || v.isEmpty()) {
			addFieldError("netmask", getText("server.setting.fault.error.invalid.user"));
		}
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String save() {
		if (!ipmiService.checkIpmiAvaliable(ipmi.getIp(), 5000)) {
			addActionError(getText("server.setting.fault.error.port.unreachable", new String[]{ipmi.getIp(), String.valueOf(ipmiService.getPort())}));
			return SUCCESS;
		}
		ipmiService.saveIpmi(ipmi);
		return SUCCESS;
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String reset() {
		ipmiService.deleteIpmi(id);
		return SUCCESS;
	}
}
