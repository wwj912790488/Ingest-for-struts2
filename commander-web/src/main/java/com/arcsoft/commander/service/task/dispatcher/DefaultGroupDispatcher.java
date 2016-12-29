package com.arcsoft.commander.service.task.dispatcher;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.task.TaskReceiver;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.task.DispatchException;
import com.arcsoft.web4transcoder.domain.Task;

/**
 * A dispatcher which dispatches the task to the default group.
 * 
 * @author fjli
 * @author zw
 */
public class DefaultGroupDispatcher extends GroupDispatcher {

	@Override
	public void dispatch(Task task, TaskReceiver receiver) throws DispatchException {
		Server server = this.getServerList(receiver).get(0);
		if(server.isBackup() || !server.isAlive() || server.getState() != Server.STATE_OK){//check server status
			throw new ServerNotAvailableException(server);
		}
		this.serverDispatcher.dispatch(task, server);
	}

}
