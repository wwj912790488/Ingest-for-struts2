package com.arcsoft.commander.action.server;

import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.springframework.beans.factory.annotation.Autowired;

import com.arcsoft.commander.action.BaseActionTest;
import com.arcsoft.commander.dao.server.ServerDao;
import com.arcsoft.commander.dao.settings.EthDao;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.service.server.ServerService;

/**
 * Base action test for server actions.
 * 
 * @author fjli
 * @param <T>
 *            - the test action
 */
public abstract class ServerActionSupport<T> extends BaseActionTest<T> {

	@Autowired
	protected ServerService serverService;

	@Autowired
	private ServerDao serverDao;

	@Autowired
	private EthDao ethDao;

	@Override
	protected String[] getModuleConfig() {
		return new String[] {"com/arcsoft/commander/action/server/struts_actions.xml"};
	}

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
		super.setUp();
		removeAllData();
	}

	@After
	public void tearDown() throws Exception {
		super.tearDown();
		removeAllData();
	}
}
