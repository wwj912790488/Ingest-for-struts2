package com.arcsoft.commander.cluster.action.settings.time;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.Test;

import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.BaseRequestTest;
import com.arcsoft.commander.domain.settings.NTPStatus;

public class SetDateTimeRequestTest extends BaseRequestTest<SetDateTimeRequest> {

	@Test
	public void testRequest() throws IOException {
		List<String> servers = new ArrayList<String>();
		servers.add("172.17.186.90");
		servers.add("172.17.186.91");
		NTPStatus ntp = new NTPStatus(true, servers);
		SetDateTimeRequest expect = new SetDateTimeRequest(new Date(), ntp);
		SetDateTimeRequest actual = testConverter(Actions.SYSTEM_SET_TIME, expect);				
		assertEquals(expect.getDate().getTime(), actual.getDate().getTime());			
		assertTrue(actual.getNtpStatus().getIsServiceOn());
		assertEquals(2, actual.getNtpStatus().getNtpServers().size());
		assertEquals(servers.get(0), actual.getNtpStatus().getNtpServers().get(0));
		assertEquals(servers.get(1), actual.getNtpStatus().getNtpServers().get(1));

	}
}
