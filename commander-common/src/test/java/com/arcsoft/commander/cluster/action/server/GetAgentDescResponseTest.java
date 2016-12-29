package com.arcsoft.commander.cluster.action.server;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseResponseTest;
import com.arcsoft.commander.domain.server.AgentDesc;

/**
 * Test cases for BindResponse.
 * 
 * @author fjli
 */
public class GetAgentDescResponseTest extends BaseResponseTest<GetAgentDescResponse> {

	@Test
	public void testConstruct() {
		GetAgentDescResponse resp = new GetAgentDescResponse();
		assertEquals(ActionErrorCode.UNKNOWN_ERROR, resp.getErrorCode());
		resp.setErrorCode(ActionErrorCode.SUCCESS);
		assertEquals(ActionErrorCode.SUCCESS, resp.getErrorCode());
	}

	@Test
	public void testResponse() throws IOException {
		GetAgentDescResponse response = new GetAgentDescResponse();
		AgentDesc desc = new AgentDesc();
		Map<String, Boolean> networkMap = new HashMap<>();
		networkMap.put("input", true);
		networkMap.put("ouput", false);
		desc.setNetworkState(networkMap);
		response.setAgentDesc(desc);
		testConverter(Actions.GET_AGENT_DESC, response);
	}

}
