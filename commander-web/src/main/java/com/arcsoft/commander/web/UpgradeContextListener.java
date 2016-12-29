package com.arcsoft.commander.web;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.arcsoft.commander.service.upgrade.UpgradeService;

/**
 * Upgrade context listener.
 * 
 * @author fjli
 */
public class UpgradeContextListener implements ServletContextListener {

	@Override
	public void contextInitialized(ServletContextEvent sce) {
		String config = sce.getServletContext().getInitParameter("upgradeConfigLocation");
		AbstractApplicationContext context = new ClassPathXmlApplicationContext(config.split("\\s+"));
		try {
			UpgradeService upgradeService = (UpgradeService) context.getBean(UpgradeService.class);
			if (upgradeService != null)
				upgradeService.upgrade();
		} finally {
			context.close();
		}
	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
	}

}
