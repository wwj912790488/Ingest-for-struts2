package com.arcsoft.commander.action.server;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.test.TestLiveAgent;
import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionProxy;
/**
 * Test case for ListServerAction
 * @author xpeng
 *
 */
public class ListServerActionTest extends ServerActionSupport<ListServerAction>{

	@Test
	public void testList() throws Exception {	
		ServerGroup group = new ServerGroup();		
		group.setName("group_name_list_server1");
		group.setType(ServerGroup.TYPE_LIVE);
		TestLiveAgent agent1 = testContext.createAgent1(true);
		TestLiveAgent agent2 = testContext.createAgent2(true);
		List<Server> servers = new ArrayList<Server>();
		servers.add(agent1.getServer());
		servers.add(agent2.getServer());
		group.setServers(servers);
		serverService.createGroup(group);
		
		group = new ServerGroup();
		group.setName("group_name_list_server2");
		group.setType(ServerGroup.TYPE_DEFAULT);
		TestLiveAgent agent3 = testContext.createAgent3(true);
		TestLiveAgent agent4 = testContext.createAgent4(true);
		servers = new ArrayList<Server>();
		servers.add(agent3.getServer());
		servers.add(agent4.getServer());
		group.setServers(servers);
		serverService.createGroup(group);
		
		ActionProxy proxy = getActionProxy("/listServer.action");
		ListServerAction action = (ListServerAction)proxy.getAction();
		String result = proxy.execute();
		assertEquals(Action.SUCCESS, result);
		
		List<ServerGroup> groups = action.getGroups();
		assertTrue(groups.size() >= 2);		
	}

}
