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
public class UpdateStorageResponseTest extends BaseResponseTest<UpdateStorageResponse> {

	@Test
	public void testRequest() throws IOException {
		UpdateStorageResponse actual = testConverter(Actions.STORAGE_UPDATE, new UpdateStorageResponse());
		assertNotNull(actual);
	}
}
