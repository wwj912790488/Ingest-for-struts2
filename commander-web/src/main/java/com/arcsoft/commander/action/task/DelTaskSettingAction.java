package com.arcsoft.commander.action.task;

import com.arcsoft.commander.service.task.TaskExecuteService;
import com.opensymphony.xwork2.ActionSupport;

/**
 * Email setting action.
 * 
 * @author fjli
 */
public class DelTaskSettingAction extends ActionSupport {

	//private static final long serialVersionUID = 1L;

	private TaskExecuteService taskExecuteService;
	private Integer deleteBeforeDays;

	public void setTaskExecuteService(TaskExecuteService taskExecuteService) {
		this.taskExecuteService = taskExecuteService;
	}

	public Integer getDeleteBeforeDays() {
		return deleteBeforeDays;
	}

	public void setDeleteBeforeDays(Integer deleteBeforeDays) {
		this.deleteBeforeDays = deleteBeforeDays;
	}

	public String load() {
		try {
			deleteBeforeDays = taskExecuteService.getAutoDeleteBeforeDays();
			return SUCCESS;
		} catch (Exception e) {
			return ERROR;
		}
	}

	public String save() {

		try {
			taskExecuteService.setAutoDeleteBeforeDays(deleteBeforeDays);
			return SUCCESS;
		} catch (Exception e) {
			return ERROR;
		}
	}
}
