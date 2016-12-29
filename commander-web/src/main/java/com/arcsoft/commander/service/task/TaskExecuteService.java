package com.arcsoft.commander.service.task;

import java.util.List;

import org.w3c.dom.Document;

import com.arcsoft.commander.domain.task.TaskChangedInfo;
import com.arcsoft.commander.domain.task.TaskHttpGroupSettingAccessorEntry;
import com.arcsoft.commander.exception.server.NoServerAvailableException;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;
import com.arcsoft.commander.exception.task.DispatchException;
import com.arcsoft.commander.service.task.dispatcher.Dispatcher;
import com.arcsoft.web4transcoder.domain.Task;

/**
 * This service is used to start, stop, cancel tasks etc on the specified agent server.
 * 
 * @author fjli
 * @author zw
 */
public interface TaskExecuteService {

	/**
	 * start the specified task.
	 * <p>this method auto dispatcher task and decision which one {@link Dispatcher} 
	 * implements used.</p>
	 * 
	 * @param taskId - {@link Task#data.getId()}.
	 * @throws SystemNotInitializedException if system has not initialized
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if the server is not available
	 * @throws RemoteException if execute failed
	 * @throws DispatchException if dispatcher failed.
	 * @throws NoServerAvailableException if can't find any server
	 */
	void startTask(Integer taskId) throws ServerNotAvailableException, RemoteException, NoServerAvailableException, DispatchException;

	/**
	 * stop task on server.
	 * 
	 * @param taskId - {@link Task#data.getId()}
	 * @throws SystemNotInitializedException if system has not initialized
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if the server is not available
	 * @throws RemoteException if execute failed
	 */
	void stopTask(Integer taskId) throws ServerNotAvailableException, RemoteException;

	/**
	 * Stop tasks on the specified server.
	 * 
	 * @param tasks - the tasks to stop
	 * @throws SystemNotInitializedException if system has not initialized
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if the server is not available
	 * @throws RemoteException if execute failed
	 */
	void stopTasks(List<? extends Task> tasks) throws ServerNotAvailableException, RemoteException;

	/**
	 * Get the task progress with the specified id.
	 * 
	 * @param taskId - the id of {@link Task}
	 * @return {@code Document} or null.
	 * @throws SystemNotInitializedException if system has not initialized
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if the server is not available.
	 * @throws RemoteException if execute failed
	 */
	Document getTaskProgress(Integer taskId) throws ServerNotAvailableException, RemoteException;

	/**
	 * Get the task thumbnail with the specified id.
	 * 
	 * @param taskId - the id of {@link Task}
	 * @param width - the thumbnail width
	 * @return  image as {@code byte[]}
	 * @throws SystemNotInitializedException if system has not initialized
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if the server is not available.
	 * @throws RemoteException if execute failed
	 */
	byte[] getTaskThumbnail(Integer taskId, int width) throws ServerNotAvailableException, RemoteException;

	/**
	 * Get the task HttpGroupSettingAccessorEntry with the specified container and target.
	 * 
	 * @param container - the container
	 * @param target - the customuri
	 * @return TaskHttpGroupSettingAccessorEntry
	 * @throws SystemNotInitializedException if system has not initialized
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if the server is not available.
	 * @throws RemoteException if execute failed
	 */
    TaskHttpGroupSettingAccessorEntry getTaskHttpGroupSettingAccessor(String container, String target);

	/**
	 * Update task info.
	 * 
	 * @param info - the info list
	 * @throws IllegalArgumentException if argument is invalid.
	 * @throws SystemNotInitializedException if system has not initialized.
	 * @throws AccessDeniedForSlaveException if system is slave.
	 * @throws ServerNotAvailableException if the server is not available.
	 * @throws RemoteException if execute failed.
	 */
	void updateTaskInfo(TaskChangedInfo info);


	int  getAutoDeleteBeforeDays();

	void setAutoDeleteBeforeDays(int deleteBeforeDays);
}
