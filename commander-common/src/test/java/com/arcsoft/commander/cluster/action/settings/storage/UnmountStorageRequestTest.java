package com.arcsoft.commander.cluster.action.settings.storage;

import static org.junit.Assert.assertNotNull;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;


/**
 * Request for unmount storage
 * 
 * @author hxiang
 */
public class UnmountStorageRequestTest extends BaseRequestTest<UnmountStorageRequest> {

	@Test
	public void testRequest() throws IOException {
		UnmountStorageRequest actual = testConverter(Actions.STORAGE_UNMOUNT, new UnmountStorageRequest());
		assertNotNull(actual);
	}
}
