package com.arcsoft.commander.agent.service.agent.impl;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintStream;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.TreeMap;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import java.util.concurrent.locks.ReentrantLock;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.log4j.Logger;

import com.arcsoft.arcvideo.common.net.NetworkHelper;
import com.arcsoft.arcvideo.common.utils.StringHelper;
import com.arcsoft.arcvideo.gputool.OverallGpuChecker;
import com.arcsoft.cluster.app.ActionException;
import com.arcsoft.cluster.app.ErrorCode;
import com.arcsoft.cluster.app.Request;
import com.arcsoft.cluster.app.RequestHandler;
import com.arcsoft.cluster.app.Response;
import com.arcsoft.cluster.net.NetworkStateListener;
import com.arcsoft.cluster.net.NetworkStateMonitor;
import com.arcsoft.cluster.node.RemoteNode;
import com.arcsoft.commander.agent.MessageHandler;
import com.arcsoft.commander.agent.config.AppConfig;
import com.arcsoft.commander.agent.service.agent.AgentConfiguration;
import com.arcsoft.commander.agent.service.agent.AgentServer;
import com.arcsoft.commander.agent.service.agent.AgentService;
import com.arcsoft.commander.agent.service.agent.LiveAgent;
import com.arcsoft.commander.agent.service.license.LicenseChangedListener;
import com.arcsoft.commander.agent.service.remote.RemoteExecutorService;
import com.arcsoft.commander.agent.service.settings.EthSettingsListener;
import com.arcsoft.commander.agent.service.settings.NetworkConfiguration;
import com.arcsoft.commander.agent.service.task.TaskManager;
import com.arcsoft.commander.cluster.ServerRole;
import com.arcsoft.commander.cluster.ServerType;
import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.ActionHandler;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseResponse;
import com.arcsoft.commander.cluster.action.server.AddAgentRequest;
import com.arcsoft.commander.cluster.action.server.AddAgentResponse;
import com.arcsoft.commander.cluster.action.server.CapabilitiesChangedRequest;
import com.arcsoft.commander.cluster.action.server.ErrorReportRequest;
import com.arcsoft.commander.cluster.action.server.GetAgentDescRequest;
import com.arcsoft.commander.cluster.action.server.GetAgentDescResponse;
import com.arcsoft.commander.cluster.action.server.RemoveAgentRequest;
import com.arcsoft.commander.cluster.action.server.RemoveAgentResponse;
import com.arcsoft.commander.cluster.action.server.StateReportRequest;
import com.arcsoft.commander.dao.settings.EthType;
import com.arcsoft.commander.domain.server.AgentDesc;
import com.arcsoft.commander.domain.server.AgentVersion;
import com.arcsoft.commander.domain.server.ServerCapabilities;
import com.arcsoft.commander.domain.server.ServerStateInfo;
import com.arcsoft.commons.utils.SystemHelper;
import com.arcsoft.transcoder.ITranscodingMessageListener;
import com.arcsoft.transcoder.ITranscodingNotifier;
import com.arcsoft.web4transcoder.service.license.LicenseService;

/**
 * This service maintains the base agent life cycle and the request handlers.
 * 
 * @author fjli
 */
public abstract class BaseAgentService implements AgentService, ActionHandler, RemoteExecutorService, NetworkStateListener, EthSettingsListener, LicenseChangedListener, ITranscodingMessageListener, MessageHandler {

	protected static final String DEFAULT_CLUSTER_IP = "239.8.8.1";
	protected static final int DEFAULT_CLUSTER_PORT = 8901;
	protected static final int DEFAULT_SERVER_PORT = 5000;
	protected static final int DEFAULT_TIME_TO_LIVE = 1;
	protected static final int GPU_TESTING_ERRORCODE = 0x80051008;

	private Logger log = Logger.getLogger(BaseAgentService.class);
	private List<ActionHandler> actionHandlers;
	protected TaskManager taskManager;
	private LicenseService licenseService;
	protected AgentServer agent;
	protected ExecutorService executor;
	private NetworkStateMonitor networkMonitor = new NetworkStateMonitor();
	private Map<String, Boolean> eths = new ConcurrentHashMap<>();
	private List<String> inputEths = new ArrayList<>();
	private List<String> outputEths = new ArrayList<>();
	private String clusterEth;
	private OverallGpuChecker gpuChecker;
	private boolean gpuTestingOnStartup;
	private boolean gpuTestingEnabled = false;
	private long gpuTestingTimeout;
	private boolean gpuState = true;
	private boolean gpuTestingAll = false;
	private ReentrantLock gpuTestLock = new ReentrantLock();
	private List<Integer> gpuTestingList = new ArrayList<>();
	private Map<Integer, List<Integer>> coreTaskMap = new HashMap<>();

	public BaseAgentService() {
		networkMonitor.addListener(this);
	}

	public void setActionHandlers(List<ActionHandler> actionHandlers) {
		this.actionHandlers = actionHandlers;
	}

	public void setTaskManager(TaskManager taskManager) {
		this.taskManager = taskManager;
	}

	public void setLicenseService(LicenseService licenseService) {
		this.licenseService = licenseService;
	}

	public void setGpuChecker(OverallGpuChecker gpuChecker) {
		this.gpuChecker = gpuChecker;
	}

	public void setGpuTestingOnStartup(boolean gpuTestingOnStartup) {
		this.gpuTestingOnStartup = gpuTestingOnStartup;
	}

	public void setGpuTestingEnabled(boolean gpuTestingEnabled) {
		this.gpuTestingEnabled = gpuTestingEnabled;
	}

	public void setGpuTestingTimeout(long gpuTestingTimeout) {
		this.gpuTestingTimeout = gpuTestingTimeout;
	}

	/**
	 * Load live agent configuration.
	 * 
	 * @throws IOException if load configuration failed.
	 */
	protected void loadAgentConfig(AgentConfiguration config) throws IOException {
		// set cluster IP
		String clusterIp = AppConfig.getString("cluster.ip", DEFAULT_CLUSTER_IP);
		config.setClusterIp(clusterIp);

		// set cluster port
		int port = AppConfig.getInt("cluster.port", DEFAULT_CLUSTER_PORT);
		config.setClusterPort(port);

		// set cluster bind address.
		String bind = AppConfig.getString("cluster.bind");
		String ip = null;
		if (StringHelper.isBlank(bind)) {
			log.warn("clusster.bind is not set, use local ip.");
			ip = NetworkHelper.getLocalIp();
		} else if (bind.matches("^(\\d{1,3}\\.){3}\\d{1,3}$")) {
			ip = bind;
		} else if (bind.matches("^(\\d{1,3}\\.){3}\\d{1,3}/\\d+$")) {
			ip = getMatchedIp(bind);
		} else {
			ip = NetworkHelper.getHostAddress(NetworkInterface.getByName(bind));
		}
		if (ip == null) {
			log.error("Cannot get bind address from " + bind);
			throw new IOException("Cannot get bind address from " + bind);
		}
		config.setBindAddr(ip);

		// set cluster ttl.
		int timeToLive = AppConfig.getInt("cluster.ttl", DEFAULT_TIME_TO_LIVE);
		config.setTimeToLive(timeToLive);

		// set server id
		String serverId = AppConfig.getString("server.id");
		if (serverId == null)
			serverId = SystemHelper.os.getSystemUUID();
		config.setServerId(serverId);

		// set server name
		String name = AppConfig.getString("server.name");
		if (name == null)
			name = SystemHelper.os.getHostName();
		config.setServerName(name);

		// set server port
		port = AppConfig.getInt("server.port", DEFAULT_SERVER_PORT);
		config.setServerPort(port);
	}

	private String getMatchedIp(String bind) {
		String[] addressAndMask = bind.split("/");
		int nMaskBits = Integer.parseInt(addressAndMask[1]);
		try {
			InetAddress requiredAddress = InetAddress.getByName(addressAndMask[0]);
			byte[] reqAddr = requiredAddress.getAddress();

			int oddBits = nMaskBits % 8;
			int nMaskBytes = nMaskBits / 8 + (oddBits == 0 ? 0 : 1);
			byte[] mask = new byte[nMaskBytes];
			Arrays.fill(mask, 0, oddBits == 0 ? mask.length : mask.length - 1, (byte) 0xFF);
			if (oddBits != 0) {
				int finalByte = (1 << oddBits) - 1;
				finalByte <<= 8 - oddBits;
				mask[mask.length - 1] = (byte) finalByte;
			}

			Enumeration<NetworkInterface> netifaces = NetworkInterface.getNetworkInterfaces();
			while (netifaces.hasMoreElements()) {
				NetworkInterface iface = netifaces.nextElement();
				Enumeration<InetAddress> addresses = iface.getInetAddresses();
				while (addresses.hasMoreElements()) {
					InetAddress address = addresses.nextElement();
					byte[] tmpAddr = address.getAddress();
					boolean match = true;
					for (int i = 0; i < mask.length; i++) {
						if ((tmpAddr[i] & mask[i]) != (reqAddr[i] & mask[i])) {
							match = false;
							break;
						}
					}
					if (match)
						return address.getHostAddress();
				}
			}
			log.error("cannot find any ip matches " + bind);
		} catch (Exception e) {
			log.error("get mtached ip failed.", e);
		}
		return null;
	}

	protected abstract AgentServer createAgent() throws IOException;

	/**
	 * Initialize live agent service.
	 * 
	 * @throws IOException if load configuration failed, or start agent failed.
	 */
	public void init() throws IOException {
		// load configuration and create agent.
		agent = createAgent();

		// get cluster network interface name
		monitorClusterEth();

		// register action handlers.
		registerActions(this);
		if (actionHandlers != null) {
			for (ActionHandler handler : actionHandlers)
				registerActions(handler);
		}

		// start agent.
		try {
			agent.start();
		} catch(IOException e) {
			log.error("Start agent failed.", e);
			agent.stop();
			throw e;
		}

		// create thread pool
		executor = Executors.newCachedThreadPool();

		// start network monitor
		int interval = AppConfig.getInt("network.monitor.interval", 1000);
		networkMonitor.setInterval(interval);
		networkMonitor.start();

		// check GPU state on start.
		if (gpuTestingOnStartup) {
			checkGpuStateAsync(null, null);
		}
	}

	/**
	 * Destroy agent service.
	 */
	public void destroy() {
		// stop network monitor
		networkMonitor.stop();
		eths.clear();
		inputEths.clear();
		outputEths.clear();

		// stop agent.
		if (agent != null) {
			agent.stop();
			agent = null;
		}

		// stop all tasks.
		taskManager.stopAll();

		// shutdown thread pool.
		if (executor != null) {
			executor.shutdown();
			executor = null;
		}
	}

	@Override
	public AgentServer getAgent() {
		return agent;
	}

	/**
	 * Returns all live agent actions.
	 */
	@Override
	public int[] getActions() {
		return new int[] {
				Actions.GET_AGENT_DESC,
				Actions.ADD_AGENT,
				Actions.REMOVE_AGENT
			};
	}

	/**
	 * Receive agent relation requests, and dispatch request to process methods.
	 * 
	 * @param request - the received request
	 * @return returns the response
	 * @throws ActionException if process request failed.
	 */
	@Override
	public Response execute(Request request) throws ActionException {
		if (request instanceof GetAgentDescRequest) {
			return getAgentDesc();
		} else if (request instanceof AddAgentRequest) {
			return addAgent((AddAgentRequest) request);
		} else if (request instanceof RemoveAgentRequest) {
			return removeAgent();
		}
		return null;
	}

	/**
	 * Send the specified request to the commander this agent added to.
	 * 
	 * @param request - the specified request
	 * @return returns the response
	 * @throws ActionException if process request failed.
	 */
	@Override
	public Response remoteExecute(Request request) throws ActionException {
		RemoteNode target = agent.getCommander();
		if (target == null)
			throw new ActionException(ErrorCode.SEND_REQUEST_FAILED, "Agent has not added to commander yet.");
		return agent.execute(request, target);
	}

	/**
	 * Register all actions with the specified handler.
	 * 
	 * @param handler - the specified handler
	 */
	private void registerActions(final ActionHandler handler) {
		int[] actions = handler.getActions();
		if (actions != null && actions.length > 0) {
			RequestHandler proxy = new RequestHandler() {
				@Override
				public Response execute(Request request) throws ActionException {
					return actionInterceptor(request, handler);
				}
			};
			for (int action : actions) {
				agent.addHandler(action, proxy);
			}
		}
	}

	/**
	 * Action intercepter, all actions will pass through here.
	 * 
	 * @param request - the request to be processed
	 */
	protected Response actionInterceptor(Request request, ActionHandler handler) throws ActionException {
		log.debug("Request received: " + request.getClass().getName());
		return handler.execute(request);
	}

	/**
	 * Get agent description.
	 * 
	 * @return returns response describing this agent.
	 */
	private GetAgentDescResponse getAgentDesc() {
		GetAgentDescResponse response = new GetAgentDescResponse();
		response.setErrorCode(ActionErrorCode.SUCCESS);
		AgentDesc desc = new AgentDesc();
		desc.setNetworkState(getNetworkState());
		desc.setGpuState(gpuTestingEnabled ? gpuState : null);
		desc.setCapabilities(getCapabilites());
		desc.setVersion(getVersions());
		response.setAgentDesc(desc);
		return response;
	}

	/**
	 * Add agent to the specified commander.
	 * 
	 * @param request - the add agent request
	 * @return returns response indicating the action is success or not.
	 */
	protected AddAgentResponse addAgent(AddAgentRequest request) {
		log.info("add agent to commander " + request.getCommander().getIp());
		boolean isFirstAdd = agent.getCommander() == null;
		RemoteNode commander = agent.createRemoteNode(request.getCommander());
		agent.setCommander(commander);
		agent.setServerType(request.getAgentType());

		onAddToCommander(isFirstAdd);

		AddAgentResponse response = new AddAgentResponse();
		response.setErrorCode(ActionErrorCode.SUCCESS);
		return response;
	}

	protected void onAddToCommander(boolean isFirstAdd) {
		// Report agent state.
		reportAgentState();
		// Report agent capabilities.
		reportCapabilitiesChanged();
	}

	/**
	 * Remove agent from the commander.
	 * 
	 * @param request - the remove request.
	 * @return returns response indicating the action is success or not.
	 */
	protected RemoveAgentResponse removeAgent() {
		log.info("remove agent from commander.");
		onRemoveFromCommander();
		agent.resetAll();
		RemoveAgentResponse response = new RemoveAgentResponse();
		response.setErrorCode(ActionErrorCode.SUCCESS);
		return response;
	}

	protected void onRemoveFromCommander() {
	}

	/**
	 * Async notify stop all tasks.
	 */
	protected void noitfyStopAllTasksAsync() {
		executor.execute(new Runnable() {
			@Override
			public void run() {
				taskManager.stopAll();
			}
		});
	}

	@Override
	public void ethStateChanged(String eth, boolean active) {
		boolean inputError = false;
		boolean outputError = false;
		boolean haError = false;
		log.info("eth state changed, eth: " + eth + ", active: " + active);

		// update network states map.
		synchronized (eths) {
			eths.put(eth, active);
			if (!active) {
				if (inputEths.contains(eth))
					inputError = isAllNetworkInactive(inputEths);
				if (outputEths.contains(eth))
					outputError = isAllNetworkInactive(outputEths);
				if (clusterEth != null && clusterEth.equals(eth))
					haError = true;
			}
		}

		// if the network is cluster network, don't send the events.
		if (!haError) {
			// Report network error.
			if (inputError || outputError)
				reportError(ActionErrorCode.NETWORK_ERROR_DETECTED);
	
			// If input or output network state changed, report the agent state.
			if (inputEths.contains(eth) || outputEths.contains(eth)) {
				reportAgentState();
			}
		}

		// process network error.
		processNetworkError(inputError, outputError, haError);
	}

	/**
	 * Process network error.
	 * 
	 * @param inputError - if true, indicate all input networks are inactive
	 * @param outputError - if true, indicate all output networks are inactive
	 * @param haError - if true, indicate the cluster network is inactive
	 */
	protected void processNetworkError(boolean inputError, boolean outputError, boolean haError) {
	}

	/**
	 * Test whether all the specified network interfaces are inactive.
	 * 
	 * @param networks - the specified network interfaces
	 * @return returns true if all network interfaces are inactive.
	 */
	private boolean isAllNetworkInactive(List<String> networks) {
		for (String eth : networks) {
			if (eths.get(eth))
				return false;
		}
		return true;
	}

	/**
	 * Test the network has error.
	 */
	protected boolean hasNetworkError() {
		if (!inputEths.isEmpty() && isAllNetworkInactive(inputEths))
			return true;
		if (!outputEths.isEmpty() && isAllNetworkInactive(outputEths))
			return true;
		return false;
	}

	@Override
	public void ethSettingsChanged(NetworkConfiguration settings) {
		List<String> inEths = settings.getEthsByType(EthType.ALL_INPUT);
		List<String> outEths = settings.getEthsByType(EthType.ALL_OUTPUT);
		List<String> newEths = settings.getEthsByType(EthType.ALL_INPUT | EthType.ALL_OUTPUT);
		boolean autoNotifyState = false;
		synchronized (eths) {
			inputEths.clear();
			inputEths.addAll(inEths);

			outputEths.clear();
			outputEths.addAll(outEths);

			monitorClusterEth();

			for (String s : eths.keySet()) {
				if (!newEths.contains(s)) {
					// don't stop cluster network monitor
					if (!s.equals(clusterEth)) {
						eths.remove(s);
						networkMonitor.stopMonitor(s);
					}
				}
			}
			newEths.removeAll(eths.keySet());
			for (String s : newEths) {
				eths.put(s, true);
				networkMonitor.startMonitor(s);
				autoNotifyState = true;
			}
		}
		if (!autoNotifyState && networkMonitor.isRunning())
			reportAgentState();
	}

	/**
	 * Monitor cluster network interface.
	 */
	private void monitorClusterEth() {
		if (agent == null)
			return;
		try {
			String bindAddr = agent.getCluster().getDescription().getBindAddress();
			NetworkInterface netif = NetworkHelper.getInterfaceByHostAddr(bindAddr);
			if (netif != null) {
				String eth = netif.getName();
				if (clusterEth != null) {
					if (!clusterEth.equals(eth)) {
						if (!inputEths.contains(clusterEth) && !outputEths.contains(clusterEth)) {
							networkMonitor.stopMonitor(clusterEth);
							eths.remove(clusterEth);
						}
					} else {
						return;
					}
				}
				clusterEth = eth;
				networkMonitor.startMonitor(clusterEth);
				log.info("cluster network interface changed: " + eth);
			}
		} catch(Exception e) {
			log.error("monitor cluster eth error.", e);
		}
	}

	/**
	 * Get current network states.
	 */
	private Map<String, Boolean> getNetworkState() {
		Map<String, Boolean> networkMap = new HashMap<>();
		if (!inputEths.isEmpty())
			networkMap.put("input", !isAllNetworkInactive(inputEths));
		if (!outputEths.isEmpty())
			networkMap.put("output", !isAllNetworkInactive(outputEths));
		log.debug("get network state: " + networkMap);
		return networkMap;
	}

	/**
	 * Notify error event to commander.
	 */
	protected void reportError(final int errorCode) {
		executor.execute(new Runnable() {
			@Override
			public void run() {
				try {
					log.info("start send error report, errorCode=" + String.format("0x%08x", errorCode));
					ErrorReportRequest request = new ErrorReportRequest();
					request.setId(agent.getNode().getDescription().getId());
					request.setErrorCode(errorCode);
					BaseResponse response = (BaseResponse) remoteExecute(request);
					log.info("send error report end, ret=" + response.getErrorCode());
				} catch (ActionException e) {
					log.error("send error report failed.", e);
				}
			}
		});
	}

	/**
	 * Report agent state to commander.
	 */
	protected void reportAgentState() {
		executor.execute(new Runnable() {
			@Override
			public void run() {
				try {
					log.info("start send state report.");
					StateReportRequest request = new StateReportRequest();
					request.setId(agent.getNode().getDescription().getId());
					ServerStateInfo stateInfo = new ServerStateInfo();
					stateInfo.setNetworkState(getNetworkState());
					stateInfo.setGpuState(gpuTestingEnabled ? gpuState : null);
					request.setStateInfo(stateInfo);
					BaseResponse response = (BaseResponse) remoteExecute(request);
					log.info("send state report end, ret=" + response.getErrorCode());
				} catch (ActionException e) {
					log.error("send state report failed.", e);
				}
			}
		});
	}

	/**
	 * Returns server capabilities.
	 */
	private ServerCapabilities getCapabilites() {
		ServerCapabilities caps = new ServerCapabilities();
		caps.setMaxTasks(Integer.decode(licenseService.getLimitation(LicenseService.THROUGHTPUT_TASK_COUNT)));
		caps.setMaxOutputGroups(Integer.decode(licenseService.getLimitation(LicenseService.THROUGHTPUT_1_IN_N_OUT)));
		caps.setMaxSDCount(Integer.decode(licenseService.getLimitation(LicenseService.THROUGHTPUT_SDOUTPUT_COUNT)));
		caps.setMaxHDCount(Integer.decode(licenseService.getLimitation(LicenseService.THROUGHTPUT_HDOUTPUT_COUNT)));
		return caps;
	}

	/**
	 * Report agent capabilities changed to commander.
	 */
	private void reportCapabilitiesChanged() {
		executor.execute(new Runnable() {
			@Override
			public void run() {
				try {
					log.info("start capabilites changed report.");
					CapabilitiesChangedRequest request = new CapabilitiesChangedRequest();
					request.setId(agent.getNode().getDescription().getId());
					request.setCapabilities(getCapabilites());
					BaseResponse response = (BaseResponse) remoteExecute(request);
					log.info("send capabilites report end, ret=" + response.getErrorCode());
				} catch (ActionException e) {
					log.error("send capabilites report failed.", e);
				}
			}
		});
	}

	@Override
	public void licenseChanged() {
		reportCapabilitiesChanged();
	}

	@Override
	public void fireTaskErrorMessage(ITranscodingNotifier transcodingNotifier, int level, int code, String msg) {
		if (gpuTestingEnabled && code == GPU_TESTING_ERRORCODE) {
			log.info("receive cuda error: " + msg);
			if (msg != null) {
				Pattern coreIdPattern = Pattern.compile("^.*deviceid\\s*=\\s*(\\d+).*$");
				Matcher matcher = coreIdPattern.matcher(msg);
				if (matcher.find()) {
					int coreId = Integer.decode(matcher.group(1));
					int taskId = transcodingNotifier.getTranscodingKey().getTaskId();
					checkGpuStateAsync(coreId, taskId);
				}
			}
		}
	}

	/**
	 * Async check gpu state.
	 */
	private void checkGpuStateAsync(final Integer coreId, final Integer taskId) {
		if (!gpuTestingEnabled) {
			log.info("The gpu testing is disabled.");
			return;
		}

		executor.execute(new Runnable() {
			@Override
			public void run() {
				checkGpuState(coreId, taskId);
			}
		});
	}

	private void checkGpuState(Integer coreId, Integer taskId) {
		try {
			gpuTestLock.lock();
			if (!gpuState) {
				log.info("The gpu state is error, so skip checking gpu core[" + coreId + "].");
				return;
			}

			// disable task auto restart.
			if (taskId != null) {
				taskManager.enableTaskAutoRestart(taskId, false);
				List<Integer> taskList;
				if (!coreTaskMap.containsKey(coreId)) {
					taskList = new ArrayList<>();
					coreTaskMap.put(coreId, taskList);
				} else {
					taskList = coreTaskMap.get(coreId);
				}
				taskList.add(taskId);
			}

			if (gpuTestingAll || gpuTestingList.contains(coreId)) {
				log.info("The gpu core[" + coreId + "] is in checking.");
				return;
			} else if (coreId == null) {
				gpuTestingAll = true;
			} else {
				gpuTestingList.add(coreId);
				log.info("Start checking gpu core [" + coreId + "]");
			}
		} finally {
			gpuTestLock.unlock();
		}

		Boolean newGpuState = null;
		try {
			log.info("gpu checker testing started: core[" + coreId + "].");
			if (coreId == null) {
				newGpuState = gpuChecker.testAllGpus(TimeUnit.SECONDS.toMillis(gpuTestingTimeout));
			} else {
				newGpuState = gpuChecker.getGpuChecker().testGpu(coreId, TimeUnit.SECONDS.toMillis(gpuTestingTimeout));
			}
			log.info("gpu checker testing stopped: core[" + coreId + "]=" + newGpuState);
		} catch (TimeoutException e) {
			newGpuState = false;
			log.error("gpu checker testing stopped by timeout: core[" + coreId + "]=" + newGpuState);
		} catch (Exception e) {
			// log error, and continue
			log.error("gpu checker testing failed: core[" + coreId + "].", e);
		}

		try {
			gpuTestLock.lock();
			/*
			 * Enable task auto start after checking on any case: because the cluster
			 * maybe has no backup server, so restart task may move this task to other
			 * normal CUDA core.
			 */
			List<Integer> taskList = coreTaskMap.get(coreId);
			if (taskList != null && !taskList.isEmpty()) {
				for (Integer id : taskList) {
					taskManager.enableTaskAutoRestart(id, true);
				}
			}
			if (newGpuState != null && !newGpuState) {
				// if gpuState is false, indicate the other thread already checking and has error.
				// so don't continue any more.
				if (!gpuState) {
					log.info("gpu state already set to error, skip checking result.");
					return;
				}
				// set gpu state to error
				gpuState = false;
			} else {
				return;
			}
		} finally {
			// any way, remove from list.
			if (coreId == null) {
				gpuTestingAll = false;
			} else {
				gpuTestingList.remove(coreId);
			}
			gpuTestLock.unlock();
		}

		// if GPU error occur, do the following logic.
		if (!gpuState) {
			reportAgentState();
			reportError(ActionErrorCode.GPU_ERROR_DETECTED);
			processGPUError();
		}
	}

	/**
	 * Process GPU error.
	 */
	protected void processGPUError() {
	}

	/**
	 * Get all versions.
	 */
	private AgentVersion getVersions() {
		AgentVersion version = new AgentVersion();
		version.setAgentVersion(getAgentVersion());
		version.setTranscoderVersion(getTranscoderVersion());
		return version;
	}

	/**
	 * Get agent version.
	 */
	private String getAgentVersion() {
		InputStream inStream = null;
		try {
			inStream = getClass().getResourceAsStream("/META-INF/maven/com.arcsoft/commander-agent/pom.properties");
			Properties p = new Properties();
			p.load(inStream);
			return p.getProperty("version");
		} catch (IOException e1) {
		} finally {
			if (inStream != null) {
				try {
					inStream.close();
				} catch (IOException e) {
				}
			}
		}
		return null;
	}

	/**
	 * Get transcoder version.
	 */
	private String getTranscoderVersion() {
		String key = com.arcsoft.web4transcoder.AppConfig.KEY_TRANSCODER_PATH;
		String path = com.arcsoft.web4transcoder.AppConfig.getProperty(key);
		File file = new File(new File(path).getParentFile(), "arcsoftversion.txt");
		BufferedReader reader = null;
		try {
			reader = new BufferedReader(new FileReader(file));
			String line;
			String verRegExp = "^.*((\\d+\\.){3}\\d+).*$";
			while ((line = reader.readLine()) != null) {
				if (line.matches(verRegExp))
					return line.replaceAll(verRegExp, "$1");
			}
		} catch (IOException e) {
		} finally {
			if (reader != null) {
				try {
					reader.close();
				} catch (IOException e) {
				}
			}
		}
		return null;
	}

	@Override
	public Map<String, String> getCommands() {
		Map<String, String> commandMap = new TreeMap<>();
		commandMap.put("agent version", "Get the agent version.");
		commandMap.put("agent node", "Print the agent node information.");
		commandMap.put("agent network", "Print the network information.");
		commandMap.put("agent capabilities", "List the agent capabilities.");
		commandMap.put("agent gpu state", "Print the GPU information.");
		commandMap.put("agent gpu reset", "Reset the GPU state.");
		commandMap.put("agent gpu enable/disalbe", "Enable/disable gpu checking.");
		commandMap.put("agent gpu test", "Run the GPU testing.");
		commandMap.put("agent all", "Print the all agent information.");
		return commandMap;
	}

	@Override
	public void processCommand(String[] args, PrintStream out) {
		if ("agent".equalsIgnoreCase(args[0])) {
			if ("version".equalsIgnoreCase(args[1])) {
				printVersion(out);
			} else if ("node".equalsIgnoreCase(args[1])) {
				printAgentNode(out);
			} else if ("network".equalsIgnoreCase(args[1])) {
				printNetwork(out);
			} else if ("gpu".equalsIgnoreCase(args[1])) {
				processGPUCommand(args[2], out);
			} else if ("capabilities".equalsIgnoreCase(args[1])) {
				printCapabilities(out);
			} else if ("all".equalsIgnoreCase(args[1])) {
				printVersion(out);
				printAgentNode(out);
				printCapabilities(out);
				printNetwork(out);
				printGpuState(out);
			}
		}
	}

	private void processGPUCommand(String cmd, PrintStream out) {
		if ("state".equalsIgnoreCase(cmd)) {
			printGpuState(out);
		} else if ("reset".equalsIgnoreCase(cmd)) {
			this.gpuState = true;
			reportAgentState();
			out.println("OKAY");
		} else if ("enable".equalsIgnoreCase(cmd)) {
			this.gpuTestingEnabled = true;
			out.println("OKAY");
		} else if ("disable".equalsIgnoreCase(cmd)) {
			this.gpuTestingEnabled = false;
			out.println("OKAY");
		} else if ("test".equalsIgnoreCase(cmd)) {
			if (gpuTestingEnabled) {
				if (!gpuTestingAll) {
					checkGpuStateAsync(null, null);
					out.println("OKAY");
				} else {
					out.println("GPU checking process is already running.");
				}
			} else {
				out.println("GPU checking is diabled.");
			}
		}
	}

	private void printVersion(PrintStream out) {
		out.println("agent: " + getAgentVersion());
		out.println("transcoder: " + getTranscoderVersion());
	}

	private void printNetwork(PrintStream out) {
		out.println("input\tall\t" + (!isAllNetworkInactive(inputEths)));
		for (String eth : inputEths) {
			out.println("input\t" + eth + "\t" + eths.get(eth));
		}
		out.println("output\tall\t" + (!isAllNetworkInactive(outputEths)));
		for (String eth : outputEths) {
			out.println("output\t" + eth + "\t" + eths.get(eth));
		}
		out.println("ha\t" + clusterEth + "\t" + eths.get(clusterEth));
	}

	private void printGpuState(PrintStream out) {
		out.println("enabled: " + gpuTestingEnabled);
		out.println("state: " + gpuState);
		try {
			out.println("count: " + gpuChecker.getGpuChecker().getGpuCount());
		} catch (Exception e) {
			out.println("count: UNKNOWN");
		}
	}

	private void printCapabilities(PrintStream out) {
		ServerCapabilities caps = getCapabilites();
		out.println("THROUGHTPUT_TASK_COUNT: " + caps.getMaxTasks());
		out.println("THROUGHTPUT_1_IN_N_OUT: " + caps.getMaxOutputGroups());
		out.println("THROUGHTPUT_SDOUTPUT_COUNT: " + caps.getMaxSDCount());
		out.println("THROUGHTPUT_HDOUTPUT_COUNT: " + caps.getMaxHDCount());
	}

	private void printAgentNode(PrintStream out) {
		out.println("cluster_ip: " + agent.getCluster().getDescription().getIp());
		out.println("cluster_port: " + agent.getCluster().getDescription().getPort());
		out.println("node_id: " + agent.getNode().getDescription().getId());
		out.println("node_ip: " + agent.getNode().getDescription().getIp());
		out.println("node_port: " + agent.getNode().getDescription().getPort());
		switch(agent.getRole()) {
		case ServerRole.ROLE_MASTER:
			out.println("node_role: MASTER");
			break;
		case ServerRole.ROLE_SLAVE:
			out.println("node_role: SLAVE");
			break;
		default:
			out.println("node_role: UNKNOWN");
			break;
		}
		switch(agent.getServerType()) {
		case ServerType.TYPE_1_1:
			out.println("node_type: 1+1");
			if (agent instanceof LiveAgent) {
				LiveAgent liveAgent = (LiveAgent) agent;
				out.println("binding_state: " + liveAgent.isBound());
				if (liveAgent.isBound()) {
					out.println("binding_node_ip: " + liveAgent.getBindingNode().getDescription().getIp());
					out.println("binding_node_port: " + liveAgent.getBindingNode().getDescription().getPort());
				}
			}
			break;
		case ServerType.TYPE_M_N:
			out.println("node_type: M+N");
			break;
		default:
			out.println("node_type: UNKNOWN");
			break;
		}
		if (agent.getCommander() != null) {
			out.println("commander: " + agent.getCommander().getDescription().getIp());
		} else {
			out.println("commander: NONE");
		}
	}

}
