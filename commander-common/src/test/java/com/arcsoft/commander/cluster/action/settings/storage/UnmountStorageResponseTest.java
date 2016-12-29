package com.arcsoft.commander.cluster.action.settings.storage;

import static org.junit.Assert.assertNotNull;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseResponseTest;

/**
 * Response for unmount storage
 * 
 * @author hxiang
 */
public class UnmountStorageResponseTest extends BaseResponseTest<UnmountStorageResponse> {

	@Test
	public void testRequest() throws IOException {
		UnmountStorageResponse actual = testConverter(Actions.STORAGE_UNMOUNT, new UnmountStorageResponse());
		assertNotNull(actual);
	}
}
