package com.arcsoft.commander.cluster.action.settings.network;

import static org.junit.Assert.assertNotNull;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;
import com.arcsoft.commander.cluster.action.settings.network.AddFirewallRequest;

/**
 * Test for adding firewall rule request.
 *
 * @author hxiang
 */
public class AddFirewallRequestTest extends BaseRequestTest<AddFirewallRequest> {
	@Test
	public void testRequest() throws IOException {
		AddFirewallRequest actual = testConverter(Actions.FIREWALL_ADD, new AddFirewallRequest());
		assertNotNull(actual);
	}
}
