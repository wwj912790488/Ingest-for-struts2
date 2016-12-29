package com.arcsoft.commander.cluster.action.task;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseResponseTest;
import com.arcsoft.commander.cluster.action.ActionErrorCode;

/**
 * Test cases for StateChangeResponse.
 * 
 * @author fjli
 */
public class StateChangeResponseTest extends BaseResponseTest<StateChangeResponse> {

	@Test
	public void testConstruct() {
		StartTaskResponse resp = new StartTaskResponse();
		assertEquals(ActionErrorCode.UNKNOWN_ERROR, resp.getErrorCode());
		resp.setErrorCode(ActionErrorCode.SUCCESS);
		assertEquals(ActionErrorCode.SUCCESS, resp.getErrorCode());
	}

	@Test
	public void testResponse() throws IOException {
		testConverter(Actions.TASK_STATE_CHANGE, new StateChangeResponse());
	}

}
