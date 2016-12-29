package com.arcsoft.commander.cluster.action.task;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseResponseTest;
import com.arcsoft.commander.cluster.action.ActionErrorCode;

/**
 * Test cases for UpdateSignalSettingResponse.
 * 
 * @author fjli
 */
public class UpdateSignalSettingResponseTest extends BaseResponseTest<UpdateSignalSettingResponse> {

	@Test
	public void testConstruct() {
		UpdateSignalSettingResponse resp = new UpdateSignalSettingResponse();
		assertEquals(ActionErrorCode.UNKNOWN_ERROR, resp.getErrorCode());
		resp.setErrorCode(ActionErrorCode.SUCCESS);
		assertEquals(ActionErrorCode.SUCCESS, resp.getErrorCode());
	}

	@Test
	public void testResponse() throws IOException {
		testConverter(Actions.UPDATE_SIGNAL_SETTINGS, new UpdateSignalSettingResponse());
	}

}
