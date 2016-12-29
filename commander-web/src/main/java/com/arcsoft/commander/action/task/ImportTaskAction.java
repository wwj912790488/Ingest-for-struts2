package com.arcsoft.commander.action.task;

import java.io.File;
import java.io.FileInputStream;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.apache.log4j.Logger;

import com.arcsoft.arcvideo.common.utils.IOUtils;
import com.arcsoft.arcvideo.common.utils.StringHelper;
import com.arcsoft.arcvideo.web.struts.result.ActionResult;
import com.arcsoft.commander.action.BaseAction;
import com.arcsoft.commander.common.struts.UploadFileCacheManager;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerData;
import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.domain.task.CommanderTask;
import com.arcsoft.commander.service.server.ServerService;
import com.arcsoft.commander.service.task.CustomTaskService;
import com.arcsoft.web4transcoder.domain.Task;
import com.arcsoft.web4transcoder.service.parser.XmlParser;
import com.arcsoft.web4transcoder.type.TaskStatus;

/**
 * Export task action.
 * 
 * @author fjli
 */
public class ImportTaskAction extends BaseAction {

	private static final long serialVersionUID = -4366944561065576657L;
	private Logger log = Logger.getLogger(ImportTaskAction.class);
	private ServerService serverService;
	private CustomTaskService customTaskService;
	private XmlParser importTaskXmlParser;
	private UploadFileCacheManager uploadFileCacheManager;
	private File xmlFile;
	private List<ServerData<List<Task>>> data;
	private List<ServerGroup> serverGroups;
	private String sourceServer;
	private String targetServer;
	private String uploadKey;
	private ActionResult result;

	public void setServerService(ServerService serverService) {
		this.serverService = serverService;
	}

	public void setCustomTaskService(CustomTaskService customTaskService) {
		this.customTaskService = customTaskService;
	}

	public void setImportTaskXmlParser(XmlParser importTaskXmlParser) {
		this.importTaskXmlParser = importTaskXmlParser;
	}

	public void setUploadFileCacheManager(UploadFileCacheManager uploadFileCacheManager) {
		this.uploadFileCacheManager = uploadFileCacheManager;
	}

	public List<ServerData<List<Task>>> getData() {
		return data;
	}

	public List<ServerGroup> getServerGroups() {
		return serverGroups;
	}

	public void setXmlFile(File xmlFile) {
		this.xmlFile = xmlFile;
	}

	public void setUploadKey(String uploadKey) {
		this.uploadKey = uploadKey;
	}

	public String getUploadKey() {
		return uploadKey;
	}

	public void setSourceServer(String sourceServer) {
		this.sourceServer = sourceServer;
	}

	public void setTargetServer(String targetServer) {
		this.targetServer = targetServer;
	}

	public ActionResult getResult() {
		return result;
	}

	/**
	 * List all servers and tasks.
	 */
	@SuppressWarnings("unchecked")
	public String list() throws Exception {
		if (xmlFile == null || !xmlFile.exists())
			return ERROR;
		FileInputStream fis = null;
		try {
			// parse xml file.
			fis = new FileInputStream(xmlFile);
			data = (List<ServerData<List<Task>>>) importTaskXmlParser.parse(fis);

			// invalid data file.
			if (data == null || data.isEmpty())
				return ERROR;

			// get all server groups
			serverGroups = serverService.list(true);
			if (serverGroups != null && !serverGroups.isEmpty()) {
				for (ServerGroup group : serverGroups) {
					List<Server> servers = group.getServers();
					if (servers != null && !servers.isEmpty()) {
						final Comparator<String> comparator = StringHelper.createComparatorForStringEndsWithNumber(false);
						Collections.sort(servers, new Comparator<Server>() {
							@Override
							public int compare(Server o1, Server o2) {
								return comparator.compare(o1.getName(), o2.getName());
							}
						});
					}
				}
			}

			// add file to cache manager
			uploadKey = uploadFileCacheManager.addFile(xmlFile);
			return SUCCESS;
		} catch(Exception e) {
			log.error("list uploaded tasks failed", e);
			return ERROR;
		} finally {
			IOUtils.closeQuietly(fis);
		}
	}

	/**
	 * Import tasks to XML input stream.
	 */
	public String save() throws Exception {
		xmlFile = uploadFileCacheManager.getFile(uploadKey);
		if (xmlFile == null) {
			result = new ActionResult(false, getText("task.import.error.invalid.file"));
			return ERROR;
		}

		FileInputStream fis = null;
		try {
			fis = new FileInputStream(xmlFile);
			@SuppressWarnings("unchecked")
			List<ServerData<List<Task>>> data = (List<ServerData<List<Task>>>) importTaskXmlParser.parse(fis);
			List<Task> tasks = null;
			for (ServerData<List<Task>> serverData : data) {
				if (sourceServer.equals(serverData.getServer().getId())) {
					tasks = serverData.getData();
					break;
				}
			}
			int count = 0;
			if (tasks != null && !tasks.isEmpty()) {
				Server server = null;
				ServerGroup group = null;
				if (targetServer.startsWith("SERVER:")) {
					server = serverService.getServer(targetServer.substring("SERVER:".length()));
					if (server == null) {
						result = new ActionResult(false, getText("server.error.not.exists"));
						return ERROR;
					}
					group = serverService.getGroup(server.getGroup().getId(), false);
					if (group == null) {
						result = new ActionResult(false, getText("server.group.err.not.exists"));
						return ERROR;
					} else if (group.getType() != ServerGroup.TYPE_DEFAULT) {
						result = new ActionResult(false, getText("task.import.error.unknown"));
						return ERROR;
					}
				} else {
					group = serverService.getGroup(StringHelper.toInteger(targetServer), false);
					if (group == null) {
						result = new ActionResult(false, getText("server.group.err.not.exists"));
						return ERROR;
					} else if (group.getType() != ServerGroup.TYPE_LIVE) {
						result = new ActionResult(false, getText("task.import.error.unknown"));
						return ERROR;
					}
				}
				for (Task tmp : tasks) {
					CommanderTask task = (CommanderTask) tmp;
					task.setGroupId(group.getId());
					task.setCurServerId(server != null ? server.getId() : null);
					task.setType(group.getType());
					task.setState(TaskStatus.PENDING);
					customTaskService.saveTask(task);
					count++;
				}
			}
			result = new ActionResult(true, getText("task.import.success", new String[] { String.valueOf(count) }));
			return SUCCESS;
		} catch(Exception e) {
			log.error("import tasks failed.", e);
			result = new ActionResult(false, getText("task.import.error.unknown"));
			return ERROR;
		} finally {
			IOUtils.closeQuietly(fis);
			uploadFileCacheManager.deleteFile(uploadKey);
		}
	}

}
