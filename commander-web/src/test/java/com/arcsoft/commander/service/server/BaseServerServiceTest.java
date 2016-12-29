package com.arcsoft.commander.service.server;

import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.springframework.beans.factory.annotation.Autowired;

import com.arcsoft.arcvideo.common.net.NetworkHelper;
import com.arcsoft.commander.cluster.ClusterType;
import com.arcsoft.commander.dao.server.ServerDao;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.domain.system.SystemSettings;
import com.arcsoft.commander.service.cluster.ClusterSearchType;
import com.arcsoft.commander.service.system.SystemService;
import com.arcsoft.commander.test.BaseSpringContextTests;

/**
 * Declare common methods and services for server group test and server service test.
 * 
 * @author fjli
 */
public abstract class BaseServerServiceTest extends BaseSpringContextTests {

	@Autowired
	private SystemService systemService;
	@Autowired
	protected ServerService serverService;
	@Autowired
	private ServerDao serverDao;

	/**
	 * Remove all servers and groups from database.
	 */
	protected void removeAllData() {
		List<Server> list = serverDao.listAll();
		for (Server server : list) {
			serverDao.removeServer(server);
		}
		List<ServerGroup> groups = serverService.list(false);
		for (ServerGroup group : groups) {
			serverService.deleteGroup(group.getId());
		}
	}

	@Before
	public void setUp() throws Exception {
		removeAllData();
		SystemSettings settings = new SystemSettings();
		settings.setClusterIp("239.8.8.1");
		settings.setClusterPort(8901);
		settings.setClusterType(ClusterType.LIVE);
		settings.setBindAddr(NetworkHelper.getLocalIp());
		settings.setHeartbeatInterval(100);
		settings.setHeartbeatTimeout(2000);
		settings.setTimeToLive(1);
		settings.setClusterSearchType(ClusterSearchType.SEARCH_BY_MULTICAST);
		systemService.saveSettings(settings);
	}

	@After
	public void tearDown() throws Exception {
		removeAllData();
		systemService.saveSettings(new SystemSettings());
		testContext.removeAgents();
	}

}
