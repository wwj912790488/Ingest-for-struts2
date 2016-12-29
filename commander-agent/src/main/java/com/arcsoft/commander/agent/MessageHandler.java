package com.arcsoft.commander.agent;

import java.io.PrintStream;
import java.util.Map;

/**
 * Message handler.
 * 
 * @author fjli
 */
public interface MessageHandler {

	/**
	 * Returns the supported commands of this handler.
	 */
	Map<String, String> getCommands();

	/**
	 * Process the specified command.
	 * 
	 * @param args - the arguments
	 * @param out - the out stream
	 */
	void processCommand(String[] args, PrintStream out);

}
