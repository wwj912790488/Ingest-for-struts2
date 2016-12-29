package com.arcsoft.commander.dao.schedule.impl;

import java.util.HashMap;
import java.util.Map;

import com.arcsoft.arcvideo.orm.dao.hibernate.DatabaseDaoHibernateSupport;
import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.dao.schedule.ScheduleTriggerDao;
import com.arcsoft.commander.domain.schedule.ScheduleTrigger;

/**
 * Schedule trigger dao.
 * 
 * @author fjli
 */
public class ScheduleTriggerDaoImpl extends DatabaseDaoHibernateSupport<ScheduleTrigger, Long> implements ScheduleTriggerDao {



	@Override
	public void updateFinished(Long id, boolean finished) {
		Map<String, Object> map = new HashMap<>();
		map.put("finished", finished);
		update(map, Condition.eq("id", id));
	}

	@Override
	public void updateTriggered(Long id, boolean triggered) {
		Map<String, Object> map = new HashMap<>();
		map.put("triggered", triggered);
		update(map, Condition.eq("id", id));
	}

}
