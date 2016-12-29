package com.arcsoft.commander.cluster.action.settings.network;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseResponseTest;
import com.arcsoft.commander.cluster.action.settings.network.GetFirewallStatusResponse;

/**
 * Test for get firewall status response.
 *
 * @author hxiang
 */
public class GetFirewallStatusResponseTest extends BaseResponseTest<GetFirewallStatusResponse>{
	@Test
	public void testConstruct() {
		GetFirewallStatusResponse resp = new GetFirewallStatusResponse();
		assertEquals(ActionErrorCode.UNKNOWN_ERROR, resp.getErrorCode());
		resp.setErrorCode(ActionErrorCode.SUCCESS);
		assertEquals(ActionErrorCode.SUCCESS, resp.getErrorCode());
	}

	@Test
	public void testResponse() throws IOException {
		testConverter(Actions.FIREWALL_GET_STATUS, new GetFirewallStatusResponse());
	}
}
