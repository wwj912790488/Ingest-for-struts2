package com.arcsoft.commander.service.settings.impl;

import java.util.ArrayList;
import java.util.List;

import com.arcsoft.commander.cluster.action.settings.network.BondAndUpdateEthRequest;
import com.arcsoft.commander.cluster.action.settings.network.BondAndUpdateEthResponse;
import com.arcsoft.commander.cluster.action.settings.network.ListEthRequest;
import com.arcsoft.commander.cluster.action.settings.network.ListEthResponse;
import com.arcsoft.commander.cluster.action.settings.network.SaveEthRequest;
import com.arcsoft.commander.cluster.action.settings.network.SaveEthResponse;
import com.arcsoft.commander.cluster.action.settings.network.StatEthRequest;
import com.arcsoft.commander.cluster.action.settings.network.StatEthResponse;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.settings.Eth;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.service.remote.RemoteExecutorServiceSupport;
import com.arcsoft.commander.service.settings.RemoteEthService;

/**
 * The implementent of network operation of the specific agent.
 * 
 * @author xpeng
 */
public class RemoteEthServiceImpl extends RemoteExecutorServiceSupport implements RemoteEthService {

	private static final int TIMEOUT = 30000;

	@Override
	public List<Eth> getValidEths(Server agent) {
		List<Eth> newEths = new ArrayList<>();
		List<Eth> eths = findAllEths(agent);
		if (eths != null && !eths.isEmpty()) {
			List<String> bonds = new ArrayList<>();
			for (Eth eth : eths) {
				if (eth.getIsbond())
					bonds.add(eth.getId());
			}
			for (Eth eth : eths) {
				if (eth.getMaster() == null || !bonds.contains(eth.getMaster()))
					newEths.add(eth);
			}
		}
		return newEths;
	}

	@Override
	public List<Eth> findAllEths(Server agent) {
		ListEthResponse response = (ListEthResponse) remoteExecutorService
				.remoteExecute(new ListEthRequest(), agent);
		if (!response.isSuccess())
			throw new RemoteException(agent);
		return response.getEths();
	}

	@Override
	public void updateEth(Server agent, Eth eth) {
		SaveEthResponse response = (SaveEthResponse) remoteExecutorService
				.remoteExecute(new SaveEthRequest(eth), agent, TIMEOUT, TIMEOUT);
		if (!response.isSuccess())
			throw new RemoteException(agent);
	}

	@Override
	public int getEthUsedRate(Server agent, String ethId) {
		StatEthResponse response = (StatEthResponse) remoteExecutorService
				.remoteExecute(new StatEthRequest(ethId), agent);
		if (!response.isSuccess())
			throw new RemoteException(agent);
		return response.getUsedRate();
	}

	@Override
	public void bondAndUpdateEth(Server agent, Eth eth, String slaveId) {
		BondAndUpdateEthResponse response = (BondAndUpdateEthResponse) remoteExecutorService
				.remoteExecute(new BondAndUpdateEthRequest(eth, slaveId), agent, TIMEOUT, TIMEOUT);
		if (!response.isSuccess())
			throw new RemoteException(agent);
	}

}
