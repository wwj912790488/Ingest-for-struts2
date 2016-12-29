package com.arcsoft.commander.web;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.Logger;
import org.springframework.core.io.DefaultResourceLoader;

import com.arcsoft.arcvideo.common.utils.ConfigVarProperties;
import com.arcsoft.arcvideo.common.utils.IOUtils;
import com.arcsoft.arcvideo.common.utils.StringHelper;
import com.arcsoft.arcvideo.spring.utils.SpringPropertyConfigurer;
import com.arcsoft.web4transcoder.AppConfig;

/**
 * System initialization configuration context listener.
 * 
 * @author fjli
 */
public class SystemInitConfigListener implements ServletContextListener {

	private static final String ARCVIDEO_HOME = "arcvideo.home";
	private Logger log = Logger.getLogger(SystemInitConfigListener.class);

	@Override
	public void contextInitialized(ServletContextEvent sce) {
		// load webapp configuration.
		ConfigVarProperties webappConfig = null;
		try {
			String config = sce.getServletContext().getInitParameter("webappConfigLocation");
			log.info("Loading applicatoin configuration from " + config);
			webappConfig = loadConfig(config);
			String home = webappConfig.getString(ARCVIDEO_HOME);
			if (StringHelper.isBlank(home)) {
				String webRoot = sce.getServletContext().getRealPath("/");
				home = new File(webRoot).getParentFile().getAbsolutePath();
				webappConfig.setString(ARCVIDEO_HOME, home);
			}
			log.info("The system home path is " + home);
			SpringPropertyConfigurer.setAppConfig(webappConfig);
		} catch (IOException e) {
			log.error("load webapp configuration file failed.", e);
			return;
		}

		// load transcoder configuration.
		try {
			String config = webappConfig.getString("transcoder.config.file");
			log.info("Loading transcoder configuration from " + config);
			ConfigVarProperties transcoderConfig = loadConfig(config);
			transcoderConfig.setDefaultProperties(webappConfig);
			for (String name : transcoderConfig.stringPropertyNames()) {
				AppConfig.setProperty(name, transcoderConfig.getString(name));
			}
		} catch (IOException e) {
			log.error("load transcoder configuration file failed.", e);
		}
	}

	/**
	 * Load configurations from the given path.
	 */
	private ConfigVarProperties loadConfig(String path) throws IOException {
		InputStream stream = null;
		try {
			stream = new DefaultResourceLoader().getResource(path).getInputStream();
			ConfigVarProperties config = new ConfigVarProperties();
			config.load(stream);
			return config;
		} finally {
			IOUtils.closeQuietly(stream);
		}
	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
	}

}
