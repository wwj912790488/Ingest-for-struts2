package com.arcsoft.commander.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.TimeUnit;

import static java.util.concurrent.TimeUnit.*;

public class DateFormatUtil {
    private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    private static final SimpleDateFormat sdf2 = new SimpleDateFormat("HH:mm:ss");
    public static String DatetimeToString(Date date) {
        if (date != null) {
            return sdf.format(date);
        }
        return "";
    }
    public static String DatetimeToString2(Date date) {
        if (date != null) {
            return sdf2.format(date);
        }
        return "";
    }


    public static Date StringToDatetime(String dateString) {
        try {
            return sdf.parse(dateString);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }


    public static String millsecondsToString(long duration) {
        final TimeUnit scale = MILLISECONDS;
        long days = scale.toDays(duration);
        duration -= DAYS.toMillis(days);
        long hours = scale.toHours(duration);
        duration -= HOURS.toMillis(hours);
        long minutes = scale.toMinutes(duration);
        duration -= MINUTES.toMillis(minutes);
        long seconds = scale.toSeconds(duration);
        duration -= SECONDS.toMillis(seconds);
        long millis = scale.toMillis(duration);
        duration -= MILLISECONDS.toMillis(seconds);
        long nanos = scale.toNanos(duration);

        if (days > 0) {
            return String.format("%d天%d:%d.%d", days, hours, minutes, seconds);
        } else {
            return String.format("%d:%d.%d", hours, minutes, seconds);
        }
    }

    public static void main(String[] args) {
        System.out.println(DateFormatUtil.DatetimeToString2(DateFormatUtil.StringToDatetime("2016-12-17 15:25:00")));
    }
}
