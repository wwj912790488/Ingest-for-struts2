package com.arcsoft.commander.agent.service.settings;

import java.io.IOException;
import java.util.List;

import com.arcsoft.commander.domain.server.NioBinding;

/**
 * Network configuration.
 * 
 * @author fjli
 * @author wtsun
 */
public abstract class NetworkConfiguration {

	/**
	 * Get all available eth types.
	 */
	public abstract List<Integer> getAvailableEthTypes();

	/**
	 * Get the list of eth ids by eth type.
	 * @param ethType - the eth type
	 * @return the list of eth ids with the specified eth type.
	 */
	public abstract List<String> getEthsByType(int ethType);

	/**
	 * Get the eth id by network input-output id.
	 * 
	 * @param nio - the network input-output id
	 * @return the eth id with the specified network input-output id.
	 */
	public abstract String getEthByNio(int nio);

	/**
	 * Get the network input-output bindings
	 * 
	 * @return the network input-output bindings.
	 */
	public abstract List<NioBinding> getNioBindings();

	/**
	 * Set the network input-output bindings
	 * 
	 * @param bios - the network input-output bindings
	 */
	public abstract void setNioBindings(List<NioBinding> niobs);

	/**
	 * Save the configuration.
	 * 
	 * @throws IOException if save failed.
	 */
	public abstract void save() throws IOException;

}
