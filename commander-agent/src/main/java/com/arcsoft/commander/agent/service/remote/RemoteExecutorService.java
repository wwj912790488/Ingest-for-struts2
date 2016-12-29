package com.arcsoft.commander.agent.service.remote;

import com.arcsoft.cluster.app.ActionException;
import com.arcsoft.cluster.app.Request;
import com.arcsoft.cluster.app.Response;

/**
 * This interface represents a remote request handler to execute the certain request.
 * 
 * @author fjli
 */
public interface RemoteExecutorService {

	/**
	 * Remote execute the request.
	 * 
	 * @param request - the request to be processed
	 * @return response of the result.
	 * @throws ActionException if execute failed.
	 */
	Response remoteExecute(Request request) throws ActionException;

}
