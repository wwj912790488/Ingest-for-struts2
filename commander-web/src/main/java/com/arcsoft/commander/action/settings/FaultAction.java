package com.arcsoft.commander.action.settings;

import org.springframework.security.access.prepost.PreAuthorize;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.service.cluster.ClusterService;

/**
 * Action for fault setting.
 * 
 * @author wtsun
 */
@SuppressWarnings("serial")
public class FaultAction extends BaseServerSettingAction {
	private ClusterService clusterService;
	private Boolean faultDisabled;
	private Boolean faultMonitoring;

	public void setClusterService(ClusterService clusterService) {
		this.clusterService = clusterService;
	}
	
	public Boolean getFaultDisabled() {
		return faultDisabled;
	}

	public void setFaultDisabled(Boolean faultDisabled) {
		this.faultDisabled = faultDisabled;
	}

	public Boolean getFaultMonitoring() {
		return faultMonitoring;
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String getMonitorSetting() {
		this.faultMonitoring = clusterService.isFaultMonitoring(id);
		this.faultDisabled = false;
		if (!this.isLocal) {
			Server server = serverService.getServer(id);
			if (server != null) {
				this.faultDisabled = server.isFaultDisabled();
			}
		}
		return SUCCESS;
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String setMonitorSetting() {
		if (faultDisabled == true) {
			clusterService.stopFaultMonitor(id);
		}
		else {
			try {
				clusterService.startFaultMonitor(id);
			} catch (Exception e) {
				addActionError(getText("server.setting.fault.error.monitor.start.failed"));
				return SUCCESS;
			}
		}
		// udpate db
		Server agent = serverService.getServer(id);
		agent.setFaultDisabled(faultDisabled);
		serverService.updateFaultDisabled(agent);
		return SUCCESS;
	}


}
