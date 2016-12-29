package com.arcsoft.commander.cluster.action.task;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;

/**
 * Test cases for DeleteTaskRequest.
 * 
 * @author fjli
 */
public class DeleteTaskRequestTest extends BaseRequestTest<DeleteTaskRequest> {

	@Test
	public void testRequest() throws IOException {
		DeleteTaskRequest expect = new DeleteTaskRequest();
		expect.setId(1002);
		DeleteTaskRequest actual = testConverter(Actions.NOTIFY_DELETE_TASK, expect);
		assertEquals(expect.getId(), actual.getId());
	}

}
