package com.arcsoft.commander.service.settings.impl;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.UnknownHostException;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import com.arcsoft.commander.dao.settings.SwitchDao;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.settings.Switch;
import com.arcsoft.commander.service.BaseService;
import com.arcsoft.commander.service.cluster.fault.FaultAlertEvent;
import com.arcsoft.commander.service.settings.SwitchService;

public class SwitchServiceImpl extends BaseService implements SwitchService {
	protected static final String IFADMINSTATUS = ".1.3.6.1.2.1.2.2.1.7.";
	protected static final int snmpPort = 161;
	protected SwitchDao switchDao;

	public void setSwitchDao(SwitchDao switchDao) {
		this.switchDao = switchDao;
	}

	@Override
	public List<Switch> getSwitchList(String serverId) {
		return switchDao.getSwitchList(serverId);
	}

	@Override
	public void saveSwitchList(String serverId, List<Switch> switchList) {
		switchDao.save(serverId, switchList);
	}

	@Override
	public void up(Server server) {
		List<Switch> switchList = switchDao.getSwitchList(server.getId());
		if (switchList != null && switchList.size() > 0) {
			for (Switch switchSetting : switchList) {
				try {
					up(switchSetting);
				} catch (UnknownHostException e) {
					// the switch is not reachable
					getEventManager().submit(new FaultAlertEvent(server, FaultAlertEvent.UP_SWITCH_FAILED, switchSetting.getIp(), switchSetting.getIfindex(), "-1"));
				} catch (IOException e) {
					// the snmp tool is not installed
					getEventManager().submit(new FaultAlertEvent(server, FaultAlertEvent.UP_SWITCH_FAILED, switchSetting.getIp(), switchSetting.getIfindex(), "-2"));
				} catch (Exception e) {
					// unknown error
					getEventManager().submit(new FaultAlertEvent(server, FaultAlertEvent.UP_SWITCH_FAILED, switchSetting.getIp(), switchSetting.getIfindex(), "-3"));
					e.printStackTrace();
				}
			}
		}
	}

	@Override
	public void down(Server server) {
		List<Switch> switchList = switchDao.getSwitchList(server.getId());
		if (switchList != null && switchList.size() > 0) {
			for (Switch switchSetting : switchList) {
				try {
					down(switchSetting);
				} catch (UnknownHostException e) {
					// the switch is not reachable
					getEventManager().submit(new FaultAlertEvent(server, FaultAlertEvent.DOWN_SWITCH_FAILED, switchSetting.getIp(), switchSetting.getIfindex(), "-1"));
				} catch (IOException e) {
					// the snmp tool is not installed
					getEventManager().submit(new FaultAlertEvent(server, FaultAlertEvent.DOWN_SWITCH_FAILED, switchSetting.getIp(), switchSetting.getIfindex(), "-2"));
				} catch (Exception e) {
					// unknown error
					getEventManager().submit(new FaultAlertEvent(server, FaultAlertEvent.DOWN_SWITCH_FAILED, switchSetting.getIp(), switchSetting.getIfindex(), "-3"));
					e.printStackTrace();
				}
			}
		}
	}

	@Override
	public boolean up(Switch switchSetting) throws IOException, InterruptedException, UnknownHostException{
		LOG.info("SwitchServiceImpl:up community=" + switchSetting.getCommunity() + ",ip=" + switchSetting.getIp() + ",ifindex=" + switchSetting.getIfindex());
		Process pro = null;
		BufferedReader read = null;
		boolean status = false;
		try {
			String cmd = "snmpset -v 2c -c " + switchSetting.getCommunity() + " " + switchSetting.getIp() + " " + IFADMINSTATUS + switchSetting.getIfindex() + " i 1";
			pro = Runtime.getRuntime().exec(cmd);
			pro.waitFor();
			read = new BufferedReader(new InputStreamReader(pro.getInputStream()));
			String result = read.readLine();
			if (result == null) {
				throw new UnknownHostException();
			}
			if (StringUtils.contains(result, "IF-MIB::ifAdminStatus") && StringUtils.contains(result, "up"))
				status = true;
		} finally {
			if (read != null) {
				try {
					read.close();
				} catch (IOException e) {
				}
			}
		}
		return status;
	}
	
	@Override
	public boolean down(Switch switchSetting) throws IOException, InterruptedException, UnknownHostException {
		LOG.info("SwitchServiceImpl:down community=" + switchSetting.getCommunity() + ",ip=" + switchSetting.getIp() + ",ifindex=" + switchSetting.getIfindex());
		Process pro = null;
		BufferedReader read = null;
		boolean status = false;
		try {
			String cmd = "snmpset -v 2c -c " + switchSetting.getCommunity() + " " + switchSetting.getIp() + " " + IFADMINSTATUS + switchSetting.getIfindex() + " i 2";
			pro = Runtime.getRuntime().exec(cmd);
			pro.waitFor();
			read = new BufferedReader(new InputStreamReader(pro.getInputStream()));
			String result = read.readLine();
			if (result == null) {
				throw new UnknownHostException();
			}
			if (StringUtils.contains(result, "IF-MIB::ifAdminStatus") && StringUtils.contains(result, "down"))
				status = true;
		} finally {
			if (read != null) {
				try {
					read.close();
				} catch (IOException e) {
				}
			}
		}
		return status;
	}

	@Override
	public boolean get(Switch switchSetting) throws IOException, InterruptedException, UnknownHostException {
		Process pro = null;
		BufferedReader read = null;
		boolean status = false;
		try {
			String cmd = "snmpget -v 2c -c " + switchSetting.getCommunity() + " " + switchSetting.getIp() + " " + IFADMINSTATUS + switchSetting.getIfindex();
			pro = Runtime.getRuntime().exec(cmd);
			pro.waitFor();
			read = new BufferedReader(new InputStreamReader(pro.getInputStream()));
			String result = read.readLine();
			if (result == null || !StringUtils.contains(result, "IF-MIB::ifAdminStatus") || StringUtils.contains(result, "No Such Instance")) {
				throw new UnknownHostException();
			}
			if (StringUtils.contains(result, "up")) {
				status = true;
			}
		} finally {
			if (read != null) {
				try {
					read.close();
				} catch (IOException e) {
				}
			}
		}
		return status;
	}

}
