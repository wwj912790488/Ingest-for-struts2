package com.arcsoft.commander.action.settings;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.settings.Eth;
import com.arcsoft.commander.domain.settings.Route;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;
import com.arcsoft.commander.service.settings.LocalEthService;
import com.arcsoft.commander.service.settings.LocalRouteService;
import com.arcsoft.commander.service.settings.RemoteEthService;
import com.arcsoft.commander.service.settings.RemoteRouteService;

/**
 * Action for route.
 * 
 * @author hxiang
 * 
 */
@SuppressWarnings("serial")
public class RouteAction extends BaseServerSettingAction {

	private LocalEthService localEthService;
	private RemoteEthService remoteEthService;
	private LocalRouteService localRouteService;
	private RemoteRouteService remoteRouteService;
	private int index;
	private Route route;// parameter for adding and deleting route.
	private List<Route> routes; // result for getting all routeList.
	private List<Eth> eths;

	public void setLocalEthService(LocalEthService localEthService) {
		this.localEthService = localEthService;
	}

	public void setRemoteEthService(RemoteEthService remoteEthService) {
		this.remoteEthService = remoteEthService;
	}

	public void setLocalRouteService(LocalRouteService localRouteService) {
		this.localRouteService = localRouteService;
	}

	public void setRemoteRouteService(RemoteRouteService remoteRouteService) {
		this.remoteRouteService = remoteRouteService;
	}

	public Route getRoute() {
		return route;
	}

	public void setRoute(Route route) {
		this.route = route;
	}

	public int getIndex() {
		return index;
	}

	public List<Eth> getEths() {
		return eths;
	}

	public void setEths(List<Eth> eths) {
		this.eths = eths;
	}

	public void setIndex(int index) {
		this.index = index;
	}

	public List<Route> getRoutes() {
		return routes;
	}

	public void setRoutes(List<Route> routes) {
		this.routes = routes;
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String get() {
		try {
			if (isLocal) {
				routes = localRouteService.getRoutes();
				eths = localEthService.getValidEths();
			} else {
				Server agent = serverService.getServer(id);
				routes = remoteRouteService.getRoutes(agent);
				eths = remoteEthService.getValidEths(agent);
			}
		} catch (SystemNotInitializedException e) {
			addActionError(getText("system.not.initialized"));
		} catch (AccessDeniedForSlaveException e) {
			addActionError(getText("system.slave.access.denied"));
		} catch (ServerNotAvailableException se) {
			addActionError(getText("msg.error.server.not.available"));
		} catch (RemoteException re) {
			addActionError(re.getMessage());
		} catch (Exception e) {
			addActionError(e.getMessage());
		}
		return SUCCESS;
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String add() {
		try {
			if (isLocal) {
				localRouteService.addRoute(route);
			} else {
				Server agent = serverService.getServer(id);
				remoteRouteService.addRoute(agent, route);
			}
		} catch (SystemNotInitializedException e) {
			addActionError(getText("system.not.initialized"));
		} catch (AccessDeniedForSlaveException e) {
			addActionError(getText("system.slave.access.denied"));
		} catch (ServerNotAvailableException se) {
			addActionError(getText("msg.error.server.not.available"));
		} catch (RemoteException re) {
			addActionError(re.getMessage());
		} catch (Exception e) {
			addActionError(e.getMessage());
		}
		return SUCCESS;
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String delete() {
		try {
			if (isLocal) {
				localRouteService.deleteRoute(route);
			} else {
				Server agent = serverService.getServer(id);
				remoteRouteService.deleteRoute(agent, route);
			}
		} catch (SystemNotInitializedException e) {
			addActionError(getText("system.not.initialized"));
		} catch (AccessDeniedForSlaveException e) {
			addActionError(getText("system.slave.access.denied"));
		} catch (ServerNotAvailableException se) {
			addActionError(getText("msg.error.server.not.available"));
		} catch (RemoteException re) {
			addActionError(re.getMessage());
		} catch (Exception e) {
			addActionError(e.getMessage());
		}
		return SUCCESS;
	}

}
