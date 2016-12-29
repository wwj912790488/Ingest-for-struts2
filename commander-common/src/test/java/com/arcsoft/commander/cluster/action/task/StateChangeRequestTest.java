package com.arcsoft.commander.cluster.action.task;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.util.Date;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;
import com.arcsoft.commander.domain.task.TaskState;

/**
 * Test cases for StateChangeRequest.
 * 
 * @author fjli
 */
public class StateChangeRequestTest extends BaseRequestTest<StateChangeRequest> {

	@Test
	public void testRequest() throws IOException {
		StateChangeRequest expect = new StateChangeRequest();
		TaskState state = new TaskState();
		state.setId(1001);
		state.setDate(new Date());
		state.setPostProcessingTime(80);
		state.setTranscodingTime(100);
		state.setState("CANCELLED");
		expect.add(state);
		StateChangeRequest actual = testConverter(Actions.TASK_STATE_CHANGE, expect);
		TaskState actualState = actual.getStates().get(0);
		assertEquals(state.getId(), actualState.getId());
		assertEquals(state.getDate(), actualState.getDate());
		assertEquals(state.getPostProcessingTime(), actualState.getPostProcessingTime());
		assertEquals(state.getTranscodingTime(), actualState.getTranscodingTime());
		assertEquals(state.getState(), actualState.getState());
	}

}
