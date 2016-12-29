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
public class AddStorageRequestTest extends BaseRequestTest<AddStorageRequest> {

	@Test
	public void testRequest() throws IOException {
		AddStorageRequest actual = testConverter(Actions.STORAGE_ADD, new AddStorageRequest());
		assertNotNull(actual);
	}
}
