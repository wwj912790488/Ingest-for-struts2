package com.arcsoft.commander.domain.settings;


/**
 * @author wtsun
 * 
 */
public class IPMI {

	private String id; // server id(uuid) 
	private String ip;
	private String user;
	private String password;

	public IPMI() {
	}

	public IPMI(String id, String ip, String user, String password) {
		this.id = id;
		this.ip = ip;
		this.user = user;
		this.password = password;
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getIp() {
		return this.ip;
	}
	
	public void setIp(String ip) {
		this.ip = ip;
	}
	
	public String getUser() {
		return this.user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
