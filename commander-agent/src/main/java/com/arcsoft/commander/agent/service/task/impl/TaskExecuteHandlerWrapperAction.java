package com.arcsoft.commander.agent.service.task.impl;

/**
 * This class is wrapper action of the given execute handler for the specified task.
 * 
 * @author fjli
 */
public class TaskExecuteHandlerWrapperAction extends TaskExecuteAction {

	private TaskExecuteHandler handler;

	/**
	 * Construct wrapper action for the given execute handler.
	 * 
	 * @param handler - the execute handler
	 */
	public TaskExecuteHandlerWrapperAction(TaskExecuteHandler handler) {
		this.handler = handler;
	}

	@Override
	public void execute() {
		handler.doUpdateTask(getTaskInfo());
	}

}
