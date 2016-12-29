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
public class UpdateStorageRequestTest extends BaseRequestTest<UpdateStorageRequest> {
	@Test
	public void testRequest() throws IOException {
		UpdateStorageRequest actual = testConverter(Actions.STORAGE_UPDATE, new UpdateStorageRequest());
		assertNotNull(actual);
	}
}
