package com.arcsoft.commander.cluster.action.settings.host;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseResponseTest;

/**
 * Test for RebootResponse.
 *
 * @author hxiang
 */
public class RebootResponseTest extends BaseResponseTest<RebootResponse> {
	
	@Test
	public void testConstruct() {
		RebootResponse resp = new RebootResponse();
		assertEquals(ActionErrorCode.UNKNOWN_ERROR, resp.getErrorCode());
		resp.setErrorCode(ActionErrorCode.SUCCESS);
		assertEquals(ActionErrorCode.SUCCESS, resp.getErrorCode());
	}

	@Test
	public void testResponse() throws IOException {
		testConverter(Actions.SYSTEM_REBOOT, new RebootResponse());
	}
}
