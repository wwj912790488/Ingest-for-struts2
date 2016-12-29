package com.arcsoft.commander.cluster.action.task;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;
import com.arcsoft.web4transcoder.domain.input.SignalItem;

/**
 * Test cases for UpdateSignalSettingRequest.
 * 
 * @author fjli
 */
public class UpdateSignalSettingRequestTest extends BaseRequestTest<UpdateSignalSettingRequest> {

	@Test
	public void testRequest() throws IOException {
		UpdateSignalSettingRequest expect = new UpdateSignalSettingRequest();
		List<SignalItem> signalItems = new ArrayList<>();
		SignalItem signalItem = new SignalItem();
		signalItem.setCheck(true);
		signalItem.setParam(200);
		signalItem.setSwitchTimeout(6000);
		signalItem.setType(SignalItem.PROGID_LOSS);
		signalItem.setWarningCheck(true);
		signalItem.setWarningParam(200);
		signalItem.setWarningPeriod(60000);
		signalItem.setWarningTimeout(5000);
		signalItems.add(signalItem);
		expect.setSignalItems(signalItems);
		UpdateSignalSettingRequest actual = testConverter(Actions.UPDATE_SIGNAL_SETTINGS, expect);
		assertNotNull(actual.getSignalItems());
		assertEquals(expect.getSignalItems().size(), actual.getSignalItems().size());
		SignalItem actualItem = actual.getSignalItems().get(0);
		assertEquals(signalItem.getParam(), actualItem.getParam());
		assertEquals(signalItem.getSwitchTimeout(), actualItem.getSwitchTimeout());
		assertEquals(signalItem.getType(), actualItem.getType());
		assertEquals(signalItem.getWarningParam(), actualItem.getWarningParam());
		assertEquals(signalItem.getWarningPeriod(), actualItem.getWarningPeriod());
		assertEquals(signalItem.getWarningTimeout(), actualItem.getWarningTimeout());
	}

}
