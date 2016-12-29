package com.arcsoft.commander.domain.server;

/**
 * Define switch cause.
 * 
 * @author wtsun
 */
public interface SwitchCause {

	public static final int MANUAL = 1;
	public static final int NETWORK_ERROR = 2;
	public static final int HEART_BEAT_TIMEOUT = 3;
	public static final int FAULT_DETECTED = 4;
	public static final int GPU_ERROR = 5;

}
