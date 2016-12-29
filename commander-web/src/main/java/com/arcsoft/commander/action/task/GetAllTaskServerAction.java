package com.arcsoft.commander.action.task;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerGroup;


/**
 * 
 * @author zw
 */
public class GetAllTaskServerAction extends CommanderTaskActionSupport {

	private static final long serialVersionUID = 1L;
	
	private LinkedHashMap<String, String> serverMap;
	
	/**
	 * @return the serverMap
	 */
	public LinkedHashMap<String, String> getServerMap() {
		return serverMap;
	}

	@Override
	public String execute() throws Exception {
		setServerMap();
		return super.execute();
	}
	
	
	public void setServerMap(){
		setServerGroups();
		List<ServerGroup> groups = this.getServerGroups();
		if(groups != null){
			this.serverMap = new LinkedHashMap<>();
			List<Server> allOfServer = new ArrayList<>();
			for (ServerGroup group : groups) {
				List<Server> tempServers = group.getServers();
				if(tempServers != null){
					allOfServer.addAll(tempServers);
				}
			}
			if(!allOfServer.isEmpty()){
				sortServerList(allOfServer);
				for (Server server : allOfServer) {
					if(!server.isBackup()){
						this.serverMap.put(server.getId(), server.getName());
					}
				}
			}

		}

	}
	

}
