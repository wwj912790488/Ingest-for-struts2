package com.arcsoft.commander.cluster.action.snmp;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;
import com.arcsoft.transcoder.snmp.SnmpSetting;

/**
 * Test cases for GetSnmpRequest.
 * 
 * @author fjli
 */
public class SaveSnmpRequestTest extends BaseRequestTest<SaveSnmpRequest> {

	@Test
	public void testRequest() throws IOException {
		SaveSnmpRequest expected = new SaveSnmpRequest();
		SnmpSetting setting = new SnmpSetting();
		setting.setSnmpRun(true);
		setting.setCommunity("Community1");
		setting.setTrapAllowed(true);
//		setting.setTrapCommunity("TrapCommunity1");
//		setting.setTrapHost("192.168.1.110");
		expected.setSnmp(setting);
		SaveSnmpRequest actual = testConverter(Actions.SNMP_SAVE, expected);
		assertEquals(expected.getSnmp().isSnmpRun(), actual.getSnmp().isSnmpRun());
		assertEquals(expected.getSnmp().getCommunity(), actual.getSnmp().getCommunity());
		assertEquals(expected.getSnmp().isTrapAllowed(), actual.getSnmp().isTrapAllowed());
//		assertEquals(expected.getSnmp().getTrapCommunity(), actual.getSnmp().getTrapCommunity());
//		assertEquals(expected.getSnmp().getTrapHost(), actual.getSnmp().getTrapHost());
	}

}
