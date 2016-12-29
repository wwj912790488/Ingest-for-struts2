package com.arcsoft.commander.cluster.action.settings.network;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;
import com.arcsoft.commander.cluster.action.settings.network.ListEthRequest;

/**
 * Test cases for ListEthRequest.
 * 
 * @author fjli
 */
public class ListEthRequestTest extends BaseRequestTest<ListEthRequest> {

	@Test
	public void testRequest() throws IOException {
		testConverter(Actions.NETWORK_LIST, new ListEthRequest());
	}

}
