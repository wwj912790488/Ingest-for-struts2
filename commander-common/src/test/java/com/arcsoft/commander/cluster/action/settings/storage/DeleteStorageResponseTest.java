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
public class DeleteStorageResponseTest extends BaseResponseTest<DeleteStorageResponse> {

	@Test
	public void testRequest() throws IOException {
		DeleteStorageResponse actual = testConverter(Actions.STORAGE_DELETE, new DeleteStorageResponse());
		assertNotNull(actual);
	}
}
