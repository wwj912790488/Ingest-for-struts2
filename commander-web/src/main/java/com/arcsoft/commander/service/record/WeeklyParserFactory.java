package com.arcsoft.commander.service.record;

/**
 * Epg parser factory.
 * 
 * @author fjli
 */
public interface WeeklyParserFactory {

	/**
	 * Get the EPG parser for the given type.
	 * 
	 * @param type - the EPG type
	 * @return the EPG parser.
	 */
	WeeklyParser getParser(String type);

}
