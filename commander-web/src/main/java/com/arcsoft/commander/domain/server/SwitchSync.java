package com.arcsoft.commander.domain.server;

/**
 * @author wtsun
 * 
 */
public class SwitchSync {
	private String id;  // server id(uuid)

	public SwitchSync() {
	}

	public SwitchSync(String id) {
		this.setId(id);
	}

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}

}
