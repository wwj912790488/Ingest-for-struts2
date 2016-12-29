package com.arcsoft.commander.cluster.action.server;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseResponseTest;
import com.arcsoft.commander.cluster.action.ActionErrorCode;

/**
 * Test cases for SwitchRoleResponse.
 * 
 * @author fjli
 */
public class SwitchRoleResponseTest extends BaseResponseTest<SwitchRoleResponse> {

	@Test
	public void testConstruct() {
		SwitchRoleResponse resp = new SwitchRoleResponse();
		assertEquals(ActionErrorCode.UNKNOWN_ERROR, resp.getErrorCode());
		resp.setErrorCode(ActionErrorCode.SUCCESS);
		assertEquals(ActionErrorCode.SUCCESS, resp.getErrorCode());
	}

	@Test
	public void testResponse() throws IOException {
		testConverter(Actions.LIVE_SWITCH_ROLE, new SwitchRoleResponse());
	}

}
