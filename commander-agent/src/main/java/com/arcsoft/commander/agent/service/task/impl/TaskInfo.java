package com.arcsoft.commander.agent.service.task.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;

import com.arcsoft.web4transcoder.type.TaskStatus;

/**
 * This class will save all the task relation information.
 * 
 * @author fjli
 */
public class TaskInfo {

	private final Integer taskId;
	private final ReentrantLock lock;
	private String name;
	private Integer pid;
	private TaskStatus status;
	private Date startDate;
	private Date endDate;
	private Integer transcodingTime;
	private Integer postProcessingTime;
	private int sdCount;
	private int hdCount;
	private Integer outputOption;
	private String taskXml;
	private Map<String, String> extensionData = Collections.emptyMap();
	private boolean deleteOnExit;
	private Condition condition;
	private Condition dealyCondition;
	private Condition autoRestartCondition;
	private boolean systemStop;
	private boolean isEndOfLife;
	private List<TaskExecuteAction> todoList = new ArrayList<>();

	public TaskInfo(Integer taskId) {
		this.taskId = taskId;
		this.lock = new ReentrantLock();
	}

	public Integer getTaskId() {
		return taskId;
	}

	public ReentrantLock getLock() {
		return lock;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setPid(Integer pid) {
		this.pid = pid;
	}

	public Integer getPid() {
		return pid;
	}

	public TaskStatus getStatus() {
		return status;
	}

	public void setStatus(TaskStatus status) {
		this.status = status;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public Integer getTranscodingTime() {
		return transcodingTime;
	}

	public void setTranscodingTime(Integer transcodingTime) {
		this.transcodingTime = transcodingTime;
	}

	public Integer getPostProcessingTime() {
		return postProcessingTime;
	}

	public void setPostProcessingTime(Integer postProcessingTime) {
		this.postProcessingTime = postProcessingTime;
	}

	public int getSdCount() {
		return sdCount;
	}

	public void setSdCount(int sdCount) {
		this.sdCount = sdCount;
	}

	public int getHdCount() {
		return hdCount;
	}

	public void setHdCount(int hdCount) {
		this.hdCount = hdCount;
	}

	public Integer getOutputOption() {
		return outputOption;
	}

	public void setOutputOption(Integer outputOption) {
		this.outputOption = outputOption;
	}

	public String getTaskXml() {
		return taskXml;
	}

	public void setTaskXml(String taskXml) {
		this.taskXml = taskXml;
	}

	public Map<String, String> getExtensionData() {
		return extensionData;
	}

	public void setExtensionData(Map<String, String> extensionData) {
		this.extensionData = extensionData;
	}

	public boolean isDeleteOnExit() {
		return deleteOnExit;
	}

	public void setDeleteOnExit(boolean deleteOnExit) {
		this.deleteOnExit = deleteOnExit;
	}

	public void newCondition() {
		this.condition = lock.newCondition();
	}

	public void awaitStarting() throws InterruptedException {
		if (condition != null) {
			condition.await();
		}
	}

	public void signAllStarting() {
		if (condition != null) {
			condition.signalAll();
		}
	}

	public boolean isSystemStop() {
		return systemStop;
	}

	public void setSystemStop(boolean systemStop) {
		this.systemStop = systemStop;
	}

	public boolean isEndOfLife() {
		return isEndOfLife;
	}

	public void setEndOfLife(boolean isEndOfLife) {
		this.isEndOfLife = isEndOfLife;
	}

	public void awaitRestartDelay(Long delayTime) throws InterruptedException {
		if (dealyCondition == null) {
			this.dealyCondition = lock.newCondition();
		}
		dealyCondition.await(delayTime, TimeUnit.MILLISECONDS);
	}

	public void signalRestartDelay() {
		if (dealyCondition != null) {
			dealyCondition.signalAll();
		}
	}

	public void enableAutoRestart() {
		if (autoRestartCondition != null) {
			autoRestartCondition.signalAll();
			autoRestartCondition = null;
		}
	}

	public void disableAutoRestart() {
		if (autoRestartCondition == null) {
			autoRestartCondition = lock.newCondition();
		}
	}

	public void awaitAutoRestartEnabled() throws InterruptedException {
		if (autoRestartCondition != null) {
			autoRestartCondition.await();
		}
	}

	public void addTodoActions(List<TaskExecuteAction> actions) {
		todoList.addAll(actions);
	}

	public List<TaskExecuteAction> getTodoActions() {
		return this.todoList;
	}

	public void clearTodoActions() {
		this.todoList.clear();
	}

}
