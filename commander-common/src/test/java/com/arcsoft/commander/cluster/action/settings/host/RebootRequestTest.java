package com.arcsoft.commander.cluster.action.settings.host;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;

/**
 * Test for RebootRequest.
 *
 * @author hxiang
 */
public class RebootRequestTest extends BaseRequestTest<RebootRequest> {
	
	@Test
	public void testRequest() throws IOException {
		testConverter(Actions.SYSTEM_REBOOT, new RebootRequest());
	}
	
}
