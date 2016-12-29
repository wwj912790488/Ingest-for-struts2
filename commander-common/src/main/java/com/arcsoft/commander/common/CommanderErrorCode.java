package com.arcsoft.commander.common;

/**
 * Commander error code.
 * 
 * <pre>
 *     31b: error/warning
 * 30b-28b: level
 * 27b-16b: 0x200-0x2FF for commander.
 * 15b-00b: code
 * </pre>
 * 
 * @author fjli
 */
public interface CommanderErrorCode {

	/**
	 * Task auto restart.
	 */
	public static final int TASK_AUTO_RESTART = 0x02000001;

}
