package com.arcsoft.commander.cluster.action.settings.network;

import static org.junit.Assert.*;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseResponseTest;
import com.arcsoft.commander.cluster.action.settings.network.StatEthResponse;

public class StatEthResponseTest extends BaseResponseTest<StatEthResponse> {

	@Test
	public void testConstruct() {
		StatEthResponse resp = new StatEthResponse();
		assertEquals(ActionErrorCode.UNKNOWN_ERROR, resp.getErrorCode());
		resp.setErrorCode(ActionErrorCode.SUCCESS);
		assertEquals(ActionErrorCode.SUCCESS, resp.getErrorCode());
	}

	@Test
	public void testResponse() throws IOException {
		testConverter(Actions.NETWORK_STAT, new StatEthResponse());
	}

}
