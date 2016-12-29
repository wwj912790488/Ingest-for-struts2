package com.arcsoft.commander.service.remote;

import com.arcsoft.commander.cluster.action.BaseRequest;
import com.arcsoft.commander.cluster.action.BaseResponse;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.service.BaseService;

/**
 * Remote executor service support.
 * 
 * @author fjli
 */
public abstract class RemoteExecutorServiceSupport extends BaseService {

	protected RemoteExecutorService remoteExecutorService;

	public void setRemoteExecutorService(RemoteExecutorService remoteExecutorService) {
		this.remoteExecutorService = remoteExecutorService;
	}

	@SuppressWarnings("unchecked")
	protected <F extends BaseResponse, K extends BaseRequest> F remoteExecute(K request, Server agent) {
		return (F) remoteExecutorService.remoteExecute(request, agent);
	}

	@SuppressWarnings("unchecked")
	protected <F extends BaseResponse, K extends BaseRequest> F remoteExecute(K request, Server agent, int connectTimeout, int readTimeout) {
		return (F) remoteExecutorService.remoteExecute(request, agent, connectTimeout, readTimeout);
	}

	protected <K extends BaseRequest> void remoteExecuteWithoutResponse(K request, Server agent) throws RemoteException {
		BaseResponse response = remoteExecute(request, agent);
		if (!response.isSuccess())
			throw new RemoteException(agent, response.getErrorCode());
	}

	protected <K extends BaseRequest> void remoteExecuteWithoutResponse(K request, Server agent, int connectTimeout, int readTimeout) throws RemoteException {
		BaseResponse response = remoteExecute(request, agent, connectTimeout, readTimeout);
		if (!response.isSuccess())
			throw new RemoteException(agent, response.getErrorCode());
	}

}
