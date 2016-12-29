package com.arcsoft.commander.cluster.action.settings.storage;

import static org.junit.Assert.assertNotNull;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseResponseTest;


/**
 * Request for mount storage
 * 
 * @author hxiang
 */
public class MountStorageResponseTest extends BaseResponseTest<MountStorageResponse> {

	@Test
	public void testRequest() throws IOException {
		MountStorageResponse actual = testConverter(Actions.STORAGE_MOUNT, new MountStorageResponse());
		assertNotNull(actual);
	}
}
