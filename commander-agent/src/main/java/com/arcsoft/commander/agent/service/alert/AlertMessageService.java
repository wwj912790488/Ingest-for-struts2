package com.arcsoft.commander.agent.service.alert;

import java.io.PrintStream;
import java.util.Map;
import java.util.TreeMap;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.arcsoft.cluster.app.ActionException;
import com.arcsoft.commander.agent.MessageHandler;
import com.arcsoft.commander.agent.service.agent.AgentService;
import com.arcsoft.commander.agent.service.remote.RemoteExecutorServiceSupport;
import com.arcsoft.commander.cluster.action.alert.AlertMessageRequest;
import com.arcsoft.transcoder.ITranscodingMessageListener;
import com.arcsoft.transcoder.ITranscodingNotifier;


/**
 * Custom implements for task waring message.
 * 
 * @author zw
 */
public class AlertMessageService extends RemoteExecutorServiceSupport implements ITranscodingMessageListener, MessageHandler {
	
	/**
	 * Logger for this class
	 */
	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	private  BlockingQueue<AlertMessageRequest> messageQueue;
	
	private AgentService agentService;
	
	private ExecutorService pool;
	
	private volatile boolean status = true;
	
	/** Max size of message queue */
	private int maxSize = 1000;
	
	private int maxPoolSize = 1;
	/**
	 * @param maxSize the maxSize to set
	 */
	public void setMaxSize(int maxSize) {
		this.maxSize = maxSize;
	}
	
	/**
	 * @param maxPoolSize the maxPoolSize to set
	 */
	public void setMaxPoolSize(int maxPoolSize) {
		this.maxPoolSize = maxPoolSize;
	}

	/**
	 * @return the agentService
	 */
	public AgentService getAgentService() {
		return agentService;
	}
	
	/**
	 * @param agentService the agentService to set
	 */
	public void setAgentService(AgentService agentService) {
		this.agentService = agentService;
	}



	public void init(){
		this.messageQueue = new ArrayBlockingQueue<>(maxSize);
		this.pool = Executors.newFixedThreadPool(maxPoolSize);
		this.pool.execute( new MessageConsumer() );
	}
	
	public void destory(){
		this.status = false;
		this.messageQueue.clear();
		pool.shutdown();
		try {
			// Wait for 10 seconds to force shutdown
			if (!pool.awaitTermination(3, TimeUnit.SECONDS)) {
				pool.shutdownNow();
			}
		} catch (InterruptedException ie) {
			pool.shutdownNow();
		}
	}


	/**
	 * 
	 * Fire task transcoding error message.
	 * 
	 */
	@Override
	public void fireTaskErrorMessage(ITranscodingNotifier transcodingNotifier, int level, int code, String msg) {
		sendAlertRequest(transcodingNotifier.getTranscodingKey().getTaskId(), level, code, msg);
	}

	private void sendAlertRequest(int taskId, int level, int code, String msg) {
		AlertMessageRequest request = new AlertMessageRequest();
		request.setLevel(level);
		request.setTaskId(taskId);
		request.setCode(code);
		request.setMsg(msg);
		request.setIp(this.agentService.getAgent().getNode().getDescription().getIp());
		request.setType("task");
		try {
			this.messageQueue.put(request);
		} catch (InterruptedException e) {
			logger.error(e.getMessage(), e);
		}
	}

	/**
	 * For consume the message queue which will one by one send message to commander.
	 * 
	 * @author zw
	 */
	private final class MessageConsumer implements Runnable{

		@Override
		public void run() {
			while(status){
				AlertMessageRequest r;
				try {
					r = messageQueue.take();
				} catch (InterruptedException e1) {
					break;
				}
				if (r != null) {
					try {
						remoteExecutorService.remoteExecute(r);
					} catch (ActionException e) {
						logger.error(e.getMessage(), e);
					}
				}
			}
		}
		
	}

	@Override
	public Map<String, String> getCommands() {
		Map<String, String> commandMap = new TreeMap<>();
		commandMap.put("alert test ${id} ${code}", "Send the specified task's error code for testing alert.");
		return commandMap;
	}

	@Override
	public void processCommand(String[] args, PrintStream out) {
		if ("alert".equalsIgnoreCase(args[0])) {
			if ("test".equalsIgnoreCase(args[1])) {
				int taskId = Integer.decode(args[2]);
				int code = Long.decode(args[3]).intValue();
				int level = ((code & 0x80000000) != 0) ? 0 : 1;
				sendAlertRequest(taskId, level, code, null);
			}
		}
	}

}
