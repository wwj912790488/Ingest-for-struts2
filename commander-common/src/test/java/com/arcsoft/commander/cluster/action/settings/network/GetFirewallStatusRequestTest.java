package com.arcsoft.commander.cluster.action.settings.network;

import static org.junit.Assert.assertTrue;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;
import com.arcsoft.commander.cluster.action.settings.network.GetFirewallStatusRequest;

/**
 * Test for get firewall status request.
 *
 * @author hxiang
 */
public class GetFirewallStatusRequestTest extends BaseRequestTest<GetFirewallStatusRequest>{
	
	@Test
	public void testRequest() throws IOException {
		GetFirewallStatusRequest expect = new GetFirewallStatusRequest();
		GetFirewallStatusRequest actual = testConverter(Actions.FIREWALL_GET_STATUS, expect);		
		assertTrue(actual != null);
	}
}
