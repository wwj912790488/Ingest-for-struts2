package com.arcsoft.commander.cluster.action.settings.storage;

import static org.junit.Assert.assertNotNull;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;

/**
 * 
 * @author hxiang
 */
public class FindRemoteMountedStorageRequestTest extends BaseRequestTest<FindRemoteMountedStorageRequest> {

	@Test
	public void testRequest() throws IOException {
		FindRemoteMountedStorageRequest actual = testConverter(Actions.STORAGE_FIND_REMOTE_MOUNTED,
				new FindRemoteMountedStorageRequest());
		assertNotNull(actual);
	}
}
