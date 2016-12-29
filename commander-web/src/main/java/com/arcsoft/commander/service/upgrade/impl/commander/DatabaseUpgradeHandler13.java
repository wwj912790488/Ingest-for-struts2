package com.arcsoft.commander.service.upgrade.impl.commander;

import com.arcsoft.commander.service.upgrade.impl.DatabaseUpgradeHandlerSupport;

/**
 * Merge from arcvideo 1.8.x.x.
 * 
 * 085_oss_input.sql
 * ...
 * 095_segment_type.sql
 * 
 * @author fjli
 */
public class DatabaseUpgradeHandler13 extends DatabaseUpgradeHandlerSupport {

	@Override
	public void upgrade() {
		// 085_oss_input.sql
		if (!upgradeDao.isExistTable("oss_inputs")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `oss_inputs` (");
			sql.append("`id` INT(11) NOT NULL AUTO_INCREMENT,");
			sql.append("`_key` VARCHAR(1024) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL,");
			sql.append("`media_info` TEXT CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL,");
			sql.append("`created_at` DATETIME NULL DEFAULT NULL,");
			sql.append("`updated_at` DATETIME NULL DEFAULT NULL,");
			sql.append("PRIMARY KEY (`id`)");
			sql.append(") ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;");
			upgradeDao.executeUpdate(sql.toString());
		}

		// 086_alerts_taskid_index.sql
		upgradeDao.addIndex("alerts", "idx_task_id", "task_id");

		// 087_task_group.sql
		if (!upgradeDao.isExistTable("task_group")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `task_group` (");
			sql.append("`id` INT(11) NOT NULL AUTO_INCREMENT,");
			sql.append("`seq` INT(11) DEFAULT 0,");
			sql.append("`name` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NOT NULL,");
			sql.append("PRIMARY KEY (`id`)");
			sql.append(") ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;");
			upgradeDao.executeUpdate(sql.toString());
		}
		if (!upgradeDao.isExistTable("task_group_rel")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `task_group_rel` (");
			sql.append("`task_id` INT(11) NOT NULL,");
			sql.append("`group_id` INT(11) NOT NULL,");
			sql.append("PRIMARY KEY (`task_id`,`group_id`),");
			sql.append("CONSTRAINT `task_group_rel_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `live_events`(`id`) ON DELETE CASCADE,");
			sql.append("CONSTRAINT `task_group_rel_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `task_group`(`id`) ON DELETE CASCADE");
			sql.append(") ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;");
			upgradeDao.executeUpdate(sql.toString());
		}

		// 088_add_dy_text.sql
		if (!upgradeDao.isExistTable("dynamic_texts")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `dynamic_texts` (");
			sql.append("`id` int(11) NOT NULL AUTO_INCREMENT,");
			sql.append("`owner_id` int(11) DEFAULT NULL,");
			sql.append("`owner_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,");
			sql.append("`label` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,");
			sql.append("`name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,");
			sql.append("`font` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,");
			sql.append("`font_size` int(11) DEFAULT NULL,");
			sql.append("`english_font` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,");
			sql.append("`english_size` int(11) DEFAULT NULL,");
			sql.append("`pos_x` int(11) DEFAULT NULL,");
			sql.append("`pos_y` int(11) DEFAULT NULL,");
			sql.append("`width` int(11) DEFAULT NULL,");
			sql.append("`height` int(11) DEFAULT NULL,");
			sql.append("`color` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,");
			sql.append("`opacity` int(11) DEFAULT NULL,");
			sql.append("`bg_color` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,");
			sql.append("`bg_opacity` int(11) DEFAULT NULL,");
			sql.append("`animation_type` int(11) DEFAULT NULL,");
			sql.append("`scroll_mode` int(11) DEFAULT NULL,");
			sql.append("`scroll_speed` int(11) DEFAULT NULL,");
			sql.append("`scroll_count` int(11) DEFAULT NULL,");
			sql.append("`scroll_interval` int(11) DEFAULT NULL,");
			sql.append("`operate` int(11) DEFAULT NULL,");
			sql.append("`initial_active` bit(1) DEFAULT NULL,");
			sql.append("PRIMARY KEY (`id`)");
			sql.append(") ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;");
			upgradeDao.executeUpdate(sql.toString());
		}

		// 089_add_mxf_target_path.sql
		upgradeDao.addColumn("mxf_settings", "target_path", "VARCHAR", 511);
		upgradeDao.addColumn("mxf_settings", "target_name", "VARCHAR", 255);
		upgradeDao.addColumn("mxf_settings", "target_ext", "VARCHAR", 255);

		// 090_add_video_decoding.sql
		upgradeDao.addColumn("live_events", "video_decoding", "TINYINT", 1);
		upgradeDao.addColumn("live_profiles", "video_decoding", "TINYINT", 1);
		upgradeDao.addColumn("schedules", "video_decoding", "TINYINT", 1);

		// 091_add_avi_settings.sql
		if (!upgradeDao.isExistTable("avi_settings")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `avi_settings` (");
			sql.append("`id` INT(11) NOT NULL AUTO_INCREMENT,");
			sql.append("`split_audio` TINYINT(1) NULL DEFAULT NULL,");
			sql.append("`split_audio_channel` TINYINT(1) NULL DEFAULT NULL,");
			sql.append("`audio_container` VARCHAR(31) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL,");
			sql.append("`audio_path` VARCHAR(511) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL,");
			sql.append("`audio_name` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL,");
			sql.append("`audio_ext` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL,");
			sql.append("PRIMARY KEY (`id`)");
			sql.append(") ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;");
			upgradeDao.executeUpdate(sql.toString());
		}

		// 092_task_var_val.sql
		upgradeDao.addColumn("live_events", "version", "TINYINT", null, "0");
		upgradeDao.addColumn("live_events", "tmpl_id", "INT", 11, "0");
		if (!upgradeDao.isExistTable("task_tmpl")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `task_tmpl` (");
			sql.append("`id` INT(11) NOT NULL AUTO_INCREMENT,");
			sql.append("`ref_count` INT(11) NOT NULL DEFAULT 0,");
			sql.append("`last_modified` DATETIME NOT NULL,");
			sql.append("`content_fmt` TINYINT NOT NULL DEFAULT 0,");
			sql.append("`content` BLOB NULL,");
			sql.append("PRIMARY KEY (`id`)");
			sql.append(") ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;");
			upgradeDao.executeUpdate(sql.toString());
		}

		if (!upgradeDao.isExistTable("profile_disk_file")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `profile_disk_file` (");
			sql.append("`disk_path` VARCHAR(255) NOT NULL,");
			sql.append("`task_tmpl_id` INT(11) NOT NULL DEFAULT 0,");
			sql.append("`last_modified` DATETIME NOT NULL,");
			sql.append("`name` VARCHAR(255) COLLATE utf8_unicode_ci DEFAULT NULL,");
			sql.append("`notes` VARCHAR(255) COLLATE utf8_unicode_ci DEFAULT NULL,");
			sql.append("PRIMARY KEY (`disk_path`)");
			sql.append(") ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;");
			upgradeDao.executeUpdate(sql.toString());
		}

		if (!upgradeDao.isExistTable("task_var_value")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `task_var_value` (");
			sql.append("`task_id` INT NOT NULL,");
			sql.append("`var_index` SMALLINT NOT NULL,");
			sql.append("`var_type` TINYINT NOT NULL DEFAULT 0,");
			sql.append("`val_type` TINYINT NOT NULL DEFAULT 0,");
			sql.append("`var` VARCHAR(512) COLLATE utf8_unicode_ci NOT NULL,");
			sql.append("`val` VARCHAR(5000) COLLATE utf8_unicode_ci DEFAULT NULL,");
			sql.append("PRIMARY KEY (`task_id`,`var_index`),");
			sql.append("CONSTRAINT `task_var_value_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `live_events`(`id`) ON DELETE CASCADE");
			sql.append(") ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;");
			upgradeDao.executeUpdate(sql.toString());
		}

		if (!upgradeDao.isExistTable("task_common_setting_param")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `task_common_setting_param` (");
			sql.append("`param_owner` varchar(60) COLLATE utf8_unicode_ci NOT NULL,");
			sql.append("`param` varchar(200) COLLATE utf8_unicode_ci NOT NULL,");
			sql.append("`val` varchar(5000) COLLATE utf8_unicode_ci DEFAULT NULL,");
			sql.append("PRIMARY KEY (`param_owner`,`param`)");
			sql.append(") ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;");
			upgradeDao.executeUpdate(sql.toString());
		}

		// 093_add_arc_drm.sql
		if (!upgradeDao.isExistTable("arcdrm_settings")) {
			StringBuffer sql = new StringBuffer("CREATE  TABLE IF NOT EXISTS `arcdrm_settings` (");
			sql.append("`id` INT(11) NOT NULL AUTO_INCREMENT,");
			sql.append("`content_id` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL,");
			sql.append("`customer_id` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL,");
			sql.append("PRIMARY KEY (`id`)");
			sql.append(") ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;");
			upgradeDao.executeUpdate(sql.toString());
		}
	
		// 094_av_lost_fill_mode.sql
		upgradeDao.addColumn("avs_settings", "fill_on_lost", "TINYINT", null, "0");
		upgradeDao.addColumn("dnxhd_settings", "fill_on_lost", "TINYINT", null, "0");
		upgradeDao.addColumn("h263_settings", "fill_on_lost", "TINYINT", null, "0");
		upgradeDao.addColumn("h264_settings", "fill_on_lost", "TINYINT", null, "0");
		upgradeDao.addColumn("h265_settings", "fill_on_lost", "TINYINT", null, "0");
		upgradeDao.addColumn("mpeg2_settings", "fill_on_lost", "TINYINT", null, "0");
		upgradeDao.addColumn("mpeg4_settings", "fill_on_lost", "TINYINT", null, "0");
		upgradeDao.addColumn("prores_settings", "fill_on_lost", "TINYINT", null, "0");
		upgradeDao.addColumn("wmv_settings", "fill_on_lost", "TINYINT", null, "0");
		upgradeDao.addColumn("aac_settings", "fill_on_lost", "TINYINT", null, "0");
		upgradeDao.addColumn("ac3_settings", "fill_on_lost", "TINYINT", null, "0");
		upgradeDao.addColumn("amr_settings", "fill_on_lost", "TINYINT", null, "0");
		upgradeDao.addColumn("ddp_settings", "fill_on_lost", "TINYINT", null, "0");
		upgradeDao.addColumn("mpa_settings", "fill_on_lost", "TINYINT", null, "0");
		upgradeDao.addColumn("pcm_settings", "fill_on_lost", "TINYINT", null, "0");
		upgradeDao.addColumn("wma2_settings", "fill_on_lost", "TINYINT", null, "0");
		upgradeDao.addColumn("wma_settings", "fill_on_lost", "TINYINT", null, "0");

		// 095_segment_type.sql
		upgradeDao.addColumn("archive_group_settings", "segment_type", "TINYINT", null, "0");
		upgradeDao.addColumn("archive_group_settings", "segment_record_length", "INT", 11, "0");
		upgradeDao.addColumn("archive_group_settings", "segment_offset", "INT", 11, "0");
	}

}
