package com.arcsoft.commander.cluster.action.settings.network;

import static org.junit.Assert.*;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;
import com.arcsoft.commander.cluster.action.settings.network.AddRouteRequest;

/**
 * @author hxiang
 *
 */
public class AddRouteRequestTest extends BaseRequestTest<AddRouteRequest> {

	@Test
	public void testRequest() throws IOException {
		AddRouteRequest actual = testConverter(Actions.ROUTE_ADD, new AddRouteRequest());
		assertNotNull(actual);
	}

}
