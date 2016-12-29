package com.arcsoft.commander.action.settings;

import java.io.IOException;
import java.net.UnknownHostException;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;

import com.arcsoft.commander.domain.settings.Switch;
import com.arcsoft.commander.service.settings.SwitchService;

/**
 * Action for ipmi setting.
 * 
 * @author wtsun
 */
@SuppressWarnings("serial")
public class SwitchAction extends BaseServerSettingAction {
	private SwitchService switchService;
	private List<Switch> switchList;

	public void setSwitchService(SwitchService switchService) {
		this.switchService = switchService;
	}

	public List<Switch> getSwitchList() {
		return switchList;
	}

	public void setSwitchList(List<Switch> switchList) {
		this.switchList = switchList;
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String get() {
		switchList = switchService.getSwitchList(id);
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
		if (switchList != null && switchList.size() > 0) {
			for (Switch switchSetting : switchList) {
				String v;
				v = switchSetting.getCommunity();
				if (v == null || v.isEmpty()) {
					addFieldError("community", getText("Please input community"));
				}			
				v = switchSetting.getIp();
				if (!isValidIP(v)) {
					addFieldError("ip", getText("settings.err.invalid.ip") + v);
				}
				if (switchSetting.getIfindex() < 0) {
					addFieldError("port", getText("settings.err.invalid.port"));
				}			
			}
		}
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String save() {
		// check
		if (switchList != null && switchList.size() > 0) {
			for (Switch switchSetting : switchList) {
				try {
					switchService.get(switchSetting);
				} catch (UnknownHostException e) {
					addActionError(getText("server.setting.fault.error.ifindex.unreachable", new String[]{switchSetting.getIp(), String.valueOf(switchSetting.getIfindex())}));
					return SUCCESS;				
				} catch (InterruptedException e) {
					addActionError(getText("server.setting.fault.error.snmptool"));
					return SUCCESS;				
				} catch (IOException e) {
					addActionError(getText("server.setting.fault.error.snmptool"));
					return SUCCESS;				
				}
			}
		}
		// save
		switchService.saveSwitchList(id, switchList);
		return SUCCESS;
	}
}
