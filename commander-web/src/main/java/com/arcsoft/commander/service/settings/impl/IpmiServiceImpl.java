package com.arcsoft.commander.service.settings.impl;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.SocketAddress;
import java.net.SocketTimeoutException;
import java.net.UnknownHostException;

import org.apache.commons.lang.StringUtils;

import com.arcsoft.commander.dao.settings.IpmiDao;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.settings.IPMI;
import com.arcsoft.commander.service.BaseService;
import com.arcsoft.commander.service.cluster.fault.FaultAlertEvent;
import com.arcsoft.commander.service.settings.IpmiService;

public class IpmiServiceImpl extends BaseService implements IpmiService {
	protected final int ipmiPort = 623;
	protected IpmiDao ipmiDao;
	
	public void setIpmiDao(IpmiDao impiDao) {
		this.ipmiDao = impiDao;
	}
	
	@Override
	public int getPort() {
		return ipmiPort;
	}

	@Override
	public IPMI getIpmi(String id) {
		return this.ipmiDao.get(id);
	}

	@Override
	public void deleteIpmi(String id) {
		this.ipmiDao.delete(id);
	}

	@Override
	public void saveIpmi(IPMI ipmi) {
		this.ipmiDao.update(ipmi);
	}
	
	@Override
	public void reboot(Server server) {
		IPMI ipmi = ipmiDao.get(server.getId());
		if (ipmi != null) {
			try {
				reboot(ipmi);
			} catch (UnknownHostException e) {
				// the ipmi server is not reachable
				getEventManager().submit(new FaultAlertEvent(server, FaultAlertEvent.REBOOT_FAILED, ipmi.getIp(), ipmiPort, "-1"));
			} catch (IOException e) {
				// the ipmi toolis not installed
				getEventManager().submit(new FaultAlertEvent(server, FaultAlertEvent.REBOOT_FAILED, ipmi.getIp(), ipmiPort, "-2"));
			} catch (Exception e) {
				// unknown error
				getEventManager().submit(new FaultAlertEvent(server, FaultAlertEvent.REBOOT_FAILED, ipmi.getIp(), ipmiPort, "-3"));
				e.printStackTrace();
			}
		}
	}
	
	@Override
	public void reboot(IPMI ipmi) throws IOException, InterruptedException, UnknownHostException {
		LOG.info("IpmiServiceImpl:reboot ip=" + ipmi.getIp());
		Process pro = null;
		BufferedReader read = null;
		try {
			String cmd = "ipmitool -I lanplus -H " + ipmi.getIp() + " -U " + ipmi.getUser() + " -P " + ipmi.getPassword() + " power reset";
			pro = Runtime.getRuntime().exec(cmd);
			pro.waitFor();
			read = new BufferedReader(new InputStreamReader(pro.getInputStream()));
			String result = read.readLine();
			if (result == null || StringUtils.contains(result, "Error: Unable to establish IPMI v2 / RMCP+ session")) {
				throw new UnknownHostException();
			}
		} finally {
			if (read != null) {
				try {
					read.close();
				} catch (IOException e) {
				}
			}
		}
	}

	@Override
	public boolean checkIpmiAvaliable(String ip, int timeout) {
		boolean status = false;
		Socket s = null;
		//String reason = null;
		try {
			s = new Socket();
			s.setReuseAddress(true);
			SocketAddress sa = new InetSocketAddress(ip, ipmiPort);
			s.connect(sa, timeout * 1000);
		} catch (IOException e) {
			if (e.getMessage().equals("Connection refused")) {
				//reason = port + " on " + ip + " is closed.";
			}
			;
			if (e instanceof UnknownHostException) {
				//reason = ip + " is unresolved.";
			}
			if (e instanceof SocketTimeoutException) {
				//reason = "timeout while attempting to reach " + ip + " on port " + port;
			}
		} finally {
			if (s != null) {
				if (s.isConnected()) {
					//System.out.println(port + " on " + ip + " is reachable!");
					status = true;
				} else {
					//System.out.println(port + " on " + ip + " is not reachable; reason: " + reason);
				}
				try {
					s.close();
				}
				catch (IOException e) {
				}
			}
		}
		return status;
	}
	/*
	private boolean checkIpmiAvaliable1(IPMI ipmi) throws IOException, InterruptedException {
		Process pro = null;
		BufferedReader read = null;
		boolean status = false;
		try {
			String cmd = "ipmitool -I lanplus -H " + ipmi.getIp() + " -U " + ipmi.getUser() + " -P " + ipmi.getPassword() + " power status";
			pro = Runtime.getRuntime().exec(cmd);
			pro.waitFor();
			read = new BufferedReader(new InputStreamReader(pro.getInputStream()));
			String result = read.readLine();
			if (result == null || !StringUtils.contains(result, "Chassis Power is")) {
				throw new UnknownHostException();
			}
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
	*/
}
