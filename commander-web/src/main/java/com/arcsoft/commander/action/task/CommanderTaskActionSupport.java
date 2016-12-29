package com.arcsoft.commander.action.task;

import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.arcsoft.arcvideo.common.utils.StringHelper;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.domain.task.CommanderTask;
import com.arcsoft.commander.service.server.ServerService;
import com.arcsoft.commander.service.task.TaskExecuteService;
import com.arcsoft.web4transcoder.action.task.TaskActionSupport;

@SuppressWarnings("serial")
public class CommanderTaskActionSupport extends TaskActionSupport {

	protected CommanderTask task;
	private List<ServerGroup> serverGroups;
	private ServerService serverService;
	private TaskExecuteService taskExecuteService;

	public void setTaskExecuteService(TaskExecuteService taskExecuteService) {
		this.taskExecuteService = taskExecuteService;
	}

	public TaskExecuteService getTaskExecuteService() {
		return taskExecuteService;
	}

	public void setServerService(ServerService serverService) {
		this.serverService = serverService;
	}

	public ServerService getServerService() {
		return serverService;
	}

	public void setTask(CommanderTask task) {
		this.task = task;
	}

	public CommanderTask getTask() {
		return task;
	}

	private Map<String,String> networks = new HashMap<String, String>();

	@Override
	public String getLocalIpOption(String ethId) {
		return networks.get(ethId);
	}

	public void setServerGroups(){
		//set serverGroups as get all server and group as list and 
		this.serverGroups = this.getServerService().list(true);
		if(serverGroups != null && !serverGroups.isEmpty()){
			for(ServerGroup group : serverGroups){
				List<Server> servers = group.getServers();
				if(servers != null && !servers.isEmpty()){
					sortServerList(servers);
				}
			}
		}
	}
	
	public List<ServerGroup> getServerGroups() {
		if (serverGroups == null) {
			setServerGroups();
		}
		return serverGroups;
	}

	/**
	 * Sort server list by server name. sort by number if name end of a number 
	 * else use the nature sort by name 
	 * 
	 * @param servers server list
	 */
	protected void sortServerList(List<Server> servers){
		final Comparator<String> comparator = StringHelper.createComparatorForStringEndsWithNumber(false);
		Collections.sort(servers, new Comparator<Server>(){
			@Override
			public int compare(Server o1, Server o2) {
				return comparator.compare(o1.getName(), o2.getName());
			}
			
		});
	}

}
