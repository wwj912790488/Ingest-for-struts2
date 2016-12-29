package com.arcsoft.commander.domain.server;

/**
 * 
 * @author wtsun
 * 
 */
public class NioBinding {

	private Integer nio;
	private Integer type;
	private String eth;

	public NioBinding() {
	}

	public NioBinding(int nio, int type, String eth) {
		this.nio = nio;
		this.type = type;
		this.eth = eth;
	}

	/**
	 * @return the network input-output id
	 */
	public Integer getNio() {
		return nio;
	}

	/**
	 * @param nio the network input-output id to set
	 */
	public void setNio(Integer nio) {
		this.nio = nio;
	}

	/**
	 * @return the network input-output type
	 */
	public Integer getType() {
		return type;
	}

	/**
	 * @param type the network input-output type to set
	 */
	public void setType(Integer type) {
		this.type = type;
	}
	
	/**
	 * @return the eth id
	 */
	public String getEth() {
		return eth;
	}

	/**
	 * @param eth the eth Id to set
	 */
	public void setEth(String eth) {
		this.eth = eth;
	}

}
