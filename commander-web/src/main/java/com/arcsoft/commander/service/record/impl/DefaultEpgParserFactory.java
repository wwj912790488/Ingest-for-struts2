package com.arcsoft.commander.service.record.impl;

import java.util.Map;

import com.arcsoft.commander.service.record.EpgParser;
import com.arcsoft.commander.service.record.EpgParserFactory;

/**
 * Default EPG parser factory.
 * 
 * @author fjli
 */
public class DefaultEpgParserFactory implements EpgParserFactory {

	private StandardTextEpgParser defaultParser = new StandardTextEpgParser();
	private Map<String, EpgParser> parsers;

	public void setParsers(Map<String, EpgParser> parsers) {
		this.parsers = parsers;
	}

	@Override
	public EpgParser getParser(String type) {
		EpgParser parser = null;
		if (parsers != null && type != null) {
			parser = parsers.get(type);
		}
		return (parser != null) ? parser : defaultParser;
	}

}
