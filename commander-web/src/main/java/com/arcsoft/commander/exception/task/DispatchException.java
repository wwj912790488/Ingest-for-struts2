package com.arcsoft.commander.exception.task;

/**
 * This exception or sub exceptions will be thrown when dispatch task failed.
 * 
 * @author fjli
 */
public class DispatchException extends Exception {

	private static final long serialVersionUID = 8630898024090464980L;

	/**
	 * Construct the exception with the specified message.
	 * 
	 * @param message - the specified message
	 */
	public DispatchException(String message) {
		super(message);
	}

	/**
	 * Construct the exception with the specified cause.
	 * 
	 * @param cause - the specified cause
	 */
	public DispatchException(Throwable cause) {
		super(cause);
	}

	/**
	 * Construct the exception with the specified message and cause.
	 * 
	 * @param message - the specified message
	 * @param cause - the specified cause
	 */
	public DispatchException(String message, Throwable cause) {
		super(message, cause);
	}

}
