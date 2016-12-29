package com.arcsoft.commander.cluster.action.server;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;

/**
 * Test cases for BindRequest.
 * 
 * @author fjli
 */
public class GetAgentDescRequestTest extends BaseRequestTest<GetAgentDescRequest> {

	@Test
	public void testRequest() throws IOException {
		testConverter(Actions.GET_AGENT_DESC, new GetAgentDescRequest());
	}

}
