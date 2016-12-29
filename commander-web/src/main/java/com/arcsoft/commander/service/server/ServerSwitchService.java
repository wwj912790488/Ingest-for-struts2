package com.arcsoft.commander.service.server;

import java.util.concurrent.Future;

/**
 * Server switch services.
 * To serialize the switch operations from cluster or manual.
 *  
 * @author wtsun
 */
public interface ServerSwitchService {
	/**
	 * Select a backup server to take over the specified worker server.
	 * 
	 * @param worker - the specified server to be replaced
	 * @param cause - the switch cause
	 * @return a Future representing pending completion of the task
	 */
	Future<?> updateWorkerServer(String serverId, int cause);
	
	/**
	 * Select the specified backup server to take over the specified worker server.
	 * 
	 * @param worker - the specified server to be replaced
	 * @param backup - the specified backup server
	 * @param cause - the switch cause
	 * @return a Future representing pending completion of the task
	 */
	Future<?> updateWorkerServer(String worker, String backup, int cause);
}
