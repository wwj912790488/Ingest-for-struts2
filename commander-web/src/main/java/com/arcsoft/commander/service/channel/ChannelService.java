package com.arcsoft.commander.service.channel;

import java.util.List;

import com.arcsoft.arcvideo.orm.query.Pager;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.commander.domain.channel.Channel;

public interface ChannelService {

	Pager list(QueryInfo info, int pageIndex, int pageSize);

	List<Channel> list(QueryInfo info);

	Channel get(Integer id);

	Channel save(Channel channel);

	void delete(Integer[] id);

	Channel update(Channel channel);

}
