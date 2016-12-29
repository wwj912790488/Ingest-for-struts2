package com.arcsoft.commander.action.server;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.util.List;
import java.util.Map;
import java.util.Set;

import org.junit.Test;

import com.arcsoft.cluster.node.NodeDescription;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.test.TestLiveAgent;
import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionProxy;

/**
 * Test cases for AddGroupAction.
 * 
 * @author fjli
 */
public class AddGroupActionTest extends ServerActionSupport<AddGroupAction> {

	@Test
	public void testExecute() throws Exception {
		ActionProxy proxy = getActionProxy("/addGroup.action");
		assertNotNull(proxy);
		String result = proxy.execute();
		assertEquals(Action.SUCCESS, result);
		AddGroupAction action = (AddGroupAction) proxy.getAction();
		Map<Integer, String> maps = action.getGroupTypes();
		Set<Integer> keys = maps.keySet();
		keys.contains(ServerGroup.TYPE_DEFAULT);
		keys.contains(ServerGroup.TYPE_LIVE);
		assertFalse(action.isEditMode());
	}

	@Test
	public void testSaveGroupOnly() throws Exception {
		// case 1: add group only
		// expect: success
		String groupName = "group_name_save_group_only";
		request.setParameter("group.name", groupName);
		request.setParameter("group.type", String.valueOf(ServerGroup.TYPE_LIVE));
		ActionProxy proxy = getActionProxy("/saveGroup.action");
		assertNotNull(proxy);
		assertFalse(serverService.isExistsGroupName(groupName));
		String result = proxy.execute();
		assertEquals(Action.SUCCESS, result);
		assertTrue(serverService.isExistsGroupName(groupName));

		// case 1: add group only with exist name.
		// expect: failed
		ActionProxy proxy1 = getActionProxy("/saveGroup.action");
		assertNotNull(proxy1);
		result = proxy1.execute();
		assertEquals(Action.ERROR, result);
		AddGroupAction action = (AddGroupAction) proxy1.getAction();
		assertTrue(action.hasActionErrors());
		String expected = action.getText("server.group.err.name.exists", new String[]{groupName});
		assertEquals(expected, action.getActionErrors().iterator().next());
	}

	@Test
	public void testSaveGroupWithServers() throws Exception {
		// case 1: add group with servers.
		// expect: success
		TestLiveAgent agent1 = testContext.createAgent1(true);
		TestLiveAgent agent2 = testContext.createAgent2(true);
		NodeDescription desc1 = agent1.getNode().getDescription();
		NodeDescription desc2 = agent2.getNode().getDescription();
		String groupName = "group_name_save_with_servers_1";
		request.setParameter("group.name", groupName);
		request.setParameter("group.type", String.valueOf(ServerGroup.TYPE_LIVE));
		request.setParameter("group.servers[0].id", desc1.getId());
		request.setParameter("group.servers[0].type", String.valueOf(desc1.getType()));
		request.setParameter("group.servers[0].name", desc1.getName());
		request.setParameter("group.servers[0].ip", desc1.getIp());
		request.setParameter("group.servers[0].port", String.valueOf(desc1.getPort()));
		request.setParameter("group.servers[0].backup", "false");
		request.setParameter("group.servers[1].id", desc2.getId());
		request.setParameter("group.servers[1].type", String.valueOf(desc2.getType()));
		request.setParameter("group.servers[1].name", desc2.getName());
		request.setParameter("group.servers[1].ip", desc2.getIp());
		request.setParameter("group.servers[1].port", String.valueOf(desc2.getPort()));
		request.setParameter("group.servers[1].backup", "true");
		ActionProxy proxy = getActionProxy("/saveGroup.action");
		assertNotNull(proxy);
		String result = proxy.execute();
		assertEquals(Action.SUCCESS, result);
		List<ServerGroup> groups = serverService.list(true);
		boolean groupCreated = false;
		for (ServerGroup group : groups) {
			if (group.getName().equals(groupName)) {
				groupCreated = true;
				List<Server> servers = group.getServers();
				assertNotNull(servers);
				assertEquals(2, servers.size());
				break;
			}
		}
		assertTrue(groupCreated);

		// case 2: add group with servers, and the server already added
		// expect: failed
		groupName = "group_name_save_with_servers_2";
		request.removeAllParameters();
		request.setParameter("group.name", groupName);
		request.setParameter("group.type", String.valueOf(ServerGroup.TYPE_LIVE));
		request.setParameter("group.servers[0].id", desc1.getId());
		request.setParameter("group.servers[0].type", String.valueOf(desc1.getType()));
		request.setParameter("group.servers[0].name", desc1.getName());
		request.setParameter("group.servers[0].ip", desc1.getIp());
		request.setParameter("group.servers[0].port", String.valueOf(desc1.getPort()));
		request.setParameter("group.servers[0].backup", "false");
		proxy = getActionProxy("/saveGroup.action");
		assertNotNull(proxy);
		String result1 = proxy.execute();
		// check the result
		assertEquals(Action.ERROR, result1);
		// check the action errors
		AddGroupAction action = (AddGroupAction) proxy.getAction();
		assertTrue(action.hasActionErrors());
		String expected = action.getText("server.group.err.server.added", new String[]{desc1.getIp()});
		assertEquals(expected, action.getActionErrors().iterator().next());
		// the group should not be created.
		groups = serverService.list(true);
		for (ServerGroup group : groups) {
			if (group.getName().equals(groupName)) {
				fail();
				break;
			}
		}

		// case 3: add group with servers, and the server name already exists
		// expect: failed
		TestLiveAgent agent3 = testContext.createAgent3(true);
		NodeDescription desc3 = agent3.getNode().getDescription();
		groupName = "group_name_save_with_servers_3";
		request.removeAllParameters();
		request.setParameter("group.name", groupName);
		request.setParameter("group.type", String.valueOf(ServerGroup.TYPE_LIVE));
		request.setParameter("group.servers[0].id", desc3.getId());
		request.setParameter("group.servers[0].type", String.valueOf(desc3.getType()));
		request.setParameter("group.servers[0].name", desc1.getName());
		request.setParameter("group.servers[0].ip", desc3.getIp());
		request.setParameter("group.servers[0].port", String.valueOf(desc3.getPort()));
		request.setParameter("group.servers[0].backup", "false");
		proxy = getActionProxy("/saveGroup.action");
		assertNotNull(proxy);
		result = proxy.execute();
		// check the result
		assertEquals(Action.ERROR, result);
		// check the action errors
		action = (AddGroupAction) proxy.getAction();
		assertTrue(action.hasActionErrors());
		expected = action.getText("server.group.err.name.exists", new String[]{desc1.getName()});
		assertEquals(expected, action.getActionErrors().iterator().next());
		// the group should not be created.
		groups = serverService.list(true);
		for (ServerGroup group : groups) {
			if (group.getName().equals(groupName)) {
				fail();
				break;
			}
		}
	}

}
