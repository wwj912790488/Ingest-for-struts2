package com.arcsoft.commander.dao.record;

import java.util.List;

import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.domain.record.RecordTask;

/**
 * RecordTask dao.
 * 
 * @author fjli
 */
public interface RecordTaskDao {

	RecordTask get(Integer id);

	/**
	 * Find the first task by query info.
	 * 
	 * @param info - the query info
	 * @return the first record task.
	 */
	public RecordTask find(QueryInfo info);

	/**
	 * Query record tasks by query info.
	 * 
	 * @param info - the query info
	 * @return the record tasks.
	 */
	List<RecordTask> list(QueryInfo info);

	/**
	 * Delete tasks by condition.
	 * 
	 * @param condtion - the delete condition
	 */
	void deleteAll(Condition condtion);

}
