package com.arcsoft.commander.cluster.action.settings.storage;

import static org.junit.Assert.assertNotNull;

import java.io.IOException;

import javax.xml.bind.annotation.XmlRootElement;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseResponseTest;

/**
 * 
 * @author hxiang
 */

@XmlRootElement
public class FindStorageResponseTest extends BaseResponseTest<FindStorageResponse> {

	@Test
	public void testRequest() throws IOException {
		FindStorageResponse actual = testConverter(Actions.STORAGE_FIND, new FindStorageResponse());
		assertNotNull(actual);
	}
}
