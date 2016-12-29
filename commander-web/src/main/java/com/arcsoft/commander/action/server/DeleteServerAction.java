package com.arcsoft.commander.action.server;

import org.apache.log4j.Logger;
import org.springframework.security.access.prepost.PreAuthorize;

import com.arcsoft.commander.action.BaseAction;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.exception.server.ServerBusyException;
import com.arcsoft.commander.exception.server.SwitchRoleFailedException;
import com.arcsoft.commander.exception.system.AccessDeniedForSlaveException;
import com.arcsoft.commander.exception.system.SystemNotInitializedException;
import com.arcsoft.commander.service.task.CustomTaskService;

/**
 * delete server action
 * 
 * @author xpeng
 * 
 */
@SuppressWarnings("serial")
public class DeleteServerAction extends BaseServerAction {

	private Logger log = Logger.getLogger(DeleteServerAction.class);
	private CustomTaskService customTaskService;
	private String id;

	public void setCustomTaskService(CustomTaskService customTaskService) {
		this.customTaskService = customTaskService;
	}

	/**
	 * for json output, the result code
	 */
	private int code;
	/**
	 * for json output, the detail fail description.
	 */
	private String description;

	public void setId(String id) {
		this.id = id;
	}
	
	public String getId(){
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
		log.debug("deleteDevice id = " + id);

		Server server = serverService.getServer(id);
		if (server == null) {
			return SUCCESS;
		}

		ServerGroup group = server.getGroup();
		if (group.getType() == ServerGroup.TYPE_LIVE) {
			if (!server.isBackup()) {
				// if server is master, check has task assigned to this group
				long taskCount = customTaskService.getTasksCountByGroupId(group.getId());
				if (taskCount > 0) {
					this.code = -1;
					this.description = getText("msg.group.delete.fail.task.assigned");
					return SUCCESS;
				}
			} else {
				// allow delete backup server in 1+1 group
			}
		} else {
			// check has task assigned to this server.
			long taskCount = customTaskService.getTasksCountByServerId(id);
			if (taskCount > 0) {
				this.code = -1;
				this.description = getText("msg.server.delete.fail.task.assigned");
				return SUCCESS;
			}
		}

		try {
			serverService.removeServer(server);
			this.code = BaseAction.RC_SUCCESS;
		} catch (SystemNotInitializedException e) {
			this.code = BaseAction.RC_SYSTEM_NOT_INIT;
			this.description = getText("system.not.initialized");
		} catch (AccessDeniedForSlaveException e) {
			this.code = BaseAction.RC_SYSTEM_SLAVE_ACCESS_DENIED;
			this.description = getText("system.slave.access.denied");
		} catch (ServerBusyException e) {
			this.code = BaseAction.RC_SERVER_BUSY;
			this.description = getText("msg.server.delete.running");
		} catch(SwitchRoleFailedException e) {
			this.code = RC_SWITCH_ROLE_FAILED;
			this.description = getText("msg.server.delete.switch.failed");
		}

		return SUCCESS;
	}

}
