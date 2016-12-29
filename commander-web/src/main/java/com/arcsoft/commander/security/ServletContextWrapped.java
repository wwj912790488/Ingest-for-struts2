package com.arcsoft.commander.security;

import java.util.List;
import java.util.Map;

import org.springframework.security.access.ConfigAttribute;


/**
 * 
 * @author ybzhang
 */
public class ServletContextWrapped  {

	private static Map<String, List<ConfigAttribute>> resourceMap = null;
	
	/**
	 * @return the resourceMap
	 */
	public static Map<String, List<ConfigAttribute>> getResourceMap() {
		return resourceMap;
	}

	
	/**
	 * @param resourceMap the resourceMap to set
	 */
	public static void setResourceMap(Map<String, List<ConfigAttribute>> resourceMap) {
		ServletContextWrapped.resourceMap = resourceMap;
	}
	
	
}
