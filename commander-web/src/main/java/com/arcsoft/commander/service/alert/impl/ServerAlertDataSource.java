package com.arcsoft.commander.service.alert.impl;

import com.arcsoft.arcvideo.spring.event.EventReceiver;
import com.arcsoft.commander.domain.alert.AlertAttribute;
import com.arcsoft.commander.domain.alert.AlertData;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.service.alert.AlertCommandClient;
import com.arcsoft.commander.service.cluster.fault.FaultAlertEvent;
import com.arcsoft.commander.service.server.event.ServerAliveChangedEvent;
import com.arcsoft.commander.service.server.event.ServerRoleSwitchEvent;
import com.arcsoft.commander.service.server.event.ServerStateChangedEvent;
import com.arcsoft.commander.service.server.event.ServerTakeOverEvent;

/**
 * Server alert data source.
 * 
 * @author fjli
 */
public class ServerAlertDataSource {

	private AlertCommandClient alertCommandClient;

	public void setAlertCommandClient(AlertCommandClient alertCommandClient) {
		this.alertCommandClient = alertCommandClient;
	}

	@EventReceiver(ServerAliveChangedEvent.class)
	public void onServerAliveChanged(ServerAliveChangedEvent event) {
		Server server = event.getServer();
		if (!server.isAlive()) {
			AlertData data = new AlertData();
			data.setIp(server.getIp());
			data.setCode("device_offline");
			alertCommandClient.send(data);
		}
	}

	@EventReceiver(ServerTakeOverEvent.class)
	public void onServerTakeOver(ServerTakeOverEvent event) {
		Server oldServer = event.getOldServer();
		Server newServer = event.getNewServer();
		AlertData data = new AlertData();
		data.setAttribute(AlertAttribute.ATTR_GROUP_NAME, event.getGroup().getName());
		data.setIp(oldServer.getIp());
		if (newServer == null) {
			data.setCode("device_no_backup");
		} else {
			data.setCode("device_take_over");
			data.setAttribute(AlertAttribute.ATTR_SOURCE_IP, oldServer.getIp());
			data.setAttribute(AlertAttribute.ATTR_NEW_SERVER, newServer.getIp());
		}
		alertCommandClient.send(data);
	}

	@EventReceiver(ServerRoleSwitchEvent.class)
	public void onServerRoleSwitch(ServerRoleSwitchEvent event) {
		Server master = event.getMaster();
		Server slave = event.getSlave();
		AlertData data = new AlertData();
		data.setIp(slave.getIp());
		data.setCode("device_switch_role");
		data.setAttribute(AlertAttribute.ATTR_GROUP_NAME, event.getGroup().getName());
		data.setAttribute(AlertAttribute.ATTR_SOURCE_IP, slave.getIp());
		data.setAttribute(AlertAttribute.ATTR_NEW_SERVER, master.getIp());
		alertCommandClient.send(data);
	}

	@EventReceiver(ServerStateChangedEvent.class)
	public void onServerStateChanged(ServerStateChangedEvent event) {
		Server server = event.getServer();
		if ((server.getState() & Server.STATE_NETWORK_ERROR) != 0) {
			AlertData data = new AlertData();
			data.setIp(server.getIp());
			data.setCode("device_network_broken");
			alertCommandClient.send(data);
		} else if ((server.getState() & Server.STATE_GPU_ERROR) != 0) {
			AlertData data = new AlertData();
			data.setIp(server.getIp());
			data.setCode("device_gpu_broken");
			alertCommandClient.send(data);
		}
	}

	@EventReceiver(FaultAlertEvent.class)
	public void onFaultAlert(FaultAlertEvent event) {
		Server server = (Server)event.getSource();
		AlertData data = new AlertData();
		data.setIp(server.getIp());
		if (event.getCode() == FaultAlertEvent.MONITOR_FAILED) {
			data.setCode("fault_monitor_failed");
		}
		else if (event.getCode() == FaultAlertEvent.FAULT_DETECTED) {
			data.setCode("fault_detected");
		}
		else if (event.getCode() == FaultAlertEvent.REBOOT_FAILED) {
			data.setCode("fault_reboot_failed");
			data.setAttribute(AlertAttribute.ATTR_SOURCE_IP, event.getIp());
			data.setAttribute(AlertAttribute.ATTR_ERROR_CODE, event.getError());
		}
		else if (event.getCode() == FaultAlertEvent.UP_SWITCH_FAILED) {
			data.setCode("fault_switch_failed");
			data.setAttribute(AlertAttribute.ATTR_SOURCE_IP, event.getIp() + ":" + event.getPort());
			data.setAttribute(AlertAttribute.ATTR_ERROR_CODE, event.getError());
		}
		else if (event.getCode() == FaultAlertEvent.DOWN_SWITCH_FAILED) {
			data.setCode("fault_switch_failed");
			data.setAttribute(AlertAttribute.ATTR_SOURCE_IP, event.getIp() + ":" + event.getPort());
			data.setAttribute(AlertAttribute.ATTR_ERROR_CODE, event.getError());
		}
		alertCommandClient.send(data);
	}	
}
