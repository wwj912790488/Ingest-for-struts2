package com.arcsoft.commander.domain.system;

/**
 * System setting entity.
 * 
 * @author fjli
 */
public class SystemSettingEntity {

	private String key;
	private String value;

	/**
	 * Returns the setting key.
	 */
	public String getKey() {
		return key;
	}

	/**
	 * Set the setting key.
	 * 
	 * @param key - the key
	 */
	public void setKey(String key) {
		this.key = key;
	}

	/**
	 * Returns the setting value.
	 */
	public String getValue() {
		return value;
	}

	/**
	 * Set the setting value.
	 * 
	 * @param value - the value
	 */
	public void setValue(String value) {
		this.value = value;
	}

}
