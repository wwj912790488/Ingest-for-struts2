package com.arcsoft.commander.dao.task;

import java.util.List;
import java.util.Map;

import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.commander.domain.task.TaskChangedInfo;
import com.arcsoft.commander.domain.task.TaskQueryParams;
import com.arcsoft.util.Pager;
import com.arcsoft.web4transcoder.domain.Task;
import com.arcsoft.web4transcoder.repository.TaskRepository;
import com.arcsoft.web4transcoder.type.TaskStatus;


/**
 * This repository is extend from {@link TaskRepository} and add some addition functions.
 * 
 * @author zw
 */
public interface CustomTaskRepository extends TaskRepository {
	
	/**
	 * Get tasks with current server id and task state 
	 * 
	 * @param curServerId - current server id
	 * @param status - task status
	 * @return {@code List<Task>}
	 */
	List<Task> getTasksByCurServerIdAndStates(String curServerId, TaskStatus... status);

	/**
	 * Get tasks with current server id and task running flag
	 *
	 * @param curServerId - current server id
	 * @param runningFlag - task running flag, 0- inactive, 1- running
	 * @return {@code List<Task>}
	 */
	List<Task> getTasksByCurServerId_RunningFLag(String curServerId, int runningFlag);
	
	/**
	 * 
	 * @see CustomTaskDao#updateTasksCurServerId(String, String)
	 */
	void updateTasksCurServerId(String originalServerId, String newServerId);
	
	
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
	 * Query tasks by task status and current server id
	 * 
	 * @param status
	 * @param curServerId
	 * @param pageIndex
	 * @param pageSize
	 * @return
	 */
	Pager findTasksByStateAndCurServerId(boolean details ,TaskStatus status, String curServerId, int pageIndex, int pageSize);
	
	/**
	 * Query tasks
	 * 
	 * @param params
	 * @param pageIndex
	 * @param pageSize
	 * @return
	 */
	Pager findTasks(boolean details, TaskQueryParams params, int pageIndex, int pageSize);
	
	/**
	 * Returns all of tasks in <tt>groupId</tt>
	 * 
	 * @param groupId server group id
	 * @param allowNullOfServerId true if allow <tt>null</tt> of task's curServerId, otherwise false.
	 * @return
	 */
	public List<Task> getTasksByGroupId(Integer groupId, boolean allowNullOfServerId);
	
	/**
	 * Returns count of tasks with groupId
	 * 
	 * @param groupId the server group id
	 * @return count of tasks
	 */
	public long getTasksCountByGroupId(Integer groupId);
	
	
	/**
	 * Returns count of tasks with server id
	 * 
	 * @param serverId the server id
	 * @return count of tasks
	 */
	long getTasksCountByServerId(String serverId);

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
	 * @param publish - the publish name
	 * @param details - include task details or not
	 * @return the task with the specified http publish name.
	 */
	Task getTaskByHttpPublish(String container, String publish, boolean details);

	/**
	 * Update task info.
	 * 
	 * @param info - the changed info
	 * @return the task after updated.
	 */
	Task updateTaskInfo(TaskChangedInfo info);

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

	void deleteAll(Condition condition) ;

}
