package com.arcsoft.commander.cluster.action.settings.host;
import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;


/**
 * Test for ShutdownRequest
 *
 * @author hxiang
 */
public class ShutdownRequestTest extends BaseRequestTest<ShutdownRequest> {
	
	@Test
	public void testRequest() throws IOException {
		testConverter(Actions.SYSTEM_SHUTDOWN, new ShutdownRequest());
	}
}
