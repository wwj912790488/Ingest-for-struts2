package com.arcsoft.commander.agent.service.agent.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

import com.arcsoft.arcvideo.common.utils.ConfigProperties;
import com.arcsoft.commander.agent.config.AppConfig;
import com.arcsoft.commander.cluster.RemoteNodeInfo;

/**
 * This file is save the bound information for 1+1 backup.
 * 
 * @author fjli
 */
public class LiveBoundInfoFile {

	/**
	 * The default file name if the agent.properties is not set.
	 */
	private static final String DEFAULT_CONFIG_FILE = "../data/boundinfo.properties";

	private File configFile;
	private ConfigProperties config = new ConfigProperties();

	/**
	 * Construct LiveBoundInfoFile.
	 */
	public LiveBoundInfoFile() {
		configFile = new File(AppConfig.getString("backup.bound.persistent.file", DEFAULT_CONFIG_FILE)).getAbsoluteFile();
	}

	/**
	 * Tests whether the file exists.
	 */
	public boolean exists() {
		return configFile.exists();
	}

	/**
	 * Load the data from file.
	 * 
	 * @throws IOException - if the file does not exist or read failed.
	 */
	public void load() throws IOException {
		FileInputStream fis = null;
		try {
			fis = new FileInputStream(configFile);
			config.clear();
			config.load(fis);
		} finally {
			try {
				if (fis != null)
					fis.close();
			} catch(IOException e) {
			}
		}
	}

	/**
	 * Save the bound information to file.
	 * 
	 * @throws IOException
	 */
	public void save() throws IOException {
		FileOutputStream fos = null;
		try {
			configFile.getParentFile().mkdirs();
			fos = new FileOutputStream(configFile);
			config.store(fos, null);
		} finally {
			try {
				if (fos != null)
					fos.close();
			} catch(IOException e) {
			}
		}
	}

	/**
	 * Delete the bound information file.
	 */
	public void delete() {
		config.clear();
		configFile.delete();
	}

	/**
	 * Return the binding target.
	 */
	public RemoteNodeInfo getBindingTarget() {
		RemoteNodeInfo target = new RemoteNodeInfo();
		target.setId(config.getString("remote.id"));
		target.setIp(config.getString("remote.ip"));
		target.setPort(config.getInt("remote.port", 0));
		return target;
	}

	/**
	 * Set the binding target.
	 * 
	 * @param target - the target to be set
	 */
	public void setBindingTarget(RemoteNodeInfo target) {
		config.setString("remote.id", target.getId());
		config.setString("remote.ip", target.getIp());
		config.setInt("remote.port", target.getPort());
	}

}
