package com.arcsoft.commander.cluster.action.settings.storage;

import static org.junit.Assert.assertNotNull;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;

/**
 * Request for mount storage
 * 
 * @author hxiang
 */
public class MountStorageRequestTest extends BaseRequestTest<MountStorageRequest> {

	@Test
	public void testRequest() throws IOException {
		MountStorageRequest actual = testConverter(Actions.STORAGE_MOUNT, new MountStorageRequest());
		assertNotNull(actual);
	}

}
