package com.arcsoft.commander.service.upgrade.impl.record;

import com.arcsoft.commander.service.upgrade.impl.DatabaseUpgradeHandlerSupport;

/**
 * Upgrade database from version 0 to version 1.
 * 
 * @author fjli
 */
public class RecordDatabaseUpgradeHandler1 extends DatabaseUpgradeHandlerSupport {

	@Override
	public void upgrade() {
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

		// tbl_schedules
		if (!upgradeDao.isExistTable("tbl_schedules")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `tbl_schedules` (");
			sql.append("`id` bigint(20) NOT NULL AUTO_INCREMENT,");
			sql.append("`name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,");
			sql.append("`source` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,");
			sql.append("`start_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,");
			sql.append("`start_date` date DEFAULT NULL,");
			sql.append("`start_time` time DEFAULT NULL,");
			sql.append("`end_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL,");
			sql.append("`end_date` date DEFAULT NULL,");
			sql.append("`end_time` time DEFAULT NULL,");
			sql.append("`repeat_end_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,");
			sql.append("`repeat_end_date` date DEFAULT NULL,");
			sql.append("`repeat_interval` int(11) DEFAULT NULL,");
			sql.append("`repeat_days` int(11) DEFAULT NULL,");
			sql.append("`next_time` datetime DEFAULT NULL,");
			sql.append("`last_time` datetime DEFAULT NULL,");
			sql.append("`create_at` datetime DEFAULT NULL,");
			sql.append("`disabled` bit(1) DEFAULT NULL,");
			sql.append("`finished` bit(1) DEFAULT NULL,");
			sql.append("`first_time` datetime DEFAULT NULL,");
			sql.append("`final_time` datetime DEFAULT NULL,");
			sql.append(" PRIMARY KEY (`id`)");
			sql.append(") ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;");
			upgradeDao.executeUpdate(sql.toString());
		}

		// tbl_schedules
		if (!upgradeDao.isExistTable("tbl_schedule_events")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `tbl_schedule_events` (");
			sql.append("`id` bigint(20) NOT NULL AUTO_INCREMENT,");
			sql.append("`schedule_id` bigint(20) DEFAULT NULL,");
			sql.append("PRIMARY KEY (`id`),");
			sql.append("KEY `FK_SCHEDULE_EVENTS_SCHEDULE_ID` (`event_id`),");
			sql.append("CONSTRAINT `FK_SCHEDULE_EVENTS_SCHEDULE_ID` FOREIGN KEY (`event_id`) REFERENCES `tbl_schedule_events` (`id`) ON DELETE SET NULL");
			sql.append(") ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;");
			upgradeDao.executeUpdate(sql.toString());
		}

		// tbl_schedule_triggers
		if (!upgradeDao.isExistTable("tbl_schedule_triggers")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `tbl_schedule_triggers` (");
			sql.append("`id` bigint(20) NOT NULL AUTO_INCREMENT,");
			sql.append("`event_id` bigint(20) DEFAULT NULL,");
			sql.append("`schedule_time` datetime DEFAULT NULL,");
			sql.append("`triggered` bit(1) DEFAULT NULL,");
			sql.append("`finished` bit(1) DEFAULT NULL,");
			sql.append("PRIMARY KEY (`id`),");
			sql.append("KEY `FK6C73702226E1E541` (`event_id`),");
			sql.append("CONSTRAINT `FK6C73702226E1E541` FOREIGN KEY (`event_id`) REFERENCES `tbl_schedule_events` (`id`)");
			sql.append(") ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;");
			upgradeDao.executeUpdate(sql.toString());
		}

		// tbl_record_base
		if (!upgradeDao.isExistTable("tbl_record_base")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `tbl_record_base` (");
			sql.append("`id` int(11) NOT NULL AUTO_INCREMENT,");
			sql.append("`name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,");
			sql.append("`channel_id` int(11) DEFAULT NULL,");
			sql.append("`profile_id` int(11) DEFAULT NULL,");
			sql.append("`record_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL,");
			sql.append("`output_path` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,");
			sql.append("`file_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,");
			sql.append("`schedule_id` bigint(20) DEFAULT NULL,");
			sql.append("PRIMARY KEY (`id`),");
			sql.append("KEY `FKF704CEFEC3B1CD7C` (`schedule_id`),");
			sql.append("CONSTRAINT `FKF704CEFEC3B1CD7C` FOREIGN KEY (`schedule_id`) REFERENCES `tbl_schedules` (`id`)");
			sql.append(") ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;");
			upgradeDao.executeUpdate(sql.toString());
		}

		// tbl_record_fulltime
		if (!upgradeDao.isExistTable("tbl_record_fulltime")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `tbl_record_fulltime` (");
			sql.append("`id` int(11) NOT NULL,");
			sql.append("`segment_length` int(11) DEFAULT NULL,");
			sql.append("PRIMARY KEY (`id`),");
			sql.append("KEY `FKF0117F89791D5D22` (`id`),");
			sql.append("CONSTRAINT `FKF0117F89791D5D22` FOREIGN KEY (`id`) REFERENCES `tbl_record_base` (`id`)");
			sql.append(") ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;");
			upgradeDao.executeUpdate(sql.toString());
		}

		// tbl_record_epg
		if (upgradeDao.isExistTable("tbl_record_epg")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `tbl_record_epg` (");
			sql.append("`id` int(11) NOT NULL,");
			sql.append("PRIMARY KEY (`id`),");
			sql.append("KEY `FK524A874F791D5D22` (`id`),");
			sql.append("CONSTRAINT `FK524A874F791D5D22` FOREIGN KEY (`id`) REFERENCES `tbl_record_base` (`id`)");
			sql.append(") ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;");
			upgradeDao.executeUpdate(sql.toString());
		}

		// tbl_record_epgitems
		if (!upgradeDao.isExistTable("tbl_record_epgitems")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `tbl_record_epgitems` (");
			sql.append("`id` int(11) NOT NULL,");
			sql.append("`parent_id` int(11) DEFAULT NULL,");
			sql.append("PRIMARY KEY (`id`),");
			sql.append("KEY `FK76FE99D1791D5D22` (`id`),");
			sql.append("KEY `FK76FE99D1863FE343` (`parent_id`),");
			sql.append("CONSTRAINT `FK76FE99D1791D5D22` FOREIGN KEY (`id`) REFERENCES `tbl_record_base` (`id`),");
			sql.append("CONSTRAINT `FK76FE99D1863FE343` FOREIGN KEY (`parent_id`) REFERENCES `tbl_record_epg` (`id`)");
			sql.append(") ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;");
			upgradeDao.executeUpdate(sql.toString());
		}
	}

}
