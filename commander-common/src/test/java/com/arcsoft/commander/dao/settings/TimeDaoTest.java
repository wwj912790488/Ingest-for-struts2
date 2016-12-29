package com.arcsoft.commander.dao.settings;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.Before;
import org.junit.Test;

import com.arcsoft.commander.dao.settings.impl.TimeDaoImplRHEL;
import com.arcsoft.commander.domain.settings.NTPStatus;
import com.arcsoft.commons.utils.app.ShellException;

/**
 * Test case for time setting
 * 
 * @author xpeng
 * 
 */
public class TimeDaoTest {
	final boolean RUN_ON_RHEL = false;
	private TimeDao timeDao;

	@Before
	public void setUp() {
		timeDao = new TimeDaoImplRHEL();
	}

	@Test
	public void testListTimeZone() throws ShellException, IOException {
		if (RUN_ON_RHEL) {
			List<String> zoneList = timeDao.listTimeZone("Asia");
			assertTrue(zoneList.size() > 0);
			assertTrue(zoneList.contains("Shanghai"));
		}
	}

	@Test
	@SuppressWarnings("deprecation")
	public void testSetTimezone() throws ShellException, IOException {
		if (RUN_ON_RHEL) {
			String expect = "Asia/Tokyo"; // UTC+9
			timeDao.setTimezone(expect);

			Date actual = new Date();// get current time
			int actualZone = -(actual.getTimezoneOffset()/60);			
			assertEquals(9, actualZone);	
		}
	}

	@Test
	@SuppressWarnings("deprecation")
	public void testSetSystemTime() throws ShellException, IOException {
		if (RUN_ON_RHEL) {
			Date old = new Date();
			
			Date expect = new Date();			
			expect.setYear(120);
			expect.setHours(5);
			timeDao.setSystemTime(expect);

			Date actual = new Date();// get current time
			assertEquals(expect.getYear(), actual.getYear());
			assertEquals(expect.getHours(), actual.getHours());
			
			timeDao.setSystemTime(old);
		}
	}

	@Test
	@SuppressWarnings("deprecation")
	public void testSyncWithNTP() throws ShellException, IOException {
		if (RUN_ON_RHEL) {
			Date expect = new Date();
			expect.setYear(120);
			timeDao.setSystemTime(expect);

			Date actual = new Date();// get current time
			assertEquals(expect.getYear(), actual.getYear());

			List<String> servers = new ArrayList<String>();
			servers.add("172.17.186.90");
			servers.add("172.17.186.91");
			NTPStatus expectNTP = new NTPStatus(true, servers);
			
			timeDao.syncWithNTP(expectNTP);

			actual = new Date();// get current time
			assertEquals(113, actual.getYear()); //2013-1900=113
			
			//test getNTPStatus
			NTPStatus actualNTP = timeDao.getNTPStatus();
			assertEquals(true, actualNTP.getIsServiceOn());
			assertEquals(2, actualNTP.getNtpServers().size());
			assertEquals("172.17.186.90", actualNTP.getNtpServers().get(0));
			assertEquals("172.17.186.91", actualNTP.getNtpServers().get(1));
		}
	}

}
