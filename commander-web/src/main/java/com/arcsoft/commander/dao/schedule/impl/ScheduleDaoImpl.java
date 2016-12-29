package com.arcsoft.commander.dao.schedule.impl;

import java.util.HashMap;
import java.util.Map;

import com.arcsoft.arcvideo.orm.dao.hibernate.DatabaseDaoHibernateSupport;
import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.commander.dao.schedule.ScheduleDao;
import com.arcsoft.commander.domain.schedule.Schedule;

/**
 * Schedule dao.
 * 
 * @author fjli
 */
public class ScheduleDaoImpl extends DatabaseDaoHibernateSupport<Schedule, Long> implements ScheduleDao {

	@Override
	public void delete(Long id) {
		deleteAll(Condition.eq("id", id));
	}

	@Override
	public void updateFinished(Long id, boolean finished) {
		Map<String, Object> map = new HashMap<>();
		map.put("finished", finished);
		update(map, Condition.eq("id", id));
	}

}
