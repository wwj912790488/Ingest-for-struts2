package com.arcsoft.commander.cluster.action.settings.network;

import static org.junit.Assert.*;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;
import com.arcsoft.commander.cluster.action.settings.network.SaveEthRequest;
import com.arcsoft.commander.domain.settings.Eth;

/**
 * Test cases for SaveEthRequest.
 * 
 * @author fjli
 */
public class SaveEthRequestTest extends BaseRequestTest<SaveEthRequest> {

	@Test
	public void testRequest() throws IOException {
		SaveEthRequest expect = new SaveEthRequest(new Eth("eth0"));
		SaveEthRequest actual = testConverter(Actions.NETWORK_SAVE, expect);		
		assertEquals(expect.getEth().getId(), actual.getEth().getId());
	}

}
