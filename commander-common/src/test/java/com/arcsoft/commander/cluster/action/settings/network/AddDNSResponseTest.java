package com.arcsoft.commander.cluster.action.settings.network;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseResponseTest;

/**
 * Test for adding dns response.
 * 
 * @author hxiang
 */

public class AddDNSResponseTest extends BaseResponseTest<AddDNSResponse> {

	@Test
	public void testConstruct() {
		AddDNSResponse resp = new AddDNSResponse();
		assertEquals(ActionErrorCode.UNKNOWN_ERROR, resp.getErrorCode());
		resp.setErrorCode(ActionErrorCode.SUCCESS);
		assertEquals(ActionErrorCode.SUCCESS, resp.getErrorCode());
	}

	@Test
	public void testResponse() throws IOException {
		testConverter(Actions.DNS_ADD, new AddDNSResponse());
	}
}
