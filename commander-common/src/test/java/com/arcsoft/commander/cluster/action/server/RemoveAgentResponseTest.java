package com.arcsoft.commander.cluster.action.server;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseResponseTest;

/**
 * Test cases for RemoveAgentResponse.
 * 
 * @author fjli
 */
public class RemoveAgentResponseTest extends BaseResponseTest<RemoveAgentResponse> {

	@Test
	public void testConstruct() {
		RemoveAgentResponse resp = new RemoveAgentResponse();
		assertEquals(ActionErrorCode.UNKNOWN_ERROR, resp.getErrorCode());
		resp.setErrorCode(ActionErrorCode.SUCCESS);
		assertEquals(ActionErrorCode.SUCCESS, resp.getErrorCode());
	}

	@Test
	public void testResponse() throws IOException {
		testConverter(Actions.REMOVE_AGENT, new RemoveAgentResponse());
	}

}
