package com.arcsoft.commander.dao.system;

import java.util.HashMap;

/**
 * System settings DAO.
 * 
 * @author fjli
 */
public interface SystemDao {

	/**
	 * Get system settings.
	 */
	HashMap<String, String> getSettings();

	/**
	 * Save system settings.
	 * 
	 * @param settings - the settings to be set
	 */
	void saveSettings(HashMap<String, String> settings);

	/**
	 * Remove the specified setting.
	 * 
	 * @param key - the specified key
	 */
	void remove(String key);

	/**
	 * Get the value of the specified key.
	 * 
	 * @param key - the specified key
	 * @return the value of the key.
	 */
	String getString(String key);

	/**
	 * Set the value of the specified key.
	 * 
	 * @param key - the specified key
	 */
	void setString(String key, String value);

	/**
	 * Get the value of the specified key.
	 * 
	 * @param key - the specified key
	 * @return the value of the key.
	 */
	Integer getInteger(String key);

	/**
	 * Set the value of the specified key.
	 * 
	 * @param key - the specified key
	 */
	void setInteger(String key, Integer value);

	/**
	 * Get the value of the specified key.
	 * 
	 * @param key - the specified key
	 * @return the value of the key.
	 */
	Long getLong(String key);

	/**
	 * Set the value of the specified key.
	 * 
	 * @param key - the specified key
	 */
	void setLong(String key, Long value);

	/**
	 * Get the value of the specified key.
	 * 
	 * @param key - the specified key
	 * @return the value of the key.
	 */
	Double getDouble(String key);

	/**
	 * Set the value of the specified key.
	 * 
	 * @param key - the specified key
	 */
	void setDouble(String key, Double value);

	/**
	 * Get the value of the specified key.
	 * 
	 * @param key - the specified key
	 * @return the value of the key.
	 */
	Float getFloat(String key);

	/**
	 * Set the value of the specified key.
	 * 
	 * @param key - the specified key
	 */
	void setFloat(String key, Float value);

	/**
	 * Get the value of the specified key.
	 * 
	 * @param key - the specified key
	 * @return the value of the key.
	 */
	Boolean getBoolean(String key);

	/**
	 * Set the value of the specified key.
	 * 
	 * @param key - the specified key
	 */
	void setBoolean(String key, Boolean value);

}
