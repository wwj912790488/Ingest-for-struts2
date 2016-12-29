package com.arcsoft.commander.action.task;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.BeanUtils;

import com.arcsoft.commander.domain.task.CommanderTask;
import com.arcsoft.web4transcoder.action.task.IEditTaskAction;
import com.arcsoft.web4transcoder.domain.Task;
import com.arcsoft.web4transcoder.domain.input.Input;
import com.arcsoft.web4transcoder.domain.output.StreamAssembly;
import com.arcsoft.web4transcoder.domain.outputgroup.LiveOutputGroup;

@SuppressWarnings("serial")
public class EditTaskAction extends CommanderTaskActionSupport implements IEditTaskAction<CommanderTask> {

	private Logger log = Logger.getLogger(getClass());
	private Integer taskId;

	@Override
	public void setTaskId(Integer taskId) {
		this.taskId = taskId;
	}

	@Override
	public String getTaskAction() {
		return UPDATE;
	}

	@Override
	public List<StreamAssembly> getStreamAssemblys() {
		return task.getStreamAssemblys();
	}

	@Override
	public List<Input> getInputs() {
		return task.getInputs();
	}

	@Override
	public List<LiveOutputGroup> getOutputGroups() {
		return task.getOutputGroups();
	}

	@Override
	public String execute() {
		try {
			Task task = getTaskService().getTask(this.taskId, true);
			if (task instanceof CommanderTask) {
				this.task = (CommanderTask) task;
			} else {
				this.task = new CommanderTask();
				BeanUtils.copyProperties(task, this.task);
			}
			this.setServerGroups();
		} catch (Exception e) {
			log.error("edit task failed.", e);
		}
		return SUCCESS;
	}

	@Override
	public boolean canEditTask() {
		return getTaskService().canEditTask(task.getStatus());
	}

}
