package com.arcsoft.commander.cluster.action.server;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.cluster.node.NodeDescription;
import com.arcsoft.commander.cluster.NodeType;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;

/**
 * Test cases for BindRequest.
 * 
 * @author fjli
 */
public class BindRequestTest extends BaseRequestTest<BindRequest> {

	@Test
	public void testRequest() throws IOException {
		NodeDescription desc = new NodeDescription(NodeType.TYPE_LIVE,
				"master_id", "master_name", "127.0.0.1", 5001);
		BindRequest expect = new BindRequest(desc);
		BindRequest actual = testConverter(Actions.LIVE_BIND, expect);
		assertEquals(expect.getMaster().getId(), actual.getMaster().getId());
		assertEquals(expect.getMaster().getIp(), actual.getMaster().getIp());
		assertEquals(expect.getMaster().getPort(), actual.getMaster().getPort());
	}

}
