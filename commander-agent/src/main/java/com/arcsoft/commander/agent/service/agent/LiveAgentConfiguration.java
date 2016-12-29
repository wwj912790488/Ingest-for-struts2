package com.arcsoft.commander.agent.service.agent;

import com.arcsoft.commander.cluster.ClusterType;
import com.arcsoft.commander.cluster.NodeType;

/**
 * Live agent configuration.
 * 
 * @author fjli
 */
public class LiveAgentConfiguration extends AgentConfiguration {

	/**
	 * Construct live agent configuration.
	 */
	public LiveAgentConfiguration() {
		setClusterType(ClusterType.LIVE);
		setServerType(NodeType.TYPE_LIVE);
	}

}
