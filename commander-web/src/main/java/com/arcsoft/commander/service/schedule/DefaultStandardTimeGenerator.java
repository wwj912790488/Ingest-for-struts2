package com.arcsoft.commander.service.schedule;

import java.util.Calendar;

/**
 * Default standard time generator.
 * 
 * @author fjli
 */
public class DefaultStandardTimeGenerator implements StandardTimeGenerator {

	@Override
	public Calendar getCurrentTime() {
		return Calendar.getInstance();
	}

}
