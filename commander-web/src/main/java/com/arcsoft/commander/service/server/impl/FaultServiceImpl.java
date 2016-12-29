package com.arcsoft.commander.service.server.impl;

import com.arcsoft.arcvideo.spring.event.EventReceiver;
import com.arcsoft.commander.dao.server.SwitchSyncDao;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.SwitchSync;
import com.arcsoft.commander.service.BaseService;
import com.arcsoft.commander.service.server.FaultService;
import com.arcsoft.commander.service.server.event.ServerAliveChangedEvent;
import com.arcsoft.commander.service.settings.IpmiService;
import com.arcsoft.commander.service.settings.SwitchService;

/**
 * 
 * @author wtsun
 */
public class FaultServiceImpl extends BaseService implements FaultService {

	private IpmiService ipmiService;
	private SwitchService switchService;
	private SwitchSyncDao switchSyncDao;

	public void setIpmiService(IpmiService ipmiService) {
		this.ipmiService = ipmiService;
	}

	public void setSwitchService(SwitchService switchService) {
		this.switchService = switchService;
	}

	public void setSwitchSyncDao(SwitchSyncDao switchSyncDao) {
		this.switchSyncDao = switchSyncDao;
	}

	@EventReceiver(value = ServerAliveChangedEvent.class, sync = true)
	public void onServerAliveChanged(ServerAliveChangedEvent event) {
		if (event.getServer().isAlive()) {
			LOG.info("FaultService: onServerAliveChanged.");
			try {
				// remove waiting reboot
				switchSyncDao.del(new SwitchSync(event.getServer().getId()));
				// enable switch port if alive
				switchService.up(event.getServer());
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	public void faultProcess(Server server) {
		if (server != null && server.isFaultDisabled() == false) {
			LOG.info("FaultService: faultProcess server=" + server.getName());
			try {
				// disable switch port of agent by snmp
				switchService.down(server);
			} catch (Exception e) {
				e.printStackTrace();
			}

			try {
				switchSyncDao.add(new SwitchSync(server.getId()));
				// reboot from by ipmi
				ipmiService.reboot(server);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	public boolean isFaultProcess(String serverId) {
		return switchSyncDao.isExists(serverId);
	}

}
