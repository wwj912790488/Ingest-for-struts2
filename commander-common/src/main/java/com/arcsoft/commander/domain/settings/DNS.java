package com.arcsoft.commander.domain.settings;

/**
 * 
 * @author Bing
 * 
 */
public class DNS {

	private String ip;

	public DNS() {

	}

	public DNS(String ip) {
		this.ip = ip;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	@Override
	public String toString() {
		return ip;
	}
}
