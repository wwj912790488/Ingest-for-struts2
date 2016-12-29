package com.arcsoft.commander.agent.service.agent;

import com.arcsoft.commander.cluster.ClusterType;
import com.arcsoft.commander.cluster.NodeType;

/**
 * Core agent configuration.
 * 
 * @author fjli
 */
public class CoreAgentConfiguration extends AgentConfiguration {

	/**
	 * Construct live agent configuration.
	 */
	public CoreAgentConfiguration() {
		setClusterType(ClusterType.CORE);
		setServerType(NodeType.TYPE_CORE);
	}

}
