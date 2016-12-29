package com.arcsoft.commander.dao.schedule;

import java.util.List;

import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.domain.schedule.Schedule;

/**
 * Schedule dao.
 * 
 * @author fjli
 */
public interface ScheduleDao {

	List<Schedule> list(QueryInfo info);

	Schedule get(Long id);

	Schedule save(Schedule schedule);

	Schedule update(Schedule schedule);

	void delete(Long id);

	void deleteAll(Condition condition);

	void updateFinished(Long id, boolean finished);

}
