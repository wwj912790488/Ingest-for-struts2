package com.arcsoft.commander.action.server;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

import com.arcsoft.commander.action.BaseAction;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.domain.server.ServerGroup;
import com.arcsoft.commander.test.TestLiveAgent;
import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionProxy;

/**
 * Test case for DeleteServerAction
 * @author xpeng
 *
 */
public class DeleteServerActionTest extends ServerActionSupport<DeleteServerAction>{

	@Test
	public void testExecute() throws Exception {
		ServerGroup group = new ServerGroup();
		group.setType(ServerGroup.TYPE_LIVE);
		group.setName("group_name_for_delete_server");
		TestLiveAgent agent = testContext.createAgent1(true);
		Server server = agent.getServer();
		List<Server> servers = new ArrayList<Server>();
		
		//case: delete an existing server
		servers.add(server);
		group.setServers(servers);
		serverService.createGroup(group);
		assertTrue(serverService.isExistsServerName(server.getName()));
		request.setParameter("id", server.getId());
		ActionProxy proxy = getActionProxy("/deleteServer.action");
		DeleteServerAction action = (DeleteServerAction)proxy.getAction();
		String result = proxy.execute();		
		
		assertEquals(Action.SUCCESS, result);
		assertEquals(BaseAction.RC_SUCCESS, action.getCode());
		assertFalse(serverService.isExistsServerName(server.getName()));

		//case3: delete a not existing server, regarded as successful	
		request.setParameter("id", "123456");
		proxy = getActionProxy("/deleteServer.action");
		action = (DeleteServerAction)proxy.getAction();
		result = proxy.execute();
		assertEquals(Action.SUCCESS, result);		
		assertEquals(BaseAction.RC_SUCCESS, action.getCode());
	}

}
