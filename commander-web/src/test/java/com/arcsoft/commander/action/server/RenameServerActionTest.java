package com.arcsoft.commander.action.server;

import static org.junit.Assert.assertEquals;

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
 * Test case for RenameServerAction
 * @author xpeng
 *
 */
public class RenameServerActionTest extends ServerActionSupport<RenameServerAction>{

	@Test
	public void testExecute() throws Exception {
		ServerGroup group = new ServerGroup();
		group.setType(ServerGroup.TYPE_LIVE);
		group.setName("group_name_for_delete_server");
		TestLiveAgent agent1 = testContext.createAgent1(true);
		Server server = agent1.getServer();
		String id = server.getId();
		List<Server> servers = new ArrayList<Server>();
		servers.add(server);
		group.setServers(servers);
		serverService.createGroup(group);
		
		//case: normal case
		request.setParameter("id", id);
		request.setParameter("newName", "server_name_rename_server_new");
		ActionProxy proxy = getActionProxy("/renameServer.action");
		RenameServerAction action = (RenameServerAction)proxy.getAction();
		String result = proxy.execute();
		assertEquals(Action.SUCCESS, result);
		assertEquals(BaseAction.RC_SUCCESS, action.getCode());
		assertEquals("server_name_rename_server_new", serverService.getServer(id).getName());
		
		//case: the new name is the same with old one
		request.setParameter("id", id);
		request.setParameter("newName", "server_name_rename_server");
		proxy = getActionProxy("/renameServer.action");
		action = (RenameServerAction)proxy.getAction();
		result = proxy.execute();
		assertEquals(Action.SUCCESS, result);
		assertEquals(BaseAction.RC_SUCCESS, action.getCode());
		assertEquals("server_name_rename_server", serverService.getServer(id).getName());

		//case: the new name has exists
		TestLiveAgent agent2 = testContext.createAgent2(true);
		agent2.start();
		Server otherServer = agent2.getServer();
		otherServer.setName("server_name_rename_server_samename");
		servers.clear();
		servers.add(otherServer);
		serverService.addServers(group);
		
		request.setParameter("id", id);
		request.setParameter("newName", "server_name_rename_server_samename");
		proxy = getActionProxy("/renameServer.action");
		action = (RenameServerAction)proxy.getAction();
		result = proxy.execute();
		assertEquals(Action.SUCCESS, result);
		assertEquals(BaseAction.RC_SERVER_NAME_EXIST, action.getCode());
		assertEquals(action.getText("server.group.err.name.exists", new String[]{"server_name_rename_server_samename"}), action.getDescription());
		assertEquals("server_name_rename_server", serverService.getServer(id).getName());
		
		//case: the new name is empty		
		request.setParameter("id", id);
		request.setParameter("newName", "");
		proxy = getActionProxy("/renameServer.action");
		action = (RenameServerAction)proxy.getAction();
		result = proxy.execute();
		assertEquals(Action.SUCCESS, result);
		assertEquals(BaseAction.RC_SUCCESS, action.getCode());
		assertEquals("", serverService.getServer(id).getName());

		//case: the group does not exists
		request.setParameter("id", "123456");
		request.setParameter("newName", "server_name_rename_server_new");
		proxy = getActionProxy("/renameServer.action");
		action = (RenameServerAction)proxy.getAction();
		result = proxy.execute();
		assertEquals(Action.SUCCESS, result);
		assertEquals(BaseAction.RC_SERVER_NOT_EXIST, action.getCode());
		assertEquals(action.getText("server.err.not.exists"), action.getDescription());

	}

}
