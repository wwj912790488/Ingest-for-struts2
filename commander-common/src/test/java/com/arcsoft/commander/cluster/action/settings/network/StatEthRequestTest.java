package com.arcsoft.commander.cluster.action.settings.network;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;
import com.arcsoft.commander.cluster.action.settings.network.StatEthRequest;

public class StatEthRequestTest extends BaseRequestTest<StatEthRequest> {

	@Test
	public void testRequest() throws IOException {
		StatEthRequest expect = new StatEthRequest("eth0");
		StatEthRequest actual = testConverter(Actions.NETWORK_STAT, expect);		
		assertEquals(expect.getEthId(), actual.getEthId());
	}


}
