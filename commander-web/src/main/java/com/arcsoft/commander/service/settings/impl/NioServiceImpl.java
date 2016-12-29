package com.arcsoft.commander.service.settings.impl;

import java.util.List;

import com.arcsoft.commander.cluster.action.settings.network.ListNioBindingRequest;
import com.arcsoft.commander.cluster.action.settings.network.ListNioBindingResponse;
import com.arcsoft.commander.cluster.action.settings.network.UpdateNioBindingRequest;
import com.arcsoft.commander.cluster.action.settings.network.UpdateNioBindingResponse;
import com.arcsoft.commander.dao.server.NioDao;
import com.arcsoft.commander.domain.server.NIO;
import com.arcsoft.commander.domain.server.NioBinding;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.service.remote.RemoteExecutorServiceSupport;
import com.arcsoft.commander.service.settings.NioService;


/**
 * 
 * @author wtsun
 */
public class NioServiceImpl extends RemoteExecutorServiceSupport implements NioService {
	private static final int TIMEOUT = 30000;
	private NioDao nioDao;

	/**
	 * @param NioDao the NioDao to set
	 */
	public void setNioDao(NioDao nioDao) {
		this.nioDao = nioDao;
	}
	
	@Override
	public List<NIO> getNios() {
		return nioDao.getNios();
	}

	@Override
	public void updateNios(List<NIO> nios) {
		// Save to database.
		nioDao.updateNios(nios);
	}

	@Override
	public void updateServerNioBindings(Server agent, List<NioBinding> niobs) {
		UpdateNioBindingResponse response = (UpdateNioBindingResponse) remoteExecutorService
				.remoteExecute(new UpdateNioBindingRequest(niobs), agent, TIMEOUT, TIMEOUT);
		if (!response.isSuccess())
			throw new RemoteException(agent);
	}

	@Override
	public List<NioBinding> getServerNioBindings(Server agent) {
		ListNioBindingResponse response = (ListNioBindingResponse) remoteExecutorService.remoteExecute(new ListNioBindingRequest(), agent);
		return response.getNioBindings();
	}
}
