package com.arcsoft.commander.cluster.action.task;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseResponseTest;

/**
 * Test cases for GetTaskThumbnailResponse.
 * 
 * @author fjli
 */
public class GetTaskThumbnailResponseTest extends BaseResponseTest<GetTaskThumbnailResponse> {

	@Test
	public void testConstruct() {
		GetTaskThumbnailResponse resp = new GetTaskThumbnailResponse();
		assertEquals(ActionErrorCode.UNKNOWN_ERROR, resp.getErrorCode());
		resp.setErrorCode(ActionErrorCode.SUCCESS);
		assertEquals(ActionErrorCode.SUCCESS, resp.getErrorCode());
	}

	@Test
	public void testResponse() throws IOException {
		GetTaskThumbnailResponse expect = new GetTaskThumbnailResponse();
		expect.setData(new byte[] {0x02, 0x03});
		GetTaskThumbnailResponse actual = testConverter(Actions.GET_TASK_THUMBNAIL, expect);
		assertArrayEquals(expect.getData(), actual.getData());
	}

}
