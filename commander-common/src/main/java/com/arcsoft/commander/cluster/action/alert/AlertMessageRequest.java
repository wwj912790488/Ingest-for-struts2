package com.arcsoft.commander.cluster.action.alert;

import javax.xml.bind.annotation.XmlRootElement;

import com.arcsoft.commander.cluster.action.BaseRequest;


/**
 * 
 * 
 * @author zw
 */
@XmlRootElement
public class AlertMessageRequest extends BaseRequest {
	
	private int level;
	private int taskId;
	private int code;
	private String msg;
	private String ip;
	/** which type of message */
	private String type;
	
	/**
	 * @return the level
	 */
	public int getLevel() {
		return level;
	}
	
	/**
	 * @param level the level to set
	 */
	public void setLevel(int level) {
		this.level = level;
	}
	
	/**
	 * @return the taskId
	 */
	public int getTaskId() {
		return taskId;
	}
	
	/**
	 * @param taskId the taskId to set
	 */
	public void setTaskId(int taskId) {
		this.taskId = taskId;
	}
	
	/**
	 * @return the code
	 */
	public int getCode() {
		return code;
	}
	
	/**
	 * @param code the code to set
	 */
	public void setCode(int code) {
		this.code = code;
	}
	
	/**
	 * @return the msg
	 */
	public String getMsg() {
		return msg;
	}
	
	/**
	 * @param msg the msg to set
	 */
	public void setMsg(String msg) {
		this.msg = msg;
	}
	
	/**
	 * @return the ip
	 */
	public String getIp() {
		return ip;
	}
	
	/**
	 * @param ip the ip to set
	 */
	public void setIp(String ip) {
		this.ip = ip;
	}

	
	/**
	 * @return the type
	 */
	public String getType() {
		return type;
	}

	
	/**
	 * @param type the type to set
	 */
	public void setType(String type) {
		this.type = type;
	}
	
	

}
