package com.arcsoft.commander.cluster.action.settings.network;

import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;
import com.arcsoft.commander.cluster.action.BaseRequest;
import com.arcsoft.commander.domain.settings.Route;
/**
 * @author hxiang
 * Request for save route
 */
@XmlRootElement
public class AddRouteRequest extends BaseRequest {
	private List<Route> routes = null;
	
	public AddRouteRequest() {
		
	}
	
	public AddRouteRequest(List<Route> route) {
		this.routes = route;
	}

	public List<Route> getRoutes() {
		return routes;
	}

	public void setRoutes(List<Route> routes) {
		this.routes = routes;
	}
}
