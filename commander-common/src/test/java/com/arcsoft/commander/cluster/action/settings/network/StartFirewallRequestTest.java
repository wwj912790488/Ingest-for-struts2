package com.arcsoft.commander.cluster.action.settings.network;

import static org.junit.Assert.*;
import java.io.IOException;

import javax.xml.bind.annotation.XmlRootElement;

import org.junit.Test;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;
import com.arcsoft.commander.cluster.action.settings.network.StartFirewallRequest;

/**
 * Test for start firewall request.
 *
 * @author hxiang
 */
@XmlRootElement
public class StartFirewallRequestTest extends BaseRequestTest<StartFirewallRequest> {
	@Test
	public void testRequest() throws IOException {
		StartFirewallRequest expect = new StartFirewallRequest();
		StartFirewallRequest actual = testConverter(Actions.FIREWALL_START, expect);		
		assertTrue(actual != null);
	}
}
