package com.arcsoft.commander.cluster.action.settings.network;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;
import com.arcsoft.commander.cluster.action.settings.network.ListFirewallRequest;

/**
 * Test for listing firewall rule request.
 * 
 * @author hxiang
 */
public class ListFirewallRequestTest extends BaseRequestTest<ListFirewallRequest> {
	
	@Test
	public void testRequest() throws IOException {
		testConverter(Actions.FIREWALL_LIST, new ListFirewallRequest());
	}
}
