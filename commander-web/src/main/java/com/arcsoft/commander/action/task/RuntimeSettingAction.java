package com.arcsoft.commander.action.task;

import com.arcsoft.arcvideo.common.utils.StringHelper;
import com.arcsoft.arcvideo.web.struts.result.ActionResult;
import com.arcsoft.commander.action.BaseAction;
import com.arcsoft.commander.domain.task.TaskChangedInfo;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;
import com.arcsoft.commander.service.task.CustomTaskService;
import com.arcsoft.commander.service.task.TaskExecuteService;
import com.arcsoft.web4transcoder.domain.Task;
import com.arcsoft.web4transcoder.domain.input.AsiDeviceInput;
import com.arcsoft.web4transcoder.domain.input.NetworkInput;
import com.arcsoft.web4transcoder.domain.input.SdiDeviceInput;

/**
 * Task runtime setting action.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class RuntimeSettingAction extends BaseAction {

	private CustomTaskService customTaskService;
	private TaskExecuteService taskExecuteService;
	private Task task;
	private Integer taskId;
	private Boolean allowProgramIdChanged;
	private ActionResult result;

	public void setCustomTaskService(CustomTaskService customTaskService) {
		this.customTaskService = customTaskService;
	}

	public void setTaskExecuteService(TaskExecuteService taskExecuteService) {
		this.taskExecuteService = taskExecuteService;
	}

	public Boolean getAllowProgramIdChanged() {
		return allowProgramIdChanged;
	}

	public void setAllowProgramIdChanged(Boolean allowProgramIdChanged) {
		this.allowProgramIdChanged = allowProgramIdChanged;
	}

	public Integer getTaskId() {
		return taskId;
	}

	public void setTaskId(Integer taskId) {
		this.taskId = taskId;
	}

	public Task getTask() {
		return task;
	}

	public ActionResult getResult() {
		return result;
	}

	@Override
	public String execute() {
		this.task = customTaskService.getTask(taskId, true);
		if (this.task != null) {
			if (task.getInputs().get(0).getBody() instanceof NetworkInput) {
				NetworkInput ni = (NetworkInput) task.getInputs().get(0).getBody();
				if (NetworkInput.PROTOCOL_TSOVERUDP.equalsIgnoreCase(ni.getProtocol())) {
					allowProgramIdChanged = StringHelper.toDefaultIfNull(ni.getAllowProgramIdChange(), 0) == 1;
				}
			} else if (task.getInputs().get(0).getBody() instanceof SdiDeviceInput) {
				SdiDeviceInput sdi = (SdiDeviceInput) task.getInputs().get(0).getBody();
				allowProgramIdChanged = StringHelper.toDefaultIfNull(sdi.getAllowProgramIdChange(), 0) == 1;
			} else if (task.getInputs().get(0).getBody() instanceof AsiDeviceInput) {
				AsiDeviceInput ni = (AsiDeviceInput) task.getInputs().get(0).getBody();
				allowProgramIdChanged = StringHelper.toDefaultIfNull(ni.getAllowProgramIdChange(), 0) == 1;
			}
		}
		return SUCCESS;
	}

	/**
	 * Save task runtime setting.
	 */
	public String save() {
		if (taskId != null && allowProgramIdChanged != null) {
			TaskChangedInfo info = new TaskChangedInfo();
			info.setTaskId(taskId);
			info.setAllowProgramIdChanged(allowProgramIdChanged);
			try {
				taskExecuteService.updateTaskInfo(info);
				result = new ActionResult(true);
			} catch (SystemNotInitializedException e) {
				result = new ActionResult(false, getText("system.not.initialized"));
			} catch (AccessDeniedForSlaveException e) {
				result = new ActionResult(false, getText("system.slave.access.denied"));
			} catch (ServerNotAvailableException e) {
				result = new ActionResult(false, getText("msg.error.server.not.available"));
			} catch (Exception e) {
				result = new ActionResult(false, getText("common.error.unknown"));
			}
		} else {
			result = new ActionResult(false, getText("common.error.unknown"));
		}
		return SUCCESS;
	}

}
