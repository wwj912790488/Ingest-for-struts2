package com.arcsoft.commander.cluster.action.task;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;

/**
 * Test cases for GetTaskThumbnailRequest.
 * 
 * @author fjli
 */
public class GetTaskThumbnailRequestTest extends BaseRequestTest<GetTaskThumbnailRequest> {

	@Test
	public void testRequest() throws IOException {
		GetTaskThumbnailRequest expect = new GetTaskThumbnailRequest();
		expect.setId(1001);
		expect.setWidth(128);
		GetTaskThumbnailRequest actual = testConverter(Actions.GET_TASK_THUMBNAIL, expect);
		assertEquals(expect.getId(), actual.getId());
		assertEquals(expect.getWidth(), actual.getWidth());
	}

}
