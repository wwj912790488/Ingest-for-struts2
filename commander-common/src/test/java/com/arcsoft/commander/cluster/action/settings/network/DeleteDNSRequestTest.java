package com.arcsoft.commander.cluster.action.settings.network;

import static org.junit.Assert.assertNotNull;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;
import com.arcsoft.commander.cluster.action.settings.network.DeleteDNSRequest;

/**
 * @author hxiang
 *
 */
public class DeleteDNSRequestTest extends BaseRequestTest<DeleteDNSRequest> {

	@Test
	public void testRequest() throws IOException {
		DeleteDNSRequest actual = testConverter(Actions.DNS_DELETE, new DeleteDNSRequest());
		assertNotNull(actual);
	}
}
