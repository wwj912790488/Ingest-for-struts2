package com.arcsoft.commander.service.task;

import java.util.List;
import java.util.Map;

import com.arcsoft.commander.dao.task.CustomTaskDao;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.task.TaskChangedInfo;
import com.arcsoft.commander.domain.task.TaskQueryParams;
import com.arcsoft.util.Pager;
import com.arcsoft.web4transcoder.domain.Task;
import com.arcsoft.web4transcoder.service.TaskService;
import com.arcsoft.web4transcoder.type.TaskStatus;


/**
 * This service is extend from {@link TaskService} and add some addition functions.
 * 
 * @author zw
 */
public interface CustomTaskService extends TaskService {
	
	/**
	 * Get tasks with current server id and task state.
	 * <p><b>This method will return all of associate of Task objects.
	 * if you just want to get all of Task object, please see {@link #getTasksWithoutAssocByCurServerIdAndStates(String, TaskStatus...)}
	 * </b></p>
	 * 
	 * @param curServerId - current server id
	 * @param status - task status
	 * @return {@code List<Task>}
	 */
	List<Task> getTasksByCurServerIdAndStates(String curServerId, TaskStatus... status);

	/**
	 * Get tasks with current server id and task running flag.
	 *
	 * @param curServerId - current server id
	 * @return {@code List<Task>}
	 */
	List<Task> getRunningTasks(String curServerId);
	
	/**
	 * @see CustomTaskDao#updateTasksCurServerId(String, String)
	 */
	void updateTasksCurServerId(String originalServerId, String newServerId);
	
	/**
	 * Get {@link Server} object by task's {@code curServerId} and {@code type}
	 * <p>if {@code type} is M+N, get {@code Server} object</p>
	 * <p>if {@code type} is 1+1, get master server from group</p>
	 * 
	 * @param serverOrGroupId - server or group id
	 * @param type	- indicate current task type. value 0 is <tt>M+N</tt>,
	 * 				 1 is <tt>1+1</tt>
	 * @return {@code Server}
	 */
	Server getServerByTaskTypeAndServerId(String serverOrGroupId, int type);
	
	
	/**
	 * Update tasks's state by server id and task status.update all tasks's state 
	 * if {@code currentStatus} is null
	 * 
	 * @param serverId
	 * @param status
	 * @param exceptStatus
	 */
	void updateTasksStateByServerIdAndExceptStatus(String serverId, TaskStatus status, TaskStatus... exceptStatus);
	
	
	/**
	 * Update task's progress info.e.g:{@code state},{@code StartedAt}, {@code CompletedAt}
	 * 
	 * @param state
	 */
	void updateTaskProgress(Task task);
	
	
	/**
	 * Update task's state by id.This method will just update task's state value.
	 * 
	 * @param taskId
	 * @param status
	 */
	void updateTaskState(int taskId, TaskStatus status);
	
	
	/**
	 * Get tasks with current server id and task state.
	 * <p><b>This method just return Task objects</b></p>
	 * 
	 * @param curServerId - current server id
	 * @param status - task status
	 * @return {@code List<Task>}
	 */
	List<Task> getTasksWithoutAssocByCurServerIdAndStates(String curServerId, TaskStatus... status);
	
	
	/**
	 * Query tasks by task status and current server id
	 * 
	 * @param status
	 * @param curServerId
	 * @param pageIndex
	 * @param pageSize
	 * @return
	 */
	Pager findTasksByStateAndCurServerId(boolean details, TaskStatus status, String curServerId, int pageIndex, int pageSize);
	
	
	Pager findTasks(boolean details, TaskQueryParams params, int pageIndex, int pageSize);
	/**
	 * Returns all of tasks by groupId and task's server is not null
	 * 
	 * @param groupId
	 * @return
	 */
	List<Task> getTasksByGroupIdAndCurServerIdIsNotNull(Integer groupId);
	
	/**
	 * Returns all of tasks by groupId
	 * 
	 * @param groupId
	 * @return
	 */
	List<Task> getTasksByGroupId(Integer groupId);
	
	/**
	 * Returns count of tasks with groupId
	 * 
	 * @param groupId the server group id
	 * @return count of tasks
	 */
	long getTasksCountByGroupId(Integer groupId);
	
	/**
	 * Returns count of tasks with server id
	 * 
	 * @param serverId the server id
	 * @return count of tasks
	 */
	long getTasksCountByServerId(String serverId);
	
	List<Task> getTasksByCurServerId(String serverId);
	
	void saveTask(Task task, boolean needAssignmentServer);
	
	void updateTask(Task task, boolean needAssignmentServer);

	/**
	 * Returns the task count with the specified status.
	 * 
	 * @param status - the specified status
	 * @return the task count.
	 */
	long getTaskCountByStatus(TaskStatus... status);

	/**
	 * Get task id by http publish name.
	 * 
	 * @param container - the http container
	 * @param publishName - the publish name
	 * @param details - include task details or not
	 * @return the task with the specified http publish name.
	 */
	Task getTaskByHttpPublish(String container, String publish, boolean details);

	/**
	 * Update task info and return new task info.
	 * 
	 * @param info - the changed task info
	 */
	Task updateTaskInfo(TaskChangedInfo info);

	/**
	 * Fill the task details with the specified profile to the specified task instance.
	 * 
	 * @param liveProfileId - the specified profile id
	 * @param task - the task instance
	 * @return the task instance.
	 */
	<T extends Task> void fillTaskWithLiveProfile(Integer liveProfileId, T task);

	/**
	 * Update the task's running server.
	 * 
	 * @param taskId - the specified task id
	 * @param serverId - the running server
	 */
	void updateTaskServer(Integer taskId, String serverId);

	/**
	 * Get task count for each server in the specified group.
	 * 
	 * @param groupId - the group id
	 */
	Map<String, Long> getTasksCountGroupByServer(Integer groupId);

}
