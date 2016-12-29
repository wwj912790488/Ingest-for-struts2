package com.arcsoft.commander.action.channel;

import com.arcsoft.commander.action.BaseAction;
import com.arcsoft.commander.service.channel.ChannelService;

/**
 * Base channel action.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public abstract class BaseChannelAction extends BaseAction {

	protected ChannelService channelService;

	public void setChannelService(ChannelService channelService) {
		this.channelService = channelService;
	}

}
