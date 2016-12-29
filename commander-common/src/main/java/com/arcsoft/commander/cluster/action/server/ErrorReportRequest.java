package com.arcsoft.commander.cluster.action.server;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseRequest;

/**
 * This request is used to report the agent error to the commander.
 * 
 * @author fjli
 */
@XmlRootElement
public class ErrorReportRequest extends BaseRequest {

	private String id;
	private int errorCode;

	/**
	 * Returns the agent id.
	 */
	public String getId() {
		return id;
	}

	/**
	 * Set the agent id.
	 * 
	 * @param id - the agent id
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * Returns the error code.
	 */
	public int getErrorCode() {
		return errorCode;
	}

	/**
	 * Set the error code.
	 * 
	 * @param errorCode - the error code
	 */
	public void setErrorCode(int errorCode) {
		this.errorCode = errorCode;
	}

}
