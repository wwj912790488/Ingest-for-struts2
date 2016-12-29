package com.arcsoft.commander.cluster.action.server;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;

/**
 * Test cases for GroupUnbindRequest.
 * 
 * @author fjli
 */
public class UnbindRequestTest extends BaseRequestTest<UnbindRequest> {

	@Test
	public void testRequest() throws IOException {
		testConverter(Actions.LIVE_UNBIND, new UnbindRequest());
	}

}
