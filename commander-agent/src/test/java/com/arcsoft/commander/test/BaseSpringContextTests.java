package com.arcsoft.commander.test;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;

/**
 * Base spring context test unit class.
 * 
 * @author fjli
 */
@ContextConfiguration(locations = {
		"classpath*:config/licenseBeans.xml",
		"classpath*:config/core/macroVariableResolverBeans.xml",
		"classpath*:config/core/factoryBeans.xml",
		"classpath*:config/core/xmlParserBeans.xml",
		"classpath:config/spring_*.xml",
})
public abstract class BaseSpringContextTests extends AbstractJUnit4SpringContextTests {

}
