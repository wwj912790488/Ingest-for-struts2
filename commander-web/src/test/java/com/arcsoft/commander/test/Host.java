package com.arcsoft.commander.test;

import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * The test host which is configured in test configuration.
 * 
 * @author fjli
 */
@XmlRootElement(name = "host")
public class Host {

	private String id;
	private String name;
	private String ip;
	private Integer port;
	private List<String> networks;

	/**
	 * Return system id.
	 */
	public String getId() {
		return id;
	}

	/**
	 * Set system id.
	 * 
	 * @param id - the system id
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * Returns the host name.
	 */
	public String getName() {
		return name;
	}

	/**
	 * Set the host name.
	 * 
	 * @param name - the host name
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * Returns the cluster ip.
	 */
	public String getIp() {
		return ip;
	}

	/**
	 * Set the cluster ip.
	 * 
	 * @param ip - the cluster ip
	 */
	public void setIp(String ip) {
		this.ip = ip;
	}

	/**
	 * Return the cluster port.
	 */
	public Integer getPort() {
		return port;
	}

	/**
	 * Set the cluster port.
	 * 
	 * @param port - the cluster port.
	 */
	public void setPort(Integer port) {
		this.port = port;
	}

	/**
	 * Returns the hardware network addresses.
	 */
	@XmlElementWrapper(name = "networks")
	@XmlElement(name="network")
	public List<String> getNetworks() {
		return networks;
	}

	/**
	 * Set the hardware network addresses.
	 * 
	 * @param netAddr - the network addresses
	 */
	public void setNetworks(List<String> networks) {
		this.networks = networks;
	}

}
