package com.arcsoft.commander.action.channel;

import java.util.ArrayList;
import java.util.List;

import com.arcsoft.arcvideo.web.struts.result.ActionResult;
import com.arcsoft.commander.domain.channel.Channel;
import com.arcsoft.commander.domain.media.AudioInfo;
import com.arcsoft.commander.domain.media.MediaInfo;
import com.arcsoft.commander.domain.media.ProgramInfo;
import com.arcsoft.commander.domain.media.VideoInfo;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.service.server.ServerService;
import com.arcsoft.commander.service.task.MediaInfoService;

/**
 * Action for view / add / edit channel.
 * 
 * @author fjli
 */
@SuppressWarnings("serial")
public class AddChannelAction extends BaseChannelAction {

	private String uri;
	private Integer groupId;
	private ActionResult result;
	private List<Channel> channels = new ArrayList<>();
	private MediaInfo mediaInfo;
	private List<ServerGroup> groups;
	private MediaInfoService cmdMediaInfoService;
	private ServerService serverService;
	private	String serverId;

	public void setServerService(ServerService serverService) {
		this.serverService = serverService;
	}

	public void setCmdMediaInfoService(MediaInfoService cmdMediaInfoService) {
		this.cmdMediaInfoService = cmdMediaInfoService;
	}

	public List<ServerGroup> getGroups() {
		return groups;
	}

	public String getUri() {
		return uri;
	}

	public void setUri(String uri) {
		this.uri = uri;
	}

	public Integer getGroupId() {
		return groupId;
	}

	public void setGroupId(Integer groupId) {
		this.groupId = groupId;
	}

	public MediaInfo getMediaInfo() {
		return mediaInfo;
	}

	public List<Channel> getChannels() {
		return channels;
	}

	public String getChannelsIdList() {
		String strIds = "";
		for(int index = 0;index < channels.size();index++){
			if (index != 0){
				strIds += ",";
			}
			strIds += channels.get(index).getId().toString();
		}
		return strIds;
	}

	public void setChannels(List<Channel> channels) {
		this.channels = channels;
	}

	public String getServerId() {
		return serverId;
	}

	public void setServerId(String serverId) {
		this.serverId = serverId;
	}

	/**
	 * The action result for save/update.
	 */
	public ActionResult getResult() {
		return result;
	}


	/**
	 * Add channel view.
	 */
	public String add() {
		this.groups = serverService.list(false);
		return SUCCESS;
	}

	/**
	 * Show programs relation to the uri.
	 */
	public String show() {
		Server selectedServer = null;
		if (groupId != null) {
			ServerGroup group = serverService.getGroup(groupId, true);
			if (group != null && !group.getServers().isEmpty()) {
				for (Server server : group.getServers()) {
					if (server.isAlive() & server.getState() == Server.STATE_OK) {
						selectedServer = server;
						break;
					}
				}
			}
		}else if(serverId != null && !serverId.isEmpty()) {
			Server server  = serverService.getServer(serverId);
			groupId = server.getGroup().getId();
			if (server.isAlive() & server.getState() == Server.STATE_OK) {
				selectedServer = server;
			}
		}
		mediaInfo = cmdMediaInfoService.getMediaInfoObject(selectedServer, uri, null);
		//mediaInfo = new MediaInfo();
		return SUCCESS;
	}

	/**
	 * Save the channel.
	 */
	public String save() {
		try {
			for (Channel channel : channels) {
				channelService.save(channel);
			}
			result = new ActionResult(true);
		} catch (Exception e) {
			result = new ActionResult(false, getText("common.error.unknown"));
		}
		return SUCCESS;
	}

}
