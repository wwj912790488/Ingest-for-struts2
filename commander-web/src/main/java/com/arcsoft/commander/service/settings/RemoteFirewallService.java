package com.arcsoft.commander.service.settings;

import java.util.List;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.settings.FirewallRule;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;

/**
 * Remote firewall service.
 * 
 * @author hxiang
 */
public interface RemoteFirewallService {

	/**
	 * Get firewall rules from the specified agent.
	 * 
	 * @param agent - the specified agent
	 * @return the firewall rules list.
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if service in not available.
	 * @throws RemoteException if execute request failed.
	 */
	List<FirewallRule> getFirewalls(Server agent);

	/**
	 * Add firewall rule to the specified agent.
	 * 
	 * @param agent - the specified agent
	 * @param rule - the firewall rule to be added
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if service in not available.
	 * @throws RemoteException if execute request failed.
	 */
	void addFirewall(Server agent, FirewallRule rule);

	/**
	 * Delete firewall rule from the specified agent.
	 * 
	 * @param agent - the specified agent
	 * @param rule - the firewall rule to be deleted
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if service in not available.
	 * @throws RemoteException if execute request failed.
	 */
	void deleteFirewall(Server agent, FirewallRule rule);

	/**
	 * Start firewall service of the specified agent.
	 * 
	 * @param agent - the specified agent.
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if service in not available.
	 * @throws RemoteException if execute request failed.
	 */
	void startFirewall(Server agent);

	/**
	 * Stop firewall service of the specified agent.
	 * 
	 * @param agent - the specified agent.
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if service in not available.
	 * @throws RemoteException if execute request failed.
	 */
	void stopFirewall(Server agent);

	/**
	 * Get firewall service state of the specified agent.
	 * 
	 * @param agent - the specified agent.
	 * @return true if the service is on, otherwise false.
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if service in not available.
	 * @throws RemoteException if execute request failed.
	 */
	boolean isFirewallOn(Server agent);

}
