package com.arcsoft.commander.cluster.action.settings.network;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import javax.xml.bind.annotation.XmlRootElement;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseResponseTest;
import com.arcsoft.commander.cluster.action.settings.network.StopFirewallResponse;

/**
 * Test for stop firewall resonse.
 * 
 * @author hxiang
 */
@XmlRootElement
public class StopFirewallResponseTest extends
		BaseResponseTest<StopFirewallResponse> {

	@Test
	public void testConstruct() {
		StopFirewallResponse resp = new StopFirewallResponse();
		assertEquals(ActionErrorCode.UNKNOWN_ERROR, resp.getErrorCode());
		resp.setErrorCode(ActionErrorCode.SUCCESS);
		assertEquals(ActionErrorCode.SUCCESS, resp.getErrorCode());
	}

	@Test
	public void testResponse() throws IOException {
		testConverter(Actions.FIREWALL_STOP, new StopFirewallResponse());
	}
}
