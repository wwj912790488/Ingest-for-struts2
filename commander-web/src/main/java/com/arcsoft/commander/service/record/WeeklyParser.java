package com.arcsoft.commander.service.record;

import com.arcsoft.commander.domain.record.WeeklyList;

import java.io.IOException;



/**
 * Epg parser.
 * 
 * @author fjli
 */
public interface WeeklyParser {

	/**
	 * Parse the specified WEEKLY file to {@link WeeklyList}.
	 * 
	 * @param file - the WEEKLY file
	 * @return an instance of {@link WeeklyList}.
	 * @throws IOException - if IO error occur.
	 */
	WeeklyList parse(String file) throws IOException;

}
