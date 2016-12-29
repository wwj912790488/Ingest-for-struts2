package com.arcsoft.commander.cluster.action.snmp;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseResponseTest;

/**
 * Test cases for GetSnmpResponse.
 * 
 * @author fjli
 */
public class SaveSnmpResponseTest extends BaseResponseTest<SaveSnmpResponse> {

	@Test
	public void testConstruct() {
		SaveSnmpResponse resp = new SaveSnmpResponse();
		assertEquals(ActionErrorCode.UNKNOWN_ERROR, resp.getErrorCode());
		resp.setErrorCode(ActionErrorCode.SUCCESS);
		assertEquals(ActionErrorCode.SUCCESS, resp.getErrorCode());
	}

	@Test
	public void testResponse() throws IOException {
		SaveSnmpResponse expected = new SaveSnmpResponse();
		testConverter(Actions.SNMP_SAVE, expected);
	}

}
