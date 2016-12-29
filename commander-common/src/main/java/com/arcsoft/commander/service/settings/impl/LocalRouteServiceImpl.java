package com.arcsoft.commander.service.settings.impl;

import java.util.List;

import com.arcsoft.commander.dao.settings.RouteDao;
import com.arcsoft.commander.domain.settings.Route;
import com.arcsoft.commander.service.settings.LocalRouteService;

/**
 * The implementation of LocalRouteService.
 * 
 * @author hxiang
 */
public class LocalRouteServiceImpl implements LocalRouteService {

	private RouteDao routeDao;

	public void setRouteDao(RouteDao routeDao) {
		this.routeDao = routeDao;
	}

	@Override
	public List<Route> getRoutes() throws Exception {
		return routeDao.getRoutes();
	}

	@Override
	public void addRoute(Route route) throws Exception {
		routeDao.add(route);
	}

	@Override
	public void deleteRoute(Route route) throws Exception {
		routeDao.delete(route);
	}

}
