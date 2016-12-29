package com.arcsoft.commander.action.channel;

import java.util.ArrayList;
import java.util.List;

import com.arcsoft.arcvideo.common.utils.StringHelper;
import com.arcsoft.arcvideo.orm.query.Condition;
import com.arcsoft.arcvideo.orm.query.Pager;
import com.arcsoft.arcvideo.orm.query.QueryInfo;
import com.arcsoft.arcvideo.orm.query.SortOrder;
import com.arcsoft.commander.action.PageControl;
import com.arcsoft.commander.domain.channel.Channel;

/**
 * Action for view channels.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class ListChannelAction extends BaseChannelAction implements PageControl {

	private Channel channel;
	private Pager pager = new Pager();

	public Channel getChannel() {
		return channel;
	}

	public void setChannel(Channel channel) {
		this.channel = channel;
	}

	@Override
	public Pager getPager() {
		return pager;
	}

	@Override
	public void setPager(Pager pager) {
		this.pager = pager;
	}

	/**
	 * Query the channels.
	 */
	@Override
	public String execute() throws Exception {
		QueryInfo info = new QueryInfo();
		List<Condition> conditions = new ArrayList<>();
		if (channel != null) {
			if (channel.getId() != null) {
				conditions.add(Condition.eq("id", channel.getId()));
			}
			if (StringHelper.isNotBlank(channel.getName())) {
				conditions.add(Condition.like("name", "%" + channel.getName() + "%"));
			}
			if (StringHelper.isNotBlank(channel.getUri())) {
				conditions.add(Condition.like("uri", "%" + channel.getUri() + "%"));
			}
			if (channel.getProgramId() != null) {
				conditions.add(Condition.eq("programId", channel.getProgramId()));
			}
			if (channel.getVideoId() != null) {
				conditions.add(Condition.eq("videoId", channel.getVideoId()));
			}
			if (channel.getAudioId() != null) {
				conditions.add(Condition.eq("audioId", channel.getAudioId()));
			}
		}
		if (!conditions.isEmpty()) {
			info.setCondition(Condition.and(conditions));
		}
		info.addSortOrder(SortOrder.desc("id"));
		pager = channelService.list(info, pager.getPageIndex(), pager.getPageSize());
		return SUCCESS;
	}

}
