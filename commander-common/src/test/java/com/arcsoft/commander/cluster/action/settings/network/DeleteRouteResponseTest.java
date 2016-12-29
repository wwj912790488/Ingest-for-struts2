package com.arcsoft.commander.cluster.action.settings.network;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseResponseTest;
import com.arcsoft.commander.cluster.action.settings.network.DeleteRouteResponse;

/**
 * @author hxiang
 *
 */
public class DeleteRouteResponseTest extends BaseResponseTest<DeleteRouteResponse> {

	@Test
	public void testConstruct() {
		DeleteRouteResponse resp = new DeleteRouteResponse();
		assertEquals(ActionErrorCode.UNKNOWN_ERROR, resp.getErrorCode());
		resp.setErrorCode(ActionErrorCode.SUCCESS);
		assertEquals(ActionErrorCode.SUCCESS, resp.getErrorCode());
	}

	@Test
	public void testResponse() throws IOException {
		testConverter(Actions.ROUTE_DELETE, new DeleteRouteResponse());
	}
}
