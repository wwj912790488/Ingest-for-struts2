package com.arcsoft.commander.service.settings;

import java.util.List;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.settings.DNS;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;

/**
 * Remote DNS service.
 * 
 * @author hxiang
 */
public interface RemoteDNSService {

	/**
	 * Get the DNS list from the specified agent.
	 * 
	 * @param agent - the specified agent
	 * @return the DNS list.
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if service in not available.
	 * @throws RemoteException if execute request failed.
	 */
	List<DNS> getDnsList(Server agent);

	/**
	 * Add DNS to the specified agent.
	 * 
	 * @param agent - the specified agent
	 * @param dns - the DNS to be added
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if service in not available.
	 * @throws RemoteException if execute request failed.
	 */
	void addDns(Server agent, DNS dns);

	/**
	 * Delete DNS from the specified agent.
	 * 
	 * @param agent - the specified agent
	 * @param dns - the DNS to be deleted
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if service in not available.
	 * @throws RemoteException if execute request failed.
	 */
	void deleteDns(Server agent, DNS dns);

}
