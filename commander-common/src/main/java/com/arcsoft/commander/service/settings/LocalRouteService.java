package com.arcsoft.commander.service.settings;

import java.util.List;

import com.arcsoft.commander.domain.settings.Route;

/**
 * Local route service.
 * 
 * @author hxiang
 */
public interface LocalRouteService {

	List<Route> getRoutes() throws Exception;

	void addRoute(Route route) throws Exception;

	void deleteRoute(Route route) throws Exception;

}
