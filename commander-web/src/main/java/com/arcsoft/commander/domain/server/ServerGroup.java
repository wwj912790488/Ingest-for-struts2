package com.arcsoft.commander.domain.server;

import java.util.List;
import java.util.Set;

import com.arcsoft.commander.domain.matrix.Matrix;
import com.arcsoft.commander.domain.task.TaskReceiver;

/**
 * Server group.
 * 
 * @author fjli
 */
public class ServerGroup implements TaskReceiver {

	/**
	 * Indicate this group is default group.
	 */
	public static final int TYPE_DEFAULT = 0;

	/**
	 * Indicate this group is 1+1 backup group.
	 */
	public static final int TYPE_LIVE = 1;

	private Integer id;
	private String name;
	private Integer type;
	private List<Server> servers;
	private Set<Matrix> matrixes;
	/**
	 * Return the group id.
	 */
	public Integer getId() {
		return id;
	}

	/**
	 * Set the group id.
	 * 
	 * @param id - the group id
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * Returns the group name.
	 */
	public String getName() {
		return name;
	}

	/**
	 * Set the group name.
	 * 
	 * @param name - the group name
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * Returns the group type.
	 *
	 */
	public Integer getType() {
		return type;
	}

	/**
	 * Set the group type.
	 * 
	 * @param type - the group type
	 */
	public void setType(Integer type) {
		this.type = type;
	}

	/**
	 * Returns the servers.
	 */
	public List<Server> getServers() {
		return servers;
	}

	/**
	 * Set the servers belongs to this group.
	 * 
	 * @param servers - the servers to be set
	 */
	public void setServers(List<Server> servers) {
		this.servers = servers;
	}
	
	/**
	 * @return the matrixs
	 */
	public Set<Matrix> getMatrixes() {
		return matrixes;
	}
	
	/**
	 * @param matrixes the matrixs to set
	 */
	public void setMatrixes(Set<Matrix> matrixes) {
		this.matrixes = matrixes;
	}

}
