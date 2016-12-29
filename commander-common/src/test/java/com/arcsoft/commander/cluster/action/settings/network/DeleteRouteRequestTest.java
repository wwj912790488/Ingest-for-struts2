package com.arcsoft.commander.cluster.action.settings.network;

import static org.junit.Assert.assertNotNull;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;
import com.arcsoft.commander.cluster.action.settings.network.DeleteRouteRequest;

/**
 * @author hxiang
 *
 */
public class DeleteRouteRequestTest extends BaseRequestTest<DeleteRouteRequest> {

	@Test
	public void testRequest() throws IOException {
		DeleteRouteRequest actual = testConverter(Actions.ROUTE_DELETE, new DeleteRouteRequest());
		assertNotNull(actual);
	}
}
