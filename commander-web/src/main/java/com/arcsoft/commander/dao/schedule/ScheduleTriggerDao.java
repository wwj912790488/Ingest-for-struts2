package com.arcsoft.commander.dao.schedule;

import java.util.List;

import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.domain.schedule.ScheduleTrigger;

/**
 * Schedule trigger dao.
 * 
 * @author fjli
 */
public interface ScheduleTriggerDao {

	List<ScheduleTrigger> list(QueryInfo info);

	ScheduleTrigger get(Long id);


	ScheduleTrigger save(ScheduleTrigger event);

	ScheduleTrigger update(ScheduleTrigger event);

	void delete(ScheduleTrigger event);

	void updateFinished(Long id, boolean finished);

	void updateTriggered(Long id, boolean triggered);

}
