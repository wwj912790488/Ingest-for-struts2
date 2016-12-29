package com.arcsoft.commander.cluster.action.server;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;

/**
 * Test cases for SwitchRoleRequest.
 * 
 * @author fjli
 */
public class SwitchRoleRequestTest extends BaseRequestTest<SwitchRoleRequest> {

	@Test
	public void testRequest() throws IOException {
		SwitchRoleRequest expect = new SwitchRoleRequest();
		expect.setReason(RoleSwitchReason.REASON_MASTER_NETWORK_ERROR);
		SwitchRoleRequest actual = testConverter(Actions.LIVE_SWITCH_ROLE, expect);
		assertEquals(expect.getReason(), actual.getReason());
	}

}
