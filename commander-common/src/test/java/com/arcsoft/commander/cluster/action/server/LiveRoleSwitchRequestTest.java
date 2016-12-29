package com.arcsoft.commander.cluster.action.server;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;

/**
 * Test cases for LiveRoleSwitchRequest.
 * 
 * @author fjli
 */
public class LiveRoleSwitchRequestTest extends BaseRequestTest<LiveRoleSwitchRequest> {

	@Test
	public void testRequest() throws IOException {
		LiveRoleSwitchRequest expect = new LiveRoleSwitchRequest("slave_id");
		LiveRoleSwitchRequest actual = testConverter(Actions.LIVE_ROLE_SWITCH_EVENT, expect);
		assertEquals(expect.getId(), actual.getId());
	}

}
