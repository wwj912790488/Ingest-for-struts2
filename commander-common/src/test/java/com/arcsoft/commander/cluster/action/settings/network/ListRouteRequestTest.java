package com.arcsoft.commander.cluster.action.settings.network;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;
import com.arcsoft.commander.cluster.action.settings.network.ListRouteRequest;

public class ListRouteRequestTest extends BaseRequestTest<ListRouteRequest> {

	@Test
	public void testRequest() throws IOException {
		testConverter(Actions.ROUTE_LIST, new ListRouteRequest());
	}
}
