package com.arcsoft.commander.cluster.action.settings.network;

import static org.junit.Assert.assertTrue;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;
import com.arcsoft.commander.cluster.action.settings.network.StopFirewallRequest;

/**
 * Test for StopFirewallRequest.
 *
 * @author hxiang
 */

public class StopFirewallRequestTest extends BaseRequestTest<StopFirewallRequest> {
	@Test
	public void testRequest() throws IOException {
		StopFirewallRequest expect = new StopFirewallRequest();
		StopFirewallRequest actual = testConverter(Actions.FIREWALL_STOP, expect);		
		assertTrue(actual != null);
	}

}
