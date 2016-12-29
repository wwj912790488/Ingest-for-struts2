package com.arcsoft.commander.service.task.impl;

import java.io.IOException;
import java.io.StringReader;
import java.util.*;
import java.util.Map.Entry;
import java.util.concurrent.*;
import java.util.concurrent.locks.ReentrantLock;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.commander.dao.system.SystemDao;
import com.arcsoft.commander.dao.task.CustomTaskRepository;
import com.arcsoft.commander.service.task.filemonitor.ResourceRenamer;
import com.arcsoft.util.LOG;
import com.arcsoft.web4transcoder.domain.input.*;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import com.arcsoft.arcvideo.common.utils.StringHelper;
import com.arcsoft.arcvideo.spring.event.EventReceiver;
import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.task.GetHttpGroupSettingAccessorRequest;
import com.arcsoft.commander.cluster.action.task.GetHttpGroupSettingAccessorResponse;
import com.arcsoft.commander.cluster.action.task.GetTaskProgressRequest;
import com.arcsoft.commander.cluster.action.task.GetTaskProgressResponse;
import com.arcsoft.commander.cluster.action.task.GetTaskThumbnailRequest;
import com.arcsoft.commander.cluster.action.task.GetTaskThumbnailResponse;
import com.arcsoft.commander.cluster.action.task.StartTaskRequest;
import com.arcsoft.commander.cluster.action.task.StartTaskResponse;
import com.arcsoft.commander.cluster.action.task.StopTaskRequest;
import com.arcsoft.commander.cluster.action.task.StopTaskResponse;
import com.arcsoft.commander.cluster.action.task.UpdateTaskInfoRequest;
import com.arcsoft.commander.dao.server.ServerDao;
import com.arcsoft.commander.dao.server.ServerGroupDao;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerCapabilities;
import com.arcsoft.commander.domain.task.CommanderTask;
import com.arcsoft.commander.domain.task.TaskChangedInfo;
import com.arcsoft.commander.domain.task.TaskHttpGroupSettingAccessorEntry;
import com.arcsoft.commander.domain.task.TaskReceiver;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.task.DispatchException;
import com.arcsoft.commander.service.remote.RemoteExecutorServiceSupport;
import com.arcsoft.commander.service.task.CustomTaskService;
import com.arcsoft.commander.service.task.TaskExecuteService;
import com.arcsoft.commander.service.task.dispatcher.Dispatcher;
import com.arcsoft.commander.service.task.event.TaskStatusChangedEvent;
import com.arcsoft.transcoder.TranscodingInfo;
import com.arcsoft.util.DateTimeHelper;
import com.arcsoft.web4transcoder.domain.Task;
import com.arcsoft.web4transcoder.service.SourceSignalSettingsService;
import com.arcsoft.web4transcoder.service.builder.TaskXmlBuilder;
import com.arcsoft.web4transcoder.type.TaskStatus;

/**
 * Implements task execute service.
 * 
 * @author fjli
 */
public class TaskExecuteServiceImpl extends RemoteExecutorServiceSupport implements TaskExecuteService, Dispatcher {
	
	private final Logger logger = LoggerFactory.getLogger(TaskExecuteServiceImpl.class);
	
	private ServerDao serverDao;
	private ServerGroupDao serverGroupDao;
	private Dispatcher liveGroupDispatcher;
	private Dispatcher defaultGroupDispatcher;
	private CustomTaskService taskService;
	private SourceSignalSettingsService sourceSignalSettingsService;
	private TaskXmlBuilder taskXmlBuilder;
	private ReentrantLock lock = new ReentrantLock();

	private ExecutorService fixedThreadPool = Executors.newFixedThreadPool(100);
	private ConcurrentHashMap<Integer,ResourceRenamer> resMonitor;

	private Map<String, TaskHttpGroupSettingAccessorEntry> httpGroupSettingAccessor = new TreeMap<String, TaskHttpGroupSettingAccessorEntry>();

	private static String AUTO_DELETE_DAYS = "task.auto-delete.days";
	private static String AUTO_DELETE_TIME = "task.auto-delete.time";
	private int MinutesRun = 23 * 60 + 30; // default is 23:30

	private SystemDao systemDao;
	private ScheduledFuture<?> autoDeleteTask;
	private ScheduledExecutorService autoDeleteSchedule;
	protected CustomTaskRepository customTaskRepository;

	public void init() {
		resMonitor = new ConcurrentHashMap<>();
		autoDeleteSchedule = Executors.newScheduledThreadPool(1);

		// Get the auto delete time from database, the format is HH:mm (23:30).
		String autoDeleteTime = systemDao.getString(AUTO_DELETE_TIME);
		if (autoDeleteTime != null) {
			Pattern p = Pattern.compile("^([0-1]?[0-9]|[2][0-3])\\:([0-5]?[0-9])$");
			Matcher m = p.matcher(autoDeleteTime);
			if (m.find()) {
				MinutesRun = Integer.parseInt(m.group(1)) * 60;
				MinutesRun += Integer.parseInt(m.group(2));
				logger.info("The task auto delete time is " + autoDeleteTime);
			} else {
				logger.warn("Invalid task delete time " + autoDeleteTime + ", the default value will be used.");
			}
		} else {
			logger.info("The task auto delete time has not set, the default value will be used.");
		}

		int deleteBeforeDays = StringHelper.toDefaultIfNull(systemDao.getInteger(AUTO_DELETE_DAYS), 0);
		setAutoDeleteBeforeDays(deleteBeforeDays);
	}

	protected void destroy() {

		if(resMonitor.size()>0){
			resMonitor.clear();
		}

		if(fixedThreadPool != null){
			fixedThreadPool.shutdown();
		}

		if (autoDeleteTask != null) {
			autoDeleteTask.cancel(false);
		}

		if (autoDeleteSchedule != null) {
			autoDeleteSchedule.shutdown();
		}
	}

	public void setSystemDao(SystemDao systemDao) {
		this.systemDao = systemDao;
	}

	public void setCustomTaskRepository(CustomTaskRepository customTaskRepository) {
		this.customTaskRepository = customTaskRepository;
	}

	public void setServerDao(ServerDao serverDao) {
		this.serverDao = serverDao;
	}

	public void setServerGroupDao(ServerGroupDao serverGroupDao) {
		this.serverGroupDao = serverGroupDao;
	}

	public void setLiveGroupDispatcher(Dispatcher liveGroupDispatcher) {
		this.liveGroupDispatcher = liveGroupDispatcher;
	}

	public void setDefaultGroupDispatcher(Dispatcher defaultGroupDispatcher) {
		this.defaultGroupDispatcher = defaultGroupDispatcher;
	}
	
	public void setTaskService(CustomTaskService taskService) {
		this.taskService = taskService;
	}

	public void setSourceSignalSettingsService(SourceSignalSettingsService sourceSignalSettingsService) {
		this.sourceSignalSettingsService = sourceSignalSettingsService;
	}
	
	public void setTaskXmlBuilder(TaskXmlBuilder taskXmlBuilder) {
		this.taskXmlBuilder = taskXmlBuilder;
	}

	@Override
	public void dispatch(Task task, TaskReceiver receiver) throws DispatchException {
		Server agent = (Server) receiver;
		if (agent.isBackup() || !agent.isAlive() || agent.getState() != Server.STATE_OK) {
			throw new ServerNotAvailableException(agent);
		}
		StartTaskRequest request = new StartTaskRequest();
		request.setIds(Arrays.asList(task.getId()));
		request.setDatas(Arrays.asList(convertToTaskXml(task)));
		StartTaskResponse response = (StartTaskResponse) remoteExecutorService.remoteExecute(request, agent);
		if (!response.isSuccess() && response.getErrorCode() != ActionErrorCode.TASK_ALREADY_RUNNING) {
			taskService.updateTaskState(task.getId(), TaskStatus.ERROR);
			throw new RemoteException(agent, response.getErrorCode());
		}
	}

	@Override
	public void startTask(Integer taskId) throws ServerNotAvailableException, RemoteException, DispatchException {
		try{
			CommanderTask task = (CommanderTask) this.taskService.getTask(taskId, true);
			if(!task.getStatus().equals(TaskStatus.RUNNING)){
				if(task != null && task.getId() > 0){
					if(task.getType() == 1){ //1+1 live group, just get group info
						this.liveGroupDispatcher.dispatch(task, this.serverGroupDao.getGroup(task.getGroupId()));
					}else{ //value 0 is M+N get server info
						if (task.getCurServerId() != null) {
							this.defaultGroupDispatcher.dispatch(task, this.serverDao.getServer(task.getCurServerId()));
						} else {
							List<Server> serverList = this.serverDao.getServersInGroup(task.getGroupId());
							Server selectedServer = null;
							Integer minWeight = 10000;
							lock.lock();
							try {
								Map<String, Long> countMap = taskService.getTasksCountGroupByServer(task.getGroupId());
								for (Server server : serverList) {
									if (!server.isBackup() && server.isAlive() && server.getState() == Server.STATE_OK) {
										ServerCapabilities caps = server.getCapabilities();
										Long currentCount = countMap.get(server.getId());
										if (caps.getMaxTasks() <= 0) {
											continue;
										} else if (currentCount == null || currentCount == 0) {
											selectedServer = server;
											break;
										} else if (currentCount < caps.getMaxTasks()) {
											long wight1 = currentCount * 10000 / caps.getMaxTasks();
											if (wight1 < minWeight) {
												selectedServer = server;
											}
										}
									}
								}
								if (selectedServer == null) {
									throw new DispatchException("No server avaliable.");
								} else {
									taskService.updateTaskServer(task.getId(), selectedServer.getId());
								}
							} finally {
								lock.unlock();
							}
							try {
								this.dispatch(task, selectedServer);
							} catch (Exception e) {
								taskService.updateTaskServer(task.getId(), null);
								throw e;
							}
						}
					}
				}else{
					String msg = String.format("Can't get task(id=%d) info", taskId);
					logger.error(msg);
					throw new DispatchException(msg);
				}
			}
			if(task!=null &&task.getStreamAssemblys().size()>0){
				if(task.getStreamAssemblys().get(0).getVideoDescription().getImageGrabbings().size()>0&&
						task.getStreamAssemblys().get(0).getVideoDescription().getImageGrabbings().get(0).getTargetPath()!=null) {
					String targetname = task.getStreamAssemblys().get(0).getVideoDescription().getImageGrabbings().get(0).getTargetName();
					Integer maxCount = task.getStreamAssemblys().get(0).getVideoDescription().getImageGrabbings().get(0).getMaxCount();
					ResourceRenamer resourceRenamer = new ResourceRenamer(task.getStreamAssemblys().get(0).getVideoDescription().getImageGrabbings().get(0).getTargetPath(),targetname,maxCount);
					resourceRenamer.mkDir();
					resMonitor.putIfAbsent(task.getId(), resourceRenamer);
					fixedThreadPool.execute(resourceRenamer);
				}
			}
		}catch(Exception e){
			logger.error(e.getMessage(),e);
		}
	}

	@Override
	public void stopTask(Integer taskId) throws ServerNotAvailableException, RemoteException {

		try{
			resMonitor.remove(taskId).stop();
		}catch(Exception e){
			String msg = String.format("resMonitor remove task(id=%d) failed", taskId);
			logger.error(msg);
		}

		CommanderTask task = (CommanderTask) this.taskService.getTask(taskId, true);
		//just stop running and waiting task
		if(task.getStatus().equals(TaskStatus.RUNNING) || task.getStatus().equals(TaskStatus.WAITING)){
			Server agent = getTaskServer(task);
			//check currently server status
			if(agent != null && !agent.isBackup() && agent.isAlive()){
				StopTaskRequest request = new StopTaskRequest();
				request.setIds(Arrays.asList(taskId));
				StopTaskResponse response = (StopTaskResponse) remoteExecutorService.remoteExecute(request, agent);
				if (!response.isSuccess()){
					throw new RemoteException(agent);
				}
				//force update task status to cancelled
				taskService.updateTaskState(task.getId(), TaskStatus.CANCELLED);
			}else{
				//set state to error when agent not exists
				taskService.updateTaskState(task.getId(), TaskStatus.ERROR);
			}
		}
	}

	@Override
	public void stopTasks(List<? extends Task> tasks) throws ServerNotAvailableException, RemoteException {
		for (Task tmpTask : tasks) {
			CommanderTask task = (CommanderTask) tmpTask;
			Server agent = getTaskServer(task);
			if (agent != null) {
				StopTaskRequest request = new StopTaskRequest();
				request.setIds(Arrays.asList(task.getId()));
				try {
					remoteExecutorService.remoteExecute(request, agent);
				} catch (Exception e) {
					logger.error("stop task(id=" + task.getId() + ") failed.", e);
				}
			}
		}
	}

	@Override
	public Document getTaskProgress(Integer taskId) throws ServerNotAvailableException, RemoteException {
		// Get the task object.
		Task taskObject = this.taskService.getTask(taskId, true);
		if (!(taskObject instanceof CommanderTask))
			return null;
		CommanderTask task = (CommanderTask) taskObject;
		Document doc = null;
		Server agent = getTaskServer(task);

		// Get the task progress from agent.
		if (task.getStatus().equals(TaskStatus.RUNNING) && agent != null && !agent.isBackup() && agent.isAlive()) {
			GetTaskProgressRequest request = new GetTaskProgressRequest();
			request.setId(taskId);
			GetTaskProgressResponse response = (GetTaskProgressResponse) remoteExecute(request, agent);
			if (!response.isSuccess())
				throw new RemoteException(agent);
			if (response != null && !StringUtils.isBlank(response.getXml()))
				doc = this.convertToDocument(response.getXml());
		}

		// get progress base on task object
		if (doc == null)
			doc = this.generatorTranscodingInfo(task).toXmlDOM();

		// add server info
		if (doc != null && agent != null) {
			Element root = doc.getDocumentElement();
			Element e = doc.createElement("server");
			e.appendChild(doc.createTextNode(agent.getName() + "(" + agent.getIp() + ")"));
			root.appendChild(e);
		}
		return doc;
	}

	@Override
	public byte[] getTaskThumbnail(Integer taskId,int width) throws ServerNotAvailableException, RemoteException {
		CommanderTask task = (CommanderTask) this.taskService.getTask(taskId, true);
		byte[] data = null;
		if(task.getStatus().equals(TaskStatus.RUNNING)){
				Server agent = getTaskServer(task);
				//check currently server status
				if(agent != null && !agent.isBackup() && agent.isAlive()){
					GetTaskThumbnailRequest request = new GetTaskThumbnailRequest();
					request.setId(taskId);
					request.setWidth(width);
					GetTaskThumbnailResponse response = (GetTaskThumbnailResponse) this.remoteExecutorService.remoteExecute(request, agent);
					if(!response.isSuccess()){
						throw new RemoteException(agent);
					}
					data = response.getData();
				}
		}
		return data;
	}

	private String convertToTaskXml(Task task) {
		List<Input> inputs = task.getInputs();
		for (Input in : inputs) {
			InputBody body = in.getBody();
			if (body instanceof NetworkInput) {
				NetworkInput ni = (NetworkInput) body;
				ni.setSwitchCondition(sourceSignalSettingsService.getSettings());
			}else if (body instanceof SdiDeviceInput) {
				SdiDeviceInput sdi = (SdiDeviceInput) body;
				sdi.setSwitchCondition(sourceSignalSettingsService.getSettings());
			} else if (body instanceof AsiDeviceInput) {
				AsiDeviceInput asi = (AsiDeviceInput) body;
				asi.setSwitchCondition(sourceSignalSettingsService.getSettings());
			}
		}
		String xml = taskXmlBuilder.buildkXml(task);
		if (StringHelper.isNotEmpty(task.getUserData())) {
			xml = xml.replaceFirst("(<task[^>]*>)", "$1\r\n<extension>" + task.getUserData() + "</extension>");
		}
		return xml;
	}

	private Server getTaskServer(CommanderTask task) {
		Server agent = null;
		if (task.getType() == 1) {
			List<Server> servers = serverDao.getServersInGroup(task.getGroupId());
			for (Server server : servers) {
				if (!server.isBackup())
					agent = server;
			}
		} else if (!StringUtils.isBlank(task.getCurServerId())) {
			agent = this.serverDao.getServer(task.getCurServerId());
		}
		return agent;
	}

	/**
	 * convert xml string to {@link Document}.
	 * 
	 * @param xml
	 * @return {@link Document} or null if convert failed.
	 */
	private Document convertToDocument(String xml){
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		DocumentBuilder builder = null;
		Document doc = null;
		InputSource source = null;
		StringReader reader = null;
		try {
			builder = factory.newDocumentBuilder();
			reader = new StringReader(xml);
			source = new InputSource(reader);
			doc = builder.parse(source);
		} catch (ParserConfigurationException | SAXException | IOException e) {
			logger.error("Convert task progress xml failed.", e);
		}
		return doc;
	}
	
	/**
	 * Generator progress info from task object
	 * 
	 * @param task
	 * @return {@link TranscodingInfo}
	 */
	private TranscodingInfo generatorTranscodingInfo(Task task){
		TranscodingInfo info = new TranscodingInfo(task.getId());
		info.setStatus(task.getStatus());
		info.setStartAt(task.getStartedAt() == null ? "" : DateTimeHelper.format(task.getStartedAt()));
		info.setCompleteAt(task.getStartedAt() == null ? "" : DateTimeHelper.format(task.getCompletedAt()));
		return info;
	}

	private boolean isServerAvailable(Server agent) {
		return agent != null && agent.isAlive() && !agent.isBackup() && agent.getState() == Server.STATE_OK;
	}

	private boolean isTaskRunning(CommanderTask task) {
		switch (task.getStatus()) {
		case RUNNING:
		case WAITING:
			return true;
		default:
			return false;
		}
	}

	@Override
    public TaskHttpGroupSettingAccessorEntry getTaskHttpGroupSettingAccessor(String container, String target) {
		logger.info("getHttpGroupSettingAccessor-------- container=" + container + " target=" + target);

		// find entry in map
		TaskHttpGroupSettingAccessorEntry entry = httpGroupSettingAccessor.get(container + target);

		logger.info("getHttpGroupSettingAccessor 1");
		// find the task
		CommanderTask task = (CommanderTask) taskService.getTaskByHttpPublish(container, target, false);

		logger.info("getHttpGroupSettingAccessor 2");
		// check task is exist or not
		if (task == null) {
			logger.info("getHttpGroupSettingAccessor: find task failed");
			if (entry != null)
				httpGroupSettingAccessor.remove(container + target);
			return null;
		}

		logger.info("getHttpGroupSettingAccessor 3");
		// check task status
		if (!isTaskRunning(task)) {
			logger.info("getHttpGroupSettingAccessor: task is not running");
			if (entry != null)
				httpGroupSettingAccessor.remove(container + target);
			return null;
		}

		logger.info("getHttpGroupSettingAccessor 4");
		// check agent status
		Server agent = getTaskServer(task);
		if (!isServerAvailable(agent)) {
			logger.info("getHttpGroupSettingAccessor: server is backup or not alive");
			if (entry != null)
				httpGroupSettingAccessor.remove(container + target);
			return null;
		}

		logger.info("getHttpGroupSettingAccessor 5");
		// if the cache entry is available, use it.
		if (entry != null) {
			logger.info("getHttpGroupSettingAccessor: find task in map!");
			// return entry;
			// in 1+1 group， tasks are always running on main and backup server, and status CANCELLED would not trigger
			// so check the task whether on same server by ip
			if (entry.getTaskId().equals(task.getId()) && entry.getServerIp().equals(agent.getIp())) {
				return entry;
			} else {
				logger.info("server is not alive or server is backup or task status is not running, remove from map and retrieve from remote");
				httpGroupSettingAccessor.remove(container + target);
			}
		}

		logger.info("getHttpGroupSettingAccessor 6");
    	// get entry from remote
		GetHttpGroupSettingAccessorResponse response = (GetHttpGroupSettingAccessorResponse) remoteExecutorService
				.remoteExecute(new GetHttpGroupSettingAccessorRequest(container, target), agent);
		if (!response.isSuccess()) {
			logger.info("getHttpGroupSettingAccessor from agent failed");
			throw new RemoteException(agent);
		}
		logger.info("getHttpGroupSettingAccessor from agent: " + 
				"taskId=" + task.getId() + 
				",ip=" + response.getIp() + 
				",port=" + response.getPort() + 
				",container=" + container + 
				",target=" + target + 
				",serverIp=" + agent.getIp()); 
		entry = new TaskHttpGroupSettingAccessorEntry();
		entry.setTaskId(task.getId());
		entry.setIp(response.getIp());
		entry.setPort(response.getPort());
		entry.setContainer(container);
		entry.setTarget(target);
		entry.setServerIp(agent.getIp());
		httpGroupSettingAccessor.put(container + target, entry);
    	return entry;    	
    }

	@EventReceiver(TaskStatusChangedEvent.class)
	public void onTaskStatusChanged(TaskStatusChangedEvent event) {
		Task task = event.getTask();
		TaskStatus status = event.getStatus();
		logger.info("onTaskStatusChanged, task=" + task.getId() + " status=" + status.getKey());
		if (TaskStatus.COMPLETED.compareTo(status) == 0 ||
			TaskStatus.ERROR.compareTo(status) == 0 ||
			TaskStatus.CANCELLED.compareTo(status) == 0) {

			Integer id = task.getId();
			Iterator<Entry<String, TaskHttpGroupSettingAccessorEntry>> iter = httpGroupSettingAccessor.entrySet().iterator(); 
			while (iter.hasNext()) { 
			    Map.Entry<String, TaskHttpGroupSettingAccessorEntry> entry = (Map.Entry<String, TaskHttpGroupSettingAccessorEntry>)iter.next(); 
			    TaskHttpGroupSettingAccessorEntry val = entry.getValue(); 
			    if (0 == id.compareTo(val.getTaskId())) {
	    			logger.info("onTaskStatusChanged: delete httpGroupSettingAccessor entry id = " + id);
			    	iter.remove();
			    }
			}
		} 
	}

	@Override
	public void updateTaskInfo(TaskChangedInfo info) {
		if (info == null || info.getTaskId() == null) {
			throw new IllegalArgumentException();
		}
		CommanderTask task = (CommanderTask) taskService.updateTaskInfo(info);
		if (task != null && task.getId() > 0) {
			switch (task.getStatus()) {
			case CANCELLED:
			case PENDING:
				// do nothing.
				break;
			default:
				// notify agent for task change.
				Server agent = getTaskServer(task);
				if (agent != null) {
					UpdateTaskInfoRequest request = new UpdateTaskInfoRequest();
					request.setChangedInfo(info);
					info.setTaskXml(convertToTaskXml(task));
					remoteExecute(request, agent);
				}
				break;
			}
		}
	}

	@Override
	public int getAutoDeleteBeforeDays() {
		return StringHelper.toDefaultIfNull(systemDao.getInteger(AUTO_DELETE_DAYS), 0);
	}

	@Override
	public void setAutoDeleteBeforeDays(int deleteBeforeDays) {
		systemDao.setInteger(AUTO_DELETE_DAYS, deleteBeforeDays);

		if (deleteBeforeDays > 0) {
			// add the schedule task to delete history records
			try {
				// 23:30:00
				Calendar with = Calendar.getInstance();
				with.setTime(new Date());
				int hour = with.get(Calendar.HOUR_OF_DAY);
				int Minutes = with.get(Calendar.MINUTE);

				int MinutesPassed = hour * 60 + Minutes;
				int OneDayMinutes = 24 * 60;
				long DelayInMinutes = MinutesPassed <= MinutesRun ? MinutesRun - MinutesPassed : OneDayMinutes - (MinutesPassed - MinutesRun);

				if (autoDeleteTask != null)
					autoDeleteTask.cancel(false);
				autoDeleteTask = autoDeleteSchedule.scheduleAtFixedRate(new DeleteHistoryRecordsTask(customTaskRepository, deleteBeforeDays), DelayInMinutes, OneDayMinutes, TimeUnit.MINUTES);
			} catch (Exception e) {
				e.getStackTrace();
			}
		}
		else {
			// remove the schedule task to delete history records
			if (autoDeleteTask != null) {
				autoDeleteTask.cancel(false);
				autoDeleteTask = null;
			}
		}
	}

	class DeleteHistoryRecordsTask implements Runnable{
		private static final long TIME_DAY_MILLISECONDS = 86400000;
		private CustomTaskRepository customTaskRepository;
		private int autoDeleteBeforeDays;

		DeleteHistoryRecordsTask(CustomTaskRepository customTaskRepository, int autoDeleteBeforeDays) {
			this.customTaskRepository = customTaskRepository;
			this.autoDeleteBeforeDays = autoDeleteBeforeDays;
		}

		public void run() {
			Date now = new Date();
			Date dtEnd = new Date(now.getTime() - autoDeleteBeforeDays * TIME_DAY_MILLISECONDS);
			//Condition cond = Condition.lt("createdAt", dtEnd);
			Condition cond = Condition.and(Condition.lt("completed_at", dtEnd),
					Condition.eq("state","completed"));
			//Type  schedule not fulltime/epg
			try {
				customTaskRepository.deleteAll(cond);
			} catch (Exception e) {
			}
		}
	}
}
