package com.arcsoft.commander.cluster.action.settings.network;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseResponseTest;
import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.settings.network.ListEthResponse;
import com.arcsoft.commander.domain.settings.Eth;

/**
 * Test cases for ListEthResponse.
 * 
 * @author fjli
 */
public class ListEthResponseTest extends BaseResponseTest<ListEthResponse> {

	@Test
	public void testConstruct() {
		ListEthResponse resp = new ListEthResponse();
		assertEquals(ActionErrorCode.UNKNOWN_ERROR, resp.getErrorCode());
		resp.setErrorCode(ActionErrorCode.SUCCESS);
		assertEquals(ActionErrorCode.SUCCESS, resp.getErrorCode());
	}

	@Test
	public void testResponse() throws IOException {
		ListEthResponse expect = new ListEthResponse();
		List<Eth> eths = new ArrayList<Eth>();
		eths.add(new Eth("0-0-2", "127.0.0.1", "255.255.255.0"));
		expect.setEths(eths);
		ListEthResponse resp = testConverter(Actions.NETWORK_LIST, expect);
		assertEquals(resp.getEths().get(0).getId(), "0-0-2");
	}

}
