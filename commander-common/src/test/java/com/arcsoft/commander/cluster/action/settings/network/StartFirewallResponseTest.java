package com.arcsoft.commander.cluster.action.settings.network;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseResponseTest;
import com.arcsoft.commander.cluster.action.settings.network.StartFirewallResponse;

/**
 * Test for start firewall response.
 * 
 * @author hxiang
 */
public class StartFirewallResponseTest extends
		BaseResponseTest<StartFirewallResponse> {
	@Test
	public void testConstruct() {
		StartFirewallResponse resp = new StartFirewallResponse();
		assertEquals(ActionErrorCode.UNKNOWN_ERROR, resp.getErrorCode());
		resp.setErrorCode(ActionErrorCode.SUCCESS);
		assertEquals(ActionErrorCode.SUCCESS, resp.getErrorCode());
	}

	@Test
	public void testResponse() throws IOException {
		testConverter(Actions.FIREWALL_START, new StartFirewallResponse());
	}
}
