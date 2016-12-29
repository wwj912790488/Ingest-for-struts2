package com.arcsoft.commander.test;

import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Test configuration.
 * 
 * @author fjli
 */
@XmlRootElement(name = "config")
public class Configuration {

	private List<Host> hosts;
	private Boolean runOnRHEL;

	/**
	 * Returns all hosts in configuration.
	 */
	@XmlElementWrapper(name = "hosts")
	@XmlElement(name="host")
	public List<Host> getHosts() {
		return hosts;
	}

	/**
	 * Set all hosts to configuration.
	 * 
	 * @param hosts - the hosts to be set
	 */
	public void setHosts(List<Host> hosts) {
		this.hosts = hosts;
	}

	public Boolean getRunOnRHEL() {
		return runOnRHEL;
	}

	public void setRunOnRHEL(Boolean runOnRHEL) {
		this.runOnRHEL = runOnRHEL;
	}
	
	

}
