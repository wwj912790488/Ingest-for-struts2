package com.arcsoft.commander.agent.service.settings;

import com.arcsoft.cluster.app.ActionException;
import com.arcsoft.cluster.app.Request;
import com.arcsoft.cluster.app.Response;
import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.ActionHandler;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.settings.network.AddDNSRequest;
import com.arcsoft.commander.cluster.action.settings.network.AddDNSResponse;
import com.arcsoft.commander.cluster.action.settings.network.DeleteDNSRequest;
import com.arcsoft.commander.cluster.action.settings.network.DeleteDNSResponse;
import com.arcsoft.commander.cluster.action.settings.network.ListDNSRequest;
import com.arcsoft.commander.cluster.action.settings.network.ListDNSResponse;
import com.arcsoft.commander.service.settings.LocalDNSService;
import com.arcsoft.commons.utils.app.ShellException;

/**
 * This service processes all date/time relation requests.
 * 
 * @author hxiang
 * @author fjli
 */
public class DNSService implements ActionHandler {

	private LocalDNSService localDNSService;

	public void setLocalDNSService(LocalDNSService localDNSService) {
		this.localDNSService = localDNSService;
	}

	/**
	 * Returns all DNS actions.
	 */
	@Override
	public int[] getActions() {
		return new int[] {
				Actions.DNS_LIST,
				Actions.DNS_ADD,
				Actions.DNS_DELETE
			};
	}

	/**
	 * Receive DNS requests, and dispatch request to process methods.
	 * 
	 * @param request - the task request
	 * @return returns the response
	 * @throws ActionException if process request failed.
	 */
	@Override
	public Response execute(Request request) throws ActionException {
		if (request instanceof ListDNSRequest) {
			return listDNS();
		} else if (request instanceof AddDNSRequest) {
			return addDNS((AddDNSRequest) request);
		} else if (request instanceof DeleteDNSRequest) {
			return deleteDNS((DeleteDNSRequest) request);
		}
		return null;
	}

	/**
	 * Get DNS list.
	 * 
	 * @param request - the list DNS request
	 * @return returns the DNS list.
	 */
	private ListDNSResponse listDNS() {
		ListDNSResponse resp = new ListDNSResponse();
		try {
			resp.setDnsList(localDNSService.getDnSList());
			resp.setErrorCode(ActionErrorCode.SUCCESS);
		} catch (ShellException e) {
			resp.setErrorCode(ActionErrorCode.RUN_SHELL_FAILED);
		} catch (Exception e) {
			resp.setErrorCode(ActionErrorCode.UNKNOWN_ERROR);
		}
		return resp;
	}

	/**
	 * Add new DNS.
	 * 
	 * @param request - the add DNS request
	 * @return returns response indicate the action is success or not.
	 */
	private AddDNSResponse addDNS(AddDNSRequest request) {
		AddDNSResponse resp = new AddDNSResponse();
		try {
			localDNSService.addDns(request.getDNSList().get(0));
			resp.setErrorCode(ActionErrorCode.SUCCESS);
		} catch (ShellException e) {
			resp.setErrorCode(ActionErrorCode.RUN_SHELL_FAILED);
		} catch (Exception e) {
			resp.setErrorCode(ActionErrorCode.UNKNOWN_ERROR);
		}
		return resp;
	}

	/**
	 * Delete DNS.
	 * 
	 * @param request - the delete DNS request
	 * @return returns response indicate the action is success or not.
	 */
	private DeleteDNSResponse deleteDNS(DeleteDNSRequest request) {
		DeleteDNSResponse resp = new DeleteDNSResponse();
		try {
			localDNSService.deleteDns(request.getDNSList().get(0));
			resp.setErrorCode(ActionErrorCode.SUCCESS);
		} catch (ShellException e) {
			resp.setErrorCode(ActionErrorCode.RUN_SHELL_FAILED);
		} catch (Exception e) {
			resp.setErrorCode(ActionErrorCode.UNKNOWN_ERROR);
		}
		return resp;
	}

}
