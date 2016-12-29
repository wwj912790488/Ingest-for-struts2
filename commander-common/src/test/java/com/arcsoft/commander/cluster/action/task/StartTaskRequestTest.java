package com.arcsoft.commander.cluster.action.task;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.util.Arrays;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;

/**
 * Test cases for StartTaskRequest.
 * 
 * @author fjli
 */
public class StartTaskRequestTest extends BaseRequestTest<StartTaskRequest> {

	@Test
	public void testRequest() throws IOException {
		StartTaskRequest expect = new StartTaskRequest();
		expect.setIds(Arrays.asList(1001));
		expect.setDatas(Arrays.asList("<task>test xml data</task>"));
		StartTaskRequest actual = testConverter(Actions.START_TASK, expect);
		assertEquals(expect.getIds().get(0), actual.getIds().get(0));
		assertEquals(expect.getDatas().get(0), actual.getDatas().get(0));
	}

}
