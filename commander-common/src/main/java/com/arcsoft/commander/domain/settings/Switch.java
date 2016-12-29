package com.arcsoft.commander.domain.settings;

/**
 * @author wtsun
 * 
 */
public class Switch {
	private Integer id;
	private String serverId;  // server id(uuid)
	private String community; // snmp community for write
	private String ip;        // switch ip
	private Integer ifindex;  // snmp interface entry index of swtich port used by the server

	public Switch() {
	}

	public Switch(int id, String serverId, int ifindex) {
		this.setId(id);
		this.setServerId(serverId);
		this.setIfindex(ifindex);
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getServerId() {
		return serverId;
	}

	public void setServerId(String serverId) {
		this.serverId = serverId;
	}

	public String getCommunity() {
		return community;
	}

	public void setCommunity(String community) {
		this.community = community;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public Integer getIfindex() {
		return ifindex;
	}

	public void setIfindex(Integer ifindex) {
		this.ifindex = ifindex;
	}
}
