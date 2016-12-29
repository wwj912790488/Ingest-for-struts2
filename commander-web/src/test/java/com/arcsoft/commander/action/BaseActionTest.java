package com.arcsoft.commander.action;

import org.junit.After;
import org.junit.Before;
import org.springframework.beans.factory.annotation.Autowired;

import com.arcsoft.arcvideo.common.net.NetworkHelper;
import com.arcsoft.commander.cluster.ClusterType;
import com.arcsoft.commander.domain.system.SystemSettings;
import com.arcsoft.commander.service.cluster.ClusterSearchType;
import com.arcsoft.commander.service.system.SystemService;
import com.arcsoft.commander.test.BaseStrutsTestCase;

/**
 * Base action test.
 * 
 * @author fjli
 * @param <T> - the test action.
 */
public abstract class BaseActionTest<T> extends BaseStrutsTestCase<T> {

	@Autowired
	private SystemService systemService;

	@Before
	public void setUp() throws Exception {
		super.setUp();
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
		super.tearDown();
		systemService.saveSettings(new SystemSettings());
		testContext.removeAgents();
	}

}
