package com.arcsoft.commander.action.snmp;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.security.access.prepost.PreAuthorize;

import com.arcsoft.commander.action.settings.BaseServerSettingAction;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;
import com.arcsoft.commander.service.snmp.RemoteSnmpService;
import com.arcsoft.transcoder.snmp.SnmpService;
import com.arcsoft.transcoder.snmp.SnmpSetting;

/**
 * Get/Set SNMP setting action.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class SnmpAction extends BaseServerSettingAction {

	private Logger log = Logger.getLogger(SnmpAction.class);
	private SnmpService snmpService;
	private RemoteSnmpService remoteSnmpService;
	private SnmpSetting snmp;
	private boolean success;
	private List<String> skipList = new ArrayList<>();

	public SnmpAction() {
		skipList.add("snmp.trapAllowed");
		skipList.add("snmp.trapCommunity");
		skipList.add("snmp.trapHost");
	}

	@Override
	public void addFieldError(String fieldName, String errorMessage) {
		if (!isArcVideoSnmpEnabled()) {
			if (skipList.contains(fieldName))
				return;
		}
		super.addFieldError(fieldName, errorMessage);
	}

	public void setSnmpService(SnmpService snmpService) {
		this.snmpService = snmpService;
	}

	public void setRemoteSnmpService(RemoteSnmpService remoteSnmpService) {
		this.remoteSnmpService = remoteSnmpService;
	}

	public SnmpSetting getSnmp() {
		return snmp;
	}

	public void setSnmp(SnmpSetting snmp) {
		this.snmp = snmp;
	}

	public boolean isArcVideoSnmpEnabled() {
		return snmpService.isEnableArcVideoSnmp();
	}

	public boolean isSuccess() {
		return success;
	}

	/**
	 * Get SNMP settings.
	 */
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String get() {
		if (isLocal) {
			try {
				snmp = snmpService.getSetting();
				return SUCCESS;
			} catch (Exception e) {
				log.error("get snmp settings failed.", e);
				addActionError(getText("snmp.error.get.failed"));
			}
		} else {
			Server agent = serverService.getServer(id);
			if (agent != null) {
				try {
					snmp = remoteSnmpService.getSetting(agent);
					return SUCCESS;
				} catch (SystemNotInitializedException e) {
					addActionError(getText("system.not.initialized"));
				} catch (AccessDeniedForSlaveException e) {
					addActionError(getText("system.slave.access.denied"));
				} catch (ServerNotAvailableException e) {
					addActionError(getText("msg.error.server.not.available"));
				} catch (Exception e) {
					log.error("get snmp settings failed.", e);
					addActionError(getText("snmp.error.get.failed"));
				}
			} else {
				addActionError(getText("msg.error.server.not.available"));
			}
		}
		return ERROR;
	}

	/**
	 * Save SNMP settings.
	 */
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String save() {
		if (isLocal) {
			try {
				snmpService.setSetting(snmp);
				success = true;
			} catch (Exception e) {
				log.error("save snmp settings failed.", e);
				addActionError(getText("snmp.error.save.failed"));
			}
		} else {
			Server agent = serverService.getServer(id);
			if (agent != null) {
				try {
					remoteSnmpService.setSetting(agent, snmp);
					success = true;
				} catch (SystemNotInitializedException e) {
					addActionError(getText("system.not.initialized"));
				} catch (AccessDeniedForSlaveException e) {
					addActionError(getText("system.slave.access.denied"));
				} catch (ServerNotAvailableException e) {
					addActionError(getText("msg.error.server.not.available"));
				} catch (Exception e) {
					log.error("save snmp settings failed.", e);
					addActionError(getText("snmp.error.save.failed"));
				}
			} else {
				addActionError(getText("msg.error.server.not.available"));
			}
		}
		return SUCCESS;
	}

}
