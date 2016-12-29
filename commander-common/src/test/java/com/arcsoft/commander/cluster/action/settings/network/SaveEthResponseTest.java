package com.arcsoft.commander.cluster.action.settings.network;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseResponseTest;
import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.settings.network.SaveEthResponse;

/**
 * Test cases for SaveEthResponse.
 * 
 * @author fjli
 */
public class SaveEthResponseTest extends BaseResponseTest<SaveEthResponse> {

	@Test
	public void testConstruct() {
		SaveEthResponse resp = new SaveEthResponse();
		assertEquals(ActionErrorCode.UNKNOWN_ERROR, resp.getErrorCode());
		resp.setErrorCode(ActionErrorCode.SUCCESS);
		assertEquals(ActionErrorCode.SUCCESS, resp.getErrorCode());
	}

	@Test
	public void testResponse() throws IOException {
		testConverter(Actions.NETWORK_SAVE, new SaveEthResponse());
	}

}
