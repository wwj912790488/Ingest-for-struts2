package com.arcsoft.commander.test;

import com.arcsoft.commander.cluster.ClusterType;
import com.arcsoft.commander.cluster.NodeType;
import com.arcsoft.commander.cluster.Configuration;

/**
 * Test live agent configuration.
 * 
 * @author fjli
 */
public class TestLiveAgentConfiguration extends Configuration {

	/**
	 * Construct live agent configuration.
	 */
	public TestLiveAgentConfiguration() {
		setClusterType(ClusterType.LIVE);
		setServerType(NodeType.TYPE_LIVE);
	}

}
