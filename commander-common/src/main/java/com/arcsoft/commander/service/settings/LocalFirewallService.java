package com.arcsoft.commander.service.settings;

import java.util.List;

import com.arcsoft.commander.domain.settings.FirewallRule;
import com.arcsoft.commons.utils.app.ShellException;

/**
 * Local firewall service.
 * 
 * @author hxiang
 */
public interface LocalFirewallService {

	List<FirewallRule> getFirewalls() throws Exception;

	void addFirewall(FirewallRule rule) throws Exception;

	void deleteFirewall(FirewallRule rule) throws Exception;

	void startFirewall() throws ShellException;

	void stopFirewall() throws ShellException;

	boolean isFirewallOn();

}
