package com.arcsoft.commander.agent.service.builder;

import com.arcsoft.web4transcoder.domain.Task;

/**
 * Xml pre-process filter.
 * 
 * @author fjli
 */
public interface TaskXmlProcessFilter {

	/**
	 * Process task before task build to xml.
	 * 
	 * @param task - the task to process
	 */
	void preProcessTask(Task task);

}
