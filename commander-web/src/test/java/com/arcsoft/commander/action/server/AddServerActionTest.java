package com.arcsoft.commander.action.server;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.Map;
import java.util.Set;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.test.TestLiveAgent;
import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionProxy;

/**
 * Test cases for AddServerAction.
 * 
 * @author fjli
 */
public class AddServerActionTest extends ServerActionSupport<AddServerAction> {

	private ServerGroup group = null;

	@Before
	public void setUp() throws Exception {
		super.setUp();
		group = new ServerGroup();
		group.setName("group_name_add_server");
		group.setType(ServerGroup.TYPE_LIVE);
		serverService.createGroup(group);
		assertNotNull(group.getId());
	}

	@After
	public void tearDown() throws Exception {
		super.tearDown();

		if (group != null) {
			serverService.deleteGroup(group.getId());
			group = null;
		}
	}

	@Test
	public void testExecute() throws Exception {
		request.setParameter("group.id", String.valueOf(group.getId()));
		ActionProxy proxy = getActionProxy("/addServer.action");
		assertNotNull(proxy);
		String result = proxy.execute();
		assertEquals(Action.SUCCESS, result);
		AddServerAction action = (AddServerAction) proxy.getAction();
		Map<Integer, String> maps = action.getGroupTypes();
		Set<Integer> keys = maps.keySet();
		keys.contains(ServerGroup.TYPE_DEFAULT);
		keys.contains(ServerGroup.TYPE_LIVE);
		assertTrue(action.isEditMode());
	}

	@Test
	public void testSave() throws Exception {
		// case 1: add server
		// expect: success
		TestLiveAgent agent = testContext.createAgent1(true);
		Server server1 = agent.getServer();
		request.setParameter("group.id", String.valueOf(group.getId()));
		request.setParameter("group.servers[0].id", server1.getId());
		request.setParameter("group.servers[0].type", String.valueOf(server1.getType()));
		request.setParameter("group.servers[0].name", server1.getName());
		request.setParameter("group.servers[0].ip", server1.getIp());
		request.setParameter("group.servers[0].port", String.valueOf(server1.getPort()));
		request.setParameter("group.servers[0].backup", "false");
		ActionProxy proxy = getActionProxy("/saveServer.action");
		assertNotNull(proxy);
		String result = proxy.execute();
		assertEquals(Action.SUCCESS, result);

		// case 2: add exist server
		// expect: failed
		proxy = getActionProxy("/saveServer.action");
		assertNotNull(proxy);
		result = proxy.execute();
		assertEquals(Action.ERROR, result);
		// check the action errors
		AddServerAction action = (AddServerAction) proxy.getAction();
		assertTrue(action.hasActionErrors());
		String expected = action.getText("server.group.err.server.added", new String[]{server1.getIp()});
		assertEquals(expected, action.getActionErrors().iterator().next());

		// case3: add new server with exist name
		// expect: failed
		TestLiveAgent agent2 = testContext.createAgent2(true);
		Server server2 = agent2.getServer();
		request.removeAllParameters();
		request.setParameter("group.id", String.valueOf(group.getId()));
		request.setParameter("group.servers[0].id", server2.getId());
		request.setParameter("group.servers[0].type", String.valueOf(server2.getType()));
		request.setParameter("group.servers[0].name", server1.getName());
		request.setParameter("group.servers[0].ip", server2.getIp());
		request.setParameter("group.servers[0].port", String.valueOf(server2.getPort()));
		request.setParameter("group.servers[0].backup", "false");
		proxy = getActionProxy("/saveServer.action");
		assertNotNull(proxy);
		result = proxy.execute();
		assertEquals(Action.ERROR, result);
		// check the action errors
		action = (AddServerAction) proxy.getAction();
		assertTrue(action.hasActionErrors());
		expected = action.getText("server.group.err.name.exists", new String[]{server1.getName()});
		assertEquals(expected, action.getActionErrors().iterator().next());

		// case 4: add new server to not exist group
		// expect: failed
		TestLiveAgent agent3 = testContext.createAgent3(true);
		Server server3 = agent3.getServer();
		request.removeAllParameters();
		request.setParameter("group.id", "-1");
		request.setParameter("group.servers[0].id", server3.getId());
		request.setParameter("group.servers[0].type", String.valueOf(server3.getType()));
		request.setParameter("group.servers[0].name", server3.getName());
		request.setParameter("group.servers[0].ip", server3.getIp());
		request.setParameter("group.servers[0].port", String.valueOf(server3.getPort()));
		request.setParameter("group.servers[0].backup", "false");
		proxy = getActionProxy("/saveServer.action");
		assertNotNull(proxy);
		result = proxy.execute();
		assertEquals(Action.ERROR, result);
		// check the action errors
		action = (AddServerAction) proxy.getAction();
		assertTrue(action.hasActionErrors());
		expected = action.getText("server.group.err.not.exists");
		assertEquals(expected, action.getActionErrors().iterator().next());
	}

}
