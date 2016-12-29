package com.arcsoft.commander.dao.upgrade;

import java.util.List;

/**
 * Upgrade DAO.
 * 
 * @author fjli
 */
public interface UpgradeDao {

	/**
	 * Execute query for the specified sql.
	 * 
	 * @param sql - the specified sql.
	 * @return result list.
	 */
	List<?> executeQuery(String sql);

	/**
	 * Execute the specified sql.
	 * 
	 * @param sql - the specified sql
	 */
	int executeUpdate(String sql);

	/**
	 * Get the database name.
	 */
	String getDatabaseName();

	/**
	 * Test the specified table is exist or not.
	 * 
	 * @param table - the specified table
	 * @return true if exist, false otherwise.
	 */
	boolean isExistTable(String table);

	/**
	 * Drop the specified table.
	 * 
	 * @param table - the specified table
	 */
	void dropTable(String table);

	/**
	 * Test the specified column is exist or not in the specified table.
	 * 
	 * @param table - the specified table
	 * @param column - the specified column
	 * @return true if exist, false otherwise.
	 */
	boolean isExistColumn(String table, String column);

	/**
	 * Add new column in the specified table.
	 * 
	 * @param table - the specified table
	 * @param column - the new column
	 * @param type - the column type
	 */
	void addColumn(String table, String column, String type);

	/**
	 * Add new column in the specified table, the length can be null and the default value is null.
	 * 
	 * @param table - the specified table
	 * @param column - the new column
	 * @param type - the column type
	 * @param length - the column length
	 */
	void addColumn(String table, String column, String type, Integer length);

	/**
	 * Add new column in the specified table, the length can be null.
	 * 
	 * @param table - the specified table
	 * @param column - the new column
	 * @param type - the column type
	 * @param length - the column length
	 * @param defaultValue - the default value
	 */
	void addColumn(String table, String column, String type, Integer length, String defaultValue);

	/**
	 * Add new column in the specified table.
	 * 
	 * @param table - the specified table
	 * @param column - the new column
	 * @param type - the column type
	 * @param length - the column length
	 * @param nullable - the column can be null or not
	 * @param defaultValue - the default value
	 */
	void addColumn(String table, String column, String type, Integer length, boolean nullable, String defaultValue);

	/**
	 * Modify column data type.
	 * 
	 * @param table - the specified table
	 * @param column - the new column
	 * @param type - the column type
	 */
	void modifyColumn(String table, String column, String type);

	/**
	 * Modify column data type, length, the length can be null and the default value is null.
	 * 
	 * @param table - the specified table
	 * @param column - the new column
	 * @param type - the column type
	 * @param length - the column length
	 */
	void modifyColumn(String table, String column, String type, Integer length);

	/**
	 * Modify column data type, length, the length can be null.
	 * 
	 * @param table - the specified table
	 * @param column - the new column
	 * @param type - the column type
	 * @param length - the column length
	 * @param defaultValue - the default value
	 */
	void modifyColumn(String table, String column, String type, Integer length, String defaultValue);

	/**
	 * Modify column data type, length.
	 * 
	 * @param table - the specified table
	 * @param column - the new column
	 * @param type - the column type
	 * @param length - the column length
	 * @param nullable - the column can be null or not
	 * @param defaultValue - the default value
	 */
	void modifyColumn(String table, String column, String type, Integer length, boolean nullable, String defaultValue);

	/**
	 * Drop the specified column in the specified table.
	 * 
	 * @param table - the specified table
	 * @param column - the specified column
	 */
	void dropColumn(String table, String column);

	/**
	 * Test the specified index is exist in the specified table or not.
	 * 
	 * @param table - the specified table
	 * @param index - the specified index
	 * @return true if exist, false otherwise.
	 */
	boolean isExistIndex(String table, String index);

	/**
	 * Add new index on the specified table.
	 * 
	 * @param table - the specified table
	 * @param index - the specified index to add
	 * @param columns - the columns
	 */
	void addIndex(String table, String index, String ...columns);

	/**
	 * Add new unique index on the specified table.
	 * 
	 * @param table - the specified table
	 * @param index - the specified index to add
	 * @param columns - the columns
	 */
	void addUniqueIndex(String table, String index, String ...columns);

	/**
	 * Drop the specified index in the specified table.
	 * 
	 * @param table - the specified table
	 * @param index - the specified index to drop
	 */
	void dropIndex(String table, String index);

	/**
	 * Test the specified foreign key is exist in the specified table or not.
	 * 
	 * @param table - the specified table
	 * @param key - the specified key
	 * @return true if exist, false otherwise.
	 */
	boolean isExistForeignKey(String table, String key);

	/**
	 * Add foreign key on the specified table.
	 * 
	 * @param table - the specified table
	 * @param key - the foreign key
	 * @param columns - the columns on the specified table
	 * @param tableRef - the reference table
	 * @param columnsRef - the columns on the reference talbe
	 * @param cascade - the cascade option
	 */
	void addForeignKey(String table, String key, String[] columns, String tableRef, String[] columnsRef, String cascade);

	/**
	 * Drop the specified foreign key in the specified table.
	 * 
	 * @param table - the specified table
	 * @param key - the specified key to drop
	 */
	void dropForeignKey(String table, String key);

	/**
	 * 
	 * @param table the specified table
	 * @param the specified column
	 * @return
	 *	+------------------+---------------------+------+-----+---------------------+----------------+
	 *   | Field              | Type                | Null   |   Key   | Default             | Extra   |
	 *	+--------------- ---+---------------------+------+-----+---------------------+----------------+
	 * 
	 */
	public Object[] getColInfo(String table, String column);

}
