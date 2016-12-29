package com.arcsoft.commander.controller;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Controller utils.
 * 
 * @author fjli
 */
public class ControllerUtils {

	public static Map<String, Object> createSuccessMap() {
		return createModelMap(ApiErrorCode.SUCCESS, "Success");
	}

	public static Map<String, Object> createModelMap(Integer code, String message, Object... args) {
		Map<String, Object> model = new LinkedHashMap<>();
		model.put("code", code);
		model.put("message", String.format(message, args));
		return model;
	}

}
