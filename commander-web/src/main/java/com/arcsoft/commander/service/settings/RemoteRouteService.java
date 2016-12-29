package com.arcsoft.commander.service.settings;

import java.util.List;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.settings.Route;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;

/**
 * Remote route service.
 * 
 * @author hxiang
 */
public interface RemoteRouteService {

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
	List<Route> getRoutes(Server agent);

	/**
	 * Add route to the specified agent.
	 * 
	 * @param agent - the specified agent
	 * @param route - the route to be added
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if service in not available.
	 * @throws RemoteException if execute request failed.
	 */
	void addRoute(Server agent, Route route);

	/**
	 * Delete route from the specified agent.
	 * 
	 * @param agent - the specified agent
	 * @param route - the route to be deleted
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if service in not available.
	 * @throws RemoteException if execute request failed.
	 */
	void deleteRoute(Server agent, Route route);

}
