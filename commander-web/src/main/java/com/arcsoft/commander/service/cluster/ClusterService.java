package com.arcsoft.commander.service.cluster;

import java.io.IOException;
import java.util.Enumeration;

import com.arcsoft.cluster.node.RemoteNode;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;

/**
 * Cluster service.
 * 
 * @author fjli
 */
public interface ClusterService {

	/**
	 * Search servers in cluster. Stop search if cannot find more server within the specified timeout.
	 * 
	 * @param timeout - the max waiting time since last server found.
	 * @return Enumeration of servers.
	 * @throws IOException - if cannot create search session.
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 */
	Enumeration<RemoteNode> search(long timeout) throws IOException;

	/**
	 * Start fault monitor when reboot or shutdown by manual 
	 * 
	 */
	void startFaultMonitor(String serverId);

	/**
	 * Stop fault monitor when reboot or shutdown by manual 
	 * 
	 */
	void stopFaultMonitor(String serverId);
	
	/**
	 * check fault monitor status 
	 * 
	 */
	boolean isFaultMonitoring(String serverId);	
}
