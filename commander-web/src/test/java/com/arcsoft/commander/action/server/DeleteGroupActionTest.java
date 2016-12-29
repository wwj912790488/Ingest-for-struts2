package com.arcsoft.commander.action.server;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
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
public class DeleteGroupActionTest extends ServerActionSupport<DeleteServerAction>{

	@Test
	public void testExecute() throws Exception {
		ServerGroup group = new ServerGroup();
		
		//case: delete an empty group
		group.setName("group_name_delete_group");
		group.setType(ServerGroup.TYPE_DEFAULT);
		serverService.createGroup(group);
		assertNotNull(group.getId());	
		assertTrue(serverService.isExistsGroupName(group.getName()));
		request.setParameter("id", group.getId().toString());
		ActionProxy proxy = getActionProxy("/deleteGroup.action");
		DeleteGroupAction action = (DeleteGroupAction)proxy.getAction();
		String result = proxy.execute();		
		assertFalse(serverService.isExistsGroupName(group.getName()));
		assertEquals(Action.SUCCESS, result);
		assertEquals(BaseAction.RC_SUCCESS, action.getCode());
		
		//case: delete a group with idle servers
		List<Server> servers = new ArrayList<Server>();
		TestLiveAgent agent = testContext.createAgent1(true);
		Server server = agent.getServer();
		servers.add(server);
		group.setServers(servers);
		serverService.createGroup(group);
		assertNotNull(group.getId());	
		request.setParameter("id", group.getId().toString());
		proxy = getActionProxy("/deleteGroup.action");
		action = (DeleteGroupAction)proxy.getAction();
		result = proxy.execute();		
		assertFalse(serverService.isExistsGroupName(group.getName()));
		assertEquals(Action.SUCCESS, result);
		assertEquals(BaseAction.RC_SUCCESS, action.getCode());		
		
		//case: delete a not existing group, regarded as successful
		request.setParameter("id", "123456");
		proxy = getActionProxy("/deleteGroup.action");
		action = (DeleteGroupAction)proxy.getAction();
		result = proxy.execute();
		assertEquals(Action.SUCCESS, result);	
		assertEquals(BaseAction.RC_SUCCESS, action.getCode());
		
	}

}
