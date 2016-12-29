package com.arcsoft.commander.dao.settings;

import java.util.List;

import com.arcsoft.commander.domain.settings.FirewallRule;
import com.arcsoft.commons.utils.app.ShellException;

/**
 * 
 * 
 * @author hxiang
 *
 */
public interface FirewallDao {
	public abstract List<FirewallRule> getFirewallRules() throws ShellException;

	public abstract void add(FirewallRule rule) throws ShellException;

	public abstract void delete(FirewallRule rule) throws ShellException;

	public abstract void start() throws ShellException;

	public abstract void stop() throws ShellException;
	
	public abstract boolean  isServiceOn();
}