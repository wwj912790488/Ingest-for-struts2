package com.arcsoft.commander.cluster.action.server;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseResponseTest;
import com.arcsoft.commander.cluster.action.ActionErrorCode;

/**
 * Test cases for GroupBindResponse.
 * 
 * @author fjli
 */
public class GroupBindResponseTest extends BaseResponseTest<GroupBindResponse> {

	@Test
	public void testConstruct() {
		GroupBindResponse resp = new GroupBindResponse();
		assertEquals(ActionErrorCode.UNKNOWN_ERROR, resp.getErrorCode());
		resp.setErrorCode(ActionErrorCode.SUCCESS);
		assertEquals(ActionErrorCode.SUCCESS, resp.getErrorCode());
	}

	@Test
	public void testResponse() throws IOException {
		testConverter(Actions.GROUP_LIVE_BIND, new GroupBindResponse());
	}

}
