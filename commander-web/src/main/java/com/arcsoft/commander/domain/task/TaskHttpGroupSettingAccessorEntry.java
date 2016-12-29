package com.arcsoft.commander.domain.task;


/**
 * 
 * @author wtsun
 */
public class TaskHttpGroupSettingAccessorEntry {
	private Integer taskId;
	private String container;
	private String target;
	private String ip;    // transcoder output destination ip
	private Integer port; // transcoder output destination port
	private String serverIp;
	public Integer getTaskId() {
		return taskId;
	}
	public void setTaskId(Integer taskId) {
		this.taskId = taskId;
	}
	public String getContainer() {
		return container;
	}
	public void setContainer(String container) {
		this.container = container;
	}
	public String getTarget() {
		return target;
	}
	public void setTarget(String target) {
		this.target = target;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public Integer getPort() {
		return port;
	}
	public void setPort(Integer port) {
		this.port = port;
	}
	public String getServerIp() {
		return serverIp;
	}
	public void setServerIp(String serverIp) {
		this.serverIp = serverIp;
	}
}
