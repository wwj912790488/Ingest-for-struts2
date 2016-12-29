package com.arcsoft.commander.action.task;

import java.io.InputStream;
import java.util.List;

import org.apache.log4j.Logger;

import com.arcsoft.commander.domain.task.CommanderTask;
import com.arcsoft.web4transcoder.action.task.INewTaskAction;
import com.arcsoft.web4transcoder.domain.input.Input;
import com.arcsoft.web4transcoder.domain.output.StreamAssembly;
import com.arcsoft.web4transcoder.domain.outputgroup.LiveOutputGroup;
import com.arcsoft.web4transcoder.service.translator.TransformableTranslator;

@SuppressWarnings("serial")
public class NewTaskAction extends CommanderTaskActionSupport implements INewTaskAction<CommanderTask> {

	private Logger logger = Logger.getLogger(NewTaskAction.class);
	private Integer taskId;
	private Integer profileId;

	@Override
	public void setTaskId(Integer taskId) {
		this.taskId = taskId;
	}

	@Override
	public void setProfileId(Integer profileId) {
		this.profileId = profileId;
	}

	@Override
	public String getTaskAction() {
		return SAVE;
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
		if (taskId != null) {
			this.task = (CommanderTask) this.getTaskService().getTask(taskId, true);
			this.task.setUserData("");
		} else if (profileId != null) {
			this.task = (CommanderTask) this.getTaskService().newTaskFromLiveProfile(profileId);
		} else {
			InputStream is = NewTaskAction.class.getResourceAsStream("/resource/blanktemplates/task.xml");
			this.task = (CommanderTask) this.getTaskXmlParser().parse(is);
			TransformableTranslator.associate(task);
		}
		this.setServerGroups();
		logger.info("NewTaskAction.execute.[EXIT]");
		return SUCCESS;
	}

}
