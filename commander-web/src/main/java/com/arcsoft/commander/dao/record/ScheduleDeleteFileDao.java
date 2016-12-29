package com.arcsoft.commander.dao.record;

import java.util.List;

import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.domain.record.ScheduleDeleteFile;

/**
 * ScheduleDeleteFile dao.
 * 
 * @author fjli
 */
public interface ScheduleDeleteFileDao {

	/**
	 * Query record tasks by query info.
	 * 
	 * @param info - the query info
	 * @return the record tasks.
	 */
	List<ScheduleDeleteFile> list(QueryInfo info);

	/**
	 * Delete tasks by condition.
	 * 
	 * @param condtion - the delete condition
	 */
	void deleteAll(Condition condtion);

	/**
	 * Save the schedule delete file.
	 * 
	 * @param file - the schedule delete file to save
	 * @return the saved schedule delete file.
	 */
	ScheduleDeleteFile save(ScheduleDeleteFile file);

}
