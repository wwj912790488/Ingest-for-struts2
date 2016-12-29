package com.arcsoft.commander.cluster.action.fault;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseResponse;

/**
 * The response message for getting fault service description
 * 
 * @author wtsun
 */
@XmlRootElement
public class GetFaultDescResponse extends BaseResponse {
	private String ip;
	private int port;
	
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
	public int getPort() {
		return port;
	}
	/**
	 * @param port the port to set
	 */
	public void setPort(int port) {
		this.port = port;
	}
}
