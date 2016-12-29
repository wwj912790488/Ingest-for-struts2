package com.arcsoft.commander.integration;

import static org.junit.Assert.assertFalse;

import java.io.BufferedReader;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.apache.log4j.Logger;
import org.junit.Ignore;
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

	@Test
	public void taskLanguageKeysTest() throws Exception {
		Properties zh = new Properties();
		zh.load(getClass().getResourceAsStream("/resource_zh.properties"));
		Properties en = new Properties();
		en.load(getClass().getResourceAsStream("/resource_en.properties"));
		boolean enFlag = false;
		boolean zhFlag = false;
		for (Object key : zh.keySet()) {
			if (!en.containsKey(key)) {
				enFlag = true;
				log.error("The " + key + " is not exist in resource_en.properties");
			}
		}
		for (Object key : en.keySet()) {
			if (!zh.containsKey(key)) {
				zhFlag = true;
				log.error("The " + key + " is not exist in resource_zh.properties");
			}
		}
		assertFalse(enFlag);
		assertFalse(zhFlag);
	}

	@Test
	public void languageMergeTest() throws Exception {
		Properties zh = new Properties();
		zh.load(getClass().getResourceAsStream("/resource_zh.properties"));
		Properties zh2 = new Properties();
		zh2.load(getClass().getResourceAsStream("/language/resources_zh_CN.properties"));
		boolean enFlag = false;
		boolean zhFlag = false;
		for (Object key : zh.keySet()) {
			if (zh2.containsKey(key)) {
				enFlag = true;
				log.error("The " + key + " is exist in /language/resources_zh_CN.properties");
			}
		}
		for (Object key : zh2.keySet()) {
			if (zh.containsKey(key)) {
				zhFlag = true;
				log.error("The " + key + " is exist in resource_zh.properties");
			}
		}
		assertFalse(enFlag);
		assertFalse(zhFlag);
	}

	@Test
	@Ignore
	public void removSameKeysTest() throws Exception {
		removeSameKeys("/resource_en.properties", "/language/resources_en_US.properties", "d:\\resources_en_US.properties");
		removeSameKeys("/resource_zh.properties", "/language/resources_zh_CN.properties", "d:\\resources_zh_CN.properties");
	}

	private void removeSameKeys(String source, String dest, String output) throws Exception {
		List<String> existKeys = new ArrayList<>();
		Properties zh = new Properties();
		zh.load(getClass().getResourceAsStream(source));
		Properties zh2 = new Properties();
		zh2.load(getClass().getResourceAsStream(dest));
		for (Object key : zh.keySet()) {
			if (zh2.containsKey(key)) {
				existKeys.add((String) key);
				log.error("The " + key + " is exist in " + dest);
			}
		}
		StringBuffer buffer = new StringBuffer();
		BufferedReader reader = new BufferedReader(new InputStreamReader(getClass().getResourceAsStream(dest)));
		String line = null;
		while ((line = reader.readLine()) != null) {
			String[] values = line.split("=", 2);
			if (!existKeys.contains(values[0]))
				buffer.append(line).append("\n");
		}
		reader.close();
		FileWriter writer = new FileWriter(output);
		writer.write(buffer.toString());
		writer.close();
	}

}
