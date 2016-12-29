package com.arcsoft.commander.integration;

import static org.junit.Assert.*;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.apache.log4j.Logger;
import org.junit.Test;

import com.arcsoft.arcvideo.common.utils.IOUtils;
import com.arcsoft.commander.service.license.CommanderLicenseService;
import com.arcsoft.commander.test.BaseTestCase;
import com.arcsoft.web4transcoder.service.license.LicenseService;


/**
 * License test.
 * 
 * @author fjli
 */
public class LicenseTest extends BaseTestCase {

	private Logger log = Logger.getLogger(getClass());

	@Test
	public void licenseKeysTest() {
		// ignore fields.
		List<String> skipList = new ArrayList<>();
		skipList.add("CORE");
		skipList.add("LIVE");
		skipList.add("LICENSEID");
		skipList.add("ENABLED");
		skipList.add("DISABLED");
		skipList.add("NONE");

		// load current keys.
		InputStream is = getClass().getClassLoader().getResourceAsStream("config/limitation.properties");
		Properties p = new Properties();
		try {
			p.load(is);
		} catch (IOException e) {
			fail();
		} finally {
			IOUtils.closeQuietly(is);
		}

		// compare keys, print added keys.
		Field[] fields = CommanderLicenseService.class.getDeclaredFields();
		for (Field field : fields) {
			String name = field.getName();
			if (p.containsKey(name)) {
				p.remove(name);
			}
		}

		// compare keys, print added keys.
		boolean hasError = false;
		fields = LicenseService.class.getFields();
		for (Field field : fields) {
			String name = field.getName();
			if (skipList.contains(name))
				continue;
			if (!p.containsKey(name)) {
				log.error("license key not exist: " + name);
				hasError = true;
			} else {
				p.remove(name);
			}
		}

		// print already removed keys.
		for (String name : p.stringPropertyNames()) {
			log.error("license key already removed: " + name);
		}

		assertFalse(hasError);
		assertTrue(p.isEmpty());
	}

}
