package com.arcsoft.commander.cluster.action.settings.network;

import static org.junit.Assert.assertNotNull;

import java.io.IOException;
import org.junit.Test;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;
import com.arcsoft.commander.cluster.action.settings.network.ListDNSRequest;

public class ListDNSRequestTest extends BaseRequestTest<ListDNSRequest> {

	@Test
	public void testRequest() throws IOException {
		ListDNSRequest expect = new ListDNSRequest();
		ListDNSRequest actual = testConverter(Actions.DNS_LIST, expect);
		assertNotNull(actual);
	}

}
