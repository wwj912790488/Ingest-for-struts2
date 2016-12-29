package com.arcsoft.commander.service.task.dispatcher;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.arcsoft.commander.dao.server.ServerDao;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.domain.task.TaskReceiver;
import com.arcsoft.commander.exception.server.NoServerAvailableException;
import com.arcsoft.commander.exception.task.DispatchException;
import com.arcsoft.commander.service.task.dispatcher.Dispatcher;

/**
 * A GroupDispatcher is a dispatcher which dispatches the task to a task
 * receiver which is a group.
 * 
 * @author fjli
 * @author zw
 */
public abstract class GroupDispatcher implements Dispatcher {

	protected final Logger logger = LoggerFactory.getLogger(getClass());

	protected Dispatcher serverDispatcher;
	protected ServerDao serverDao;

	public void setServerDispatcher(Dispatcher serverDispatcher) {
		this.serverDispatcher = serverDispatcher;
	}

	public void setServerDao(ServerDao serverDao) {
		this.serverDao = serverDao;
	}

	/**
	 * Get {@link Server} list by {@code TaskReceiver}.
	 * <p><b>note:</b> a {@code TaskReceiver} object can be a {@link Server} or {@link ServerGroup} object.</p>
	 * @param receiver
	 *            - {@link TaskReceiver}
	 * @return
	 * @throws DispatchException
	 *             - if {@code receiver} is null, or can't found any server in {@code receiver}.
	 * @see Server
	 * @see ServerGroup
	 */
	protected List<Server> getServerList(TaskReceiver receiver) throws DispatchException {
		String msg = null;
		if(receiver == null){
			msg = String.format("TaskReceiver object is null. Can't get any server info, dispacher failed.");
			logger.error(msg);
			throw new NoServerAvailableException();
		}
		List<Server> serverList = new ArrayList<>();
		if (receiver instanceof ServerGroup) {// if object is ServerGroup, we need get all servers in group.
			ServerGroup group = (ServerGroup) receiver;
			serverList = this.serverDao.getServersInGroup(group.getId());
			if(serverList == null){
				msg = String.format("Can't found any server in group(id=%d)", group.getId());
				logger.error(msg);
				throw new NoServerAvailableException();
			}
		} else {
			serverList.add((Server) receiver);
		}
		return serverList;
	}

}
