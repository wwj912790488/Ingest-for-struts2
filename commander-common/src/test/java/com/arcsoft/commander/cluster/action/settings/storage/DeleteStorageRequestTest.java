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
public class DeleteStorageRequestTest extends BaseRequestTest<DeleteStorageRequest>{

	@Test
	public void testRequest() throws IOException {
		DeleteStorageRequest actual = testConverter(Actions.STORAGE_DELETE, new DeleteStorageRequest());
		assertNotNull(actual);
	}

}
