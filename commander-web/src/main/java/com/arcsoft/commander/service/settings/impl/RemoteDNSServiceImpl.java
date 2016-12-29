package com.arcsoft.commander.service.settings.impl;

import java.util.ArrayList;
import java.util.List;

import com.arcsoft.commander.cluster.action.settings.network.AddDNSRequest;
import com.arcsoft.commander.cluster.action.settings.network.AddDNSResponse;
import com.arcsoft.commander.cluster.action.settings.network.DeleteDNSRequest;
import com.arcsoft.commander.cluster.action.settings.network.DeleteDNSResponse;
import com.arcsoft.commander.cluster.action.settings.network.ListDNSRequest;
import com.arcsoft.commander.cluster.action.settings.network.ListDNSResponse;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.settings.DNS;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.service.remote.RemoteExecutorServiceSupport;
import com.arcsoft.commander.service.settings.RemoteDNSService;

/**
 * This service process DNS settings for the specified agent.
 * 
 * @author hxiang
 */
public class RemoteDNSServiceImpl extends RemoteExecutorServiceSupport implements RemoteDNSService {

	@Override
	public List<DNS> getDnsList(Server agent) {
		ListDNSResponse response = (ListDNSResponse) remoteExecutorService.remoteExecute(new ListDNSRequest(), agent);
		return response.getDnsList();
	}

	@Override
	public void addDns(Server agent, DNS dns) {
		AddDNSRequest request = new AddDNSRequest();
		ArrayList<DNS> dnsList = new ArrayList<DNS>();
		dnsList.add(dns);
		request.setDNSList(dnsList);
		AddDNSResponse response = (AddDNSResponse) remoteExecutorService.remoteExecute(request, agent);
		if (!response.isSuccess())
			throw new RemoteException(agent);
	}

	@Override
	public void deleteDns(Server agent, DNS dns) {
		DeleteDNSRequest request = new DeleteDNSRequest();
		ArrayList<DNS> dnsList = new ArrayList<DNS>();
		dnsList.add(dns);
		request.setDNSList(dnsList);
		DeleteDNSResponse response = (DeleteDNSResponse) remoteExecutorService.remoteExecute(request, agent);
		if (!response.isSuccess())
			throw new RemoteException(agent);
	}

}
