package com.arcsoft.commander.service.record;

import java.io.IOException;

import com.arcsoft.commander.domain.record.EpgList;

/**
 * Epg parser.
 * 
 * @author fjli
 */
public interface EpgParser {

	/**
	 * Parse the specified EPG file to {@link EpgList}.
	 * 
	 * @param file - the EPG file
	 * @return an instance of {@link EpgList}.
	 * @throws IOException - if IO error occur.
	 */
	EpgList parse(String file) throws IOException;

}
