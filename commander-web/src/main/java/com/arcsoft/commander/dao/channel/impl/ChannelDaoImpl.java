package com.arcsoft.commander.dao.channel.impl;

import com.arcsoft.arcvideo.orm.dao.hibernate.DatabaseDaoHibernateSupport;
import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.commander.dao.channel.ChannelDao;
import com.arcsoft.commander.domain.channel.Channel;


/**
 * Channel Dao.
 * 
 * @author fjli
 */
public class ChannelDaoImpl extends DatabaseDaoHibernateSupport<Channel, Integer> implements ChannelDao {

	@Override
	public void delete(Integer id) {
		deleteAll(Condition.eq("id", id));
	}

}
