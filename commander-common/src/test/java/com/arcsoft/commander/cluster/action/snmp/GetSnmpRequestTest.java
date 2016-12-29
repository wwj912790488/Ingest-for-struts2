package com.arcsoft.commander.cluster.action.snmp;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;

/**
 * Test cases for GetSnmpRequest.
 * 
 * @author fjli
 */
public class GetSnmpRequestTest extends BaseRequestTest<GetSnmpRequest> {

	@Test
	public void testRequest() throws IOException {
		GetSnmpRequest expect = new GetSnmpRequest();
		testConverter(Actions.SNMP_GET, expect);
	}

}
