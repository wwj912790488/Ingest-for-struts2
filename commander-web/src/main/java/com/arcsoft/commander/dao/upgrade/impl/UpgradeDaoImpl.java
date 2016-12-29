package com.arcsoft.commander.dao.upgrade.impl;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.jdbc.Work;

import com.arcsoft.commander.dao.BaseHibernateDao;
import com.arcsoft.commander.dao.upgrade.UpgradeDao;

/**
 * Upgrade dao implementation.
 * 
 * @author fjli
 */
public class UpgradeDaoImpl extends BaseHibernateDao implements UpgradeDao {

	private Logger log = Logger.getLogger(getClass());

	@Override
	public List<?> executeQuery(String sql) {
		Session session = null;
		try {
			session = getSession();
			SQLQuery query = session.createSQLQuery(sql);
			return query.list();
		} finally {
			releaseSession(session);
		}
	}

	@Override
	public int executeUpdate(String sql) {
		Session session = null;
		try {
			session = getSession();
			SQLQuery query = session.createSQLQuery(sql);
			int ret = query.executeUpdate();
			log.info("execute " + sql + " finished. " + ret + " row(s) affected");
			return ret;
		} finally {
			releaseSession(session);
		}
	}

	@Override
	public String getDatabaseName() {
		final String[] dbName = new String[1];
		Session session = getSession();
		try {
			session.doWork(new Work() {
				@Override
				public void execute(Connection connection) throws SQLException {
					dbName[0] = connection.getCatalog();
				}
			});
			return dbName[0];
		} finally {
			releaseSession(session);
		}
	}

	@Override
	public boolean isExistTable(String table) {
		List<?> list = executeQuery("show tables like '" + table + "'");
		return list != null && !list.isEmpty();
	}

	@Override
	public void dropTable(String table) {
		if (isExistTable(table)) {
			executeUpdate("DROP table `" + table + "`");
		}
	}

	@Override
	public boolean isExistColumn(String table, String column) {
		List<?> list = executeQuery("desc `" + table + "` `" + column + "`");
		return list != null && !list.isEmpty();
	}

	@Override
	public Object[] getColInfo(String table, String column){
		List<?> list = executeQuery("desc `" + table + "` `" + column +"`");
		if(list != null && !list.isEmpty())
			return  (Object[])list.get(0);
		return null;
	}

	@Override
	public void addColumn(String table, String column, String type) {
		addColumn(table, column, type, null);
	}

	@Override
	public void addColumn(String table, String column, String type, Integer length) {
		addColumn(table, column, type, length, true, null);
	}

	@Override
	public void addColumn(String table, String column, String type, Integer length, String defaultValue) {
		addColumn(table, column, type, length, true, defaultValue);
	}

	@Override
	public void addColumn(String table, String column, String type, Integer length, boolean nullable, String defaultValue) {
		if (!isExistColumn(table, column)) {
			String columnType = type + (length == null ? "" : "(" + length + ")");
			if (defaultValue != null)
				defaultValue = " DEFAULT " + defaultValue;
			String format = "ALTER TABLE `%s` ADD COLUMN `%s` %s %s %s";
			String sql = String.format(format, table, column, columnType, nullable ? "" : "NOT NULL", defaultValue);
			executeUpdate(sql);
		}
	}

	@Override
	public void modifyColumn(String table, String column, String type) {
		modifyColumn(table, column, type, null);
	}

	@Override
	public void modifyColumn(String table, String column, String type, Integer length) {
		modifyColumn(table, column, type, length, true, null);
	}

	@Override
	public void modifyColumn(String table, String column, String type, Integer length, String defaultValue) {
		modifyColumn(table, column, type, length, true, defaultValue);
	}

	@Override
	public void modifyColumn(String table, String column, String type, Integer length, boolean nullable, String defaultValue) {
		if (isExistColumn(table, column)) {
			String columnType = type + (length == null ? "" : "(" + length + ")");
			String format = "ALTER TABLE `%s` MODIFY COLUMN `%s` %s %s DEFAULT %s";
			String sql = String.format(format, table, column, columnType, nullable ? "" : "NOT NULL", defaultValue);
			executeUpdate(sql);
		}
	}

	@Override
	public void dropColumn(String table, String column) {
		if (isExistColumn(table, column)) {
			String sql = "ALTER TABLE `%s` DROP COLUMN `%s`";
			executeUpdate(String.format(sql, table, column));
		}
	}

	@Override
	public boolean isExistIndex(String table, String index) {
		String format = "SHOW INDEX FROM `%s` WHERE KEY_NAME='%s'";
		String sql = String.format(format, table, index);
		List<?> list = executeQuery(sql);
		return list != null && !list.isEmpty();
	}

	@Override
	public void addIndex(String table, String index, String... columns) {
		if (!isExistIndex(table, index)) {
			String cols = joinColumn(columns);
			String format = "ALTER TABLE `%s` ADD INDEX `%s` (%s)";
			String sql = String.format(format, table, index, cols);
			try {
				executeUpdate(sql);
			} catch(Exception e) {
				log.warn("add index failed, ignore it: " + sql);
			}
		}
	}

	@Override
	public void addUniqueIndex(String table, String index, String ...columns) {
		if (!isExistIndex(table, index)) {
			String cols = joinColumn(columns);
			String format = "ALTER TABLE `%s` ADD UNIQUE `%s` (%s)";
			String sql = String.format(format, table, index, cols);
			try {
				executeUpdate(sql);
			} catch (Exception e) {
				log.warn("add index failed, ignore it: " + sql);
			}
		}
	}

	@Override
	public void dropIndex(String table, String index) {
		if (isExistIndex(table, index)) {
			String format = "ALTER TABLE `%s` DROP INDEX `%s`";
			String sql = String.format(format, table, index);
			executeUpdate(sql);
		}
	}

	@Override
	public boolean isExistForeignKey(String table, String key) {
		String format = "SELECT count(*) FROM INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS WHERE CONSTRAINT_SCHEMA='%s' AND TABLE_NAME='%s' AND CONSTRAINT_NAME='%s'";
		String sql = String.format(format, getDatabaseName(), table, key);
		List<?> list = executeQuery(sql);
		if (list != null && !list.isEmpty())
			return ((Number) list.get(0)).intValue() > 0;
		return false;
	}

	@Override
	public void addForeignKey(String table, String key, String[] columns, String tableRef, String[] columnsRef, String cascade) {
		if (!isExistForeignKey(table, key)) {
			String cols = joinColumn(columns);
			String colsRef = joinColumn(columnsRef);
			if (cascade == null)
				cascade = "";
			String format = "ALTER TABLE `%s` ADD CONSTRAINT `%s` FOREIGN KEY (%s) REFERENCES `%s` (%s) %s";
			String sql = String.format(format, table, key, cols, tableRef, colsRef, cascade);
			executeUpdate(sql);
		}
	}

	@Override
	public void dropForeignKey(String table, String key) {
		if (isExistForeignKey(table, key)) {
			String format = "ALTER TABLE `%s` DROP FOREIGN KEY `%s`";
			String sql = String.format(format, table, key);
			executeUpdate(sql);
		}
	}

	protected String joinColumn(String[] columns) {
		String cols = "`" + columns[0] + "`";
		for (int i = 1; i < columns.length; i++)
			cols += ", `" + columns[i] + "`";
		return cols;
	}

}
