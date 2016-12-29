package com.arcsoft.commander.agent.service.task.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.locks.ReentrantLock;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.arcsoft.web4transcoder.type.TaskStatus;

/**
 * Task life cycle helper.
 * 
 * @author fjli
 */
class TaskLifeCycleHelper {

	private Logger log = LoggerFactory.getLogger(getClass());
	private ReentrantLock tasksLock = new ReentrantLock();
	private Map<Integer, TaskInfo> runningTasks = new HashMap<>();
	private TaskStateChangedListener stateChangedListener;

	public TaskLifeCycleHelper(TaskStateChangedListener stateChangedListener) {
		this.stateChangedListener = stateChangedListener;
	}

	/**
	 * Add new task to running tasks.
	 * 
	 * <ul>
	 * <li> If task exist, return null.
	 * <li> If task not exist, add new task to running tasks.
	 * </ul>
	 * 
	 * @param taskId - the task id.
	 * @return new task, or null if task already exist.
	 */
	public TaskInfo addTask(Integer taskId) {
		tasksLock.lock();
		try {
			if (runningTasks.containsKey(taskId)) {
				log.error("add new task(id={}) fail: already exist.", taskId);
				return null;
			}
			TaskInfo taskInfo = new TaskInfo(taskId);
			taskInfo.setStatus(TaskStatus.PENDING);
			runningTasks.put(taskId, taskInfo);
			log.info("add new task(id={}) to running tasks.", taskId);
			return taskInfo;
		} finally {
			tasksLock.unlock();
		}
	}

	public ReentrantLock getRunningTasksLock() {
		return this.tasksLock;
	}

	/**
	 * Get all tasks state list.
	 */
	public Map<Integer, String> getAllTaskState() {
		final Map<Integer, String> taskStates = new HashMap<>();
		tasksLock.lock();
		try {
			for (TaskInfo taskInfo : runningTasks.values()) {
				taskStates.put(taskInfo.getTaskId(), taskInfo.getStatus().toString());
			}
			return taskStates;
		} finally {
			tasksLock.unlock();
		}
	}

	/**
	 * Get all tasks.
	 */
	public Map<Integer, String> getTasksXml() {
		final Map<Integer, String> taskXml = new HashMap<>();
		tasksLock.lock();
		try {
			for (TaskInfo taskInfo : runningTasks.values()) {
				taskXml.put(taskInfo.getTaskId(), taskInfo.getTaskXml());
			}
			return taskXml;
		} finally {
			tasksLock.unlock();
		}
	}

	/**
	 * Return current running tasks count.
	 */
	public int getTasksCount() {
		return runningTasks.size();
	}

	/**
	 * Return current HD SD count.
	 */
	public int[] getCurrentHDSDCount() {
		tasksLock.lock();
		try {
			int hdTotal = 0;
			int sdTotal = 0;
			for (TaskInfo taskInfo : runningTasks.values()) {
				hdTotal += taskInfo.getHdCount();
				sdTotal += taskInfo.getSdCount();
			}
			return new int[] { hdTotal, sdTotal };
		} finally {
			tasksLock.unlock();
		}
	}

	/**
	 * Remove the task.
	 * 
	 * @param taskId - the task id
	 */
	public void removeTask(Integer taskId) {
		tasksLock.lock();
		try {
			if (runningTasks.remove(taskId) != null) {
				log.info("remove task(id={}).", taskId);
			} else {
				log.info("remove task(id={}) fail: not exist.", taskId);
			}
		} finally {
			tasksLock.unlock();
		}
	}

	/**
	 * Get all tasks'id array.
	 */
	public Integer[] getTaskIds() {
		tasksLock.lock();
		try {
			return runningTasks.keySet().toArray(new Integer[0]);
		} finally {
			tasksLock.unlock();
		}
	}

	/**
	 * Get the task info.
	 * 
	 * @param taskId - the task id.
	 * @return the task info if exist, null otherwise.
	 */
	public TaskInfo getTaskInfo(Integer taskId) {
		tasksLock.lock();
		try {
			return runningTasks.get(taskId);
		} finally {
			tasksLock.unlock();
		}
	}

	public void enableTaskAutoRestart(Integer taskId) {
		TaskInfo taskInfo = getTaskInfo(taskId);
		if (taskInfo == null) {
			return;
		}
		ReentrantLock lock = taskInfo.getLock();
		lock.lock();
		try {
			taskInfo.enableAutoRestart();
		} finally {
			lock.unlock();
		}
	}

	public void disableTaskAutoRestart(Integer taskId) {
		TaskInfo taskInfo = getTaskInfo(taskId);
		if (taskInfo == null) {
			return;
		}
		ReentrantLock lock = taskInfo.getLock();
		lock.lock();
		try {
			taskInfo.disableAutoRestart();
		} finally {
			lock.unlock();
		}
	}

	/**
	 * Try set global settings.
	 * 
	 * @param handler - the task handler
	 */
	public void tryGlobalSetting(final TaskExecuteHandler handler) {
		// create action for each task.
		List<TaskExecuteAction> actions = new ArrayList<>();
		tasksLock.lock();
		try {
			for (TaskInfo taskInfo : runningTasks.values()) {
				TaskExecuteAction action = new TaskExecuteHandlerWrapperAction(handler);
				action.setTaskInfo(taskInfo);
				actions.add(action);
			}
		} finally {
			tasksLock.unlock();
		}

		// try setting for each task.
		for (TaskExecuteAction action : actions) {
			trySetting(action.getTaskInfo(), Arrays.asList(action));
		}
	}

	/**
	 * Try set task settings on running state.
	 * 
	 * <ul>
	 * <li>If task is in WAITING state, execute after task change to RUNNING state.
	 * <li>If task is in RUNNING state, execute the actions immediately.
	 * <li>On other case, skip actions.
	 * </ul>
	 * 
	 * @param taskInfo - the task info
	 * @param actions - the actions to execute
	 */
	public void trySetting(TaskInfo taskInfo, List<TaskExecuteAction> actions) {
		if (actions == null || actions.isEmpty()) {
			return;
		}
		boolean doSettingNow = false;
		for (TaskExecuteAction action : actions) {
			action.setTaskInfo(taskInfo);
		}
		ReentrantLock lock = taskInfo.getLock();
		lock.lock();
		try {
			if (taskInfo.getStatus() == TaskStatus.WAITING) {
				taskInfo.addTodoActions(actions);
			} else if (taskInfo.getStatus() == TaskStatus.RUNNING) {
				doSettingNow = true;
			}
		} finally {
			lock.unlock();
		}
		if (doSettingNow) {
			executeActions(actions);
		}
	}

	/**
	 * Execute actions.
	 */
	private void executeActions(List<TaskExecuteAction> actions) {
		for (TaskExecuteAction action : actions) {
			action.execute();
		}
	}

	/**
	 * Try restart task.
	 * 
	 * <ul>
	 * <li>If task is in PENDING state, waiting it, until state changed.
	 * <li>If task is in RUNNING state, the task can be restart, return true.
	 * <li>On other case, return false.
	 * </ul>
	 * 
	 * @param taskInfo - the task info
	 * @param delayTime - the restart delay time
	 * @return true if change to PENDING state success, false otherwise.
	 */
	public boolean tryRestart(TaskInfo taskInfo, Long delayTime) {
		ReentrantLock lock = taskInfo.getLock();
		lock.lock();
		try {
			if (taskInfo.isEndOfLife()) {
				log.info("try restart: fail, task(id={}) is EndOfLife.", taskInfo.getTaskId());
				return false;
			} else {
				// wait for task started, the task may fail immediately after call start.
				if (taskInfo.getStatus() == TaskStatus.WAITING) {
					try {
						taskInfo.awaitStarting();
					} catch (InterruptedException e) {
						log.info("try restart: task(id={}) wait starting is intrrupted.", taskInfo.getTaskId());
						toEndOfLife(taskInfo, TaskStatus.ERROR);
						removeTask(taskInfo.getTaskId());
						return false;
					}
				}
				if (taskInfo.getStatus() == TaskStatus.RUNNING) {
					changeState(taskInfo, TaskStatus.PENDING);
					try {
						taskInfo.awaitRestartDelay(delayTime);
						taskInfo.awaitAutoRestartEnabled();
						return true;
					} catch (InterruptedException e) {
						log.info("try restart: task(id={}) wait restart is intrrupted.", taskInfo.getTaskId());
						toEndOfLife(taskInfo, TaskStatus.ERROR);
						removeTask(taskInfo.getTaskId());
						return false;
					}
				} else if (taskInfo.getStatus() == TaskStatus.STOPPING) {
					log.info("try restart: fail, task(id={}) is in STOPPING state.", taskInfo.getTaskId());
					toEndOfLife(taskInfo, taskInfo.isSystemStop() ? TaskStatus.ERROR : TaskStatus.CANCELLED);
					removeTask(taskInfo.getTaskId());
					return false;
				} else {
					// should not goes here.
					log.info("try restart: fail, task(id={}) is in {} state.", taskInfo.getTaskId(), taskInfo.getStatus());
					toEndOfLife(taskInfo, TaskStatus.ERROR);
					removeTask(taskInfo.getTaskId());
					return false;
				}
			}
		} finally {
			lock.unlock();
		}
	}

	/**
	 * Try start task.
	 * 
	 * <ul>
	 * <li> Only the task is in PENDING state, the task can be start.
	 * </ul>
	 * 
	 * @param taskInfo - the task info
	 * @return true if change to WAITING state success, false otherwise.
	 */
	public boolean tryStart(TaskInfo taskInfo) {
		ReentrantLock lock = taskInfo.getLock();
		lock.lock();
		try {
			if (taskInfo.isEndOfLife()) {
				log.info("try start: fail, task(id={}) is EndOfLife.", taskInfo.getTaskId());
				return false;
			} else if (taskInfo.getStatus() == TaskStatus.PENDING) {
				taskInfo.newCondition();
				changeState(taskInfo, TaskStatus.WAITING);
				return true;
			} else {
				log.info("try start: fail, task(id={}) is in {} state.", taskInfo.getTaskId(), taskInfo.getStatus());
				return false;
			}
		} finally {
			lock.unlock();
		}
	}

	/**
	 * Try stop the task.
	 *
	 * <ul>
	 * <li> If task is in WAITING state, waiting it, until state changed.
	 * <li> If task is in already STOPPING/STOPPED state, return true.
	 * <li> If task is in PENDING state, return true, and change to CANCELLED or ERROR state.
	 * <li> If task is in RUNNING state, return false, and should call cancelTask.
	 * </ul>
	 * 
	 * @param taskId - the task id
	 * @param stopAny - stop any status task, if false, means only stop not running tasks
	 * @param systemStop - if stop by system
	 * @return returns false if call cancelTask is required, otherwise return true.
	 */
	public boolean tryStop(Integer taskId, boolean stopAny, boolean systemStop) {
		TaskInfo taskInfo = getTaskInfo(taskId);
		if (taskInfo == null) {
			log.info("try stop task(id={}): task is not found.", taskId);
			return true;
		}
		ReentrantLock lock = taskInfo.getLock();
		lock.lock();
		try {
			taskInfo.setSystemStop(systemStop);
			if (stopAny && taskInfo.getStatus() == TaskStatus.WAITING) {
				try {
					taskInfo.awaitStarting();
				} catch (InterruptedException e) {
					log.info("try stop task(id={}): thread is interrupted.", taskId);
				}
			}
			switch (taskInfo.getStatus()) {
			case STOPPING:
			case CANCELLED:
				log.info("try stop task(id={}): return true, state={}", taskId, taskInfo.getStatus());
				return true;
			case PENDING:
				TaskStatus newState = systemStop ? TaskStatus.ERROR : TaskStatus.CANCELLED;
				toEndOfLife(taskInfo, newState);
				removeTask(taskInfo.getTaskId());
				taskInfo.signalRestartDelay();
				return true;
			case RUNNING:
				if (stopAny) {
					log.info("try stop task(id={}): return false, state={}", taskId, taskInfo.getStatus());
					changeState(taskInfo, TaskStatus.STOPPING);
				} else {
					log.info("try stop task(id={}): return false, state={}, stopAny={}, skip stop and retry later.", taskId, taskInfo.getStatus(), stopAny);
				}
				return false;
			default:
				return false;
			}
		} finally {
			lock.unlock();
		}
	}

	/**
	 * To running state.
	 * 
	 * @param taskInfo - the task info
	 */
	public void toRunningState(TaskInfo taskInfo) {
		ReentrantLock lock = taskInfo.getLock();
		lock.lock();
		List<TaskExecuteAction> actions = null;
		try {
			if (taskInfo.isEndOfLife()) {
				log.warn("to running state: skip, task(id={}) is EndofLife.", taskInfo.getTaskId());
				return;
			} else if (taskInfo.getStatus() == TaskStatus.WAITING) {
				taskInfo.signAllStarting();
				changeState(taskInfo, TaskStatus.RUNNING);
				actions = taskInfo.getTodoActions();
				taskInfo.clearTodoActions();
			} else {
				log.info("to running state: skip, task(id={}) is in {} state.", taskInfo.getTaskId(), taskInfo.getStatus());
				return;
			}
		} finally {
			lock.unlock();
		}

		// execute actions after task changed to running state.
		if (actions != null && !actions.isEmpty()) {
			log.info("execute task(id={}) actions after task is RUNNING", taskInfo.getTaskId());
			executeActions(actions);
		}
	}

	/**
	 * To stopped state, either CANCELLED or ERROR.
	 * 
	 * @param taskInfo - the task info
	 * @param hasError - task stopped with error or not
	 */
	public void toStoppedState(TaskInfo taskInfo, boolean hasError) {
		ReentrantLock lock = taskInfo.getLock();
		lock.lock();
		try {
			TaskStatus newState = (hasError || taskInfo.isSystemStop()) ? TaskStatus.ERROR : TaskStatus.COMPLETED;
			TaskStatus oldState = taskInfo.getStatus();
			if (taskInfo.isEndOfLife()) {
				log.warn("to stopped state: skip, task(id={}) is EndofLife.", taskInfo.getTaskId());
			} else if (oldState != TaskStatus.CANCELLED && oldState != TaskStatus.ERROR) {
				toEndOfLife(taskInfo, newState);
				removeTask(taskInfo.getTaskId());
			} else {
				log.warn("to stopped state: skip, task(id={}) already in {} state", taskInfo.getTaskId(), oldState);
			}
		} finally {
			lock.unlock();
		}
	}

	/**
	 * Change to end of live.
	 * 
	 * @param taskInfo - the task info
	 * @param newState - the final state
	 */
	private void toEndOfLife(TaskInfo taskInfo, TaskStatus newState) {
		taskInfo.signAllStarting();
		changeState(taskInfo, newState);
		taskInfo.setEndOfLife(true);
	}

	/**
	 * Change state.
	 * 
	 * @param info - the task info
	 * @param newState - the new state
	 */
	private void changeState(TaskInfo info, TaskStatus newState) {
		TaskStatus oldState = info.getStatus();
		if (oldState != newState) {
			log.info("change state: task(id={}) {} => {}.", info.getTaskId(), oldState, newState);
			info.setStatus(newState);
			stateChangedListener.onTaskStateChanged(info, oldState, newState);
		} else {
			log.info("change state: task(id={}) already in {} state.", info.getTaskId(), newState);
		}
	}

}
