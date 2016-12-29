package com.arcsoft.commander.service.cluster.fault;

import java.util.EventObject;

/**
 * Fault detected event
 * @author wtsun
 */
public class FaultEvent extends EventObject {

	private static final long serialVersionUID = 5190984929558694878L;
	private String nodeId;

	/**
	 * @return the nodeId
	 */
	public String getNodeId() {
		return nodeId;
	}

	/**
	 * Construct new fault detected event.
	 * 
	 * @param nodeId - the specified server id.
	 */
	public FaultEvent(String nodeId) {
		super(nodeId);
		this.nodeId = nodeId;
	}
}
