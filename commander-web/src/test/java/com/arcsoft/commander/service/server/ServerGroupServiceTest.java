package com.arcsoft.commander.service.server;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.exception.ObjectAlreadyExistsException;
import com.arcsoft.commander.exception.ObjectNotExistsException;
import com.arcsoft.commander.exception.server.NameExistsException;
import com.arcsoft.commander.exception.server.TooManyServerException;
import com.arcsoft.commander.test.TestLiveAgent;

/**
 * Test cases for ServerGroupService.
 * 
 * @author fjli
 */
public class ServerGroupServiceTest extends BaseServerServiceTest {

	@Test
	public void testGetGroup() throws IOException {
		// create test group and servers
		ServerGroup group1 = new ServerGroup();
		group1.setName("group1");
		group1.setType(ServerGroup.TYPE_DEFAULT);
		TestLiveAgent agent = testContext.createAgent1(true);
		Server server1 = agent.getServer();
		server1.setState(Server.STATE_OK);
		server1.setGroup(group1);
		List<Server> servers = new ArrayList<Server>();
		servers.add(server1);
		group1.setServers(servers);
		serverService.createGroup(group1);

		// case1: get the exists group, but don't list servers.
		// expect: success
		ServerGroup actual = serverService.getGroup(group1.getId(), false);
		assertNotNull(actual);
		assertTrue(actual.getServers() == null || actual.getServers().isEmpty());
		actual = serverService.getGroup(group1.getId(), true);
		assertNotNull(actual);
		assertNotNull(actual.getServers());

		// case2: get the exists group, and list servers.
		// expect: success
		serverService.getGroup(group1.getId(), false);
		assertNotNull(actual);
		List<Server> actualList = actual.getServers();
		assertNotNull(actualList);
		assertEquals(1, actualList.size());
		Server actualServer = actualList.iterator().next();
		assertEquals(server1.getId(), actualServer.getId());
	}

	@Test
	public void testIsExistsGroupName() {
		// create group for testing
		ServerGroup group1 = new ServerGroup();
		group1.setName("group1");
		group1.setType(ServerGroup.TYPE_DEFAULT);
		serverService.createGroup(group1);

		// case1: the group name is exist
		// expect: return true
		assertTrue(serverService.isExistsGroupName("group1"));

		// case2: the group name is not exist
		// expect: return false
		assertFalse(serverService.isExistsGroupName("group2"));

		// case3: null value test
		// expect: return false
		assertFalse(serverService.isExistsGroupName(null));
	}

	@Test
	public void testRenameGroup() {
		// add groups for testing
		ServerGroup group1 = new ServerGroup();
		group1.setName("group1");
		group1.setType(ServerGroup.TYPE_DEFAULT);
		serverService.createGroup(group1);
		ServerGroup group2 = new ServerGroup();
		group2.setName("group2");
		group2.setType(ServerGroup.TYPE_DEFAULT);
		serverService.createGroup(group2);

		// case1: the group is not exists
		// expect: throws ObjectNotExistsException
		ServerGroup group3 = new ServerGroup();
		group3.setId(-1);
		group3.setName(group2.getName());
		try {
			serverService.renameGroup(group3);
			fail();
		} catch(ObjectNotExistsException e) {
			ServerGroup err = (ServerGroup) e.getObject();
			assertEquals(group3.getId(), err.getId());
			assertEquals(group3.getName(), err.getName());
		}

		// case2: the group is exist, but name already exist.
		// expect: throws NameExistsException
		ServerGroup group4 = new ServerGroup();
		group4.setId(group1.getId());
		group4.setName(group2.getName());
		try {
			serverService.renameGroup(group4);
			fail();
		} catch(NameExistsException e) {
			assertEquals(group4.getName(), e.getName());
		}

		// case3: the group is exists and name is not exists
		// expect: success
		ServerGroup group5 = new ServerGroup();
		group5.setId(group1.getId());
		group5.setName("groupName5");
		serverService.renameGroup(group5);
	}

	/**
	 * Add more than 2 servers for 1+1 live group, it will throws TooManyServerException
	 * 
	 * @throws IOException
	 */
	@Test
	public void testCreateLiveGroup() throws IOException {
		ServerGroup group1 = new ServerGroup();
		group1.setName("group1");
		group1.setType(ServerGroup.TYPE_LIVE);
		TestLiveAgent agent = testContext.createAgent1(true);
		Server server1 = agent.getServer();
		server1.setState(Server.STATE_OK);
		server1.setGroup(group1);
		TestLiveAgent agent2 = testContext.createAgent2(true);
		Server server2 = agent2.getServer();
		server2.setState(Server.STATE_OK);
		server2.setGroup(group1);
		TestLiveAgent agent3 = testContext.createAgent3(true);
		Server server3 = agent3.getServer();
		server3.setState(Server.STATE_OK);
		server3.setGroup(group1);

		List<Server> servers = new ArrayList<Server>();
		servers.add(server1);
		servers.add(server2);
		servers.add(server3);
		group1.setServers(servers);

		// TooManyServerException will be thrown
		try {
			serverService.createGroup(group1);
			fail();
		} catch(TooManyServerException e) {
			// ignore
		}

		// Group must not be created.
		assertFalse(serverService.isExistsGroupName(group1.getName()));
	}

	@Test
	public void testCreateDefaultGroup() throws IOException {
		// case1: create group1 with server1.
		// expect: success
		ServerGroup group1 = new ServerGroup();
		group1.setName("group1");
		group1.setType(ServerGroup.TYPE_DEFAULT);
		TestLiveAgent agent = testContext.createAgent1(true);
		Server server1 = agent.getServer();
		server1.setState(Server.STATE_OK);
		server1.setGroup(group1);
		List<Server> servers = new ArrayList<Server>();
		servers.add(server1);
		group1.setServers(servers);
		serverService.createGroup(group1);

		// case2: create group2 with server1
		// expect: throws ObjectAlreadyExistsException
		ServerGroup group2 = new ServerGroup();
		group2.setName("group2");
		group2.setType(ServerGroup.TYPE_DEFAULT);
		group2.setServers(servers);
		try {
			serverService.createGroup(group2);
			fail();
		} catch(ObjectAlreadyExistsException e) {
			Server err = (Server) e.getObject();
			assertEquals(server1.getId(), err.getId());
		}

		// case3: create group2 with new server but server name is exist.
		// expect: throws NameExistsException
		ServerGroup group3 = new ServerGroup();
		group3.setName("group2");
		group3.setType(ServerGroup.TYPE_DEFAULT);
		TestLiveAgent agent2 = testContext.createAgent2(true);
		Server server2 = agent2.getServer();
		server2.setName(server1.getName());
		server2.setGroup(group2);
		servers.clear();
		servers.add(server2);
		group3.setServers(servers);
		try {
			serverService.createGroup(group3);
			fail();
		} catch(NameExistsException e) {
			assertEquals(server2.getName(), e.getName());
		}

		// case4: create group with group1 name
		// expect: throws NameExistsException
		ServerGroup group4 = new ServerGroup();
		group4.setName(group1.getName());
		group4.setType(ServerGroup.TYPE_DEFAULT);
		try {
			serverService.createGroup(group4);
			fail();
		} catch(NameExistsException e) {
			assertEquals(group4.getName(), e.getName());
		}
	}

	@Test
	public void testDeleteGroup() throws IOException {
		// create group for testing
		ServerGroup group1 = new ServerGroup();
		group1.setName("group1");
		group1.setType(ServerGroup.TYPE_DEFAULT);
		TestLiveAgent agent = testContext.createAgent1(true);
		Server server1 = agent.getServer();
		server1.setState(Server.STATE_OK);
		server1.setGroup(group1);
		TestLiveAgent agent2 = testContext.createAgent2(true);
		Server server2 = agent2.getServer();
		server2.setState(Server.STATE_OK);
		server2.setGroup(group1);
		List<Server> servers = new ArrayList<Server>();
		servers.add(server1);
		servers.add(server2);
		group1.setServers(servers);
		serverService.createGroup(group1);

		// case1: the server is not exists
		// expect: none exception
		serverService.deleteGroup(-1);

		// case3: the servers can be delete
		// expect: success
		server2.setState(Server.STATE_OK);
		serverService.updateState(server2);
		serverService.deleteGroup(group1.getId());
		assertNull(serverService.getGroup(group1.getId(), false));
		assertNull(serverService.getServer(server1.getId()));
		assertNull(serverService.getServer(server2.getId()));
	}

	@Test
	public void testListAll() throws IOException {
		// create group for testing
		ServerGroup group1 = new ServerGroup();
		group1.setName("group1");
		group1.setType(ServerGroup.TYPE_DEFAULT);
		TestLiveAgent agent1 = testContext.createAgent1(true);
		Server server1 = agent1.getServer();
		server1.setGroup(group1);
		List<Server> servers = new ArrayList<Server>();
		servers.add(server1);
		group1.setServers(servers);
		serverService.createGroup(group1);

		// case1: list with isIncludeServers = false
		// expect: list all groups without servers
		List<ServerGroup> groups = serverService.list(false);
		assertFalse(groups.isEmpty());
		ServerGroup actualGroup = groups.get(0);
		assertEquals(group1.getId(), actualGroup.getId());
		assertNull(actualGroup.getServers());

		// case2: list with isIncludeServers = true
		// expect: list all groups without servers
		groups = serverService.list(true);
		assertFalse(groups.isEmpty());
		actualGroup = groups.get(0);
		assertEquals(group1.getId(), actualGroup.getId());
		servers = actualGroup.getServers();
		assertFalse(servers.isEmpty());
		Server actualServer = servers.get(0);
		assertEquals(server1.getId(), actualServer.getId());

		// case3: delete all groups.
		// expect: the list is empty
		removeAllData();
		groups = serverService.list(false);
		assertTrue(groups.isEmpty());
	}

}
