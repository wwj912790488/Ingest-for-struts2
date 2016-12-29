package com.arcsoft.commander.action.task;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerGroup;


/**
 * 
 * @author zw
 */
public class GetServersAction extends CommanderTaskActionSupport {

	private static final long serialVersionUID = 1L;
	
	private ServerGroup group;
	private Map<String, String> serverIdNamePair;
	
	public ServerGroup getGroup() {
		return group;
	}
	
	public void setGroup(ServerGroup group) {
		this.group = group;
	}
	
	public Map<String, String> getServerIdNamePair() {
		return serverIdNamePair;
	}

	public String execute(){
		setServers();
		return SUCCESS;
	}

	private void setServers() {
		if (this.group == null || this.group.getId() == null) {
			setServerGroups();
			List<ServerGroup> groups = this.getServerGroups();
			if (groups != null) {
				List<Server> allOfServer = new ArrayList<>();
				for (ServerGroup group : groups) {
					List<Server> tempServers = group.getServers();
					if (tempServers != null) {
						allOfServer.addAll(tempServers);
					}
				}
				addServers(allOfServer);
			}
		} else {
			ServerGroup serverGroup = getServerService().getGroup(this.group.getId(), true);
			if (serverGroup != null)
				addServers(serverGroup.getServers());
		}
	}

	private void addServers(List<Server> servers) {
		if(servers != null && !servers.isEmpty()){
			sortServerList(servers);
			if (serverIdNamePair == null)
				serverIdNamePair = new LinkedHashMap<>();
			for (Server server : servers) {
				serverIdNamePair.put(server.getId(), server.getName());
			}
		}
	}

}
