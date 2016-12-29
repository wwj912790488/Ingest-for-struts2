package com.arcsoft.commander.dao.task.impl;

import java.util.List;
import java.util.Map;

import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.commander.dao.task.CustomTaskDao;
import com.arcsoft.commander.dao.task.CustomTaskRepository;
import com.arcsoft.commander.domain.task.TaskChangedInfo;
import com.arcsoft.commander.domain.task.TaskQueryParams;
import com.arcsoft.util.Pager;
import com.arcsoft.web4transcoder.dao.input.AsiDeviceInputDao;
import com.arcsoft.web4transcoder.dao.input.NetworkInputDao;
import com.arcsoft.web4transcoder.dao.input.SdiDeviceInputDao;
import com.arcsoft.web4transcoder.domain.Task;
import com.arcsoft.web4transcoder.domain.input.AsiDeviceInput;
import com.arcsoft.web4transcoder.domain.input.NetworkInput;
import com.arcsoft.web4transcoder.domain.input.SdiDeviceInput;
import com.arcsoft.web4transcoder.repository.TaskRepositoryImpl;
import com.arcsoft.web4transcoder.type.TaskStatus;


/**
 * 
 * @author zw
 */
public class CustomTaskRepositoryImpl extends TaskRepositoryImpl implements CustomTaskRepository {
	
	protected CustomTaskDao customTaskDao;
	private NetworkInputDao networkInputDao;
	private AsiDeviceInputDao asiDeviceInputDao;
	private SdiDeviceInputDao sdiDeviceInputDao;
	
	public void setCustomTaskDao(CustomTaskDao customTaskDao) {
		this.customTaskDao = customTaskDao;
	}

	public void setNetworkInputDao(NetworkInputDao networkInputDao) {
		this.networkInputDao = networkInputDao;
	}

	public void setAsiDeviceInputDao(AsiDeviceInputDao asiDeviceInputDao) {
		this.asiDeviceInputDao = asiDeviceInputDao;
	}

	public void setSdiDeviceInputDao(SdiDeviceInputDao sdiDeviceInputDao) {
		this.sdiDeviceInputDao = sdiDeviceInputDao;
	}

	@Override
	public List<Task> getTasksByCurServerIdAndStates(String curServerId, TaskStatus... status) {
		List<Task> tasks = this.customTaskDao.getTasksByCurServerIdAndStates(curServerId, status);
		for (Task task : tasks) {
			getTransformableObject(task, "Task");
		}
		return tasks;
	}

	@Override
	public List<Task> getTasksByCurServerId_RunningFLag(String curServerId, int runningFlag) {
		List<Task> tasks = this.customTaskDao.getTasksByCurServerId_RunningFLag(curServerId, runningFlag);
		for (Task task : tasks) {
			getTransformableObject(task, "Task");
		}
		return tasks;
	}

	@Override
	public void updateTasksCurServerId(String originalServerId, String newServerId) {
		this.customTaskDao.updateTasksCurServerId(originalServerId, newServerId);
	}

	@Override
	public void updateTasksStateByServerIdAndExceptStatus(String serverId, TaskStatus status, TaskStatus... exceptStatus){
		this.customTaskDao.updateTasksStateByServerIdAndExceptStatus(serverId, status, exceptStatus);
	}

	@Override
	public void updateTaskProgress(Task task) {
		this.customTaskDao.updateTaskProgress(task);
	}

	@Override
	public void updateTaskState(int taskId, TaskStatus status) {
		this.customTaskDao.updateTaskState(taskId, status);
	}

	@Override
	public Pager findTasksByStateAndCurServerId(boolean details, TaskStatus status, String curServerId, int pageIndex, int pageSize) {
		Pager pager = this.customTaskDao.findTasksByStateAndCurServerId(status, curServerId, pageIndex, pageSize);
		@SuppressWarnings("unchecked")
		List<Task> tasks = (List<Task>)pager.getResult();
		if (details) {
			for (Task task : tasks) {
				getTransformableObject(task, "Task");
			}
		}
		return pager;
	}

	@Override
	public Pager findTasks(boolean details,TaskQueryParams params, int pageIndex, int pageSize) {
		Pager pager = this.customTaskDao.findTasks(params, pageIndex, pageSize);
		@SuppressWarnings("unchecked")
		List<Task> tasks = (List<Task>)pager.getResult();
		if (details) {
			for (Task task : tasks) {
				getTransformableObject(task, "Task");
			}
		}
		return pager; 
	}

	@Override
	public List<Task> getTasksByGroupId(Integer groupId, boolean allowNullOfServerId) {
		List<Task> tasks = this.customTaskDao.getTasksByGroupId(groupId, allowNullOfServerId);
		for (Task task : tasks) {
			getTransformableObject(task, "Task");
		}
		return tasks;
	}

	@Override
	public long getTasksCountByGroupId(Integer groupId) {
		return this.customTaskDao.getTasksCountByGroupId(groupId);
	}

	@Override
	public long getTasksCountByServerId(String serverId) {
		return this.customTaskDao.getTasksCountByServerId(serverId);
	}

	@Override
	public long getTaskCountByStatus(TaskStatus... status) {
		return this.customTaskDao.getTaskCountByStatus(status);
	}

	@Override
	public Task getTaskByHttpPublish(String container, String publish, boolean details) {
		Integer taskId = this.customTaskDao.getTaskIdByHttpPublish(container, publish);
		if (taskId != null)
			return getTask(taskId, details);
		return null;
	}

	@Override
	public Task updateTaskInfo(TaskChangedInfo info) {
		Task task = getTask(info.getTaskId(), true);
		if (info.getAllowProgramIdChanged() != null) {
			Integer allowProgramIdChanged = info.getAllowProgramIdChanged() ? 1 : 0;
			if (task.getInputs().get(0).getBody() instanceof NetworkInput) {
				NetworkInput ni = (NetworkInput) task.getInputs().get(0).getBody();
				ni.setAllowProgramIdChange(allowProgramIdChanged);
				this.networkInputDao.update(ni);
			} else if (task.getInputs().get(0).getBody() instanceof SdiDeviceInput) {
				SdiDeviceInput sdi = (SdiDeviceInput) task.getInputs().get(0).getBody();
				sdi.setAllowProgramIdChange(allowProgramIdChanged);
				this.sdiDeviceInputDao.update(sdi);
			}else if (task.getInputs().get(0).getBody() instanceof AsiDeviceInput) {
				AsiDeviceInput ni = (AsiDeviceInput) task.getInputs().get(0).getBody();
				ni.setAllowProgramIdChange(allowProgramIdChanged);
				this.asiDeviceInputDao.update(ni);
			}
		}
		if (info.getSignalSwitchMode() != null) {
			updateSwitchMode(info.getTaskId(), info.getSignalSwitchMode());
		}
		return task;
	}

	@Override
	public void updateTaskServer(Integer taskId, String serverId) {
		this.customTaskDao.updateTaskServer(taskId, serverId);
	}

	@Override
	public Map<String, Long> getTasksCountGroupByServer(Integer groupId) {
		return this.customTaskDao.getTasksCountGroupByServer(groupId);
	}

	@Override
	public void deleteAll(Condition condition) {
		customTaskDao.deleteAll(condition);
	}

}
