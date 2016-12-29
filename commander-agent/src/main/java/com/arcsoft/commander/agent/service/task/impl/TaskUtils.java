package com.arcsoft.commander.agent.service.task.impl;

import java.util.Collections;
import java.util.Map;
import java.util.concurrent.Callable;
import java.util.concurrent.TimeUnit;
import java.util.regex.Pattern;

import org.apache.log4j.Logger;

import com.arcsoft.arcvideo.common.utils.StringHelper;
import com.arcsoft.util.SystemExecutor;
import com.arcsoft.web4transcoder.domain.Task;

/**
 * Task utils.
 * 
 * @author fjli
 */
public class TaskUtils {

	private static final Pattern VAR_PATTERN = Pattern.compile("(^|\\s*;\\s*)(?<var>[a-zA-Z_][a-zA-Z0-9_-]*)\\s*=\\s*((?<v1>\\\"(([^\\\"]+)|(\\\"\\\"))+\\\")|(?<v2>[^;\\\"][^;\\\"]*))\\s*(?=;|$)");
	private static final Logger LOG = Logger.getLogger(TaskUtils.class);

	/**
	 * Parse the task extension info.
	 */
	public static Map<String, String> getTaskExtensionMap(Task task) {
		return parseArgsToMap(task.getUserData());
	}

	/**
	 * Parse the specified message to a key value map.
	 */
	public static Map<String, String> parseArgsToMap(String message) {
		if (StringHelper.isNotBlank(message)) {
			return StringHelper.parseUnquoteValuePairsToMap(message, VAR_PATTERN, "var", "v1", "v2");
		} else {
			return Collections.emptyMap();
		}
	}

	/**
	 * Execute the given callback with max retry times and interval between executions.
	 * 
	 * @param callback - the given callback
	 * @param times - the max retry times
	 * @param interval - the interval between executions
	 */
	public static void executeWithRetry(final Callable<Void> callback, final int times, final long interval) {
		SystemExecutor.getThreadPoolExecutor().execute(new Runnable() {
			@Override
			public void run() {
				try {
					callback.call();
				} catch (Exception e) {
					if (times > 1) {
						LOG.error("exectute failed: " + e.getMessage() + ", retry it after " + interval + " ms.", e);
						SystemExecutor.getScheduledExecutor().schedule(new Runnable() {
							@Override
							public void run() {
								executeWithRetry(callback, times - 1, interval);
							}
						}, interval, TimeUnit.MILLISECONDS);
					} else {
						LOG.error("exectute still failed after retry: " + e.getMessage(), e);
					}
				}
			}
		});
	}

}
