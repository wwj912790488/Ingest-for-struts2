package com.arcsoft.commander.agent.service.task.impl;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintStream;
import java.lang.management.ManagementFactory;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.TreeMap;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantLock;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import com.arcsoft.web4transcoder.domain.input.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import com.arcsoft.arcvideo.common.utils.CommandUtils;
import com.arcsoft.arcvideo.common.utils.OperationSystem;
import com.arcsoft.arcvideo.common.utils.StringHelper;
import com.arcsoft.arcvideo.common.utils.XmlHelper;
import com.arcsoft.cluster.app.ActionException;
import com.arcsoft.cluster.app.Request;
import com.arcsoft.cluster.app.Response;
import com.arcsoft.commander.agent.MessageHandler;
import com.arcsoft.commander.agent.service.agent.AgentService;
import com.arcsoft.commander.agent.service.builder.TaskXmlProcessFilter;
import com.arcsoft.commander.agent.service.remote.RemoteExecutorServiceSupport;
import com.arcsoft.commander.agent.service.settings.SignalSettingChangedListener;
import com.arcsoft.commander.agent.service.task.TaskManager;
import com.arcsoft.commander.agent.service.task.impl.actions.AllowProgramIdChangedAction;
import com.arcsoft.commander.agent.service.task.impl.actions.BaseTaskUpdateAction;
import com.arcsoft.commander.agent.service.task.impl.actions.SwitchSignalModeAction;
import com.arcsoft.commander.agent.service.task.impl.handlers.BaseTaskExecuteHalder;
import com.arcsoft.commander.agent.service.task.impl.handlers.OutputSettingHandler;
import com.arcsoft.commander.agent.service.task.impl.handlers.SignalSettingHandler;
import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.ActionHandler;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.alert.AlertMessageRequest;
import com.arcsoft.commander.cluster.action.task.DeleteTaskRequest;
import com.arcsoft.commander.cluster.action.task.GetHttpGroupSettingAccessorRequest;
import com.arcsoft.commander.cluster.action.task.GetHttpGroupSettingAccessorResponse;
import com.arcsoft.commander.cluster.action.task.GetTaskProgressRequest;
import com.arcsoft.commander.cluster.action.task.GetTaskProgressResponse;
import com.arcsoft.commander.cluster.action.task.GetTaskThumbnailRequest;
import com.arcsoft.commander.cluster.action.task.GetTaskThumbnailResponse;
import com.arcsoft.commander.cluster.action.task.StartTaskRequest;
import com.arcsoft.commander.cluster.action.task.StartTaskResponse;
import com.arcsoft.commander.cluster.action.task.StateChangeRequest;
import com.arcsoft.commander.cluster.action.task.StopTaskRequest;
import com.arcsoft.commander.cluster.action.task.StopTaskResponse;
import com.arcsoft.commander.cluster.action.task.UpdateTaskInfoRequest;
import com.arcsoft.commander.cluster.action.task.UpdateTaskInfoResponse;
import com.arcsoft.commander.common.CommanderErrorCode;
import com.arcsoft.commander.domain.task.TaskChangedInfo;
import com.arcsoft.commander.domain.task.TaskState;
import com.arcsoft.transcoder.ITranscodingMessageListener;
import com.arcsoft.transcoder.ITranscodingNotifier;
import com.arcsoft.transcoder.ITranscodingStatusListener;
import com.arcsoft.transcoder.ITranscodingTracker;
import com.arcsoft.transcoder.SourceSignal;
import com.arcsoft.transcoder.TranscodingInfo;
import com.arcsoft.transcoder.TranscodingKey;
import com.arcsoft.transcoder.TranscodingParams;
import com.arcsoft.util.errorcode.ErrorCode;
import com.arcsoft.web4transcoder.AppConfig;
import com.arcsoft.web4transcoder.domain.Task;
import com.arcsoft.web4transcoder.domain.outputgroup.LiveOutputGroup;
import com.arcsoft.web4transcoder.domain.outputgroup.OutputGroupSetting;
import com.arcsoft.web4transcoder.service.builder.HttpGroupSettingAccessor;
import com.arcsoft.web4transcoder.service.builder.HttpGroupSettingBean;
import com.arcsoft.web4transcoder.service.license.LicenseService;
import com.arcsoft.web4transcoder.service.parser.XmlParser;
import com.arcsoft.web4transcoder.service.transcoder.DefaultTaskTranscodingParams;
import com.arcsoft.web4transcoder.service.transcoder.DefaultTranscodingService;
import com.arcsoft.web4transcoder.service.translator.TransformableTranslator;
import com.arcsoft.web4transcoder.type.TaskStatus;

/**
 * Task manager which maintains the task list, processes the remote task requests and send the task status to the
 * commander.
 * 
 * @author zw
 * @author fjli
 */
public class TaskManagerImpl extends RemoteExecutorServiceSupport implements TaskManager, ActionHandler,
		ITranscodingStatusListener, MessageHandler, TaskStateChangedListener, SignalSettingChangedListener, ITranscodingMessageListener, TaskXmlProcessFilter {

	private static final String STOP_ON_SIGNAL_BROKEN = "stopOnSignalBroken";
	private static final int ERROR_SIGNAL_BROKEN = 0x00081002;
	private final Logger logger = LoggerFactory.getLogger(getClass());

	/** executor for task control request */
	private ExecutorService pool;

	/** executor for state change request */
	private ExecutorService stateExecutor;

	/** default thread pool size.*/
	private int poolSize = 5;

	/** restart delay time */
	private Long restartDelay;

	/** default allow state notify to commander */
	private boolean isNotify = true;

	/** default enable output */
	private boolean enableOutput = true;

	private String pidCommand;
	private TaskLifeCycleHelper lifeCycleHelper = new TaskLifeCycleHelper(this);
	private DefaultTranscodingService transcodingService;
	private XmlParser taskXmlParser;
	private LicenseService licenseService;
	private AgentService agentService;
	private List<TaskStateChangedListener> taskStateChangedListeners;
	private List<ITranscodingMessageListener> alertListeners;
	private List<TaskEventHandler> taskEventHandlers;

	public void setTaskStateChangedListeners(List<TaskStateChangedListener> taskStateChangedListeners) {
		this.taskStateChangedListeners = taskStateChangedListeners;
	}

	public void setAlertListeners(List<ITranscodingMessageListener> alertListeners) {
		this.alertListeners = alertListeners;
	}

	public void setTaskEventHandlers(List<TaskEventHandler> taskEventHandlers) {
		this.taskEventHandlers = taskEventHandlers;
	}

	public void setTranscodingService(DefaultTranscodingService transcodingService) {
		this.transcodingService = transcodingService;
	}

	public void setTaskXmlParser(XmlParser taskXmlParser) {
		this.taskXmlParser = taskXmlParser;
	}

	public void setPoolSize(int poolSize) {
		this.poolSize = poolSize;
	}

	public void setRestartDelay(Long restartDelay) {
		this.restartDelay = restartDelay;
	}

	public void setLicenseService(LicenseService licenseService) {
		this.licenseService = licenseService;
	}

	public void setAgentService(AgentService agentService) {
		this.agentService = agentService;
	}

	public void init() {
		this.pool = Executors.newFixedThreadPool(this.poolSize);
		this.stateExecutor = Executors.newSingleThreadExecutor();
	}

	public void destroy() {
		pool.shutdown();
		try {
			// Wait for 10 seconds to force shutdown
			if (!pool.awaitTermination(10, TimeUnit.SECONDS)) {
				pool.shutdownNow();
			}
		} catch (InterruptedException ie) {
			pool.shutdownNow();
		}
		stateExecutor.shutdown();
	}

	/**
	 * Returns all task actions.
	 */
	@Override
	public int[] getActions() {
		return new int[] {
				Actions.START_TASK,
				Actions.STOP_TASK,
				Actions.GET_TASK_PROGRESS,
				Actions.GET_TASK_THUMBNAIL,
				Actions.GET_TASK_HTTP_GROUP_SETTING_ACCESSOR,
				Actions.UPDATE_TASK_INFO,
			};
	}

	/**
	 * Receive task requests, and dispatch request to process methods.
	 * 
	 * @param request - the task request
	 * @return returns the response
	 * @throws ActionException if process request failed.
	 */
	@Override
	public Response execute(Request request) throws ActionException {
		if (request instanceof StartTaskRequest) {
			return startTask((StartTaskRequest) request);
		} else if (request instanceof StopTaskRequest) {
			return stopTask((StopTaskRequest) request);
		} else if (request instanceof GetTaskProgressRequest) {
			return getProgress((GetTaskProgressRequest) request);
		} else if (request instanceof GetTaskThumbnailRequest) {
			return getThumbnail((GetTaskThumbnailRequest) request);
		} else if (request instanceof GetHttpGroupSettingAccessorRequest) {
			return getHttpGroupSettingAccessor((GetHttpGroupSettingAccessorRequest) request);
		} else if (request instanceof UpdateTaskInfoRequest) {
			return updateTaskInfo((UpdateTaskInfoRequest) request);
		}
		return null;
	}

	/**
	 * Get license limitation.
	 */
	private int getLicenseLimitation(String key) {
		return StringHelper.toInteger(licenseService.getLimitation(key), -1);
	}

	/**
	 * Start task.
	 * 
	 * @param request - the start task request
	 * @return returns response.
	 */
	public StartTaskResponse startTask(StartTaskRequest request) {
		StartTaskResponse taskRes = new StartTaskResponse();
		taskRes.setErrorCode(ActionErrorCode.SUCCESS);
		List<Integer> taskIds = request.getIds();
		if (taskIds == null || taskIds.isEmpty()) {
			return taskRes;
		}

		int maxTaskCount = getLicenseLimitation("THROUGHTPUT_TASK_COUNT");
		int maxSingleOutputCount = getLicenseLimitation("THROUGHTPUT_1_IN_N_OUT");
		int maxHDOutputCount = getLicenseLimitation("THROUGHTPUT_HDOUTPUT_COUNT");
		int maxSDOutputCount = getLicenseLimitation("THROUGHTPUT_SDOUTPUT_COUNT");
		if (maxTaskCount <= 0 || maxSingleOutputCount <= 0 || maxHDOutputCount < 0 || maxSDOutputCount < 0) {
			taskRes.setErrorCode(ActionErrorCode.UNKNOWN_ERROR);
			return taskRes;
		}

		Map<Integer, Integer> errorCodeAndTaskId = new LinkedHashMap<>();
		taskRes.setErrorCodeAndTaskId(errorCodeAndTaskId);
		ReentrantLock taskLock = lifeCycleHelper.getRunningTasksLock();

		// add to running tasks.		
		List<TaskInfo> toRunningTasks = new ArrayList<>();
		if (taskIds != null && !taskIds.isEmpty()) {
			taskLock.lock();
			try {
				for (int i = 0; i < taskIds.size(); i++) {
					int taskId = request.getIds().get(i);
					TaskInfo taskInfo = lifeCycleHelper.getTaskInfo(taskId);
					if (taskInfo != null) {
						logger.error("task(id={}) already in running task list", taskId);
						errorCodeAndTaskId.put(taskId, ActionErrorCode.TASK_ALREADY_RUNNING);
					} else if (lifeCycleHelper.getTasksCount() >= maxTaskCount) {
						logger.error("task(id={}): license limitation({}) reached", taskId, maxTaskCount);
						errorCodeAndTaskId.put(taskId, ActionErrorCode.GREATER_THAN_MAX_TASK_COUNT);
					} else {
						taskInfo = lifeCycleHelper.addTask(taskId);
						if (taskInfo == null) {
							logger.error("task(id={}) already in running task list", taskId);
							errorCodeAndTaskId.put(taskId, ActionErrorCode.TASK_ALREADY_RUNNING);
						} else {
							toRunningTasks.add(taskInfo);
							taskInfo.setTaskXml(request.getDatas().get(i));
							taskInfo.setOutputOption(request.getOutputOption());
						}
					}
				}
			} finally {
				taskLock.unlock();
			}
		}

		// validate task, and start task.
		for (TaskInfo taskInfo : toRunningTasks) {
			Integer taskId = taskInfo.getTaskId();
			int taskOutputCount, taskHDCount, taskSDCount;
			Task task;
			try {
				// convert task
				task = this.convert(taskInfo.getTaskId(), taskInfo.getTaskXml());
				taskOutputCount = task.getTotalOutputGroupCount();
				taskHDCount = task.getHDOuputCount();
				taskSDCount = task.getSDOuputCount();
			} catch (Exception e) {
				logger.error("task(id=" + taskId + ") convert or validate task failed.", e);
				errorCodeAndTaskId.put(taskInfo.getTaskId(), ActionErrorCode.UNKNOWN_ERROR);
				lifeCycleHelper.removeTask(taskId);
				continue;
			}
			// validate task
			taskLock.lock();
			try {
				int[] current = lifeCycleHelper.getCurrentHDSDCount();
				int errorCode = ActionErrorCode.SUCCESS;
				if (taskOutputCount > maxSingleOutputCount) {
					errorCode = ActionErrorCode.GREATER_THAN_MAX_OUTPUT_COUNT;
					logger.error("task(id={}) 1 in N output count greater than license limit", taskId);
				} else if (taskHDCount + current[0] > maxHDOutputCount) {
					errorCode = ActionErrorCode.GREATER_THAN_MAX_HDOUTPUT_COUNT;
					logger.error("task(id={}) hdoutput count greater than license limit", taskId);
				} else if (taskSDCount + current[1] > maxSDOutputCount) {
					errorCode = ActionErrorCode.GREATER_THAN_MAX_SDOUTPUT_COUNT;
					logger.error("task(id={}) sdoutput count greater than license limit", taskId);
				}
				if (errorCode == ActionErrorCode.SUCCESS) {
					taskInfo.setName(task.getName());
					taskInfo.setHdCount(taskHDCount);
					taskInfo.setSdCount(taskSDCount);
					this.pool.execute(new StartTaskRunnable(taskInfo, task));
				} else {
					errorCodeAndTaskId.put(taskInfo.getTaskId(), errorCode);
					lifeCycleHelper.removeTask(taskId);
				}
			} finally {
				taskLock.unlock();
			}
		}

		// set the first error code.
		if (!errorCodeAndTaskId.isEmpty()) {
			taskRes.setErrorCode(errorCodeAndTaskId.values().iterator().next());
		}
		return taskRes;
	}

	/**
	 * Stop task.
	 * 
	 * @param request - the stop task request
	 * @return returns response.
	 */
	public StopTaskResponse stopTask(final StopTaskRequest request) {
		StopTaskResponse taskRes = new StopTaskResponse();
		taskRes.setErrorCode(ActionErrorCode.SUCCESS);
		pool.execute(new StopTaskRunnable(request));
		return taskRes;
	}

	/**
	 * Get specified task progress
	 * 
	 * @param request
	 * @return {@link GetTaskProgressResponse}
	 */
	public GetTaskProgressResponse getProgress(GetTaskProgressRequest request) {
		GetTaskProgressResponse response = new GetTaskProgressResponse();
		TranscodingInfo transcodingInfo = this.getProgressInfo(request.getId(), request.getFilters());
		SourceSignal sourceSignal = this.getSourceSignalStatus(request.getId());
		Document outputState = this.getOutputConnectState(request.getId());
		response.setErrorCode(ActionErrorCode.SUCCESS);
		
		if (transcodingInfo != null) {
			Document infoDoc = transcodingInfo.toXmlDOM();
			
			Element elem = infoDoc.getDocumentElement();
			if (sourceSignal != null) {
				Document signalDoc = sourceSignal.toXmlDOM();
				elem.appendChild(infoDoc.adoptNode(signalDoc.getDocumentElement()));
			}

			if (outputState != null) {
				elem.appendChild(infoDoc.adoptNode(outputState.getDocumentElement()));
			}

			String xml = "";
			try {
				ByteArrayOutputStream out = new ByteArrayOutputStream();
				Transformer trans = TransformerFactory.newInstance().newTransformer();
				trans.transform(new DOMSource(elem), new StreamResult(out));
				xml = out.toString("UTF-8");
			} catch (Exception e) {			
				com.arcsoft.util.LOG.error(getClass(), null,e);
			}
			
			response.setXml(xml);
		}
		return response;
	}

	/**
	 * Get specified task thumbnail
	 * 
	 * @param request
	 * @return {@link GetTaskThumbnailResponse}
	 */
	public GetTaskThumbnailResponse getThumbnail(GetTaskThumbnailRequest request) {
		GetTaskThumbnailResponse response = new GetTaskThumbnailResponse();
		ITranscodingTracker transcodingTracker = this.transcodingService.getTranscodingTracker(request.getId());
		response.setErrorCode(ActionErrorCode.SUCCESS);
		if (transcodingTracker != null) {
			InputStream in = transcodingTracker.getThumbnail(request.getWidth());
			if (in != null) {
				ByteArrayInputStream bis = (ByteArrayInputStream) in;
				byte[] data = new byte[bis.available()];
				try {
					bis.read(data);
					response.setData(data);
				} catch (IOException e) {
					logger.error("Get task(id=" + request.getId() + ") thumbnail failed.", e);
					response.setErrorCode(ActionErrorCode.UNKNOWN_ERROR);
				}
			}
		}

		return response;
	}

	public GetHttpGroupSettingAccessorResponse getHttpGroupSettingAccessor(GetHttpGroupSettingAccessorRequest request) {
		GetHttpGroupSettingAccessorResponse response = new GetHttpGroupSettingAccessorResponse();
		HttpGroupSettingAccessor httpGroupSettingAccessor = transcodingService.getHttpGroupSettingAccessor();
		HttpGroupSettingBean bean = httpGroupSettingAccessor.getHttpGroupSettingBean(request.getUri(), request.getContainer());
		if (bean != null) {
			logger.error("getHttpGroupSettingAccessor succeed.");
			response.setErrorCode(ActionErrorCode.SUCCESS);
			response.setIp(httpGroupSettingAccessor.getIp());
			response.setPort(bean.getPort());
		} else {
			logger.error("getHttpGroupSettingAccessor failed.");
			response.setErrorCode(ActionErrorCode.UNKNOWN_ERROR);
		}

		return response;
	}

	private UpdateTaskInfoResponse updateTaskInfo(UpdateTaskInfoRequest request) {
		UpdateTaskInfoResponse response = new UpdateTaskInfoResponse();
		TaskChangedInfo updateInfo = request.getChangedInfo();
		// check the argument.
		if (updateInfo == null || updateInfo.getTaskId() == null) {
			response.setErrorCode(ActionErrorCode.UNKNOWN_ERROR);
			return response;
		}
		TaskInfo taskInfo = lifeCycleHelper.getTaskInfo(updateInfo.getTaskId());
		if (taskInfo != null) {
			if (taskInfo.getTaskXml() != null) {
				// update task xml, so it will apply after task restart.
				taskInfo.setTaskXml(updateInfo.getTaskXml());
			}
			logger.info("task(id={}) xml updated.", taskInfo.getTaskId());
			// update task info for running tasks.
			pool.execute(new UpdateTaskInfoRunnable(taskInfo, updateInfo));
			response.setErrorCode(ActionErrorCode.SUCCESS);
		}
		return response;
	}

	@Override
	public Map<Integer, String> getTasks() {
		return lifeCycleHelper.getTasksXml();
	}

	@Override
	public void enableOutput(final boolean enable) {
		this.enableOutput = enable;
		applySettingToAllTasks(new OutputSettingHandler(enableOutput));
	}

	@Override
	public void onSignalSettingChanged(final List<SignalItem> signalItems) {
		applySettingToAllTasks(new SignalSettingHandler(signalItems));
	}

	private void applySettingToAllTasks(BaseTaskExecuteHalder handler) {
		handler.setTranscodingService(transcodingService);
		lifeCycleHelper.tryGlobalSetting(handler);
	}

	@Override
	public void enableNotifyStatus(boolean enable) {
		isNotify = enable;
	}

	@Override
	public void stopAll() {
		logger.info("stop all running tasks.");

		// try to stop no in STARTING/RUNNING tasks.
		for (Integer taskId : lifeCycleHelper.getTaskIds()) {
			if (lifeCycleHelper.tryStop(taskId, false, true)) {
				logger.info("task(id={}) has stop.", taskId);
			}
		}

		// try stop all
		for (Integer taskId : lifeCycleHelper.getTaskIds()) {
			int status = ErrorCode.ERR_NONE;
			if (!lifeCycleHelper.tryStop(taskId, true, true)) {
				status = cancelTask(taskId);
			}
			if (status != ErrorCode.ERR_NONE && status != ErrorCode.ERR_TASK_NOT_EXIST) {
				logger.error("stop task(id={}) failed.", taskId);
			} else {
				logger.info("task(id={}) has stop.", taskId);
			}
		}
	}

	/**
	 * Cancel the specified task, notify don't output first.
	 */
	private int cancelTask(Integer taskId) {
		ITranscodingTracker tracker = transcodingService.getTranscodingTracker(taskId);
		if (tracker != null) {
			tracker.notifyStartOutput(false);
		}
		return transcodingService.cancelTask(taskId);
	}

	@Override
	public void enableTaskAutoRestart(int taskId, boolean enable) {
		if (enable) {
			lifeCycleHelper.enableTaskAutoRestart(taskId);
		} else {
			lifeCycleHelper.disableTaskAutoRestart(taskId);
		}
	}

	@Override
	public void notifyTasksInfo() {
		try {
			stateExecutor.execute(new Runnable() {
				@Override
				public void run() {
					// create state change request
					logger.info("Sync tasks state to commander start.");
					StateChangeRequest request = new StateChangeRequest();
					request.setServerId(agentService.getAgent().getNode().getDescription().getId());
					Map<Integer, String> states = lifeCycleHelper.getAllTaskState();
					Set<Entry<Integer, String>> set = states.entrySet();
					for (Entry<Integer, String> entry : set) {
						TaskState taskState = new TaskState();
						taskState.setId(entry.getKey());
						taskState.setState(entry.getValue());
						request.add(taskState);
					}
					// send request to commander
					try {
						remoteExecutorService.remoteExecute(request);
						logger.info("Sync tasks state end.");
					} catch (ActionException e) {
						logger.error("Sync tasks state failed.", e);
					}
				}
			});
		} catch (Exception e) {
			// skip exception.
		}
	}

	@Override
	public void handleTaskStatusChanged(ITranscodingNotifier tracker, TaskStatus status) {
		int taskId = tracker.getTranscodingKey().getTaskId();
		TranscodingParams transcodingParams = tracker.getTranscodingParams();
		TaskInfo taskInfo = (TaskInfo) transcodingParams.getUserData(TranscodingParams.USER_DATA_START_TASK_USERDATA);

		if (logger.isInfoEnabled()) {
			logger.info("task(id={}) state change from native: status={}", taskId, status);
		}

		if (status == TaskStatus.RUNNING) {
			setTaskPidWithRetry(taskInfo);
			taskInfo.setEndDate(StringHelper.toDefaultIfNull(tracker.getTaskStartAt(), new Date()));
		} else if (isStoppedState(status)) {
			taskInfo.setPid(null);
			boolean hasStatistic = tracker.getStatistic() != null;
			taskInfo.setTranscodingTime(hasStatistic ? tracker.getStatistic().transcodingTime : 0);
			taskInfo.setPostProcessingTime(hasStatistic ? tracker.getStatistic().postprocessTime : 0);
			taskInfo.setEndDate(StringHelper.toDefaultIfNull(tracker.getTaskEndAt(), new Date()));
			boolean isRestartRequired = (status == TaskStatus.ERROR) && tracker.needRestartTask();

			if (logger.isInfoEnabled()) {
				logger.info("task(id={}): restart flag={}, error={}, desc={}", taskId, isRestartRequired,
						String.format("0x%08X", tracker.getLastError()), tracker.getLastErrorDesc());
			}

			if (isRestartRequired) {
				asyncRestartTask(taskInfo);
			} else {
				lifeCycleHelper.toStoppedState(taskInfo, status != TaskStatus.CANCELLED);
			}
		}
	}

	private void setTaskPidWithRetry(final TaskInfo taskInfo) {
		TaskUtils.executeWithRetry(new Callable<Void>() {
			@Override
			public Void call() throws Exception {
				// only get task PID on running state.
				if (isStoppedState(taskInfo.getStatus())) {
					logger.info("skip get task(id={}) pid, the task status is {}", taskInfo.getTaskId(), taskInfo.getStatus());
					return null;
				}
				// get the task PID.
				Integer pid = getTaskPid(taskInfo.getTaskId());
				if (pid != null) {
					logger.info("task(id={}) pid is {}", taskInfo.getTaskId(), pid);
					taskInfo.setPid(pid);
					return null;
				} else {
					throw new Exception("Cannot get task(id=" + taskInfo.getTaskId() + ") pid");
				}
			}
		}, 5, 2000);
	}

	private boolean isStoppedState(TaskStatus status) {
		switch (status) {
		case COMPLETED:
		case ERROR:
		case CANCELLED:
			return true;
		default:
			return false;
		}
	}

	@Override
	public void onTaskStateChanged(TaskInfo task, TaskStatus oldState, TaskStatus newState) {
		// notify task states to listeners
		if (taskStateChangedListeners != null) {
			for (TaskStateChangedListener listener : taskStateChangedListeners) {
				listener.onTaskStateChanged(task, oldState, newState);
			}
		}

		// delete port after task stopped.
		if (isStoppedState(newState) || newState == TaskStatus.PENDING) {
			try {
				HttpGroupSettingAccessor httpGroupSettingAccessor = transcodingService.getHttpGroupSettingAccessor();
				if (httpGroupSettingAccessor != null) {
					httpGroupSettingAccessor.deletePortByTask(task.getTaskId());
				}
			} catch (Exception e) {
				logger.error("delete task(id=" + task.getTaskId() + ") port failed.", e);
			}
		}

		// notify task status to commander.
		if (!isNotify) {
			return;
		}

		final TaskState state = new TaskState();
		state.setId(task.getTaskId());
		state.setState(newState.getKey());
		if (newState == TaskStatus.PENDING) {
			// NOTE: change pending state to waiting for notify commander
			state.setState(TaskStatus.WAITING.getKey());
		} else if (newState == TaskStatus.RUNNING) {
			state.setDate(StringHelper.toDefaultIfNull(task.getStartDate(), new Date()));
		} else if (isStoppedState(newState)) {
			state.setDate(StringHelper.toDefaultIfNull(task.getEndDate(), new Date()));
			state.setTranscodingTime(StringHelper.toDefaultIfNull(task.getTranscodingTime(), 0));
			state.setPostProcessingTime(StringHelper.toDefaultIfNull(task.getPostProcessingTime(), 0));
		} else if (newState == TaskStatus.STOPPING && task.isSystemStop()) {
			// Skip the stopping state when the task is stopping by system, otherwise it may affect the M+N logic.
			logger.info("Skip task(id={}, state={}) state change request.", task.getTaskId(), newState);
			return;
		}

		try {
			stateExecutor.execute(new Runnable() {
				@Override
				public void run() {
					StateChangeRequest taskChangeReq = new StateChangeRequest();
					taskChangeReq.add(state);
					taskChangeReq.setServerId(agentService.getAgent().getNode().getDescription().getId());
					String logPrefix = String.format("Send task(id=%d, state=%s) state change request", state.getId(), state.getState());
					try {
						remoteExecutorService.remoteExecute(taskChangeReq);
						logger.info(logPrefix);
					} catch (ActionException e) {
						logger.error(logPrefix + " failed.", e);
					}
				}
			});
		} catch (Exception e) {
			// skip exception.
		}

		// notify commander to delete task if isDeleteOnExit is true.
		if (isStoppedState(newState) && task.isDeleteOnExit()) {
			notifyCommanderToDeleteTask(task.getTaskId());
		}
	}

	private void asyncRestartTask(final TaskInfo taskInfo) {
		pool.execute(new Runnable() {
			@Override
			public void run() {
				Long delay = StringHelper.toDefaultIfNull(restartDelay, 5000l);
				if (!lifeCycleHelper.tryRestart(taskInfo, delay)) {
					return;
				}

				// start the task.
				Integer taskId = taskInfo.getTaskId();
				if (logger.isWarnEnabled())
					logger.warn("auto restart the task(id={}).", taskId);
				taskInfo.setOutputOption(enableOutput ? 2 : 0);
				pool.execute(new StartTaskRunnable(taskInfo, null));

				// send error code for alert logging.
				AlertMessageRequest alert = new AlertMessageRequest();
				alert.setLevel(0);
				alert.setTaskId(taskId);
				alert.setCode(CommanderErrorCode.TASK_AUTO_RESTART);
				alert.setMsg("auto restart task.");
				alert.setIp(agentService.getAgent().getNode().getDescription().getIp());
				alert.setType("task");
				try {
					remoteExecutorService.remoteExecute(alert);
				} catch (ActionException e) {
					logger.error("send task message failed.", e);
				}
			}
		});
	}

	@Override
	public void fireTaskErrorMessage(ITranscodingNotifier tracker, int level, int code, String msg) {
		TranscodingParams transcodingParams = tracker.getTranscodingParams();
		TaskInfo taskInfo = (TaskInfo) transcodingParams.getUserData(TranscodingParams.USER_DATA_START_TASK_USERDATA);

		if ((code & 0xFFFFF000) == 0x00099000) {
			if (taskEventHandlers != null && tracker != null) {
				for (TaskEventHandler handler : taskEventHandlers) {
					if (handler.getEventCodes().contains(code)) {
						if (taskInfo != null) {
							handler.processTaskEvent(taskInfo, code, msg);
						}
					}
				}
			}
		} else {
			if (alertListeners != null) {
				for (ITranscodingMessageListener listener : alertListeners) {
					listener.fireTaskErrorMessage(tracker, level, code, msg);
				}
			}
			if (code == ERROR_SIGNAL_BROKEN) {
				Integer timeout = getSignalBrokenTimeout(taskInfo);
				if (timeout != null) {
					// stop the task.
					logger.info("stop the task (id={}) for signal broken.", taskInfo.getTaskId());
					taskInfo.setDeleteOnExit(true);
					StopTaskRequest stopRequest = new StopTaskRequest();
					stopRequest.setIds(Arrays.asList(taskInfo.getTaskId()));
					stopTask(stopRequest);
				}
			}
		}
	}

	private void notifyCommanderToDeleteTask(final int taskId) {
		TaskUtils.executeWithRetry(new Callable<Void>() {
			@Override
			public Void call() throws Exception {
				DeleteTaskRequest deleteRequest = new DeleteTaskRequest();
				deleteRequest.setId(taskId);
				logger.info("notify delete the task (id={}) for signal broken.", taskId);
				remoteExecutorService.remoteExecute(deleteRequest);
				return null;
			}
		}, 3, 5000);
	}

	/**
	 * Returns {@link Task} convert from {@code xml}.
	 * 
	 * @param xml - task xml string.
	 * @return {@link Task}
	 */
	private Task convert(int taskId, String xml) {
		Task task = (Task) taskXmlParser.parse(xml);
		task.setId(taskId);
		TransformableTranslator.associate(task);
		return task;
	}

	/**
	 * Get progress info.
	 * 
	 * @param taskId
	 * @param filters
	 * @return
	 */
	private TranscodingInfo getProgressInfo(int taskId, byte[] filters) {
		TranscodingInfo ti = null;
		ITranscodingTracker t = this.transcodingService.getTranscodingTracker(taskId);
		if (t != null) {
			ti = t.getProgressInfo(filters);
		}
		return ti;
	}

	/**
	 * Get Source Signal Status.
	 * 
	 * @param taskId
	 * @return
	 */
	private SourceSignal getSourceSignalStatus(int taskId) {
		SourceSignal ss = null;
		ITranscodingTracker t = this.transcodingService.getTranscodingTracker(taskId);
		if (t != null) {
			ss = t.getSourceSignalStatus();
		}
		return ss;
	}

	/**
	 * Get the task output connection state.
	 * 
	 * <pre>
	 * XML format:
	 * &lt;OutputState connected="0"&gt;
	 *   &lt;OutputGroup id="" connected="1"/&gt;
	 *   &lt;OutputGroup id="" connected="0"/&gt;
	 * &lt;/OutputState&gt;
	 * </pre>
	 * 
	 * @param taskId - the task id
	 */
	private Document getOutputConnectState(int taskId) {
		Task task = null;
		ITranscodingTracker t = transcodingService.getTranscodingTracker(taskId);
		if (t == null) {
			return null;
		}
		if (t.getTranscodingParams() instanceof DefaultTaskTranscodingParams) {
			task = ((DefaultTaskTranscodingParams) t.getTranscodingParams()).getTask();
		}
		if (task == null) {
			return null;
		}

		XmlHelper xmlHelper;
		try {
			xmlHelper = new XmlHelper();
		} catch (ParserConfigurationException e) {
			return null;
		}

		int state, allState = 1, outputCount = 0;
		String settingType, groupLabel;
		TranscodingKey taskKey = new TranscodingKey(taskId);
		Element root = xmlHelper.createRoot("OutputState");
		List<LiveOutputGroup> groups = task.getOutputGroups();
		for (int groupIndex = 0; groupIndex < groups.size(); groupIndex++) {
			LiveOutputGroup group = groups.get(groupIndex);
			settingType = group.getSettingsType();
			/*
			 * FIXME: transcoder1.7 use the group id and output id to report output connection state.
			 * If this issue is fixed in the future, this value should be updated.
			 */
			groupLabel = String.valueOf(groupIndex);
			if (OutputGroupSetting.SETTING_TYPE_APPLESTREAMING.equalsIgnoreCase(settingType)
					|| OutputGroupSetting.SETTING_TYPE_HTTPSTREAMING.equalsIgnoreCase(settingType)
					|| OutputGroupSetting.SETTING_TYPE_FLASHSTREAMING.equalsIgnoreCase(settingType)
					|| OutputGroupSetting.SETTING_TYPE_MSSTREAMING.equalsIgnoreCase(settingType)) {
				outputCount++;
				state = transcodingService.isOutputConnected(taskKey, groupLabel) ? 1 : 0;
				allState &= state;
				Element node = xmlHelper.appendNode(root, "OutputGroup");
				xmlHelper.addAttribute(node, "id", groupLabel);
				xmlHelper.addAttribute(node, "connected", String.valueOf(state));
			}
		}
		if (outputCount > 0) {
			xmlHelper.addAttribute(root, "connected", String.valueOf(allState));
			return xmlHelper.getDocument();
		} else {
			return null;
		}
	}

	/**
	 * Stop task {@code runnable} implement
	 * 
	 * @author zw
	 */
	private final class StopTaskRunnable implements Runnable {

		private final StopTaskRequest request;

		private StopTaskRunnable(StopTaskRequest request) {
			this.request = request;
		}

		@Override
		public void run() {
			Integer[] tasks = null;
			if (StringHelper.toDefaultIfNull(request.getStopAll(), false)) {
				logger.error("stop all tasks which request by commander.");
				tasks = lifeCycleHelper.getTaskIds();
			} else if (request.getIds() != null && !request.getIds().isEmpty()) {
				tasks = request.getIds().toArray(new Integer[0]);
			}
			for (Integer taskId : tasks) {
				int status = ErrorCode.ERR_NONE;
				if (!lifeCycleHelper.tryStop(taskId, true, false)) {
					status = cancelTask(taskId);
				}
				if (status != ErrorCode.ERR_NONE && status != ErrorCode.ERR_TASK_NOT_EXIST) {
					logger.error("stop task(id={}) failed.", taskId);
				} else {
					logger.info("task(id={}) has stop.", taskId);
				}
			}
		}
	}

	/**
	 * Start task {@code runnable} implement
	 * 
	 * @author zw
	 */
	private final class StartTaskRunnable implements Runnable {

		private final TaskInfo taskInfo;
		private final Task task;

		public StartTaskRunnable(TaskInfo taskInfo, Task task) {
			super();
			this.taskInfo = taskInfo;
			this.task = task;
		}

		@Override
		public void run() {
			// try to start task, if restart failed, it will goes to stopped state(CANCELLED or ERROR).
			if (!lifeCycleHelper.tryStart(taskInfo)) {
				return;
			}

			int taskId = taskInfo.getTaskId();
			Integer taskOutputOption = (Integer) taskInfo.getOutputOption();
			int outputOption = enableOutput ? 1 : 0;
			if (taskOutputOption != null && taskOutputOption == 2) {
				outputOption = 2;
			}
			logger.info("task(id={}) output option value is: {}", taskId, outputOption);

			try {
				// prepare transcoding parmeters
				Task newTask = this.task != null ? this.task : convert(taskId, taskInfo.getTaskXml());
				DefaultTaskTranscodingParams params = new DefaultTaskTranscodingParams(newTask, transcodingService);
				params.setOutputOption(outputOption);
				params.setUserData(TranscodingParams.USER_DATA_START_TASK_USERDATA, taskInfo);
				taskInfo.setExtensionData(TaskUtils.getTaskExtensionMap(newTask));

				// start task
				int result = transcodingService.startTask(new TranscodingKey(taskId), 0, params);
				if (result != ErrorCode.ERR_NONE) {
					logger.error("Start tasktranscoding task(id={}) failed: result={}", taskId, String.format("0x%08x", result));
					lifeCycleHelper.toStoppedState(taskInfo, true);
				} else {
					logger.info("task(id={}) begin to transcoder, outputOption={}", taskId, outputOption);
					lifeCycleHelper.toRunningState(taskInfo);
				}
			} catch (Exception e) {
				logger.error("Start tasktranscoding task(id=" + taskId + ") failed.", e);
				lifeCycleHelper.toStoppedState(taskInfo, true);
			}
		}
	}

	/**
	 * Update task information.
	 * 
	 * @author fjli
	 */
	private final class UpdateTaskInfoRunnable implements Runnable {

		private final TaskInfo taskInfo;
		private final TaskChangedInfo updateInfo;

		public UpdateTaskInfoRunnable(TaskInfo taskInfo, TaskChangedInfo updateInfo) {
			this.taskInfo = taskInfo;
			this.updateInfo = updateInfo;
		}

		@Override
		public void run() {
			List<TaskExecuteAction> todoList = new ArrayList<>();
			// update allow program id changed option.
			if (updateInfo.getAllowProgramIdChanged() != null) {
				todoList.add(new AllowProgramIdChangedAction());
			}
			// update signal switch mode option.
			if (updateInfo.getSignalSwitchMode() != null) {
				todoList.add(new SwitchSignalModeAction());
			}
			// execute all actions.
			doUpdateAction(todoList);
		}

		private void doUpdateAction(List<TaskExecuteAction> actions) {
			for (TaskExecuteAction runnable : actions) {
				BaseTaskUpdateAction action = (BaseTaskUpdateAction) runnable;
				action.setTaskChangedInfo(updateInfo);
				action.setTranscodingService(transcodingService);
			}
			lifeCycleHelper.trySetting(taskInfo, actions);
		}

	}

	@Override
	public Map<String, String> getCommands() {
		Map<String, String> commandMap = new TreeMap<>();
		commandMap.put("task list", "List the running taks.");
		commandMap.put("task stop ${id}", "Stop the specified task.");
		commandMap.put("task stop all", "Stop all tasks.");
		commandMap.put("task syncstate", "Synchronize task states.");
		commandMap.put("task error ${id} ${errorcode}", "Raise a task error for test.");
		return commandMap;
	}

	@Override
	public void processCommand(String[] args, PrintStream out) {
		if ("task".equalsIgnoreCase(args[0])) {
			if ("stop".equalsIgnoreCase(args[1])) {
				if ("all".equalsIgnoreCase(args[2])) {
					stopAll();
					out.println("OKAY");
				} else {
					Integer requestId = Integer.parseInt(args[2]);
					StopTaskRequest stopRequest = new StopTaskRequest();
					stopRequest.setIds(Arrays.asList(requestId));
					stopTask(stopRequest);
					out.println("OKAY");
				}
			} else if ("list".equalsIgnoreCase(args[1])) {
				Integer[] taskIds = lifeCycleHelper.getTaskIds();
				if (taskIds.length > 0) {
					out.println("---ID----STATUS---PID-------NAME----");
					for (Integer taskId : taskIds) {
						String strTaskId = taskId.toString();
						TaskInfo info = lifeCycleHelper.getTaskInfo(taskId);
						StringBuilder builder = new StringBuilder();
						builder.append(strTaskId).append("\t");
						builder.append(info.getStatus()).append("\t");
						if (info.getPid() != null) {
							builder.append(info.getPid());
						}
						builder.append("\t");
						builder.append(info.getName());
						out.println(builder.toString());
					}
				} else {
					out.println("NONE");
				}
			} else if ("syncstate".equalsIgnoreCase(args[1])) {
				notifyTasksInfo();
				out.println("OKAY");
			} else if ("error".equalsIgnoreCase(args[1])) {
				int taskId = Integer.decode(args[2]);
				int code = Long.decode(args[3]).intValue();
				int level = ((code & 0x80000000) != 0) ? 0 : 1;
				ITranscodingTracker tracker = transcodingService.getTranscodingTracker(taskId);
				if (tracker != null) {
					fireTaskErrorMessage(tracker, level, code, null);
					out.println("OKAY");
				} else {
					out.println("TASK NOT FOUND");
				}
			}
		}
	}

	/**
	 * Get task PID.
	 */
	private Integer getTaskPid(Integer taskId) {
		if (!OperationSystem.getCurrentOS().isLinux()) {
			return null;
		}
		if (pidCommand == null) {
			String name = ManagementFactory.getRuntimeMXBean().getName();
			String pid = name.split("@")[0];
			String path = AppConfig.getProperty(AppConfig.KEY_TRANSCODER_PATH);
			pidCommand = "ps h -ww -o pid,command --ppid " + pid;
			pidCommand += "|grep \"" + path + "\"";
			pidCommand += "|awk '{x=split($3,a,\"/\");split(a[x],b,\"_\");if(b[1]==%d) print $1}'";
		}
		try {
			String command = String.format(pidCommand, taskId);
			List<String> lines = CommandUtils.executeShell(command);
			if (!lines.isEmpty()) {
				return StringHelper.toInteger(lines.get(0));
			}
		} catch (Exception e) {
			logger.error("get task(id=" + taskId + ") pid error.", e);
		}
		return null;
	}

	@Override
	public void preProcessTask(Task task) {
		try {
			TaskInfo taskInfo = lifeCycleHelper.getTaskInfo(task.getId());
			Integer timeout = getSignalBrokenTimeout(taskInfo);
			if (timeout != null) {
				List<Input> inputs = task.getInputs();
				if (inputs != null && !inputs.isEmpty()) {
					InputBody body = inputs.get(0).getBody();
					SourceSwitchCondition switchModeCondition = null;
					if (body instanceof NetworkInput) {
						NetworkInput networkInput = (NetworkInput) body;
						switchModeCondition = networkInput.getSwitchCondition();
					} else if (body instanceof SdiDeviceInput) {
						SdiDeviceInput sdiDeviceInput = (SdiDeviceInput) body;
						switchModeCondition = sdiDeviceInput.getSwitchCondition();
					}else if (body instanceof AsiDeviceInput) {
						AsiDeviceInput asiDeviceInput = (AsiDeviceInput) body;
						switchModeCondition = asiDeviceInput.getSwitchCondition();
					}
					if (switchModeCondition != null && switchModeCondition.getSignalItems() != null) {
						for (SignalItem item : switchModeCondition.getSignalItems()) {
							if (item.getType() == SignalItem.SIGNAL_BROKEN) {
								item.setWarningPeriod(timeout);
							}
						}
					}
				}
			}
		} catch (Exception e) {
			logger.error("pre process task failed: " + e.getMessage(), e);
		}
	}

	private Integer getSignalBrokenTimeout(TaskInfo taskInfo) {
		Map<String, String> extensionMap = taskInfo.getExtensionData();
		Integer timeout = StringHelper.toInteger(extensionMap.get(STOP_ON_SIGNAL_BROKEN));
		if (timeout != null && timeout > 0) {
			return timeout;
		} else {
			return null;
		}
	}

}
