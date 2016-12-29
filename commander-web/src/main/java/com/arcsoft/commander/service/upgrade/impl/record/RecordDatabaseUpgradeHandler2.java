package com.arcsoft.commander.service.upgrade.impl.record;

import com.arcsoft.commander.service.upgrade.impl.DatabaseUpgradeHandlerSupport;

/**
 * Upgrade database from version 1 to version 2.
 * 
 * @author fjli
 */
public class RecordDatabaseUpgradeHandler2 extends DatabaseUpgradeHandlerSupport {

	@Override
	public void upgrade() {
		// add columns to tbl_record_base
		upgradeDao.addColumn("tbl_record_base", "generate_thumb", "bit", 1);
		upgradeDao.addColumn("tbl_record_base", "thumb_width", "int", 11);
		upgradeDao.addColumn("tbl_record_base", "thumb_height", "int", 11);

		// tbl_record_tasks
		if (!upgradeDao.isExistTable("tbl_record_tasks")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `tbl_record_tasks` (");
			sql.append("`task_id` int(11) NOT NULL,");
			sql.append("`task_type` int(11) DEFAULT NULL,");
			sql.append("`group_id` int(11) DEFAULT NULL,");
			sql.append("`server_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,");
			sql.append("`record_id` int(11) DEFAULT NULL,");
			sql.append("`schedule_event_id` bigint(20) DEFAULT NULL,");
			sql.append(" PRIMARY KEY (`task_id`),");
			sql.append(" KEY `FKEA92B90196AD7752` (`task_id`),");
			sql.append("CONSTRAINT `FKEA92B90196AD7752` FOREIGN KEY (`task_id`) REFERENCES `live_events` (`id`)");
			sql.append(") ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;");
			upgradeDao.executeUpdate(sql.toString());
		}

		// add columns to tbl_record_fulltime
		upgradeDao.addColumn("tbl_record_fulltime", "keep_times", "int", 11);

		// tbl_record_delete_files
		if (!upgradeDao.isExistTable("tbl_record_delete_files")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `tbl_record_delete_files` (");
			sql.append("`id` bigint(20) NOT NULL AUTO_INCREMENT,");
			sql.append("`file_name` varchar(2048) COLLATE utf8_unicode_ci DEFAULT NULL,");
			sql.append("`delete_at` datetime DEFAULT NULL,");
			sql.append(" PRIMARY KEY (`id`),");
			sql.append(" UNIQUE KEY `id` (`id`)");
			sql.append(") ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;");
			upgradeDao.executeUpdate(sql.toString());
		}
	}

}
