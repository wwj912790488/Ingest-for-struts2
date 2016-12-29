package com.arcsoft.commander.web;

import org.apache.log4j.Logger;
import org.springframework.web.context.support.XmlWebApplicationContext;

import com.arcsoft.util.SystemExecutor;

/**
 * Custom spring web application context.
 * 
 * @author fjli
 */
public class SpringWebApplicationContext extends XmlWebApplicationContext {
 
	private Logger log = Logger.getLogger(SpringWebApplicationContext.class);

	@Override
	protected void initPropertySources() {
		log.info("Spring web application initialing.");
		super.initPropertySources();
	}

	@Override
	protected void onClose() {
		log.info("Spring web application context closed, clean resources.");
		super.onClose();
		SystemExecutor.destroy();
	}

}
