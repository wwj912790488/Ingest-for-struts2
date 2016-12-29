package com.arcsoft.commander.action.task;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import com.arcsoft.arcvideo.common.utils.StringHelper;
import com.arcsoft.commander.action.BaseAction;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerData;
import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.domain.task.CommanderTask;
import com.arcsoft.commander.service.server.ServerService;
import com.arcsoft.commander.service.task.CustomTaskService;
import com.arcsoft.commander.service.task.builder.ExportTaskXmlBuilder;
import com.arcsoft.web4transcoder.domain.Task;

/**
 * Export task action.
 * 
 * @author fjli
 */
public class ExportTaskAction extends BaseAction {

	private static final long serialVersionUID = -4366944561065576657L;

	private ServerService serverService;
	private CustomTaskService customTaskService;
	private ExportTaskXmlBuilder exportTaskXmlBuilder;
	private List<ServerData<List<Task>>> results;
	private List<String> selectedServers;

	public void setServerService(ServerService serverService) {
		this.serverService = serverService;
	}

	public void setCustomTaskService(CustomTaskService customTaskService) {
		this.customTaskService = customTaskService;
	}

	public void setExportTaskXmlBuilder(ExportTaskXmlBuilder exportTaskXmlBuilder) {
		this.exportTaskXmlBuilder = exportTaskXmlBuilder;
	}

	public List<String> getSelectedServers() {
		return selectedServers;
	}

	public void setSelectedServers(List<String> selectedServers) {
		this.selectedServers = selectedServers;
	}

	public List<ServerData<List<Task>>> getResults() {
		return results;
	}

	/**
	 * List all servers and tasks.
	 */
	public String list() throws Exception {
		List<Task> tasks = customTaskService.getAllTasks(false);
		results = new ArrayList<>();
		for (Task tmp : tasks) {
			CommanderTask task = (CommanderTask) tmp;
			ServerData<List<Task>> serverData = null;
			String serverId = task.getCurServerId();
			ServerGroup liveGroup = null;
			if (StringHelper.isBlank(serverId)) {
				ServerGroup group = serverService.getGroup(task.getGroupId(), false);
				if (group == null || group.getType() != ServerGroup.TYPE_LIVE)
					continue;
				liveGroup = group;
				serverId = "GROUP:" + liveGroup.getId();
			}
			for (ServerData<List<Task>> data : results) {
				if (data.getServer().getId().equals(serverId)) {
					serverData = data;
					break;
				}
			}
			if (serverData == null) {
				Server server = null;
				if (liveGroup != null) {
					server = new Server();
					server.setId(serverId);
					server.setName(liveGroup.getName());
				} else if (!StringHelper.isBlank(serverId)) {
					server = serverService.getServer(serverId);
				}
				if (server == null)
					continue;
				List<Task> list = new ArrayList<>();
				serverData = new ServerData<List<Task>>(server, list);
				results.add(serverData);
			}
			serverData.getData().add(task);
		}
		return SUCCESS;
	}

	/**
	 * Export tasks to XML input stream.
	 */
	public String export() throws Exception {
		return SUCCESS;
	}

	public InputStream getTasksXmlStream() throws Exception {
		List<ServerData<List<Task>>> results = new LinkedList<>();
		if (selectedServers != null) {
			for (String serverId : selectedServers) {
				if (serverId.startsWith("GROUP:")) {
					Integer groupId = StringHelper.toInteger(serverId.substring("GROUP:".length()));
					if (groupId != null) {
						ServerGroup group = serverService.getGroup(groupId, false);
						if (group.getType() == ServerGroup.TYPE_LIVE) {
							Server server = new Server();
							server.setId("GROUP:" + group.getId());
							server.setName(group.getName());
							List<Task> tasks = customTaskService.getTasksByGroupId(groupId);
							results.add(new ServerData<List<Task>>(server, tasks));
							continue;
						}
					}
				}
				Server server = serverService.getServer(serverId);
				if (server == null)
					continue;
				List<Task> tasks = customTaskService.getTasksByCurServerId(serverId);
				results.add(new ServerData<List<Task>>(server, tasks));
			}
		}
		String result = exportTaskXmlBuilder.buildkXml(results);
		return new ByteArrayInputStream(result.getBytes("utf-8"));
	}

}
