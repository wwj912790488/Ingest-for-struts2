package com.arcsoft.commander.agent.service.settings;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;
import java.util.Properties;

import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;

import com.arcsoft.arcvideo.common.utils.StringHelper;
import com.arcsoft.commander.agent.config.AppConfig;
import com.arcsoft.commander.dao.settings.EthType;
import com.arcsoft.commander.domain.server.NioBinding;

/**
 * The default network configuration file.
 * 
 * @author fjli
 * @author wtsun
 */
public class DefaultNetworkConfigFile extends NetworkConfiguration {
	private static final String DEFAULT_ETH_FUNCTION_LOCATION = "../data/networks.properties";
	private static final Integer[] functions = new Integer[] {
		EthType.PRIMARY_INPUT,
		EthType.SECONDARY_INPUT,
		EthType.PRIMARY_OUTPUT,
		EthType.SECONDARY_OUTPUT
	};
	private HashMap<Integer, NioBinding> configs = new HashMap<>();
	private File configFile;
	private static Logger log = Logger.getLogger(AppConfig.class);


	public DefaultNetworkConfigFile() throws IOException {
		configFile = new File(AppConfig.getString("network.settings.file", DEFAULT_ETH_FUNCTION_LOCATION)).getAbsoluteFile();
		readConfig();
	}
	
	public DefaultNetworkConfigFile(File configFile) throws IOException {
		this.configFile = configFile;
		readConfig();
	}

	@Override
	public List<Integer> getAvailableEthTypes() {
		List<Integer> ethTypes = new ArrayList<>();
		Collections.addAll(ethTypes, functions);
		return ethTypes;
	}

	@Override
	public List<String> getEthsByType(int ethType) {
		log.info("getEthsByType: type = " + ethType);
		List<String> list = new ArrayList<>();
		for (Entry<Integer, NioBinding> entry : configs.entrySet()) {
			NioBinding niob = entry.getValue();
			if (StringHelper.isNotBlank(niob.getEth()) && (niob.getType() & ethType) != 0 && !list.contains(niob.getEth())) {
				log.info("getEthsByType: list:+" + niob.getEth());
				list.add(niob.getEth());
			}
		}
		return list;
	}
	
	@Override
	public String getEthByNio(int nioId) {
		NioBinding niob = configs.get(nioId);
		if (niob != null)
			return niob.getEth();
		return null;
	}

	@Override
	public List<NioBinding> getNioBindings() {
		ArrayList<NioBinding> niobs = new ArrayList<NioBinding>();
		for (Entry<Integer, NioBinding> entry : configs.entrySet()) {
			niobs.add(entry.getValue());
		}
		return niobs;
	}
	
	@Override
	public void setNioBindings(List<NioBinding> niobs) {
		configs.clear();
		for (NioBinding niob : niobs)
			configs.put(niob.getNio(), niob);

	}

	private void readConfig() throws IOException {
		if (configFile.exists()) {
			Properties props = new Properties();
			InputStream is = null;
			try {
				is = new FileInputStream(configFile);
				props.load(is);
				Enumeration<?> en = props.propertyNames();
				while (en.hasMoreElements()) {
					String key = (String) en.nextElement();
					if (key.startsWith("nio"))  {// compatible with the configure file with old data
						int id = -1, type = EthType.PRIMARY_OUTPUT;
						if (key.startsWith("nio_pin")) {
							id = Integer.parseInt(key.substring(new String("nio_pin_").length()));
							type = EthType.PRIMARY_INPUT;
						}
						else if (key.startsWith("nio_sin")) {
							id = Integer.parseInt(key.substring(new String("nio_sin_").length()));
							type = EthType.SECONDARY_INPUT;
						}
						else if (key.startsWith("nio_pout")) {
							id = Integer.parseInt(key.substring(new String("nio_pout_").length()));
							type = EthType.PRIMARY_OUTPUT;
						}
						else if (key.startsWith("nio_sout")) {
							id = Integer.parseInt(key.substring(new String("nio_sout_").length()));
							type = EthType.SECONDARY_OUTPUT;
						}
						configs.put(id, new NioBinding(id, type, props.getProperty(key)));
					}
				}
			} finally {
				IOUtils.closeQuietly(is);
			}
		}
	}

	@Override
	public void save() throws IOException {
		OutputStream os = null;
		try {
			if (!configFile.exists())
				configFile.getParentFile().mkdirs();
			os = new FileOutputStream(configFile);
			Properties props = new Properties();
			for (Entry<Integer, NioBinding> entry : configs.entrySet()) {
				NioBinding niob = entry.getValue();
				String key = "nio_";
				String value = niob.getEth();
				if (niob.getType() == EthType.PRIMARY_INPUT)
					key += "pin_";
				if (niob.getType() == EthType.SECONDARY_INPUT)
					key += "sin_";
				if (niob.getType() == EthType.PRIMARY_OUTPUT)
					key += "pout_";
				if (niob.getType() == EthType.SECONDARY_OUTPUT)
					key += "sout_";
				key += niob.getNio();
				props.setProperty(key, value);
			}
			props.store(os, null);
		} catch (IOException e) {
			throw e;
		} finally {
			IOUtils.closeQuietly(os);
		}
	}
}
