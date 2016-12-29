package com.arcsoft.commander.domain.server;

/**
 * Network input-output
 * @author wtsun
 * 
 */
public class NIO {

	private Integer id;
	private String name;
	private Integer type; // EthType: PRIMARY_INPUT, SECONDARY_INPUT, PRIMARY_OUTPUT

	public NIO() {
	}

	public NIO(int id, String name, int type) {
		this.id = id;
		this.name = name;
		this.type = type;
	}

	/**
	 * @return the id
	 */
	public Integer getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the type
	 */
	public Integer getType() {
		return type;
	}

	/**
	 * @param type the type to set
	 */
	public void setType(Integer type) {
		this.type = type;
	}
}
