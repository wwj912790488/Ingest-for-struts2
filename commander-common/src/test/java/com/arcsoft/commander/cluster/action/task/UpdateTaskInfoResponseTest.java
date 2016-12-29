package com.arcsoft.commander.cluster.action.task;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseResponseTest;
import com.arcsoft.commander.cluster.action.ActionErrorCode;

/**
 * Test cases for UpdateTaskInfoResponse.
 * 
 * @author fjli
 */
public class UpdateTaskInfoResponseTest extends BaseResponseTest<UpdateTaskInfoResponse> {

	@Test
	public void testConstruct() {
		UpdateTaskInfoResponse resp = new UpdateTaskInfoResponse();
		assertEquals(ActionErrorCode.UNKNOWN_ERROR, resp.getErrorCode());
		resp.setErrorCode(ActionErrorCode.SUCCESS);
		assertEquals(ActionErrorCode.SUCCESS, resp.getErrorCode());
	}

	@Test
	public void testResponse() throws IOException {
		testConverter(Actions.UPDATE_TASK_INFO, new UpdateTaskInfoResponse());
	}

}
