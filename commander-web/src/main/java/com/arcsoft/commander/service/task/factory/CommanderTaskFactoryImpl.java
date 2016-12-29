package com.arcsoft.commander.service.task.factory;

import com.arcsoft.commander.domain.task.CommanderTask;
import com.arcsoft.web4transcoder.domain.Task;
import com.arcsoft.web4transcoder.factory.TaskFactory;
import com.arcsoft.web4transcoder.factory.TaskFactoryImpl;
import com.arcsoft.web4transcoder.type.TaskStatus;

/**
 * Commander task factory.
 * 
 * @author fjli
 */
public class CommanderTaskFactoryImpl extends TaskFactoryImpl implements TaskFactory {

	@Override
	public Task createTask() {	
		CommanderTask task = new CommanderTask();
		task.setState(TaskStatus.PENDING.getKey());
		return task;		
	}

}
