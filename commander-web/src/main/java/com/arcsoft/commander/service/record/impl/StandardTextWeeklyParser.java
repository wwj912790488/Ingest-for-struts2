package com.arcsoft.commander.service.record.impl;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.MalformedInputException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.arcsoft.arcvideo.common.utils.IOUtils;
import com.arcsoft.commander.domain.record.EpgItem;
import com.arcsoft.commander.domain.record.EpgList;
import com.arcsoft.commander.domain.record.WeeklyItem;
import com.arcsoft.commander.domain.record.WeeklyList;
import com.arcsoft.commander.service.record.EpgParser;
import com.arcsoft.commander.service.record.WeeklyParser;

/**
 * EPG parse service.
 * 
 * @author fjli
 */
public class StandardTextWeeklyParser implements WeeklyParser {

	private static final String MONTH_DAY_WITH_SP = "(?<sp>[^0-9])(?<m1>(0?[1-9])|(1[0-2]))(\\k<sp>)(?<d1>(0?[1-9])|([1-2][0-9])|(3[0-1]))($|[^0-9])"; // -5-6 -05-06
	private static final String MONTH_DAY_NO_SP = "(?<m2>(0[1-9])|(1[0-2]))(?<d2>(0[1-9])|([1-2][0-9])|(3[0-1]))"; // 0506
	private static final Pattern DATE_PATTERN = Pattern.compile("^.*(?<y>(\\d{4}|\\d{2}))((" + MONTH_DAY_WITH_SP  + ")|(" + MONTH_DAY_NO_SP + ")).*$");
	private static final Pattern TIME_PATTERN = Pattern.compile("^(?<h>\\d{1,2})\\:(?<m>\\d{1,2})(\\:(?<s>\\d{1,2}))?\\s+(?<name>.*)");
	private static final String CHANNEL_NAME = "频道名称";
	private static final int TWOYEAR, BASEYEAR;

	static {
		Calendar c = Calendar.getInstance();
		c.setTime(new SimpleDateFormat().get2DigitYearStart());
		int yyyy = c.get(Calendar.YEAR);
		TWOYEAR = yyyy % 100;
		BASEYEAR = yyyy - TWOYEAR;
	}

	@Override
	public WeeklyList parse(String file) throws IOException {
		try {
			return parse0(file, "utf-8");
		} catch (MalformedInputException m) {
			return parse0(file, "gbk");
		}
	}

	private WeeklyList parse0(String file, String charset) throws IOException {
		File filePath = new File(file);
		WeeklyList weeklyList = new WeeklyList();
		List<WeeklyItem> items = new ArrayList<>();
		weeklyList.setItems(items);
		weeklyList.setName(filePath.getName());
		BufferedReader reader = IOUtils.toBufferedReader(filePath, Charset.forName(charset));
		try {
			WeeklyItem current, previous = null;
			Calendar dailyDate = null;
			String line;
			while ((line = reader.readLine()) != null) {
				line = line.trim();
				if (!line.isEmpty()) {
					Matcher m = DATE_PATTERN.matcher(line);
					if (m.find()) {
						// next EPG section
						dailyDate = parseDate(m);
						if (previous != null) {
							// if the next section is not continuous with previous one
							// set the end time to the begin of the next day.
							Date nextday = getNextDay(previous.getStartTime());
							if (nextday.compareTo(dailyDate.getTime()) != 0) {
								previous.setEndTime(nextday);
								previous = null;
							}
						}
					} else if (dailyDate != null) {
						m = TIME_PATTERN.matcher(line);
						if (m.find()) {
							// new EPG item found
							current = new WeeklyItem();
							current.setStartTime(parseTime(dailyDate, m));
							current.setName(replace(m.group("name")));
							items.add(current);
							if (previous != null) {
								previous.setEndTime(current.getStartTime());
							}
							previous = current;
						}
					} else if (line.startsWith(CHANNEL_NAME)) {
						// some EPG file has channel name option
						weeklyList.setName(line.substring(CHANNEL_NAME.length()).trim());
					}
				}
			}
			// set the end time of last item.
			if (previous != null) {
				previous.setEndTime(getNextDay(previous.getStartTime()));
			}
		} finally {
			IOUtils.closeQuietly(reader);
		}
		return weeklyList;
	}

	private static Date getNextDay(Date date) {
		Calendar c = Calendar.getInstance();
		c.clear();
		c.setTime(date);
		c.set(Calendar.HOUR_OF_DAY, 0);
		c.set(Calendar.MINUTE, 0);
		c.set(Calendar.SECOND, 0);
		c.set(Calendar.MILLISECOND, 0);
		c.add(Calendar.DAY_OF_MONTH, 1);
		return c.getTime();
	}

	private static Date parseTime(Calendar dailyDate, Matcher m) {
		Calendar c = Calendar.getInstance();
		c.clear();
		c.setTimeInMillis(dailyDate.getTimeInMillis());
		c.set(Calendar.HOUR_OF_DAY, parseInt(m, "h"));
		c.set(Calendar.MINUTE, parseInt(m, "m"));
		Integer second = parseInt(m, "s");
		if (second != null) {
			c.set(Calendar.SECOND, second);
		}
		return c.getTime();
	}

	private static Calendar parseDate(Matcher m) {
		int year = parseInt(m, "y");
		if (year < 100) {
			year += BASEYEAR + (year < TWOYEAR ? 100 : 0);
		}
		int month = parseInt(m, "m1", "m2") - 1;
		int date = parseInt(m, "d1", "d2");
		Calendar c = Calendar.getInstance();
		c.clear();
		c.set(year, month, date);
		return c;
	}

	private static Integer parseInt(Matcher m, String... names) {
		for (String name : names) {
			String value = m.group(name);
			if (value != null) {
				return Integer.parseInt(value);
			}
		}
		return null;
	}

	private static String replace(String str){
		String oldStr = str;
		String newStr = oldStr.replace(':', ' ');
		oldStr = newStr;
		newStr = oldStr.replace('?', ' ');
		oldStr = newStr;
		newStr = oldStr.replace('*', ' ');
		oldStr = newStr;
		newStr = oldStr.replace('"', ' ');
		return newStr;
	}

}
