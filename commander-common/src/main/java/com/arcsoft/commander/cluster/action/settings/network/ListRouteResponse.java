package com.arcsoft.commander.cluster.action.settings.network;

import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseResponse;
import com.arcsoft.commander.domain.settings.Route;
/**
 * @author hxiang
 * Response for list route
 */
@XmlRootElement
public class ListRouteResponse extends BaseResponse {
	private List<Route> routes = null;
	
	public List<Route> getRoutes() {
		return routes;
	}

	public void setRoutes(List<Route> routes) {
		this.routes = routes;
	}	
}
