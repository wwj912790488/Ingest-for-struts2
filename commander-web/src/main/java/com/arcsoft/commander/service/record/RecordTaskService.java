package com.arcsoft.commander.service.record;

import java.util.List;

import com.arcsoft.commander.domain.record.RecordTask;

/**
 * Record task service.
 * 
 * @author fjli
 */
public interface RecordTaskService {

	RecordTask getRecordTaskById(Integer taskId);

	/**
	 * Get record task by schedule event id.
	 * 
	 * @param eventId - the schedule event id
	 * @return the record task.
	 */
	RecordTask getRecordTaskByEventId(Long eventId);

	/**
	 * Get record tasks by record id.
	 * 
	 * @param recordId - the record id
	 * @return the record tasks.
	 */
	List<RecordTask> getRecordTasksByRecordId(Integer ...recordId);

	/**
	 * Delete all tasks by record id.
	 * 
	 * @param recordId - the record id
	 */
	void deleteTasksByRecordId(Integer ...recordId);

}
