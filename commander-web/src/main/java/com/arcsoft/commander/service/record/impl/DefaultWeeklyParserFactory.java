package com.arcsoft.commander.service.record.impl;

import java.util.Map;

import com.arcsoft.commander.service.record.WeeklyParser;
import com.arcsoft.commander.service.record.WeeklyParserFactory;

/**
 * Default EPG parser factory.
 * 
 * @author fjli
 */
public class DefaultWeeklyParserFactory implements WeeklyParserFactory {

	private StandardTextWeeklyParser defaultParser = new StandardTextWeeklyParser();
	private Map<String, WeeklyParser> parsers;

	public void setParsers(Map<String, WeeklyParser> parsers) {
		this.parsers = parsers;
	}

	@Override
	public WeeklyParser getParser(String type) {
		WeeklyParser parser = null;
		if (parsers != null && type != null) {
			parser = parsers.get(type);
		}
		return (parser != null) ? parser : defaultParser;
	}

}
