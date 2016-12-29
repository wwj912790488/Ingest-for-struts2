package com.arcsoft.commander.service.remote;

import com.arcsoft.commander.cluster.action.BaseRequest;
import com.arcsoft.commander.cluster.action.BaseResponse;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;

/**
 * This service is used to execute the request on the specified agent.
 * 
 * @author fjli
 */
public interface RemoteExecutorService {

	/**
	 * Execute request on the specified agent with default time out.
	 * 
	 * @param request - the request to be executed
	 * @param agent - the specified agent
	 * @return Returns the response.
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if the agent server is not available.
	 * @throws RemoteException if invoke failed.
	 */
	public BaseResponse remoteExecute(BaseRequest request, Server agent);

	/**
	 * Execute request on the specified agent with the specified timeout.
	 * 
	 * @param request - the request to be executed
	 * @param agent - the specified agent
	 * @param connectTimeout - the connection timeout
	 * @param readTimeout - the read timeout
	 * @return Returns the response.
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if the agent server is not available.
	 * @throws RemoteException if invoke failed.
	 */
	public BaseResponse remoteExecute(BaseRequest request, Server agent, int connectTimeout, int readTimeout);

}
