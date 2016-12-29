package com.arcsoft.commander.cluster.action.snmp;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseResponseTest;
import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.transcoder.snmp.SnmpSetting;

/**
 * Test cases for GetSnmpResponse.
 * 
 * @author fjli
 */
public class GetSnmpResponseTest extends BaseResponseTest<GetSnmpResponse> {

	@Test
	public void testConstruct() {
		GetSnmpResponse resp = new GetSnmpResponse();
		assertEquals(ActionErrorCode.UNKNOWN_ERROR, resp.getErrorCode());
		resp.setErrorCode(ActionErrorCode.SUCCESS);
		assertEquals(ActionErrorCode.SUCCESS, resp.getErrorCode());
	}

	@Test
	public void testResponse() throws IOException {
		GetSnmpResponse expected = new GetSnmpResponse();
		SnmpSetting setting = new SnmpSetting();
		setting.setSnmpRun(true);
		setting.setCommunity("Community1");
		setting.setTrapAllowed(true);
//		setting.setTrapCommunity("TrapCommunity1");
//		setting.setTrapHost("192.168.1.110");
		expected.setErrorCode(ActionErrorCode.SUCCESS);
		expected.setSnmp(setting);
		GetSnmpResponse actual = testConverter(Actions.SNMP_GET, expected);
		assertEquals(expected.getSnmp().isSnmpRun(), actual.getSnmp().isSnmpRun());
		assertEquals(expected.getSnmp().getCommunity(), actual.getSnmp().getCommunity());
		assertEquals(expected.getSnmp().isTrapAllowed(), actual.getSnmp().isTrapAllowed());
//		assertEquals(expected.getSnmp().getTrapCommunity(), actual.getSnmp().getTrapCommunity());
//		assertEquals(expected.getSnmp().getTrapHost(), actual.getSnmp().getTrapHost());
	}

}
