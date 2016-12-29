package com.arcsoft.commander.cluster.action.task;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseResponse;

/**
 * GetHttpGroupSettingAccessor response
 * 
 * @author wtsun
 */
@XmlRootElement
public class GetHttpGroupSettingAccessorResponse extends BaseResponse {
	private String ip;
	private Integer port;

	/**
	 * @return the ip
	 */
	public String getIp() {
		return ip;
	}

	/**
	 * @param ip the ip to set
	 */
	public void setIp(String ip) {
		this.ip = ip;
	}
	
	/**
	 * @return the port
	 */
	public Integer getPort() {
		return port;
	}

	/**
	 * @param port the port to set
	 */
	public void setPort(Integer port) {
		this.port = port;
	}

}
