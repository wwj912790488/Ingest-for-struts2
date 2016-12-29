package com.arcsoft.commander.web;

import static org.junit.Assert.assertFalse;

import java.util.Properties;

import org.apache.log4j.Logger;
import org.junit.Test;

import com.arcsoft.commander.test.BaseTestCase;

/**
 * Language test.
 * 
 * @author fjli
 */
public class LanguageTest extends BaseTestCase {

	private Logger log = Logger.getLogger(getClass());

	@Test
	public void languageKeysTest() throws Exception {
		Properties zh = new Properties();
		zh.load(getClass().getResourceAsStream("/language/resources_zh_CN.properties"));
		Properties en = new Properties();
		en.load(getClass().getResourceAsStream("/language/resources_en_US.properties"));
		boolean enFlag = false;
		boolean zhFlag = false;
		for (Object key : zh.keySet()) {
			if (!en.containsKey(key)) {
				enFlag = true;
				log.error("The " + key + " is not exist in resources_en_US.properties");
			}
		}
		for (Object key : en.keySet()) {
			if (!zh.containsKey(key)) {
				zhFlag = true;
				log.error("The " + key + " is not exist in resources_zh_CN.properties");
			}
		}
		assertFalse(enFlag);
		assertFalse(zhFlag);
	}

}
