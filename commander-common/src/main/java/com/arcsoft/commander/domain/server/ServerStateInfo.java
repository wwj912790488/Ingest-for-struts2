package com.arcsoft.commander.domain.server;

import java.util.Map;

/**
 * This class describes the current state of the server.
 * 
 * @author fjli
 */
public class ServerStateInfo {

	private Map<String, Boolean> networkState;
	private Boolean gpuState;

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

}
