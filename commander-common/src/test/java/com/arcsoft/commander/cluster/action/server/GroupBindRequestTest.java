package com.arcsoft.commander.cluster.action.server;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.cluster.node.NodeDescription;
import com.arcsoft.commander.cluster.NodeType;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;

/**
 * Test cases for GroupBindRequest.
 * 
 * @author fjli
 */
public class GroupBindRequestTest extends BaseRequestTest<GroupBindRequest> {

	@Test
	public void testRequest() throws IOException {
		NodeDescription desc = new NodeDescription(NodeType.TYPE_LIVE,
				"slave_id", "slave_name", "127.0.0.1", 5001);
		GroupBindRequest expect = new GroupBindRequest(desc);
		GroupBindRequest actual = testConverter(Actions.GROUP_LIVE_BIND, expect);
		assertEquals(expect.getSlave().getId(), actual.getSlave().getId());
		assertEquals(expect.getSlave().getIp(), actual.getSlave().getIp());
		assertEquals(expect.getSlave().getPort(), actual.getSlave().getPort());
	}

}
