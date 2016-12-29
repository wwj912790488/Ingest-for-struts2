package com.arcsoft.commander.domain.server;

/**
 * Server capabilities.
 * 
 * @author fjli
 */
public class ServerCapabilities {

	private Integer maxTasks;
	private Integer maxOutputGroups;
	private Integer maxSDCount;
	private Integer maxHDCount;

	/**
	 * Return the the max tasks the server can be run.
	 */
	public Integer getMaxTasks() {
		return maxTasks;
	}

	/**
	 * Set the max tasks.
	 * 
	 * @param maxTasks - the maxTasks to set
	 */
	public void setMaxTasks(Integer maxTasks) {
		this.maxTasks = maxTasks;
	}

	/**
	 * Return the max output groups for a task.
	 */
	public Integer getMaxOutputGroups() {
		return maxOutputGroups;
	}

	/**
	 * Set the max output groups for a task.
	 * 
	 * @param maxOutputGroups - the maxOutputGroups to set
	 */
	public void setMaxOutputGroups(Integer maxOutputGroups) {
		this.maxOutputGroups = maxOutputGroups;
	}

	/**
	 * Return the max SD tasks.
	 */
	public Integer getMaxSDCount() {
		return maxSDCount;
	}

	/**
	 * Set the max SD tasks.
	 * 
	 * @param maxSDCount - the max SD tasks to set
	 */
	public void setMaxSDCount(Integer maxSDCount) {
		this.maxSDCount = maxSDCount;
	}

	/**
	 * Returns the max HD tasks count.
	 */
	public Integer getMaxHDCount() {
		return maxHDCount;
	}

	/**
	 * Set the max HD tasks count.
	 * 
	 * @param maxHDCount - the max HD tasks to set
	 */
	public void setMaxHDCount(Integer maxHDCount) {
		this.maxHDCount = maxHDCount;
	}

}
