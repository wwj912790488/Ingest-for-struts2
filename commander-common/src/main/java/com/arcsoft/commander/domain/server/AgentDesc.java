package com.arcsoft.commander.domain.server;

import java.util.Map;

/**
 * The agent description
 * 
 * @author fjli
 */
public class AgentDesc {

	private Map<String, Boolean> networkState;
	private Boolean gpuState;
	private ServerCapabilities capabilities;
	private AgentVersion version;

	/**
	 * Returns network states.
	 */
	public Map<String, Boolean> getNetworkState() {
		return networkState;
	}

	/**
	 * Set network states.
	 * 
	 * @param networkState - the states map
	 */
	public void setNetworkState(Map<String, Boolean> networkState) {
		this.networkState = networkState;
	}

	/**
	 * Returns the GPU state.
	 */
	public Boolean getGpuState() {
		return gpuState;
	}

	/**
	 * Set GPU state.
	 * 
	 * @param gpuState the gpuState to set
	 */
	public void setGpuState(Boolean gpuState) {
		this.gpuState = gpuState;
	}

	/**
	 * Returns the server capabilities.
	 */
	public ServerCapabilities getCapabilities() {
		return capabilities;
	}

	/**
	 * Set the server capabilities.
	 * 
	 * @param capabilities - the capabilities to set
	 */
	public void setCapabilities(ServerCapabilities capabilities) {
		this.capabilities = capabilities;
	}

	/**
	 * Returns the agent version.
	 */
	public AgentVersion getVersion() {
		return version;
	}

	/**
	 * Set the agent version.
	 * 
	 * @param version - the version to set
	 */
	public void setVersion(AgentVersion version) {
		this.version = version;
	}

	/**
	 * Test whether this agent is compatible with the specified agent or not.
	 * 
	 * @param other - the specified agent description.
	 * @return true if it is compatible.
	 */
	public boolean isCompatible(AgentDesc other) {
		return true;
	}

}
