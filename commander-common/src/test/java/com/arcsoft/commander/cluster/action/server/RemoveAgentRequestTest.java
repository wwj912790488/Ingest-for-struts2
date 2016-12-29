package com.arcsoft.commander.cluster.action.server;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;

/**
 * Test cases for RemoveAgentRequest.
 * 
 * @author fjli
 */
public class RemoveAgentRequestTest extends BaseRequestTest<RemoveAgentRequest> {

	@Test
	public void testRequest() throws IOException {
		testConverter(Actions.REMOVE_AGENT, new RemoveAgentRequest());
	}

}
