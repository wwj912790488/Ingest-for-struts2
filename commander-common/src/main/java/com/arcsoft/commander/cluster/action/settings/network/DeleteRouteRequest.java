package com.arcsoft.commander.cluster.action.settings.network;

import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseRequest;
import com.arcsoft.commander.domain.settings.Route;

/**
 * @author hxiang
 *
 */
@XmlRootElement
public class DeleteRouteRequest extends BaseRequest {
	private List<Route> routes = null;
	
	public DeleteRouteRequest() {
		
	}
	
	public DeleteRouteRequest(List<Route> route) {
		this.routes = route;
	}

	public List<Route> getRoutes() {
		return routes;
	}

	public void setRoutes(List<Route> routes) {
		this.routes = routes;
	}	
}
