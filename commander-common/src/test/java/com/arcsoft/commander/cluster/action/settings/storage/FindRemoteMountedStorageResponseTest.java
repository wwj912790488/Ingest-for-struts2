package com.arcsoft.commander.cluster.action.settings.storage;

import static org.junit.Assert.assertNotNull;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseResponseTest;


/**
 * 
 * @author hxiang
 */
public class FindRemoteMountedStorageResponseTest extends BaseResponseTest<FindRemoteMountedStorageResponse> {

	@Test
	public void testRequest() throws IOException {
		FindRemoteMountedStorageResponse actual = testConverter(Actions.STORAGE_FIND_REMOTE_MOUNTED,
				new FindRemoteMountedStorageResponse());
		assertNotNull(actual);
	}
}
