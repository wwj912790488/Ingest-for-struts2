package com.arcsoft.commander.test;

import org.apache.struts2.StrutsSpringJUnit4TestCase;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * Base class for struts action test case.
 * 
 * @author fjli
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
		"classpath*:/config/core/*.xml",
		"classpath*:/config/task/*.xml",
		"classpath*:/config/spring_*.xml",
		"classpath*:/com/arcsoft/commander/**/spring_*.xml",
})
public abstract class BaseStrutsTestCase<T> extends StrutsSpringJUnit4TestCase<T> {

	/**
	 * Test context.
	 */
	protected static TestContext testContext = TestContext.getContext();

	@Override
	protected String getConfigPath() {
		String config = "struts-default.xml,struts-plugin.xml,config/struts.xml";
		String[] moduleConfigs = getModuleConfig();
		if (moduleConfigs != null) {
			for (String moduleConfig : moduleConfigs)
				config += "," + moduleConfig;
		}
		return config;
	}

	/**
	 * Returns struts configurations for the test module.
	 * Such as com/arcsoft/commander/action/xxxx/struts_action.xml
	 */
	protected abstract String[] getModuleConfig();

}
