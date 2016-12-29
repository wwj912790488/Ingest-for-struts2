package com.arcsoft.commander.cluster.action.settings.network;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseResponseTest;
import com.arcsoft.commander.cluster.action.settings.network.DeleteDNSResponse;
/**
 * @author hxiang
 *
 */
public class DeleteDNSResponseTest extends BaseResponseTest<DeleteDNSResponse>{
	
	@Test
	public void testConstruct() {
		DeleteDNSResponse resp = new DeleteDNSResponse();
		assertEquals(ActionErrorCode.UNKNOWN_ERROR, resp.getErrorCode());
		resp.setErrorCode(ActionErrorCode.SUCCESS);
		assertEquals(ActionErrorCode.SUCCESS, resp.getErrorCode());
	}

	@Test
	public void testResponse() throws IOException {
		testConverter(Actions.DNS_DELETE, new DeleteDNSResponse());
	}
}
