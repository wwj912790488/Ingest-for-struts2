package com.arcsoft.commander.service.cluster.fault;

import java.util.EventObject;

import com.arcsoft.commander.domain.server.Server;

/**
 * This event will be delivered when some error occur in fault process 
 * 
 * @author wtsun
 */
public class FaultAlertEvent extends EventObject {
	public static int MONITOR_FAILED = 1;
	public static int FAULT_DETECTED = 2;
	public static int REBOOT_FAILED = 3;
	public static int UP_SWITCH_FAILED = 4;
	public static int DOWN_SWITCH_FAILED = 5;

	private static final long serialVersionUID = -315579974637112353L;
	private int code;
	private String ip;
	private int port;
	private String error;

	public FaultAlertEvent(Server server, int code, String ip, int port, String error) {
		super(server);
		this.code = code;
		this.ip = ip;
		this.port = port;
		this.error = error;
	}

	public int getCode() {
		return code;
	}
	
	public String getIp() {
		return ip;
	}

	public int getPort() {
		return port;
	}

	public String getError() {
		return error;
	}
}
