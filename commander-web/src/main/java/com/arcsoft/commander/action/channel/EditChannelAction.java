package com.arcsoft.commander.action.channel;

import com.arcsoft.arcvideo.web.struts.result.ActionResult;
import com.arcsoft.commander.domain.channel.Channel;

/**
 * Action for edit channel.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class EditChannelAction extends BaseChannelAction {

	private Channel channel;
	private ActionResult result;

	public void setChannel(Channel channel) {
		this.channel = channel;
	}

	public Channel getChannel() {
		return channel;
	}

	public ActionResult getResult() {
		return result;
	}

	/**
	 * edit channel view.
	 */
	public String edit() {
		this.channel = channelService.get(channel.getId());
		return SUCCESS;
	}

	/**
	 * Update the channel.
	 */
	public String update() {
		try {
			Channel channelOld = channelService.get(channel.getId());
			channelOld.setName(channel.getName());
			channelService.update(channelOld);
			result = new ActionResult(true);
		} catch (Exception e) {
			result = new ActionResult(false, getText("common.error.unknown"));
		}
		return SUCCESS;
	}

}
