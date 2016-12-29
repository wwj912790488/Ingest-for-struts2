package com.arcsoft.commander.cluster.action.task;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.util.Arrays;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;

/**
 * Test cases for StopTaskRequest.
 * 
 * @author fjli
 */
public class StopTaskRequestTest extends BaseRequestTest<StopTaskRequest> {

	@Test
	public void testRequest() throws IOException {
		StopTaskRequest expect = new StopTaskRequest();
		expect.setIds(Arrays.asList(1001));
		StopTaskRequest actual = testConverter(Actions.STOP_TASK, expect);
		assertEquals(expect.getIds().get(0), actual.getIds().get(0));
	}

}
