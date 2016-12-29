package com.arcsoft.commander.service.cluster.impl;

import com.arcsoft.commander.cluster.Configuration;
import com.arcsoft.commander.cluster.NodeType;
import com.arcsoft.commander.domain.system.SystemSettings;

/**
 * Commander configuration.
 * 
 * @author fjli
 */
public class CommanderConfiguration extends Configuration {

	private int clusterSearchType;

	/**
	 * Construct new commander configuration.
	 * 
	 * @param clusterType - the commander type
	 */
	public CommanderConfiguration(int clusterType) {
		setClusterType(clusterType);
		setServerType(NodeType.TYPE_COMMANDER);
	}

	/**
	 * Returns cluster search type.
	 * 
	 * @see SystemSettings#CLUSTER_SEARCH_TYPE_MULTICAST
	 * @see SystemSettings#CLUSTER_SEARCH_TYPE_BROADCAST
	 */
	public int getClusterSearchType() {
		return clusterSearchType;
	}

	/**
	 * Set cluster search type.
	 * 
	 * @param clusterSearchType - the search type to set
	 */
	public void setClusterSearchType(int clusterSearchType) {
		this.clusterSearchType = clusterSearchType;
	}

}
