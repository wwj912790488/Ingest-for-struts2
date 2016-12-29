package com.arcsoft.commander.cluster.action.settings.storage;

import static org.junit.Assert.assertNotNull;

import java.io.IOException;

import javax.xml.bind.annotation.XmlRootElement;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;

/**
 * 
 * @author hxiang
 */
@XmlRootElement
public class FindStorageRequestTest extends BaseRequestTest<FindStorageRequest> {

	@Test
	public void testRequest() throws IOException {
		FindStorageRequest actual = testConverter(Actions.STORAGE_FIND,
				new FindStorageRequest());
		assertNotNull(actual);
	}
}
