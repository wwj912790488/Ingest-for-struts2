package com.arcsoft.commander.cluster.action.task;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseResponseTest;
import com.arcsoft.commander.cluster.action.ActionErrorCode;

/**
 * Test cases for DeleteTaskResponse.
 * 
 * @author fjli
 */
public class DeleteTaskResponseTest extends BaseResponseTest<DeleteTaskResponse> {

	@Test
	public void testConstruct() {
		DeleteTaskResponse resp = new DeleteTaskResponse();
		assertEquals(ActionErrorCode.UNKNOWN_ERROR, resp.getErrorCode());
		resp.setErrorCode(ActionErrorCode.SUCCESS);
		assertEquals(ActionErrorCode.SUCCESS, resp.getErrorCode());
	}

	@Test
	public void testResponse() throws IOException {
		testConverter(Actions.NOTIFY_DELETE_TASK, new DeleteTaskResponse());
	}

}
