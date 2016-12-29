package com.arcsoft.commander.action.task;

import java.util.List;

import org.apache.log4j.Logger;

import com.arcsoft.commander.domain.task.CommanderTask;
import com.arcsoft.web4transcoder.action.ITransformableAssociate;
import com.arcsoft.web4transcoder.action.task.ISaveTaskAction;
import com.arcsoft.web4transcoder.domain.Task;
import com.arcsoft.web4transcoder.domain.TransformableObject;
import com.arcsoft.web4transcoder.domain.input.Input;
import com.arcsoft.web4transcoder.domain.output.StreamAssembly;
import com.arcsoft.web4transcoder.domain.outputgroup.LiveOutputGroup;
import com.arcsoft.web4transcoder.type.TaskStatus;

@SuppressWarnings("serial")
public class SaveTaskAction extends CommanderTaskActionSupport implements ISaveTaskAction<CommanderTask>, ITransformableAssociate {

	private Logger log = Logger.getLogger(getClass());
	private String taskAction = SAVE;

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
	public void setTaskAction(String taskAction) {
		this.taskAction = taskAction;
	}

	@Override
	public String getTaskAction() {
		return this.taskAction;
	}

	@Override
	public TransformableObject getTransformableObject() {
		return task;
	}

	@Override
	public String execute() {
		try {
			task.setState(TaskStatus.PENDING);
			task.setPre(false);
			task.setPost(false);
			task.setArchive(Task.ARCHIVE_NO);
			if (taskAction.compareToIgnoreCase(SAVE) == 0) {
				this.task = (CommanderTask) getTaskService().saveTask(task);
			} else if (taskAction.compareToIgnoreCase(UPDATE) == 0) {
				this.task = (CommanderTask) getTaskService().updateTask(task);
			} else {
				this.task = (CommanderTask) getTaskService().saveTask(task);
			}
		} catch (Exception e) {
			log.info("save action failed", e);
		}
		return SUCCESS;
	}

}
