package com.arcsoft.commander.cluster.action.settings.network;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseResponseTest;
import com.arcsoft.commander.cluster.action.settings.network.DeleteFirewallResponse;

/**
 * Test for deleting firewall rule response.
 * 
 * @author xpeng
 */
public class DeleteFirewallResponseTest extends
		BaseResponseTest<DeleteFirewallResponse> {
	@Test
	public void testConstruct() {
		DeleteFirewallResponse resp = new DeleteFirewallResponse();
		assertEquals(ActionErrorCode.UNKNOWN_ERROR, resp.getErrorCode());
		resp.setErrorCode(ActionErrorCode.SUCCESS);
		assertEquals(ActionErrorCode.SUCCESS, resp.getErrorCode());
	}

	@Test
	public void testResponse() throws IOException {
		testConverter(Actions.FIREWALL_DELETE, new DeleteFirewallResponse());
	}
}
