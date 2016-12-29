package com.arcsoft.commander.service.snmp.impl;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.apache.log4j.Logger;

import com.arcsoft.arcvideo.spring.event.EventReceiver;
import com.arcsoft.commander.service.BaseService;
import com.arcsoft.commander.service.snmp.CommanderSnmpService;
import com.arcsoft.commander.service.system.SystemContext;
import com.arcsoft.commander.service.system.SystemContextListener;
import com.arcsoft.commander.service.task.CustomTaskService;
import com.arcsoft.commander.service.task.TaskExecuteService;
import com.arcsoft.commander.service.task.event.TaskCreatedEvent;
import com.arcsoft.commander.service.task.event.TaskDeletedEvent;
import com.arcsoft.commander.service.task.event.TaskEvent;
import com.arcsoft.commander.service.task.event.TaskModifiedEvent;
import com.arcsoft.commander.service.task.event.TaskStatusChangedEvent;
import com.arcsoft.transcoder.snmp.CallbackSnmpMsg;
import com.arcsoft.transcoder.snmp.ISnmpEventListener;
import com.arcsoft.transcoder.snmp.SnmpMsg;
import com.arcsoft.transcoder.snmp.SnmpService;
import com.arcsoft.transcoder.snmp.SnmpTaskListUnit;
import com.arcsoft.web4transcoder.domain.Task;
import com.arcsoft.web4transcoder.type.TaskStatus;

/**
 * Commander SNMP service.
 * 
 * @author fjli
 */
public class CommanderSnmpServiceImpl extends BaseService implements CommanderSnmpService, SystemContextListener, ISnmpEventListener {

	private static final String OID_COMMANDER_TYPE = "1.3.6.1.4.1.42726.4.1";
	private static final String OID_COMMANDER_ROLE = "1.3.6.1.4.1.42726.4.2";

	private Logger log = Logger.getLogger(CommanderSnmpServiceImpl.class);
	private SnmpService snmpService;
	private SystemContext context;
	private ExecutorService executor;
	private TaskExecuteService taskExecuteService;
	private CustomTaskService customTaskService;
	private boolean isSnmpConnected = false;

	public void setSnmpService(SnmpService snmpService) {
		this.snmpService = snmpService;
	}

	public void setTaskExecuteService(TaskExecuteService taskExecuteService) {
		this.taskExecuteService = taskExecuteService;
	}

	public void setCustomTaskService(CustomTaskService customTaskService) {
		this.customTaskService = customTaskService;
	}

	public void init() {
		if (!snmpService.isEnableArcVideoSnmp())
			return;
		executor = Executors.newSingleThreadExecutor();
	}

	public void destroy() {
		if (executor != null)
			executor.shutdownNow();
	}

	private void setAgentValue(String oid, byte b, Object object) {
		SnmpMsg message = new SnmpMsg(SnmpMsg.OPERATION_SET);
		message.addUnit(oid, b, object);
		sendSnmpMessage(message);
	}

	@Override
	public void sendTrapMessage(String description) {
		SnmpMsg message = new SnmpMsg(SnmpMsg.OPERATION_TRAP);
		message.addUnit(SnmpMsg.OID_NOTIFY_MODULE, SnmpMsg.DATA_TYPE_STRING, "Commander");
		message.addUnit(SnmpMsg.OID_NOTIFY_DESCRIPTION, SnmpMsg.DATA_TYPE_STRING, description);
		sendSnmpMessage(message);
	}

	private void sendSnmpMessage(final SnmpMsg message) {
		if (!snmpService.isEnableArcVideoSnmp() && !isSnmpConnected)
			return;
		executor.execute(new Runnable() {
			@Override
			public void run() {
				try {
					snmpService.send(message);
				} catch (Exception e) {
					log.error("send message failed.", e);
				}
			}
		});
	}

	@Override
	public void contextInit(SystemContext context) {
		this.context = context;
		notifyCommanderInfo();
	}

	@Override
	public void contextDestory(SystemContext context) {
		this.context = context;
		notifyCommanderInfo();
	}

	private void notifyCommanderInfo() {
		if (!isSnmpConnected)
			return;
		setAgentValue(OID_COMMANDER_TYPE, SnmpMsg.DATA_TYPE_UINT, systemSettings.getClusterType());
		setAgentValue(OID_COMMANDER_ROLE, SnmpMsg.DATA_TYPE_UINT, context.getRole());
	}

	@Override
	public void notifySnmpEvent(int evt, Object o) {
		switch (evt) {
		case ISnmpEventListener.SNMP_OFF:
			isSnmpConnected = false;
			break;
		case ISnmpEventListener.SNMP_CONNECTED:
			isSnmpConnected = true;
			notifyCommanderInfo();
			notifySnmpTaskList();
			notifyTasksCount();
			break;
		case SNMP_ON_NOTIFY_WEBSERVER:
			onTaskControlEvent((CallbackSnmpMsg) o);
			break;
		}
	}

	private void onTaskControlEvent(CallbackSnmpMsg msg) {
		Integer taskId = msg.getId();
		switch (msg.getSubOp()) {
		case CallbackSnmpMsg.SUBOP_START:
			try {
				taskExecuteService.startTask(taskId);
			} catch (Exception e) {
				log.error("start task failed by snmp.", e);
			}
			break;
		case CallbackSnmpMsg.SUBOP_STOP:
			try {
				taskExecuteService.stopTask(taskId);
			} catch (Exception e) {
				log.error("stop task failed by snmp.", e);
			}
			break;
		}
	}

	private void notifySnmpTaskList() {
		if (!isSnmpConnected)
			return;
		List<Task> tasks = (List<Task>) customTaskService.getAllTasks(false);
		for (Task task : tasks)
			sendTaskMessage(task, SnmpTaskListUnit.OPADD);
	}

	private void notifyTasksCount() {
		if (!isSnmpConnected)
			return;

		long running = customTaskService.getTaskCountByStatus(TaskStatus.WAITING, TaskStatus.RUNNING, TaskStatus.STOPPING);
		log.debug("notify snmp running tasks count: " + running);
		setAgentValue(SnmpMsg.OID_TASK_RUNNING_COUNT, SnmpMsg.DATA_TYPE_INT, (int) running);

		long error = customTaskService.getTaskCountByStatus(TaskStatus.ERROR);
		log.debug("notify snmp error tasks count: " + error);
		setAgentValue(SnmpMsg.OID_TASK_ERROR_COUNT, SnmpMsg.DATA_TYPE_INT, (int) error);
	}

	private void sendTaskMessage(Task task, byte op) {
		SnmpMsg msg = new SnmpMsg(SnmpMsg.OPERATION_TRAP_TASKLIST);
		if (op == SnmpTaskListUnit.OPDEL) {
			msg.addUnit(new SnmpTaskListUnit(String.valueOf(task.getId()), null, null, op));
		} else {
			msg.addUnit(new SnmpTaskListUnit(String.valueOf(task.getId()), task.getStatus(), task.getName(), op));
		}
		sendSnmpMessage(msg);
	}

	@EventReceiver(TaskEvent.class)
	public void onTaskEvent(TaskEvent event) {
		if (!isSnmpConnected)
			return;
		log.debug("task event received: " + event);
		if (event instanceof TaskCreatedEvent) {
			sendTaskMessage(event.getTask(), SnmpTaskListUnit.OPADD);
		} else if (event instanceof TaskDeletedEvent) {
			sendTaskMessage(event.getTask(), SnmpTaskListUnit.OPDEL);
		} else if (event instanceof TaskModifiedEvent) {
			sendTaskMessage(event.getTask(), SnmpTaskListUnit.OPUPDATE);
		} else if (event instanceof TaskStatusChangedEvent) {
			sendTaskMessage(event.getTask(), SnmpTaskListUnit.OPUPDATE);
			notifyTasksCount();
		}
	}

}
