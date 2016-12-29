package com.arcsoft.commander.service.settings;

import com.arcsoft.commander.cluster.action.settings.host.RebootRequest;
import com.arcsoft.commander.cluster.action.settings.host.RebootResponse;
import com.arcsoft.commander.cluster.action.settings.host.ShutdownRequest;
import com.arcsoft.commander.cluster.action.settings.host.ShutdownResponse;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.service.remote.RemoteExecutorServiceSupport;
import com.arcsoft.commander.service.settings.RemoteHostService;

/**
 * The implementation of RemoteHostService
 * 
 * @author hxiang
 */
public class RemoteHostServiceImpl extends RemoteExecutorServiceSupport implements RemoteHostService {
	@Override
	public void reboot(Server agent) {
		RebootRequest request = new RebootRequest();
		RebootResponse response = (RebootResponse) remoteExecutorService.remoteExecute(request, agent);
		if (!response.isSuccess())
			throw new RemoteException(agent);
	}

	@Override
	public void shutdown(Server agent) {
		ShutdownRequest request = new ShutdownRequest();
		ShutdownResponse response = (ShutdownResponse) remoteExecutorService.remoteExecute(request, agent);
		if (!response.isSuccess())
			throw new RemoteException(agent);
	}

}
