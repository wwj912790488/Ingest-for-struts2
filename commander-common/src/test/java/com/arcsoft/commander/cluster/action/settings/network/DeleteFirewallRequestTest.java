package com.arcsoft.commander.cluster.action.settings.network;

import static org.junit.Assert.assertNotNull;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;
import com.arcsoft.commander.cluster.action.settings.network.DeleteFirewallRequest;

/**
 * Test for deleting firewall rule rquest
 *
 * @author xpeng
 */
public class DeleteFirewallRequestTest extends BaseRequestTest<DeleteFirewallRequest> {
	@Test
	public void testRequest() throws IOException {
		DeleteFirewallRequest actual = testConverter(Actions.FIREWALL_DELETE, new DeleteFirewallRequest());
		assertNotNull(actual);
	}
}
