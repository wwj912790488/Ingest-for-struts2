package com.arcsoft.commander.service.task.impl;

import java.util.*;
import java.util.Map.Entry;
import com.arcsoft.web4transcoder.domain.input.SdiDeviceInput;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.arcsoft.arcvideo.common.utils.StringHelper;
import com.arcsoft.arcvideo.spring.event.EventManager;
import com.arcsoft.arcvideo.spring.event.EventReceiver;
import com.arcsoft.cluster.app.ActionException;
import com.arcsoft.cluster.app.Request;
import com.arcsoft.cluster.app.Response;
import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.ActionHandler;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.task.DeleteTaskRequest;
import com.arcsoft.commander.cluster.action.task.DeleteTaskResponse;
import com.arcsoft.commander.cluster.action.task.StartTaskRequest;
import com.arcsoft.commander.cluster.action.task.StartTaskResponse;
import com.arcsoft.commander.cluster.action.task.StateChangeRequest;
import com.arcsoft.commander.cluster.action.task.StateChangeResponse;
import com.arcsoft.commander.cluster.action.task.StopTaskRequest;
import com.arcsoft.commander.cluster.action.task.StopTaskResponse;
import com.arcsoft.commander.dao.server.ServerDao;
import com.arcsoft.commander.dao.server.ServerGroupDao;
import com.arcsoft.commander.dao.task.CustomTaskRepository;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.domain.server.SwitchCause;
import com.arcsoft.commander.domain.task.CommanderTask;
import com.arcsoft.commander.domain.task.TaskChangedInfo;
import com.arcsoft.commander.domain.task.TaskQueryParams;
import com.arcsoft.commander.domain.task.TaskState;
import com.arcsoft.commander.service.remote.RemoteExecutorService;
import com.arcsoft.commander.service.server.event.ServerRoleSwitchEvent;
import com.arcsoft.commander.service.server.event.ServerTakeOverEvent;
import com.arcsoft.commander.service.task.CustomTaskService;
import com.arcsoft.commander.service.task.event.TaskCreatedEvent;
import com.arcsoft.commander.service.task.event.TaskDeletedEvent;
import com.arcsoft.commander.service.task.event.TaskModifiedEvent;
import com.arcsoft.commander.service.task.event.TaskStatusChangedEvent;
import com.arcsoft.util.Pager;
import com.arcsoft.web4transcoder.domain.LiveProfile;
import com.arcsoft.web4transcoder.domain.PostProcess;
import com.arcsoft.web4transcoder.domain.Task;
import com.arcsoft.web4transcoder.domain.input.Input;
import com.arcsoft.web4transcoder.domain.input.NetworkInput;
import com.arcsoft.web4transcoder.domain.output.StreamAssembly;
import com.arcsoft.web4transcoder.domain.outputgroup.LiveOutputGroup;
import com.arcsoft.web4transcoder.service.SourceSignalSettingsService;
import com.arcsoft.web4transcoder.service.TaskServiceImpl;
import com.arcsoft.web4transcoder.type.TaskStatus;


/**
 * 
 * 
 * @author zw
 */
public class CustomTaskServiceImpl extends TaskServiceImpl implements CustomTaskService, ActionHandler {
	
	protected final Logger logger = LoggerFactory.getLogger(getClass());
	protected CustomTaskRepository customTaskRepository;
	protected ServerDao serverDao;
	protected ServerGroupDao groupDao;
	protected SourceSignalSettingsService sourceSignalSettingsService;
	protected RemoteExecutorService remoteExecutorService;
	private EventManager eventManager;

	public void setRemoteExecutorService(RemoteExecutorService remoteExecutorService) {
		this.remoteExecutorService = remoteExecutorService;
	}
	
	public void setCustomTaskRepository(CustomTaskRepository customTaskRepository) {
		this.customTaskRepository = customTaskRepository;
	}
	
	public void setServerDao(ServerDao serverDao) {
		this.serverDao = serverDao;
	}
	
	public void setGroupDao(ServerGroupDao groupDao) {
		this.groupDao = groupDao;
	}

	public void setSourceSignalSettingsService(SourceSignalSettingsService sourceSignalSettingsService) {
		this.sourceSignalSettingsService = sourceSignalSettingsService;
	}
	
	public void setEventManager(EventManager eventManager) {
		this.eventManager = eventManager;
	}

	@Override
	public Task saveTask(Task task) {
		Task newTask = super.saveTask(task);
		eventManager.deliver(new TaskCreatedEvent(task));
		return newTask;
	}

	@Override
	public void deleteTask(Integer taskId) {
		Task task = getTask(taskId, false);
		if (task != null) {
			super.deleteTask(taskId);
			eventManager.deliver(new TaskDeletedEvent(task));
		}
	}

	@Override
	public Task updateTask(Task task) {
		Task newTask = super.updateTask(task);
		eventManager.deliver(new TaskModifiedEvent(newTask));
		return newTask;
	}

	@Override
	public List<Task> getTasksByCurServerIdAndStates(String curServerId, TaskStatus... status) {
		return this.customTaskRepository.getTasksByCurServerIdAndStates(curServerId, status);
	}

	@Override
	public List<Task> getRunningTasks(String curServerId) {
		return this.customTaskRepository.getTasksByCurServerId_RunningFLag(curServerId, 1);
	}

	@Override
	public void updateTasksCurServerId(String originalServerId, String newServerId) {
		this.customTaskRepository.updateTasksCurServerId(originalServerId, newServerId);
	}

	@Override
	public Server getServerByTaskTypeAndServerId(String serverOrGroupId, int type) {
		Server server = null;
		if(type == 1){
			//1+1,get group info
			ServerGroup group = this.groupDao.getGroup(Integer.parseInt(serverOrGroupId));
			if(group != null){
				List<Server> servers = group.getServers();
				if(servers == null || servers.size() == 0){
					return null;
				}
				//a group just contain two servers, a master and a slave
				for (Server ser : servers) {
					if(!ser.isBackup()){ //get the master server
						server = ser;
						break;
					}
				}
			}
		}else{ //M+N.get server info
			server = this.serverDao.getServer(serverOrGroupId);
		}
		return server;
	}

	@Override
	public void updateTasksStateByServerIdAndExceptStatus(String serverId, TaskStatus status, TaskStatus... exceptStatus) {
		customTaskRepository.updateTasksStateByServerIdAndExceptStatus(serverId, status, exceptStatus);

		// notify task status changed event.
		List<TaskStatus> changedStatus = new ArrayList<>(Arrays.asList(TaskStatus.values()));
		for (TaskStatus tmpStatus : exceptStatus)
			changedStatus.remove(tmpStatus);
		List<Task> tasks = getTasksWithoutAssocByCurServerIdAndStates(serverId, changedStatus.toArray(new TaskStatus[0]));
		for (Task task : tasks) {
			eventManager.deliver(new TaskStatusChangedEvent(task));
		}
	}

	@Override
	public void updateTaskProgress(Task task) {
		this.customTaskRepository.updateTaskProgress(task);

		// notify task status changed event.
		eventManager.deliver(new TaskStatusChangedEvent(task));
	}

	@Override
	public void updateTaskState(int taskId, TaskStatus status) {
		this.customTaskRepository.updateTaskState(taskId, status);

		// notify task status changed event.
		Task task = getTask(taskId, false);
		if (task != null)
			eventManager.deliver(new TaskStatusChangedEvent(task));
	}

	@Override
	public List<Task> getTasksWithoutAssocByCurServerIdAndStates(String curServerId, TaskStatus... status) {
		return this.customTaskRepository.getTasksByCurServerIdAndStates(curServerId, status);
	}

	@Override
	public Pager findTasksByStateAndCurServerId(boolean details, TaskStatus status, String curServerId, int pageIndex, int pageSize) {
		return this.customTaskRepository.findTasksByStateAndCurServerId(details, status, curServerId, pageIndex, pageSize);
	}
	

	@Override
	public Pager findTasks(boolean details, TaskQueryParams params, int pageIndex, int pageSize) {
		return this.customTaskRepository.findTasks(details, params, pageIndex, pageSize);
	}
	
	@Override
	public List<Task> getTasksByGroupIdAndCurServerIdIsNotNull(Integer groupId) {
		return this.customTaskRepository.getTasksByGroupId(groupId, false);
	}
	

	@Override
	public List<Task> getTasksByGroupId(Integer groupId) {
		return this.customTaskRepository.getTasksByGroupId(groupId, true);
	}

	@Override
	public List<Task> getTasksByCurServerId(String serverId) {
		return getTasksByCurServerIdAndStates(serverId, new TaskStatus[]{
				TaskStatus.CANCELLED, TaskStatus.ERROR,TaskStatus.STOPPING, TaskStatus.COMPLETED,
				TaskStatus.PENDING, TaskStatus.WAITING, TaskStatus.RUNNING, TaskStatus.DOWNLOADING
		});
	}
	

	@Override
	public long getTasksCountByGroupId(Integer groupId) {
		return this.customTaskRepository.getTasksCountByGroupId(groupId);
	}
	

	@Override
	public long getTasksCountByServerId(String serverId) {
		return this.customTaskRepository.getTasksCountByServerId(serverId);
	}
	
	@Override
	public void saveTask(Task task, boolean needAssignmentServer) {
		// TODO Auto-generated method stub
	}

	@Override
	public void updateTask(Task task, boolean needAssignmentServer) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public long getTaskCountByStatus(TaskStatus... status) {
		return customTaskRepository.getTaskCountByStatus(status);
	}

	/**
	 * Process live 1+1 role switch event
	 * 
	 * @param event {@code ServerRoleSwitchEvent}
	 */
	@EventReceiver(value = ServerRoleSwitchEvent.class)
	public void onServerRoleSwitch(ServerRoleSwitchEvent event){
		//update all server id to new server id
		updateTasksCurServerId(event.getSlave().getId(), event.getMaster().getId());
		logger.info("update tasks's current server id " + event.getSlave().getId() + " to " + event.getMaster().getId());
	}
	
	/**
	 * Process server take over event
	 * 
	 * @param event
	 */
	@EventReceiver(value = ServerTakeOverEvent.class, sync=true)
	public void onServerTakeOver(ServerTakeOverEvent event){
		logger.info("start processing take over event: " + event.getOldServer().getIp());
		if(event.getNewServer() != null){
			List<Task> runningTasks = null;
			boolean stopAllRunningTasks = false;
			switch (event.getCause()) {
			case SwitchCause.MANUAL:
			case SwitchCause.GPU_ERROR:
				stopAllRunningTasks = true;
				break;
			}
			if (stopAllRunningTasks) {
				//1. get the running tasks on the old server
				runningTasks = getTasksByCurServerIdAndStates(event.getOldServer().getId(), new TaskStatus[]{
					TaskStatus.WAITING, TaskStatus.DOWNLOADING,TaskStatus.RUNNING,TaskStatus.SUSPENDED
				});
			}
			//2. update tasks's current server to new server
			// to prevent changing the task status to stopping by asynchronous message from agent.
			updateTasksCurServerId(event.getOldServer().getId(), event.getNewServer().getId());
			logger.info("update tasks's current server id " + event.getOldServer().getId() + " to " + event.getNewServer().getId());
			//3. stop the running task on the old server
			if (stopAllRunningTasks) {
				processStopRequest(event.getOldServer(), runningTasks);
			}
			//4. run tasks on the new server
			//get all of need re-starte tasks
			runningTasks = getTasksByCurServerIdAndStates(event.getNewServer().getId(), new TaskStatus[]{
					TaskStatus.WAITING, TaskStatus.DOWNLOADING, TaskStatus.COMPLETED, 
					TaskStatus.ERROR, TaskStatus.SUSPENDED,TaskStatus.RUNNING
			});
			if (runningTasks == null || runningTasks.isEmpty()) {
				logger.info("Can't find any running task");
			} else {
				logger.info("Currently ready started task count is : " + runningTasks.size());
				processStartRequest(event.getNewServer(), runningTasks);
			}
		}else{
			if (event.getCause() == SwitchCause.GPU_ERROR || event.getCause() == SwitchCause.NETWORK_ERROR) {
				logger.info("take over event is triggered by GPU or network ERROR, don't set task status to ERROR.");
			} else {
				//if can't find any backup server then update tasks status to error when status is not exists in 
				//PENDING,CANCELLED,COMPLETED,ERROR
				updateTasksStateByServerIdAndExceptStatus(event.getOldServer().getId(), TaskStatus.ERROR, new TaskStatus[]{
						TaskStatus.PENDING, TaskStatus.CANCELLED, TaskStatus.COMPLETED, TaskStatus.ERROR
				});
			}
		}
		logger.info("end processing take over event: " + event.getOldServer().getIp());
	}

	private void processStopRequest(Server s, List<Task> runningTasks) {
		StopTaskRequest req = new StopTaskRequest();
		req.setStopAll(true);
		if (runningTasks != null) {
			List<Integer> ids = new ArrayList<>();
			for(int i=0; i<runningTasks.size(); i++){
				Task task = runningTasks.get(i);
				ids.add(task.getId());
			}
			req.setIds(ids);
		}
		StopTaskResponse response = null;
		try {
			response = (StopTaskResponse) remoteExecutorService.remoteExecute(req, s);
		} catch (Exception e) {
			logger.error("execute StopTaskRequest failed.", e);
		}
		if(response == null){//Indicate the StopTaskRequest is not send to agent
			logger.error("execute StopTaskRequest failed, StopTaskRequest is not send to agent.");
		}else if(!response.isSuccess()){
			logger.error("execute StopTaskRequest failed. response is error");
		}
	}
	
	private void processStartRequest(Server s, List<Task> runningTasks) {
		final RequestData reqData = buildRequestData(runningTasks);
		if(reqData.getIds().isEmpty() || reqData.getTaskXmls().isEmpty()){
			return;
		}
		//update tasks's status to waiting
		for(Integer taskId : reqData.getIds()){
			updateTaskState(taskId, TaskStatus.WAITING);
		}
		//execute start task request
		final StartTaskRequest req = new StartTaskRequest();
		req.setIds(reqData.getIds());
		req.setDatas(reqData.getTaskXmls());
		req.setOutputOption(2); //the value 2 indicate current task is switch from other server
		StartTaskResponse response = null;
		try {
			response = (StartTaskResponse) remoteExecutorService.remoteExecute(req, s);
		} catch (Exception e) {
			logger.error("execute StartTaskRequest failed.", e);
		}
		if(response == null){//Indicate the StartTaskRequest is not send to agent
			updateRunningTasksState(runningTasks);
		}else if(!response.isSuccess()){//if start failed then update tasks state to ERROR
			Map<Integer, Integer> errorCodeAndTaskId = response.getErrorCodeAndTaskId();
			//In case of some ActionErrorCode.UNKNOWN_ERROR the errorCodeAndTaskId may be null
			if(errorCodeAndTaskId != null ){
				Set<Entry<Integer, Integer>> kv = errorCodeAndTaskId.entrySet();
				for (Entry<Integer, Integer> entry : kv) {
					updateTaskState(entry.getKey(), TaskStatus.ERROR);
				}
			}else{
				updateRunningTasksState(runningTasks);
			}
		}
	}


	private void updateRunningTasksState(List<Task> runningTasks) {
		for(Task task : runningTasks){
			updateTaskState(task.getId(), TaskStatus.ERROR);
		}
	}
	
	private RequestData buildRequestData(List<Task> runningTasks){
		List<Integer> ids = new ArrayList<>();
		List<String> taskXmls = new ArrayList<>();
		//Get id and task xml list for StartTaskRequest
		for(int i=0; i<runningTasks.size(); i++){
			Task task = runningTasks.get(i);
			ids.add(task.getId());
			try {
				List<Input> inputs = task.getInputs();
				for (Input in : inputs) {
					if (in.getBody() instanceof NetworkInput) {
						NetworkInput ni = (NetworkInput)in.getBody();
						ni.setSwitchCondition(sourceSignalSettingsService.getSettings());
					}else if (in.getBody() instanceof SdiDeviceInput) {
						SdiDeviceInput sdi = (SdiDeviceInput)in.getBody();
						sdi.setSwitchCondition(sourceSignalSettingsService.getSettings());
					}
				}
				String xml = this.taskXmlBuilder.buildkXml(task);
				if (StringHelper.isNotEmpty(task.getUserData())) {
					xml = xml.replaceFirst("(<task[^>]*>)", "$1\r\n<extension>" + task.getUserData() + "</extension>");
				}
				taskXmls.add(xml);
			} catch (Exception e) {
				logger.error("convert task to xml failed.", e);
				ids.remove(i);
				if(taskXmls.size() > i){
					taskXmls.remove(i);
				}
				updateTaskState(task.getId(), TaskStatus.ERROR);
			}
		}
		return new RequestData(ids, taskXmls);
	}
	
	private class RequestData{
		private final List<Integer> ids;
		private final List<String> taskXmls;
		public RequestData(List<Integer> ids, List<String> taskXmls) {
			super();
			this.ids = ids;
			this.taskXmls = taskXmls;
		}
		
		public List<Integer> getIds() {
			return ids;
		}
		
		public List<String> getTaskXmls() {
			return taskXmls;
		}
		
	}

	@Override
	public Response execute(Request request) throws ActionException {
		if (request instanceof StateChangeRequest) {
			return processTaskStateChange((StateChangeRequest) request);
		} else if (request instanceof DeleteTaskRequest) {
			return processDeleteTask((DeleteTaskRequest) request);
		}
		return null;
	}

	@Override
	public int[] getActions() {
		return new int[]{
			Actions.TASK_STATE_CHANGE,
			Actions.NOTIFY_DELETE_TASK
		};
	}
	
	/**
	 * Process task state change
	 * 
	 * @param request
	 * @return 
	 */
	private StateChangeResponse processTaskStateChange(StateChangeRequest request){
		try {
			if(request.getStates() != null){
				List<TaskState> states = request.getStates();
				for (TaskState taskState : states) {
					String msgPrefix = "Task(id="+ taskState.getId() +") ";
					try {
						logger.info(msgPrefix +"receive state("+ taskState.getState() +") change request.");
						CommanderTask task = (CommanderTask) getTask(taskState.getId(), false);
						if(task != null){
							switch(TaskStatus.valueOf(taskState.getState())){
								case RUNNING:
									task.setStartedAt(taskState.getDate());
									logger.info(msgPrefix + " running on server(id=" + task.getCurServerId()+")");
									break;
								case COMPLETED:
								case ERROR:
								case CANCELLED:
									customTaskRepository.updateTaskServer(taskState.getId(), null);
									if(taskState.getDate() != null){
										task.setCompletedAt(taskState.getDate());
									}
									task.setTranscodingDuration(taskState.getTranscodingTime() == null ? 0 : taskState.getTranscodingTime());
									task.setPostProcessingDuration(taskState.getPostProcessingTime() == null ? 0 : taskState.getPostProcessingTime());
									logger.info(msgPrefix + taskState.getState()+" on server(id=" + task.getCurServerId()+")");
									break;
								default:
									break;
							}
							boolean updateFlag = true;
							if(task.getType() == 0){
								//if currently task type is M+N and current server id is same to the request's server id then update the task state
								if(task.getCurServerId().equals(request.getServerId())){
									logger.info("change M+N task state to " + taskState.getState());
									task.setState(taskState.getState());
								} else {
									updateFlag = false;
								}
							}else{
								logger.info("change 1+1 task state to " + taskState.getState());
								task.setState(taskState.getState());
							}
							if (updateFlag)
								updateTaskProgress(task);
						}
					} catch (Exception e) {
						logger.error(msgPrefix + "change state failed", e);
					}
				}
			}
		} catch (Exception e) {
			logger.error("process task state change request failed", e);
		}
		StateChangeResponse response = new StateChangeResponse();
		response.setErrorCode(ActionErrorCode.SUCCESS);
		return response;
	}

	/**
	 * Process delete task.
	 */
	private DeleteTaskResponse processDeleteTask(DeleteTaskRequest request) {
		logger.info("delete task (id=" + request.getId() + ") by agent.");
		deleteTask(request.getId());
		DeleteTaskResponse response = new DeleteTaskResponse();
		response.setErrorCode(ActionErrorCode.SUCCESS);
		return response;
	}

	@Override
	public Task getTaskByHttpPublish(String container, String publish, boolean details) {
		return this.customTaskRepository.getTaskByHttpPublish(container, publish, details);
	}

	@Override
	public Task updateTaskInfo(TaskChangedInfo info) {
		return customTaskRepository.updateTaskInfo(info);
	}

	@Override
	public <T extends Task> void fillTaskWithLiveProfile(Integer liveProfileId, T task) {
		LiveProfile liveProfile = this.liveProfileRepository.getLiveProfile(liveProfileId);

		String encodingOption = liveProfile.getEncodingOption();		
		Integer priority = liveProfile.getPriority();		
		task.setEncodingOption(encodingOption);
		task.setPriority(priority);
		task.setGpuId(liveProfile.getGpuId());
		
		PostProcess postProcess = liveProfile.getPostProcess();
		task.setPostProcess(postProcess);
		
		List<Input> inputs = liveProfile.getInputs();
		task.setInputs(inputs);
		
		List<StreamAssembly> streamAssemblys = liveProfile.getStreamAssemblys();
		task.setStreamAssemblys(streamAssemblys);
		
		List<LiveOutputGroup> outputGroups = liveProfile.getOutputGroups();
		task.setOutputGroups(outputGroups);
	}

	@Override
	public void updateTaskServer(Integer taskId, String serverId) {
		this.customTaskRepository.updateTaskServer(taskId, serverId);
	}

	@Override
	public Map<String, Long> getTasksCountGroupByServer(Integer groupId) {
		return this.customTaskRepository.getTasksCountGroupByServer(groupId);
	}

}
