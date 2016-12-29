package com.arcsoft.commander.action.server;

import org.apache.log4j.Logger;
import org.springframework.security.access.prepost.PreAuthorize;

import com.arcsoft.commander.action.BaseAction;
import com.arcsoft.commander.exception.server.ServerBusyException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;
import com.arcsoft.commander.service.task.CustomTaskService;

/**
 * delete group action
 * 
 * @author xpeng
 * 
 */
@SuppressWarnings("serial")
public class DeleteGroupAction extends BaseServerAction {

	private static Logger log = Logger.getLogger(DeleteGroupAction.class);
	private CustomTaskService customTaskService;
	private int id;

	/**
	 * for json output, the result code
	 */
	private int code;

	/**
	 * for json output, the detail fail description.
	 */
	private String description;

	public void setCustomTaskService(CustomTaskService customTaskService) {
		this.customTaskService = customTaskService;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	public int getId(){
		return id;
	}

	public int getCode() {
		return code;
	}

	public String getDescription() {
		return description;
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String execute() {
		log.debug("deleteGroup id= " + id);

		// check has task assigned to this group.
		long taskCount = customTaskService.getTasksCountByGroupId(id);
		if (taskCount > 0) {
			this.code = -1;
			this.description = getText("msg.group.delete.fail.task.assigned");
			return SUCCESS;
		}

		try {
			serverService.deleteGroup(id);
			this.code = BaseAction.RC_SUCCESS;
		} catch (ServerBusyException e) {
			this.code = BaseAction.RC_SERVER_BUSY;
			this.description = getText("msg.group.delete.running");
		} catch (SystemNotInitializedException e) {
			this.code = BaseAction.RC_SYSTEM_NOT_INIT;
			this.description = getText("system.not.initialized");
		} catch (AccessDeniedForSlaveException e) {
			this.code = BaseAction.RC_SYSTEM_SLAVE_ACCESS_DENIED;
			this.description = getText("system.slave.access.denied");
		}
		return SUCCESS;
	}
}