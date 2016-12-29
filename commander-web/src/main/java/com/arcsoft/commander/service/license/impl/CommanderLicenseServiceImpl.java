package com.arcsoft.commander.service.license.impl;

import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.arcsoft.arcvideo.common.utils.OperationSystem;
import com.arcsoft.commander.service.license.CommanderLicenseService;
import com.arcsoft.web4transcoder.service.license.LicenseServiceImpl;


/**
 * Load license config file on startup and convert to map
 * 
 * @author zw
 */
public class CommanderLicenseServiceImpl extends LicenseServiceImpl implements CommanderLicenseService {
	
	private final Logger logger = LoggerFactory.getLogger(getClass());

	/** license config file inject on spring init*/
	private Properties propsFromFile;

	public void setLicenseProps(Properties propsFromFile) {
		this.propsFromFile = propsFromFile;
	}

	@Override
	public void init() {
		if (OperationSystem.getCurrentOS().isWindows() && propsFromFile != null && !propsFromFile.isEmpty()) {
			Map<String, String> limitations = super.getLimitationMap();
			Set<Entry<Object, Object>> kvs = this.propsFromFile.entrySet();
			for (Entry<Object, Object> entry : kvs) {
				limitations.put(entry.getKey().toString(), entry.getValue().toString());
			}
			limitations.put("LICENSEID", "ARCSOFT_LIVE_COMMANDER_DEVONLY");
		} else {
			super.init();
		}

//		Map<String,String> map = getLimitationMap();
//		for (Map.Entry<String, String> entry : map.entrySet()) {
//			logger.info("key= " + entry.getKey() + " and value= " + entry.getValue());
//		}
	}

	@Override
	public boolean isLicenseEnabled(String option) {
		return ENABLED.equals(getLimitation(option));
	}

	@Override
	public String getLicenseStringValue(String option) {
		Map<String, String> limitations = getLimitationMap();
		if(limitations != null){
			String value = limitations.get(option);
			if (value == null)
				return null;
			else
				return value;
		}
		return null;
	}

	@Override
	public Integer getLicenseIntValue(String option) {
		Map<String, String> limitations = getLimitationMap();
		if(limitations != null){
			String value = limitations.get(option);
			if (value == null)
				return null;
			try {
				return Integer.decode(value);
			} catch (NumberFormatException e) {
				logger.error("The specified license option value is not a number.");
				return null;
			}
		}else
			return null;
	}

}
