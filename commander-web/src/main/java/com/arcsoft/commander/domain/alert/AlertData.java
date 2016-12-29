package com.arcsoft.commander.domain.alert;

import java.util.HashMap;
import java.util.Map;

public class AlertData {

	private String ip;
	private String code;
	private String index;
	private String data;
	private Long timestamp;
	private Map<String, String> attributes = new HashMap<>();

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getIndex() {
		return index;
	}

	public void setIndex(String index) {
		this.index = index;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public Long getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Long timestamp) {
		this.timestamp = timestamp;
	}

	public Map<String, String> getAttributes() {
		return attributes;
	}

	public void setAttribute(String key, String value) {
		this.attributes.put(key, value);
	}

}
