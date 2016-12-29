package com.arcsoft.commander.cluster.action.settings.network;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseResponseTest;
import com.arcsoft.commander.cluster.action.settings.network.AddFirewallResponse;

/**
 * Test for adding firewall rule response.
 *
 * @author hxiang
 */
public class AddFirewallResponseTest extends BaseResponseTest<AddFirewallResponse> {
	
	@Test
	public void testConstruct() {
		AddFirewallResponse resp = new AddFirewallResponse();
		assertEquals(ActionErrorCode.UNKNOWN_ERROR, resp.getErrorCode());
		resp.setErrorCode(ActionErrorCode.SUCCESS);
		assertEquals(ActionErrorCode.SUCCESS, resp.getErrorCode());
	}

	@Test
	public void testResponse() throws IOException {
		testConverter(Actions.FIREWALL_ADD, new AddFirewallResponse());
	}
}
