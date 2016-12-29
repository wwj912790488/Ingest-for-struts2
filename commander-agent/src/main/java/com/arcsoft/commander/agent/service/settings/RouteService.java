package com.arcsoft.commander.agent.service.settings;

import com.arcsoft.cluster.app.ActionException;
import com.arcsoft.cluster.app.Request;
import com.arcsoft.cluster.app.Response;
import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.ActionHandler;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.settings.network.AddRouteRequest;
import com.arcsoft.commander.cluster.action.settings.network.AddRouteResponse;
import com.arcsoft.commander.cluster.action.settings.network.DeleteRouteRequest;
import com.arcsoft.commander.cluster.action.settings.network.DeleteRouteResponse;
import com.arcsoft.commander.cluster.action.settings.network.ListRouteRequest;
import com.arcsoft.commander.cluster.action.settings.network.ListRouteResponse;
import com.arcsoft.commander.service.settings.LocalRouteService;
import com.arcsoft.commons.utils.app.ShellException;

/**
 * This service processes all route relation requests.
 * 
 * @author hxiang
 * @author fjli
 */
public class RouteService implements ActionHandler {

	private LocalRouteService localRouteService;

	public void setLocalRouteService(LocalRouteService localRouteService) {
		this.localRouteService = localRouteService;
	}

	/**
	 * Returns all route requests.
	 */
	@Override
	public int[] getActions() {
		return new int[] {
				Actions.ROUTE_LIST,
				Actions.ROUTE_ADD,
				Actions.ROUTE_DELETE
		};
	}

	/**
	 * Receive route requests, and dispatch request to process methods.
	 * 
	 * @param request - the task request
	 * @return returns the response
	 * @throws ActionException if process request failed.
	 */
	@Override
	public Response execute(Request request) throws ActionException {
		if (request instanceof ListRouteRequest) {
			return listRoute();
		} else if (request instanceof AddRouteRequest) {
			return addRoute((AddRouteRequest) request);
		} else if (request instanceof DeleteRouteRequest) {
			return deleteRoute((DeleteRouteRequest) request);
		}
		return null;
	}

	/**
	 * Get route list.
	 * 
	 * @param request - the list route request
	 * @return returns response including the route list.
	 */
	private ListRouteResponse listRoute() {
		ListRouteResponse resp = new ListRouteResponse();
		try {
			resp.setRoutes(localRouteService.getRoutes());
			resp.setErrorCode(ActionErrorCode.SUCCESS);
		} catch (ShellException e) {
			resp.setErrorCode(ActionErrorCode.RUN_SHELL_FAILED);
		} catch (Exception e) {
			resp.setErrorCode(ActionErrorCode.UNKNOWN_ERROR);
		}
		return resp;
	}

	/**
	 * Add new route.
	 * 
	 * @param request - the add route request
	 * @return returns response indicate the action is success or not.
	 */
	private AddRouteResponse addRoute(AddRouteRequest request) {
		AddRouteResponse resp = new AddRouteResponse();
		try {
			localRouteService.addRoute(request.getRoutes().get(0));
			resp.setErrorCode(ActionErrorCode.SUCCESS);
		} catch (ShellException e) {
			resp.setErrorCode(ActionErrorCode.RUN_SHELL_FAILED);
		} catch (Exception e) {
			resp.setErrorCode(ActionErrorCode.UNKNOWN_ERROR);
		}
		return resp;
	}

	/**
	 * Delete route.
	 * 
	 * @param request - the delete route request
	 * @return returns response indicate the action is success or not.
	 */
	private DeleteRouteResponse deleteRoute(DeleteRouteRequest request) {
		DeleteRouteResponse resp = new DeleteRouteResponse();
		try {
			localRouteService.deleteRoute(request.getRoutes().get(0));
			resp.setErrorCode(ActionErrorCode.SUCCESS);
		} catch (ShellException e) {
			resp.setErrorCode(ActionErrorCode.RUN_SHELL_FAILED);
		} catch (Exception e) {
			resp.setErrorCode(ActionErrorCode.UNKNOWN_ERROR);
		}
		return resp;
	}

}
