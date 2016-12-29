package com.arcsoft.commander.cluster.action.settings.network;

import static org.junit.Assert.*;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;
import com.arcsoft.commander.cluster.action.settings.network.AddDNSRequest;

/**
 * Test for adding dns request.
 * 
 * @author hxiang
 */
public class AddDNSRequestTest extends BaseRequestTest<AddDNSRequest> {
	@Test
	public void testRequest() throws IOException {
		AddDNSRequest actual = testConverter(Actions.DNS_ADD, new AddDNSRequest());
		assertNotNull(actual);
	}
}
