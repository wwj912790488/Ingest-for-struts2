package com.arcsoft.commander.action.server;

import static org.junit.Assert.*;

import org.junit.Test;

import com.arcsoft.commander.action.BaseAction;
import com.arcsoft.commander.domain.server.ServerGroup;
import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionProxy;

/**
 * Test case for RenameGroupAction
 * @author xpeng
 *
 */
public class RenameGroupActionTest extends ServerActionSupport<RenameGroupAction>{

	@Test
	public void testExecute() throws Exception {
		ServerGroup group = new ServerGroup();
		group.setName("group_name_rename_group");
		group.setType(ServerGroup.TYPE_DEFAULT);
		serverService.createGroup(group);
		Integer id = group.getId();
		
		//case: normal case
		request.setParameter("id", id.toString());
		request.setParameter("newName", "group_name_rename_group_new");
		ActionProxy proxy = getActionProxy("/renameGroup.action");
		RenameGroupAction action = (RenameGroupAction)proxy.getAction();
		String result = proxy.execute();
		assertEquals(Action.SUCCESS, result);
		assertEquals(BaseAction.RC_SUCCESS, action.getCode());
		assertEquals("group_name_rename_group_new", serverService.getGroup(id, false).getName());
		
		//case: the new name is the same with old one
		request.setParameter("id", id.toString());
		request.setParameter("newName", "group_name_rename_group");
		proxy = getActionProxy("/renameGroup.action");
		action = (RenameGroupAction)proxy.getAction();
		result = proxy.execute();
		assertEquals(Action.SUCCESS, result);
		assertEquals(BaseAction.RC_SUCCESS, action.getCode());
		assertEquals("group_name_rename_group", serverService.getGroup(id, false).getName());

		//case: the new name has exists
		ServerGroup otherGroup = new ServerGroup();
		otherGroup.setName("group_name_rename_group_samename");
		otherGroup.setType(ServerGroup.TYPE_DEFAULT);
		serverService.createGroup(otherGroup);
		
		request.setParameter("id", id.toString());
		request.setParameter("newName", "group_name_rename_group_samename");
		proxy = getActionProxy("/renameGroup.action");
		action = (RenameGroupAction)proxy.getAction();
		result = proxy.execute();
		assertEquals(Action.SUCCESS, result);
		assertEquals(BaseAction.RC_GROUP_NAME_EXIST, action.getCode());
		assertEquals(action.getText("server.group.err.name.exists", new String[]{"group_name_rename_group_samename"}), action.getDescription());
		assertEquals("group_name_rename_group", serverService.getGroup(id, false).getName());
		
		//case: the new name is empty		
		request.setParameter("id", id.toString());
		request.setParameter("newName", "");
		proxy = getActionProxy("/renameGroup.action");
		action = (RenameGroupAction)proxy.getAction();
		result = proxy.execute();
		assertEquals(Action.SUCCESS, result);
		assertEquals(BaseAction.RC_SUCCESS, action.getCode());
		assertEquals("", serverService.getGroup(id, false).getName());

		//case: the group does not exists
		request.setParameter("id", "123456");
		request.setParameter("newName", "group_name_rename_group_new");
		proxy = getActionProxy("/renameGroup.action");
		action = (RenameGroupAction)proxy.getAction();
		result = proxy.execute();
		assertEquals(Action.SUCCESS, result);
		assertEquals(BaseAction.RC_GROUP_NOT_EXIST, action.getCode());
		assertEquals(action.getText("server.group.err.not.exists"), action.getDescription());
	}

}
