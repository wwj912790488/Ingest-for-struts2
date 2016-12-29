package com.arcsoft.commander.agent.service.task.factory;

import java.util.Map;

import com.arcsoft.web4transcoder.domain.Task;
import com.arcsoft.web4transcoder.factory.TaskFactory;
import com.arcsoft.web4transcoder.factory.TaskFactoryImpl;

/**
 * Custom task factory.
 * 
 * @author fjli
 */
public class CustomTaskFactoryImpl extends TaskFactoryImpl implements TaskFactory {

	@Override
	public Task assembleTask(Task task, Map<String, String> map) {
		Task newTask = super.assembleTask(task, map);
		newTask.setUserData(map.get("extension"));
		return newTask;
	}

}
