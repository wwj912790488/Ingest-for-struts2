package com.arcsoft.commander.service.settings.impl;

import java.util.List;

import com.arcsoft.commander.dao.settings.FirewallDao;
import com.arcsoft.commander.domain.settings.FirewallRule;
import com.arcsoft.commander.service.settings.LocalFirewallService;
import com.arcsoft.commons.utils.app.ShellException;

/**
 * The implementation of LocalFirewallService.
 * 
 * @author hxiang
 */
public class LocalFirewallServiceImpl implements LocalFirewallService {

	private FirewallDao firewallDao;

	public void setFirewallDao(FirewallDao firewallDao) {
		this.firewallDao = firewallDao;
	}

	@Override
	public List<FirewallRule> getFirewalls() throws Exception {
		return firewallDao.getFirewallRules();
	}

	@Override
	public void addFirewall(FirewallRule rule) throws Exception {
		firewallDao.add(rule);
	}

	@Override
	public void deleteFirewall(FirewallRule rule) throws Exception {
		firewallDao.delete(rule);
	}

	@Override
	public void startFirewall() throws ShellException {
		firewallDao.start();
	}

	@Override
	public void stopFirewall() throws ShellException {
		firewallDao.stop();
	}

	@Override
	public boolean isFirewallOn() {
		return firewallDao.isServiceOn();
	}

}
