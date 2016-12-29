package com.arcsoft.commander.service.settings.impl;

import java.util.ArrayList;
import java.util.List;

import com.arcsoft.commander.cluster.action.settings.network.AddRouteRequest;
import com.arcsoft.commander.cluster.action.settings.network.AddRouteResponse;
import com.arcsoft.commander.cluster.action.settings.network.DeleteRouteRequest;
import com.arcsoft.commander.cluster.action.settings.network.DeleteRouteResponse;
import com.arcsoft.commander.cluster.action.settings.network.ListRouteRequest;
import com.arcsoft.commander.cluster.action.settings.network.ListRouteResponse;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.settings.Route;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.service.remote.RemoteExecutorServiceSupport;
import com.arcsoft.commander.service.settings.RemoteRouteService;

/**
 * The implementation of route settings for the specific agent.
 * 
 * @author hxiang
 */
public class RemoteRouteServiceImpl extends RemoteExecutorServiceSupport implements RemoteRouteService {

	@Override
	public List<Route> getRoutes(Server agent) {
		ListRouteRequest request = new ListRouteRequest();
		ListRouteResponse response = (ListRouteResponse) remoteExecutorService.remoteExecute(request, agent);
		return response.getRoutes();
	}

	@Override
	public void addRoute(Server agent, Route route) {
		AddRouteRequest request = new AddRouteRequest();
		ArrayList<Route> routes = new ArrayList<Route>();
		routes.add(route);
		request.setRoutes(routes);
		AddRouteResponse response = (AddRouteResponse) remoteExecutorService.remoteExecute(request, agent);
		if (!response.isSuccess())
			throw new RemoteException(agent);
	}

	@Override
	public void deleteRoute(Server agent, Route route) {
		DeleteRouteRequest request = new DeleteRouteRequest();
		ArrayList<Route> routes = new ArrayList<Route>();
		routes.add(route);
		request.setRoutes(routes);
		DeleteRouteResponse response = (DeleteRouteResponse) remoteExecutorService.remoteExecute(request, agent);
		if (!response.isSuccess())
			throw new RemoteException(agent);
	}

}
