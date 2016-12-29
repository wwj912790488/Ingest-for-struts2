package com.arcsoft.commander.cluster.action.server;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.cluster.node.NodeDescription;
import com.arcsoft.commander.cluster.RemoteNodeInfo;
import com.arcsoft.commander.cluster.action.BaseRequest;

/**
 * Bind master and slave. This request is send to slave by master.
 * 
 * @author fjli
 */
@XmlRootElement
public class BindRequest extends BaseRequest {

	private RemoteNodeInfo master;

	/**
	 * Default construct, for data converter.
	 */
	public BindRequest() {
	}

	/**
	 * Construct bind request with the master node info.
	 * 
	 * @param master - the master node info
	 */
	public BindRequest(NodeDescription master) {
		this.master = new RemoteNodeInfo();
		this.master.setId(master.getId());
		this.master.setIp(master.getIp());
		this.master.setPort(master.getPort());
	}

	/**
	 * Returns the master node info.
	 */
	public RemoteNodeInfo getMaster() {
		return master;
	}

	/**
	 * Set the master node info.
	 * 
	 * @param master - the master info.
	 */
	public void setMaster(RemoteNodeInfo master) {
		this.master = master;
	}

}
