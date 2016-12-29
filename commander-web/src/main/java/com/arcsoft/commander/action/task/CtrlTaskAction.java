package com.arcsoft.commander.action.task;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;

import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.domain.task.TaskChangedInfo;
import com.arcsoft.commander.exception.server.NoServerAvailableException;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;
import com.arcsoft.commander.exception.task.DispatchException;

public class CtrlTaskAction extends CommanderTaskActionSupport {
	private static final long serialVersionUID = -8506257065038944063L;
	
	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	/**action=start*/
	public static final String START = "start";
	/**action=stop*/
	public static final String STOP = "stop";
	/**action=switchsourcesignalmode*/
	public static final String SWITCHSOURCESIGNALMODE = "switchsourcesignalmode";

	private String taskId = null;
	private String cmd = null;
	@SuppressWarnings("unused")
	private Integer priority = null;
	private Integer sourceSignalMode = null;


	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	
	public String getTaskId() {
		return taskId;
	}
	
	public void setPriority(Integer priority) {
		this.priority = priority;
	}
	
	public void setSourceSignalMode(Integer mode) {
		this.sourceSignalMode = mode;
	}
	
	/**
	 * 
	 * @param action "start", "stop"
	 */
	public void setCmd(String cmd) {
		this.cmd = cmd;
	}
	
	public String getCmd() {
		return cmd;
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_OPERATOR')")
	public String execute(){
		// check
		if(SWITCHSOURCESIGNALMODE.equalsIgnoreCase(cmd)) {
			if (this.sourceSignalMode == null)
				return ERROR;
		}
		// process
		if(taskId != null){
			try{
				String[] ids = taskId.split(",");		
				Integer[] iids = new Integer[ids.length];
				for (int i = 0; i < ids.length; i++) {
					iids[i] = Integer.parseInt(ids[i]);
				}
				
				for(int id : iids){
					try {
						if(START.equalsIgnoreCase(cmd)){
							this.getTaskExecuteService().startTask(id);
						}else if(STOP.equalsIgnoreCase(cmd)){
							this.getTaskExecuteService().stopTask(id);
						}else if(SWITCHSOURCESIGNALMODE.equalsIgnoreCase(cmd)) {
							TaskChangedInfo info = new TaskChangedInfo();
							info.setTaskId(id);
							info.setSignalSwitchMode(this.sourceSignalMode);
							this.getTaskExecuteService().updateTaskInfo(info);
						}
					}catch(RemoteException e){
						convertRemoteExceptionMessage(e, String.valueOf(id));
					}catch (SystemNotInitializedException e) {
						addActionError(getText("system.not.initialized"));//commander not initialized
						break;
					}catch (AccessDeniedForSlaveException e) {
						addActionError(getText("system.slave.access.denied")); //commander is slave
						break;
					}catch (ServerNotAvailableException e) {
						addActionError(getText("task.execute.err", new String[]{String.valueOf(id)} ) + ","+ getText("server.group.err.server.unavailable", new String[]{e.getServer().getIp()} ));
						logger.error("server unavailable");
					}catch (NoServerAvailableException e){
						addActionError(getText("task.dispatcher.err.server.not.exists", new String[]{String.valueOf(id)} ));
						logger.error("can't find any server with task", e);
					}catch (DispatchException e) {
						addActionError(getText("task.dispatcher.err", new String[]{String.valueOf(id)} ));
						logger.error("dispatcher failed", e);
					}catch (Exception e) {
						addActionError(getText("task.execute.err", new String[]{String.valueOf(id)} ));
						logger.error("unknow error", e);
					}
				}

			}catch (Exception e) {
				addActionError(getText("task.execute.err", new String[]{taskId} ));
				logger.error("unknow error", e);
			}
		}else{
			addActionError(getText("task.execute.err.taskid"));
		}
		

		return SUCCESS;
	}
	
	private void convertRemoteExceptionMessage(RemoteException e, String taskId){
		String[] args = new String[]{taskId};
		switch (e.getErrorCode()) {
			case ActionErrorCode.GREATER_THAN_MAX_TASK_COUNT:
				addActionError(getText("validation.dispatcher.greater.than.max.count", args));
				break;
			case ActionErrorCode.GREATER_THAN_MAX_OUTPUT_COUNT :
				addActionError(getText("validation.dispatcher.greater.than.max.output", args));
				break;
			case ActionErrorCode.GREATER_THAN_MAX_HDOUTPUT_COUNT:
				addActionError(getText("validation.dispatcher.greater.than.max.hdoutput", args));
				break;
			case ActionErrorCode.GREATER_THAN_MAX_SDOUTPUT_COUNT:
				addActionError(getText("validation.dispatcher.greater.than.max.sdoutput", args));
				break;
			case ActionErrorCode.TASK_ALREADY_RUNNING:
				addActionError(getText("task.execute.err.already.running", args));
				break;
			default: //UNKONW_ERROR
				addActionError(getText("task.execute.err", args));
				break;
		}
	}

}
