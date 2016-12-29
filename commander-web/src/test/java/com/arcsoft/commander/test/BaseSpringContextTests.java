package com.arcsoft.commander.test;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;

/**
 * Base spring context test unit class.
 * 
 * @author fjli
 */
@ContextConfiguration(locations = {
		"classpath*:/config/core/*.xml",
		"classpath*:/config/task/*.xml",
		"classpath*:/config/spring_*.xml",
		"classpath*:/com/arcsoft/commander/**/spring_*.xml",
})
public abstract class BaseSpringContextTests extends AbstractJUnit4SpringContextTests {

	/**
	 * Test context.
	 */
	protected static TestContext testContext = TestContext.getContext();

}
