package com.arcsoft.commander.domain.sample;

import java.io.Serializable;
import java.util.concurrent.ConcurrentHashMap;


/**
 * This class just use for test.
 * @author zw
 */
@SuppressWarnings("serial")
public class FireWall implements Serializable {
	/**
	 * FireWall list. This property is thread safe.
	 * */
	public static final ConcurrentHashMap<String, String> fireWallList = new ConcurrentHashMap<String, String>();
	
	/**
	 * Initialized value.
	 * */
	static{
		fireWallList.put("192.168.100.22", "0.0.0.1");
		fireWallList.put("192.168.100.23", "0.0.0.2");
		fireWallList.put("192.168.100.24", "0.0.0.3");
		fireWallList.put("192.168.100.25", "0.0.0.4");
	}
}
