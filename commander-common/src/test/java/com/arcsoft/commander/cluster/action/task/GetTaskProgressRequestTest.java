package com.arcsoft.commander.cluster.action.task;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;

/**
 * Test cases for GetTaskProgressRequest.
 * 
 * @author fjli
 */
public class GetTaskProgressRequestTest extends BaseRequestTest<GetTaskProgressRequest> {

	@Test
	public void testRequest() throws IOException {
		GetTaskProgressRequest expect = new GetTaskProgressRequest();
		expect.setId(1001);
		expect.setFilters(new byte[]{0x01, 0x02});
		GetTaskProgressRequest actual = testConverter(Actions.GET_TASK_PROGRESS, expect);
		assertEquals(expect.getId(), actual.getId());
		assertArrayEquals(expect.getFilters(), actual.getFilters());
	}

}
