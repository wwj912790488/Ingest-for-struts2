package com.arcsoft.commander.action.task;

import org.apache.log4j.Logger;

public class DeleteTaskAction extends CommanderTaskActionSupport {

	private static final long serialVersionUID = 11L;
	private Logger log = Logger.getLogger(getClass());
	private String taskId = null;

	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}

	public String getTaskId() {
		return taskId;
	}

	public String execute() {
		try {
			String[] ids = taskId.split(",");
			if (ids.length == 0)
				ids = new String[] { taskId };
			for (int i = 0; i < ids.length; i++) {
				ids[i] = ids[i].trim();
				if (ids[i].length() == 0)
					continue;
				int id = Long.decode(ids[i]).intValue();
				this.getTaskExecuteService().stopTask(id);
				getTaskService().deleteTask(id);
			}
		} catch (Exception e) {
			log.error("delete task failed.", e);
			return ERROR;
		}
		return SUCCESS;
	}

}
