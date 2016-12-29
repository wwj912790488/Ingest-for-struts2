package com.arcsoft.commander.cluster.action.task;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;
import com.arcsoft.commander.domain.task.TaskChangedInfo;

/**
 * Test cases for UpdateTaskInfoRequest.
 * 
 * @author fjli
 */
public class UpdateTaskInfoRequestTest extends BaseRequestTest<UpdateTaskInfoRequest> {

	@Test
	public void testRequest() throws IOException {
		UpdateTaskInfoRequest expect = new UpdateTaskInfoRequest();
		TaskChangedInfo expectinfo = new TaskChangedInfo();
		expectinfo.setTaskId(123);
		expectinfo.setAllowProgramIdChanged(true);
		expectinfo.setTaskXml("<?xml version=\"1.0\" encoding=\"utf-8\"?><task id=\"123\"/>");
		expect.setChangedInfo(expectinfo);
		UpdateTaskInfoRequest actual = testConverter(Actions.UPDATE_TASK_INFO, expect);
		assertNotNull(actual);
		TaskChangedInfo actualInfo = actual.getChangedInfo();
		assertNotNull(actualInfo);
		assertEquals(expectinfo.getTaskId(), actualInfo.getTaskId());
		assertEquals(expectinfo.getAllowProgramIdChanged(), actualInfo.getAllowProgramIdChanged());
		assertEquals(expectinfo.getTaskXml(), actualInfo.getTaskXml());
	}

}
