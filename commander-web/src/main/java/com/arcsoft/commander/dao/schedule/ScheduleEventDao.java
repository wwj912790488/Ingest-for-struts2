package com.arcsoft.commander.dao.schedule;

import java.util.List;

import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.domain.schedule.ScheduleEvent;

/**
 * Schedule event DAO
 * 
 * @author fjli
 */
public interface ScheduleEventDao {

	List<ScheduleEvent> list(QueryInfo info);

	ScheduleEvent get(Long id);

	ScheduleEvent save(ScheduleEvent event);

	ScheduleEvent update(ScheduleEvent event);

	void delete(ScheduleEvent event);

}
