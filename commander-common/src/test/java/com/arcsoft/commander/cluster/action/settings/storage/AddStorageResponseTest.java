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
public class AddStorageResponseTest extends BaseResponseTest<AddStorageResponse> {

	@Test
	public void testRequest() throws IOException {
		AddStorageResponse actual = testConverter(Actions.STORAGE_ADD, new AddStorageResponse());
		assertNotNull(actual);
	}
}
