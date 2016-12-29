package com.arcsoft.commander.action.server;


import static org.junit.Assert.*;

import java.util.Enumeration;

import org.apache.struts2.dispatcher.mapper.ActionMapping;
import org.junit.Test;

import com.arcsoft.commander.domain.server.Server;
import com.opensymphony.xwork2.ActionProxy;
import com.opensymphony.xwork2.ActionSupport;

/**
 * Test cases for scan servers.
 * 
 * @author fjli
 */
public class ScanActionTest extends ServerActionSupport<ScanAction> {

	@Test
	public void testGetActionMapping() throws Exception {
		ActionMapping mapping = getActionMapping("/scanServers.action");
		assertNotNull(mapping);
		assertEquals("/", mapping.getNamespace());
		assertEquals("scanServers", mapping.getName());
		assertEquals("action", mapping.getExtension());
		assertNull(mapping.getMethod());
	}

	@Test
	public void testExecute() throws Exception {
		ActionProxy proxy = getActionProxy("/scanServers.action");
		assertNotNull(proxy);
		String result = proxy.execute();
		assertEquals(ActionSupport.SUCCESS, result);
		ScanAction action = (ScanAction) proxy.getAction();
		Enumeration<Server> servers = action.getServers();
		long t = System.currentTimeMillis();
		while (servers.hasMoreElements()) {
			Server server = servers.nextElement();
			assertNotNull(server);
			t = System.currentTimeMillis();
		}
		t = System.currentTimeMillis() - t;
		assertTrue(t < 2200 && t > 1900);
	}

}
