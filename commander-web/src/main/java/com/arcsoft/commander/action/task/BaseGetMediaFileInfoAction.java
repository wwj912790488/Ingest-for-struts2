package com.arcsoft.commander.action.task;

import java.util.List;

import org.hibernate.annotations.common.util.StringHelper;

import com.arcsoft.commander.action.BaseAction;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.service.server.ServerService;
import com.arcsoft.commander.service.task.MediaInfoService;


/**
 * Base get media file info.
 * 
 * @author fjli
 */
public class BaseGetMediaFileInfoAction extends BaseAction {

	private static final long serialVersionUID = -2804157655988893779L;

	private String curServerID;
	private String groupID;
	private Integer type;

	protected String uri;
	protected String eth;

	protected MediaInfoService cmdMediaInfoService;
	private ServerService serverService;

	public void setCmdMediaInfoService(MediaInfoService cmdMediaInfoService) {
		this.cmdMediaInfoService = cmdMediaInfoService;
	}

	public void setServerService(ServerService serverService) {
		this.serverService = serverService;
	}

	public void setEth(String eth) {
		this.eth = eth;
	}

	public void setUri(String uri) {
		this.uri = uri;
	}

	public void setCurServerID(String curServerID) {
		this.curServerID = curServerID;
	}

	public void setGroupID(String groupID) {
		this.groupID = groupID;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	/**
	 * Get server.
	 */
	protected Server getServer() {
		if (type == null) {
			return null;
		} else if (type == 1) {
			ServerGroup group = serverService.getGroup(Integer.parseInt(groupID), true);
			if (group != null) {
				List<Server> servers = group.getServers();
				if (servers != null && !servers.isEmpty()) {
					for (Server server : servers) {
						if (!server.isBackup())
							return server;
					}
				}
			}
			return null;
		} else if (StringHelper.isNotEmpty(curServerID)) {
			return serverService.getServer(curServerID);
		} else if (groupID != null) {
			ServerGroup group = serverService.getGroup(Integer.parseInt(groupID), true);
			if (group != null) {
				List<Server> servers = group.getServers();
				if (servers != null && !servers.isEmpty()) {
					for (Server server : servers) {
						if (server.isAlive() && server.getState() == Server.STATE_OK) {
							return server;
						}
					}
				}
			}
		}
		return null;
	}

}
