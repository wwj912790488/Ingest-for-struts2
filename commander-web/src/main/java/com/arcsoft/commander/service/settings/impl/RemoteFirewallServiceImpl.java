package com.arcsoft.commander.service.settings.impl;

import java.util.ArrayList;
import java.util.List;

import com.arcsoft.commander.cluster.action.settings.network.AddFirewallRequest;
import com.arcsoft.commander.cluster.action.settings.network.AddFirewallResponse;
import com.arcsoft.commander.cluster.action.settings.network.DeleteFirewallRequest;
import com.arcsoft.commander.cluster.action.settings.network.DeleteFirewallResponse;
import com.arcsoft.commander.cluster.action.settings.network.GetFirewallStatusRequest;
import com.arcsoft.commander.cluster.action.settings.network.GetFirewallStatusResponse;
import com.arcsoft.commander.cluster.action.settings.network.ListFirewallRequest;
import com.arcsoft.commander.cluster.action.settings.network.ListFirewallResponse;
import com.arcsoft.commander.cluster.action.settings.network.StartFirewallRequest;
import com.arcsoft.commander.cluster.action.settings.network.StartFirewallResponse;
import com.arcsoft.commander.cluster.action.settings.network.StopFirewallRequest;
import com.arcsoft.commander.cluster.action.settings.network.StopFirewallResponse;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.settings.FirewallRule;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.service.remote.RemoteExecutorServiceSupport;
import com.arcsoft.commander.service.settings.RemoteFirewallService;

/**
 * This service process firwall settings for the specified agent.
 * 
 * @author hxiang
 */
public class RemoteFirewallServiceImpl extends RemoteExecutorServiceSupport implements RemoteFirewallService {

	@Override
	public List<FirewallRule> getFirewalls(Server agent) {
		ListFirewallRequest request = new ListFirewallRequest();
		ListFirewallResponse response = (ListFirewallResponse) remoteExecutorService.remoteExecute(request, agent);
		return response.getRules();
	}

	@Override
	public void addFirewall(Server agent, FirewallRule rule) {
		AddFirewallRequest request = new AddFirewallRequest();
		ArrayList<FirewallRule> list = new ArrayList<FirewallRule>();
		list.add(rule);
		request.setRules(list);
		AddFirewallResponse response = (AddFirewallResponse) remoteExecutorService.remoteExecute(request, agent);
		if (!response.isSuccess())
			throw new RemoteException(agent);
	}

	@Override
	public void deleteFirewall(Server agent, FirewallRule rule) {
		DeleteFirewallRequest request = new DeleteFirewallRequest();
		ArrayList<FirewallRule> list = new ArrayList<FirewallRule>();
		list.add(rule);
		request.setRules(list);
		DeleteFirewallResponse response = (DeleteFirewallResponse) remoteExecutorService.remoteExecute(request, agent);
		if (!response.isSuccess())
			throw new RemoteException(agent);
	}

	@Override
	public void startFirewall(Server agent) {
		StartFirewallRequest request = new StartFirewallRequest();
		StartFirewallResponse response = (StartFirewallResponse) remoteExecutorService.remoteExecute(request, agent);
		if (!response.isSuccess())
			throw new RemoteException(agent);
	}

	@Override
	public void stopFirewall(Server agent) {
		StopFirewallRequest request = new StopFirewallRequest();
		StopFirewallResponse response = (StopFirewallResponse) remoteExecutorService.remoteExecute(request, agent);
		if (!response.isSuccess())
			throw new RemoteException(agent);
	}

	@Override
	public boolean isFirewallOn(Server agent) {
		GetFirewallStatusRequest request = new GetFirewallStatusRequest();
		GetFirewallStatusResponse response = (GetFirewallStatusResponse) remoteExecutorService.remoteExecute(request, agent);
		return response.isServiceOn();
	}

}
