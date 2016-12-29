package com.arcsoft.commander.domain.server;

import java.util.List;

import com.arcsoft.cluster.node.NodeDescription;
import com.arcsoft.commander.cluster.NodeType;
import com.arcsoft.commander.domain.matrix.MatrixSetting;
import com.arcsoft.commander.domain.task.TaskReceiver;

/**
 * This class represents the core / live agent in the cluster.
 * 
 * @author fjli
 */
public class Server implements TaskReceiver {

	/**
	 * Indicate the server is OK.
	 */
	public static final int STATE_OK = 0;

	/**
	 * Indicate the GPU has error.
	 */
	public static final int STATE_GPU_ERROR = 1;

	/**
	 * Indicate the network has error.
	 */
	public static final int STATE_NETWORK_ERROR = 2;

	private String id;
	private Integer type;
	private String name;
	private String ip;
	private Integer port;
	private Integer state;
	private boolean backup;
	private ServerGroup group;
	private boolean added;
	private boolean alive;
	private boolean faultDisabled;
	private ServerCapabilities capabilities;
	private List<MatrixSetting> matrixSettings;

	private List<Integer> sdiPorts;
	/**
	 * Default construct.
	 */
	public Server() {
		
	}

	/**
	 * Construct server with the specified node description.
	 * @param desc
	 */
	public Server(NodeDescription desc) {
		this.type = desc.getType();
		this.id = desc.getId();
		this.ip = desc.getIp();
		this.port = desc.getPort();
		this.name = desc.getName();
	}

	/**
	 * Return the server id.
	 */
	public String getId() {
		return id;
	}

	/**
	 * Set the server id.
	 * 
	 * @param id - the server id
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * Return the server name.
	 */
	public String getName() {
		return name;
	}

	/**
	 * Set the server name.
	 * 
	 * @param name - the server name to be set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * Returns the server ip.
	 */
	public String getIp() {
		return ip;
	}

	/**
	 * Set the server ip.
	 * 
	 * @param ip - the server ip.
	 */
	public void setIp(String ip) {
		this.ip = ip;
	}

	/**
	 * Returns the server port.
	 */
	public Integer getPort() {
		return port;
	}

	/**
	 * Set the server port.
	 * 
	 * @param port - the server port
	 */
	public void setPort(Integer port) {
		this.port = port;
	}

	/**
	 * Return the server state.
	 */
	public Integer getState() {
		return state;
	}

	/**
	 * Set the server state.
	 * 
	 * @param state - the state to be set
	 */
	public void setState(Integer state) {
		this.state = state;
	}

	/**
	 * Returns the server type.
	 * 
	 * @see NodeType#TYPE_CORE
	 * @see NodeType#TYPE_LIVE
	 */
	public Integer getType() {
		return type;
	}

	/**
	 * Set the server type.
	 * 
	 * @param type - the server type.
	 */
	public void setType(Integer type) {
		this.type = type;
	}

	/**
	 * Indicate the server is added or not.
	 * 	- For servers in database, it is true.
	 *  - For other servers, it is false.
	 */
	public boolean isAdded() {
		return added;
	}

	/**
	 * Set the server is added or not.
	 * 
	 * @param added - the flag to be set
	 */
	public void setAdded(boolean added) {
		this.added = added;
	}

	/**
	 * Indicate the server is alive or not.
	 */
	public boolean isAlive() {
		return alive;
	}

	/**
	 * Set the server is alive or not.
	 * 
	 * @param alive - the alive flag to bet set
	 */
	public void setAlive(boolean alive) {
		this.alive = alive;
	}

	/**
	 * @return the faultDisabled
	 */
	public boolean isFaultDisabled() {
		return faultDisabled;
	}

	/**
	 * @param faultDisabled the faultDisabled to set
	 */
	public void setFaultDisabled(boolean faultDisabled) {
		this.faultDisabled = faultDisabled;
	}

	/**
	 * Returns the group this server belongs to.
	 */
	public ServerGroup getGroup() {
		return group;
	}

	/**
	 * Set the server group.
	 * 
	 * @param group - the server group
	 */
	public void setGroup(ServerGroup group) {
		this.group = group;
	}

	/**
	 * Indicate the server is a backup server.
	 */
	public boolean isBackup() {
		return backup;
	}

	/**
	 * Set the backup flag.
	 * 
	 * @param backup - the backup flag.
	 */
	public void setBackup(boolean backup) {
		this.backup = backup;
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
	 * @return the matrixSettings
	 */
	public List<MatrixSetting> getMatrixSettings() {
		return matrixSettings;
	}

	
	/**
	 * @param matrixSettings the matrixSettings to set
	 */
	public void setMatrixSettings(List<MatrixSetting> matrixSettings) {
		this.matrixSettings = matrixSettings;
	}

	
	/**
	 * @return the sdiPorts
	 */
	public List<Integer> getSdiPorts() {
		return sdiPorts;
	}

	
	/**
	 * @param sdiPorts the sdiPorts to set
	 */
	public void setSdiPorts(List<Integer> sdiPorts) {
		this.sdiPorts = sdiPorts;
	}

}
