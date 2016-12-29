package com.arcsoft.commander.service.task.dispatcher;

import java.util.List;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.task.TaskReceiver;
import com.arcsoft.commander.exception.server.NoServerAvailableException;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.task.DispatchException;
import com.arcsoft.web4transcoder.domain.Task;

/**
 * A dispatcher which dispatches the task to the live group.
 * 
 * @author fjli
 * @author zw
 */
public class LiveGroupDispatcher extends GroupDispatcher {

	/**
	 * Dispatch task to each server in live group.
	 * 
	 * @param task - the specified {@link Task} object.
	 * @param receiver - the specified {@link ServerGroup} object.
	 * @throws DispatchException - if the {@code receiver} not contains any server or dispatch task failed.
	 */
	@Override
	public void dispatch(Task task, TaskReceiver receiver) throws DispatchException {
		Server master = getMasterServer(receiver);
		if (master != null) {
			if (!master.isAlive() || master.getState() != Server.STATE_OK)
				throw new ServerNotAvailableException(master);
			this.serverDispatcher.dispatch(task, master);
			logger.info("Start live task(id={}) on server(id={}, ip={}).", new Object[] { task.getId(), master.getId(), master.getIp() });
		} else {
			throw new NoServerAvailableException();
		}
	}

	/**
	 * Get master server from the specified group receiver.
	 * 
	 * @param receiver - the live group receiver
	 * @return the master server
	 */
	protected Server getMasterServer(TaskReceiver receiver) throws DispatchException {
		List<Server> serverList = getServerList(receiver);
		for (Server server : serverList) {
			if (!server.isBackup())
				return server;
		}
		return null;
	}

}
