package com.arcsoft.commander.service.system.impl;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.BeanUtils;

import com.arcsoft.arcvideo.common.net.NetworkHelper;
import com.arcsoft.arcvideo.common.utils.StringHelper;
import com.arcsoft.arcvideo.ha.HAService;
import com.arcsoft.arcvideo.ha.config.HAConfigNotAvailableException;
import com.arcsoft.arcvideo.ha.event.HAEvent;
import com.arcsoft.arcvideo.ha.event.HAEventListener;
import com.arcsoft.arcvideo.ha.event.HARoleChanged;
import com.arcsoft.commander.dao.system.SystemDao;
import com.arcsoft.commander.domain.system.SystemSettings;
import com.arcsoft.commander.service.BaseService;
import com.arcsoft.commander.service.cluster.ClusterSearchType;
import com.arcsoft.commander.service.system.SystemContext;
import com.arcsoft.commander.service.system.SystemContextListener;
import com.arcsoft.commander.service.system.SystemService;
import com.arcsoft.commons.utils.SystemHelper;

/**
 * This class maintains the commander system context and system initialize,
 * So this is the first service to be initialized. If system is initialized,
 * then initialize the system context immediately; otherwise, waiting until
 * the system is initialized, then continue.
 * 
 * @author fjli
 */
public class SystemServiceImpl extends BaseService implements SystemService, HAEventListener, SystemContext {

	private SystemDao systemDao;
	private List<SystemContextListener> contextListeners;
	private boolean initialized;
	private HAService haService;
	private boolean haEnabled = false;

	public void setSystemDao(SystemDao systemDao) {
		this.systemDao = systemDao;
	}

	public void setHaService(HAService haService) {
		this.haService = haService;
	}

	public void setContextListeners(List<SystemContextListener> contextListeners) {
		this.contextListeners = contextListeners;
	}

	@Override
	public boolean isHAEnabled() {
		return haEnabled;
	}

	@Override
	public int getRole() {
		if (haEnabled)
			return haService.getRole();
		return HAService.ROLE_MASTER;
	}

	/**
	 * Initialize system service.
	 */
	public void init() {
		LOG.info("init system service.");
		if (haService != null) {
			try {
				haService.addListener(this);
				haService.start();
				haEnabled = true;
				LOG.info("HA service started.");
			} catch (HAConfigNotAvailableException e) {
				LOG.warn("HA configuration not available, HA will be disabled.", e);
			} catch (IOException e) {
				LOG.error("start HA failed, HA will be disabled.", e);
			}
		} else {
			LOG.warn("HAService not found, HA will be disabled.");
		}
		// If HA is disabled, start the context, otherwise context will be started after received HA role changed event.
		if (!haEnabled) {
			SystemSettings settings = getSettings();
			startContext(settings);
		}
	}

	/**
	 * Destroy system service.
	 */
	public void destroy() {
		LOG.info("destroy system service.");
		if (haService != null) {
			haEnabled = false;
			haService.removeListener(this);
			haService.stop();
		}
		destroyContext();
	}

	/**
	 * Start the context.
	 * 
	 * @param settings
	 */
	private synchronized void startContext(SystemSettings settings) {
		// if the system is initialized, destroy the previous one.
		if (initialized) {
			destroyContext();
		}

		// if the settings is valid, initialize the context.
		if (isValidSettings(settings)) {
			// Update system settings in cache.
			BeanUtils.copyProperties(settings, systemSettings);
			initContext();
		} else {
			LOG.error("start system context failed: invalid system settings.");
		}
	}

	/**
	 * Initialize the system context.
	 */
	private synchronized void initContext() {
		LOG.info("initialize system context.");

		// Notify all context listeners to initialize.
		if (contextListeners != null) {
			for (SystemContextListener listener : contextListeners) {
				try {
					listener.contextInit(this);
				} catch(Exception e) {
					LOG.error("context init failed.", e);
				}
			}
		}

		// Finally, set the flag.
		initialized = true;
		LOG.info("initialize system context finished.");
	}

	/**
	 * Destroy the system context.
	 */
	private synchronized void destroyContext() {
		LOG.info("destroy system context.");

		// Notify all context listeners to destroy.
		if (contextListeners != null) {
			for (SystemContextListener listener : contextListeners) {
				try {
					listener.contextDestory(this);
				} catch(Exception e) {
					LOG.error("context destroy failed.", e);
				}
			}
		}

		// Finally, set the flag.
		initialized = false;
		LOG.info("destroy system context finished.");
	}

	/**
	 * Check the settings is valid or not.
	 */
	private boolean isValidSettings(SystemSettings settings) {
		if (StringHelper.isBlank(settings.getClusterIp())
				|| settings.getClusterPort() == null
				|| StringHelper.isBlank(settings.getBindAddr())
				|| settings.getClusterType() == null) {
			return false;
		}
		return true;
	}

	@Override
	public synchronized boolean isSystemInited() {
		return initialized;
	}

	@Override
	public SystemSettings getSettings() {
		HashMap<String, String> maps = systemDao.getSettings();
		SystemSettings settings = new SystemSettings();
		settings.setClusterType(StringHelper.toInteger(maps.get(SystemSettings.CLUSTER_TYPE)));
		settings.setClusterIp(maps.get(SystemSettings.CLUSTER_IP));
		settings.setClusterPort(StringHelper.toInteger(maps.get(SystemSettings.CLUSTER_PORT)));
		String id = SystemHelper.os.getSystemUUID();
		String bindAddr = maps.get(SystemSettings.CLUSTER_BINDADDR + "_" + id);
		if (bindAddr == null) {
			String macAddr = maps.get(SystemSettings.CLUSTER_BINDADDR);
			if (macAddr != null)
				bindAddr = NetworkHelper.getHostAddressByMacAddr(macAddr);
		}
		settings.setBindAddr(bindAddr);
		settings.setTimeToLive(StringHelper.toInteger(maps.get(SystemSettings.CLUSTER_TIME_TO_LIVE), 1));
		settings.setHeartbeatInterval(StringHelper.toInteger(maps.get(SystemSettings.CLUSTER_HEARTBEAT_INTERVAL), 100));
		settings.setHeartbeatTimeout(StringHelper.toInteger(maps.get(SystemSettings.CLUSTER_HEARTBEAT_TIMEOUT), 2000));
		settings.setClusterSearchType(StringHelper.toInteger(maps.get(SystemSettings.CLUSTER_SEARCH_TYPE), ClusterSearchType.SEARCH_BY_MULTICAST));
		return settings;
	}

	@Override
	public void saveSettings(SystemSettings settings) {
		HashMap<String, String> maps = new HashMap<String, String>();
		maps.put(SystemSettings.CLUSTER_IP, settings.getClusterIp());
		maps.put(SystemSettings.CLUSTER_PORT, String.valueOf(settings.getClusterPort()));
		String id = SystemHelper.os.getSystemUUID();
		maps.put(SystemSettings.CLUSTER_BINDADDR + "_" + id, settings.getBindAddr());
		maps.put(SystemSettings.CLUSTER_BINDADDR, null);
		maps.put(SystemSettings.CLUSTER_TYPE, String.valueOf(settings.getClusterType()));
		maps.put(SystemSettings.CLUSTER_TIME_TO_LIVE, String.valueOf(settings.getTimeToLive()));
		maps.put(SystemSettings.CLUSTER_HEARTBEAT_INTERVAL, String.valueOf(settings.getHeartbeatInterval()));
		maps.put(SystemSettings.CLUSTER_HEARTBEAT_TIMEOUT, String.valueOf(settings.getHeartbeatTimeout()));
		maps.put(SystemSettings.CLUSTER_SEARCH_TYPE, String.valueOf(settings.getClusterSearchType()));
		systemDao.saveSettings(maps);
		startContext(settings);
	}

	@Override
	public void onHAEvent(HAEvent event) {
		if (event instanceof HARoleChanged) {
			HARoleChanged roleChangedEvent = (HARoleChanged) event;
			LOG.info("HA role changed: " + roleChangedEvent.getOldRole() + "=>" + roleChangedEvent.getNewRole());
			switch (roleChangedEvent.getNewRole()) {
			case HAService.ROLE_MASTER:
			case HAService.ROLE_SLAVE:
				SystemSettings settings = getSettings();
				startContext(settings);
				break;
			}
		}
	}

}
