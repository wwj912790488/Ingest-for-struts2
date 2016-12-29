package com.arcsoft.commander.service.upgrade.impl.commander;

import com.arcsoft.commander.service.upgrade.impl.DatabaseUpgradeHandlerSupport;

/**
 * Add records relation tables.
 * 
 * @author fjli
 */
public class DatabaseUpgradeHandler14 extends DatabaseUpgradeHandlerSupport {

	@Override
	public void upgrade() {
		// tbl_fulltime_tasks
		if (!upgradeDao.isExistTable("tbl_fulltime_tasks")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `tbl_fulltime_tasks` (");
			sql.append("`task_id` int(11) NOT NULL,");
			sql.append("`task_type` int(11) DEFAULT NULL,");
			sql.append("`group_id` int(11) DEFAULT NULL,");
			sql.append("`server_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,");
			sql.append("`channel_id` int(11) DEFAULT NULL,");
			sql.append("`profile_id` int(11) DEFAULT NULL,");
			sql.append("`segment_length` int(11) DEFAULT NULL,");
			sql.append("`segment_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,");
			sql.append("`start_time` datetime DEFAULT NULL,");
			sql.append("`start_now` bit(1) DEFAULT NULL,");
			sql.append("`end_time` datetime DEFAULT NULL,");
			sql.append("`always_loop` bit(1) DEFAULT NULL,");
			sql.append("PRIMARY KEY (`task_id`),");
			sql.append("KEY `fk_fulltime_task_id` (`task_id`),");
			sql.append("CONSTRAINT `fk_fulltime_task_id` FOREIGN KEY (`task_id`) REFERENCES `live_events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE");
			sql.append(") ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;");
			upgradeDao.executeUpdate(sql.toString());
		}

		// tbl_channels
		if (!upgradeDao.isExistTable("tbl_channels")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `tbl_channels` (");
			sql.append("`id` int(11) NOT NULL AUTO_INCREMENT,");
			sql.append("`name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,");
			sql.append("`type` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,");
			sql.append("`uri` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,");
			sql.append("`program_id` int(11) DEFAULT NULL,");
			sql.append("`video_id` int(11) DEFAULT NULL,");
			sql.append("`audio_id` int(11) DEFAULT NULL,");
			sql.append("`created` datetime DEFAULT NULL,");
			sql.append("`last_modified` datetime DEFAULT NULL,");
			sql.append("`group_id` int(11) DEFAULT NULL,");
			sql.append(" PRIMARY KEY (`id`),");
			sql.append(" KEY `fk_channel_group_id` (`group_id`),");
			sql.append(" CONSTRAINT `fk_channel_group_id` FOREIGN KEY (`group_id`) REFERENCES `tbl_server_groups` (`group_id`)");
			sql.append(") ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;");
			upgradeDao.executeUpdate(sql.toString());
		}
	}

}
