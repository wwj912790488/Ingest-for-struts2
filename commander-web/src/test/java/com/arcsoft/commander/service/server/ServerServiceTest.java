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

import org.junit.Before;
import org.junit.Test;

import com.arcsoft.arcvideo.common.net.NetworkHelper;
import com.arcsoft.commander.cluster.NodeType;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.domain.server.SwitchCause;
import com.arcsoft.commander.exception.ObjectAlreadyExistsException;
import com.arcsoft.commander.exception.ObjectNotExistsException;
import com.arcsoft.commander.exception.server.AccessDeniedException;
import com.arcsoft.commander.exception.server.NameExistsException;
import com.arcsoft.commander.exception.server.ServerNotAvailableException;
import com.arcsoft.commander.test.TestLiveAgent;

/**
 * Test cases for ServerService.
 * 
 * @author fjli
 */
public class ServerServiceTest extends BaseServerServiceTest {

	private ServerGroup group;

	@Before
	public void setUp() throws Exception {
		super.setUp();
		group = new ServerGroup();
		group.setName("groupName");
		group.setType(ServerGroup.TYPE_DEFAULT);
		serverService.createGroup(group);
	}

	@Test
	public void testRenameServer() throws IOException {
		// add servers
		TestLiveAgent agent1 = testContext.createAgent1(true);
		Server server1 = agent1.getServer();
		server1.setGroup(group);
		TestLiveAgent agent2 = testContext.createAgent2(true);
		Server server2 = agent2.getServer();
		server2.setGroup(group);
		List<Server> addlist = new ArrayList<Server>();
		addlist.add(server1);
		addlist.add(server2);
		group.setServers(addlist);
		serverService.addServers(group);

		// case1: the server is not exists.
		// expect: throws ObjectNotExistsException
		Server server0 = new Server();
		server0.setId("1");
		server0.setName("FJLI-DEV");
		try {
			serverService.renameServer(server0);
			fail();
		} catch(ObjectNotExistsException e) {
			Server err = (Server) e.getObject();
			assertEquals(server0.getId(), err.getId());
			assertEquals(server0.getName(), err.getName());
		}

		// case2: update to the same name.
		// expect: success
		Server server3 = new Server();
		server3.setId(server1.getId());
		server3.setName(server1.getName());
		serverService.renameServer(server3);

		// case3: update to exists name.
		// expect: throws NameExistsException
		Server server4 = new Server();
		server4.setId(server1.getId());
		server4.setName(server2.getName());
		try {
			serverService.renameServer(server4);
			fail();
		} catch(NameExistsException e) {
			assertEquals(server2.getName(), e.getName());
		}
	}

	@Test
	public void testAddServers() throws IOException {
		// add servers
		TestLiveAgent agent1 = testContext.createAgent1(true);
		Server server1 = agent1.getServer();
		server1.setGroup(group);
		TestLiveAgent agent2 = testContext.createAgent2(true);
		Server server2 = agent2.getServer();
		server2.setGroup(group);
		List<Server> addlist = new ArrayList<Server>();
		addlist.add(server1);
		addlist.add(server2);
		group.setServers(addlist);
		serverService.addServers(group);

		// case1: id already exists
		// expect: throws ObjectAlreadyExistsException 
		Server server3 = new Server();
		server3.setId(server1.getId());
		server3.setName("serverName1");
		server3.setIp(NetworkHelper.getLocalIp());
		server3.setPort(5001);
		server3.setState(Server.STATE_OK);
		server3.setGroup(group);
		addlist.clear();
		addlist.add(server3);
		try {
			group.setServers(addlist);
			serverService.addServers(group);
			fail();
		} catch(ObjectAlreadyExistsException e) {
			Server err = (Server) e.getObject();
			assertEquals(server3.getId(), err.getId());
		}

		// case2: id not exists, but name exists.
		// expect: throws ObjectAlreadyExistsException 
		try {
			server3.setId("server3");
			server3.setName(server1.getName());
			group.setServers(addlist);
			serverService.addServers(group);
			fail();
		} catch(NameExistsException e) {
			assertEquals(server3.getName(), e.getName());
		}

		// case3: transition test, server5 can be added, but server 6 already exists.
		// expect: none data added
		TestLiveAgent agent3 = testContext.createAgent3(true);
		Server server5 = agent3.getServer();
		server5.setGroup(group);
		Server server6 = new Server();
		server6.setType(NodeType.TYPE_LIVE);
		server6.setId(server5.getId());
		server6.setName("serverName1");
		server6.setIp(NetworkHelper.getLocalIp());
		server6.setPort(5001);
		server6.setState(Server.STATE_OK);
		server6.setGroup(group);
		addlist.clear();
		addlist.add(server5);
		addlist.add(server6);
		try {
			group.setServers(addlist);
			serverService.addServers(group);
			fail();
		} catch(ObjectAlreadyExistsException e) {
			Server err = (Server) e.getObject();
			assertEquals(server6.getId(), err.getId());
			assertNull(serverService.getServer("server5"));
		}
	}

	@Test
	public void testGetServer() throws IOException {
		// add servers
		TestLiveAgent agent1 = testContext.createAgent1(true);
		Server server1 = agent1.getServer();
		server1.setGroup(group);
		List<Server> addlist = new ArrayList<Server>();
		addlist.add(server1);
		group.setServers(addlist);
		serverService.addServers(group);

		// case1: get the exists server
		// expect: not null
		Server actual = serverService.getServer("live1");
		assertNotNull(actual);

		// case2: get not exists server
		// expect: null
		actual = serverService.getServer("server2");
		assertNull(actual);
	}

	@Test
	public void testIsExistsServerName() throws IOException {
		// add servers
		TestLiveAgent agent1 = testContext.createAgent1(true);
		Server server1 = agent1.getServer();
		server1.setGroup(group);
		List<Server> addlist = new ArrayList<Server>();
		addlist.add(server1);
		group.setServers(addlist);
		serverService.addServers(group);

		// case1: get the exists server
		// expect: true
		assertTrue(serverService.isExistsServerName(server1.getName()));

		// case2: get not exists server
		// expect: false
		assertFalse(serverService.isExistsServerName("serverName2"));

		// case3: name is null
		// expect: false
		assertFalse(serverService.isExistsServerName(null));
	}

	private abstract class UpdateTestHandler {
		private Server server1;

		UpdateTestHandler() {
			TestLiveAgent agent1 = testContext.createAgent1(true);
			server1 = agent1.getServer();
			server1.setState(Server.STATE_OK);
			server1.setBackup(false);
			server1.setAlive(true);
			server1.setGroup(group);
			List<Server> addlist = new ArrayList<Server>();
			addlist.add(server1);
			group.setServers(addlist);
			serverService.addServers(group);
		}

		void testNotExists() {
			Server server2 = new Server();
			server2.setType(NodeType.TYPE_LIVE);
			server2.setId("INVALID_SERVER_ID");
			server2.setName("NEW_SERVER_NAME");
			server2.setIp("127.0.0.1");
			server2.setPort(5002);
			server2.setState(Server.STATE_NETWORK_ERROR);
			server2.setBackup(true);
			server2.setAlive(false);
			try {
				doUpdate(server2);
				fail();
			} catch(ObjectNotExistsException e) {
				Server err = (Server) e.getObject();
				assertEquals(server2.getId(), err.getId());
			}
		}

		void testSuccess() {
			Server server2 = new Server();
			server2.setId(server1.getId());
			server2.setName("NEW_SERVER_NAME");
			server2.setIp("127.0.0.1");
			server2.setPort(5002);
			server2.setState(Server.STATE_NETWORK_ERROR);
			server2.setBackup(true);
			server2.setAlive(false);
			doUpdate(server2);
			Server saved = serverService.getServer(server1.getId());
			verify(server2, saved);
		}

		void doTest() {
			testNotExists();
			testSuccess();
		}

		abstract void doUpdate(Server server);
		abstract void verify(Server expected, Server actual);
	}

	@Test
	public void testUpdateState() {
		new UpdateTestHandler() {
			@Override
			void doUpdate(Server server) {
				serverService.updateState(server);
			}

			@Override
			void verify(Server expected, Server actual) {
				assertEquals(expected.getState(), actual.getState());
			}
		}.doTest();
	}

	@Test
	public void testUpdateAddress() {
		new UpdateTestHandler() {
			@Override
			void doUpdate(Server server) {
				serverService.updateAddress(server);
			}

			@Override
			void verify(Server expected, Server actual) {
				assertEquals(expected.getIp(), actual.getIp());
				assertEquals(expected.getPort(), actual.getPort());
			}
		}.doTest();
	}

	@Test
	public void testUpdateOnlineState() {
		new UpdateTestHandler() {
			@Override
			void doUpdate(Server server) {
				serverService.updateOnlineState(server);
			}

			@Override
			void verify(Server expected, Server actual) {
				assertEquals(expected.isAlive(), actual.isAlive());
			}
		}.doTest();
	}

	@Test
	public void testRemoveServer() throws IOException {
		// add server
		TestLiveAgent agent1 = testContext.createAgent1(true);
		Server server1 = agent1.getServer();
		server1.setGroup(group);
		List<Server> addlist = new ArrayList<Server>();
		addlist.add(server1);
		group.setServers(addlist);
		serverService.addServers(group);

		// case1: delete the not exist server
		// expect: don't throw exception
		Server server0 = new Server();
		server0.setId("INVALID_SERVER_ID");
		serverService.removeServer(server0);

		// case2: delete the exist server
		// expect: success
		serverService.removeServer(server1);
	}


	@Test
	public void testSwitchServer() throws IOException {
		// add servers
		TestLiveAgent agent1 = testContext.createAgent1(true);
		Server server1 = agent1.getServer();
		server1.setGroup(group);
		TestLiveAgent agent2 = testContext.createAgent2(true);
		Server server2 = agent2.getServer();
		server2.setGroup(group);
		TestLiveAgent agent3 = testContext.createAgent3(true);
		Server server3 = agent3.getServer();
		server3.setBackup(true);
		server3.setGroup(group);
		TestLiveAgent agent4 = testContext.createAgent4(true);
		Server server4 = agent4.getServer();
		server4.setBackup(true);
		server4.setGroup(group);
		List<Server> addlist = new ArrayList<Server>();
		addlist.add(server1);
		addlist.add(server2);
		addlist.add(server3);
		addlist.add(server4);
		group.setServers(addlist);
		serverService.addServers(group);

		// case1: the server is not exists.
		// expect: throws ObjectNotExistsException
		try {
			serverService.updateWorkerServer("1", "live3", SwitchCause.HEART_BEAT_TIMEOUT);
			fail();
		} catch(ObjectNotExistsException e) {
			Server err = (Server) e.getObject();
			assertEquals(err, null);
		}

		// case2: the server is a backup server.
		// expect: throws AccessDeniedException
		try {
			serverService.updateWorkerServer("live3", "live4", SwitchCause.HEART_BEAT_TIMEOUT);
			fail();
		} catch(AccessDeniedException e) {
			;
		}

		// case3: the backup server is not exists.
		// expect: throws ObjectNotExistsException
		try {
			serverService.updateWorkerServer("live1", "1", SwitchCause.HEART_BEAT_TIMEOUT);
			fail();
		} catch(ObjectNotExistsException e) {
			Server err = (Server) e.getObject();
			assertEquals(err, null);
		}
		
		// case4: the backup server is not alive.
		// expect: throws ServerNotAvailableException
		server3.setAlive(false);
		try {
			serverService.updateWorkerServer("live1", "live3", SwitchCause.HEART_BEAT_TIMEOUT);
			fail();
		} catch(ServerNotAvailableException e) {
			;
		}
		
		// case5: the networkState of backup server is wrong
		// expect: throws ServerNotAvailableException
		// to do
	}	
}
