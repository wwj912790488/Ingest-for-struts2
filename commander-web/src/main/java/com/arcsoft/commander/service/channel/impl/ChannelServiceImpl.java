package com.arcsoft.commander.service.channel.impl;

import java.util.Date;
import java.util.List;

import com.arcsoft.arcvideo.orm.query.Pager;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.dao.channel.ChannelDao;
import com.arcsoft.commander.domain.channel.Channel;
import com.arcsoft.commander.service.Transaction;
import com.arcsoft.commander.service.channel.ChannelService;

/**
 * Channel service.
 * 
 * @author fjli
 */
public class ChannelServiceImpl implements ChannelService, Transaction {

	private ChannelDao channelDao;

	public void setChannelDao(ChannelDao channelDao) {
		this.channelDao = channelDao;
	}

	@Override
	public Pager list(QueryInfo info, int pageIndex, int pageSize) {
		return channelDao.list(info, pageIndex, pageSize);
	}

	@Override
	public List<Channel> list(QueryInfo info) {
		return channelDao.list(info);
	}

	@Override
	public Channel get(Integer id) {
		return channelDao.get(id);
	}

	@Override
	public Channel save(Channel channel) {
		Date date = new Date();
		channel.setCreated(date);
		channel.setLastModified(date);
		return channelDao.save(channel);
	}

	@Override
	public void delete(Integer[] ids) {
		for (Integer id : ids) {
			channelDao.delete(id);
		}
	}

	@Override
	public Channel update(Channel channel) {
		channel.setLastModified(new Date());
		return channelDao.update(channel);
	}

}
