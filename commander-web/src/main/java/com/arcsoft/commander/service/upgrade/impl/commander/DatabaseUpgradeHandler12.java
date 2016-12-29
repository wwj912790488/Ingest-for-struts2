package com.arcsoft.commander.service.upgrade.impl.commander;

import com.arcsoft.commander.service.upgrade.impl.DatabaseUpgradeHandlerSupport;

/**
 * Merge from arcvideo 1.7.x.x.
 * 
 * 073_add_pip_inserters.sql
 * ...
 * 084_update_motion_icons.sql
 * 
 * @author fjli
 */
public class DatabaseUpgradeHandler12 extends DatabaseUpgradeHandlerSupport {

	@Override
	public void upgrade() {
		// 073_add_pip_inserters.sql
		if (!upgradeDao.isExistTable("pip_inserters")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `pip_inserters` (");
			sql.append("`id` INT(11) NOT NULL AUTO_INCREMENT,");
			sql.append("`uri` VARCHAR(1024) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL,");
			sql.append("`program_id` INT(11) NULL DEFAULT NULL,");
			sql.append("`video_track_id` INT(11) NULL DEFAULT NULL,");
			sql.append("`audio_track_id` INT(11) NULL DEFAULT NULL,");
			sql.append("`subtitle_id` INT(11) NULL DEFAULT NULL,");
			sql.append("`pos_x` INT(11) NULL DEFAULT NULL,");
			sql.append("`pos_y` INT(11) NULL DEFAULT NULL,");
			sql.append("`width` INT(11) NULL DEFAULT NULL,");
			sql.append("`height` INT(11) NULL DEFAULT NULL,");
			sql.append("`alpha` INT(11) NULL DEFAULT '50',");
			sql.append("`insert_time` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL,");
			sql.append("`pip_insertable_id` INT(11) NULL DEFAULT NULL,");
			sql.append("`pip_insertable_type` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL,");
			sql.append("`created_at` DATETIME NULL DEFAULT NULL,");
			sql.append("`updated_at` DATETIME NULL DEFAULT NULL,");
			sql.append("PRIMARY KEY (`id`) )");
			upgradeDao.executeUpdate(sql.toString());
			upgradeDao.addIndex("pip_inserters", "pip_inserters_on_pip_insertable", "pip_insertable_id", "pip_insertable_type");
		}

		// 074_add_mxf_settings.sql
		if (!upgradeDao.isExistTable("mxf_settings")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `mxf_settings` (");
			sql.append("`id` INT(11) NOT NULL AUTO_INCREMENT,");
			sql.append("`operational_pattern` INT(11) NULL DEFAULT '0',");
			sql.append("`audio_track_follow_source` INT(11) NULL DEFAULT '0',");
			sql.append("`audio_channel_split` INT(11) NULL DEFAULT '0',");
			sql.append("`created_at` DATETIME NULL DEFAULT NULL,");
			sql.append("`updated_at` DATETIME NULL DEFAULT NULL,");
			sql.append("PRIMARY KEY (`id`) )");
			upgradeDao.executeUpdate(sql.toString());
		}

		// 075_watchfolder_ready_interval.sql
		upgradeDao.addColumn("watch_folders", "file_ready_interval", "INT", 11, "-1");

		// 076_add_audio_track_ids_to_inputs.sql
		upgradeDao.addColumn("inputs", "audio_track_ids", "VARCHAR", 255);
		upgradeDao.addColumn("candidate_locations", "audio_track_ids", "VARCHAR", 255);

		// 077_change_task_name_1024.sql
		upgradeDao.modifyColumn("live_events", "name", "VARCHAR", 1024);

		// 078_change_audio_pid.sql
		upgradeDao.modifyColumn("m2ts_settings", "audio_pid", "VARCHAR", 255);

		// 079_add_angle_id.sql
		upgradeDao.addColumn("inputs", "angle_id", "INT", 11);
		upgradeDao.addColumn("candidate_locations", "angle_id", "INT", 11);

		// 080_add_watermarking_inserters.sql
		// 083_add_watermarking_type.sql
		if (!upgradeDao.isExistTable("image_grabbings")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `watermarking_inserters` (");
			sql.append("`id` INT(11) NOT NULL AUTO_INCREMENT,");
			sql.append("`label` VARCHAR(1024) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL,");
			sql.append("`font` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL,");
			sql.append("`font_size` INT(11) NULL DEFAULT NULL,");
			sql.append("`english_font` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL,");
			sql.append("`english_size` INT(11) NULL DEFAULT NULL,");
			sql.append("`opacity` INT(11) NULL DEFAULT NULL,");
			sql.append("`color` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL,");
			sql.append("`pos_x` INT(11) NULL DEFAULT NULL,");
			sql.append("`pos_y` INT(11) NULL DEFAULT NULL,");
			sql.append("`width` INT(11) NULL DEFAULT NULL,");
			sql.append("`height` INT(11) NULL DEFAULT NULL,");
			sql.append("`bg_opacity` INT(11) NULL DEFAULT NULL,");
			sql.append("`bg_color` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL,");
			sql.append("`insertable_id` INT(11) NULL DEFAULT NULL,");
			sql.append("`insertable_type` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL,");
			sql.append("`watermarking_type` INT(11) NULL DEFAULT NULL,");
			sql.append("`created_at` DATETIME NULL DEFAULT NULL,");
			sql.append("`updated_at` DATETIME NULL DEFAULT NULL,");
			sql.append("PRIMARY KEY (`id`) )");
			upgradeDao.executeUpdate(sql.toString());
		}

		// 081_add_image_grabbings.sql
		if (!upgradeDao.isExistTable("image_grabbings")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `image_grabbings` (");
			sql.append("`id` INT(11) NOT NULL AUTO_INCREMENT,");
			sql.append("`target_path` VARCHAR(1024) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL,");
			sql.append("`target_name` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL,");
			sql.append("`target_ext` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL,");
			sql.append("`time_interval` INT(11) NULL DEFAULT NULL,");
			sql.append("`max_count` INT(11) NULL DEFAULT NULL,");
			sql.append("`width` INT(11) NULL DEFAULT NULL,");
			sql.append("`height` INT(11) NULL DEFAULT NULL,");
			sql.append("`operate` VARCHAR(32) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL,");
			sql.append("`insertable_id` INT(11) NULL DEFAULT NULL,");
			sql.append("`insertable_type` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL,");
			sql.append("`created_at` DATETIME NULL DEFAULT NULL,");
			sql.append("`updated_at` DATETIME NULL DEFAULT NULL,");
			sql.append("PRIMARY KEY (`id`) )");
			upgradeDao.executeUpdate(sql.toString());
		}

		// 082_motion_icon.sql
		// 084_update_motion_icons.sql
		if (!upgradeDao.isExistTable("motion_icons")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `motion_icons` (");
			sql.append("`id` INT(11) NOT NULL AUTO_INCREMENT,");
			sql.append("`owner_id` INT(11) NOT NULL DEFAULT 0,");
			sql.append("`owner_type` VARCHAR(32) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL,");
			sql.append("`pox_x` INT(11) NULL DEFAULT NULL,");
			sql.append("`pox_y` INT(11) NULL DEFAULT NULL,");
			sql.append("`opacity` TINYINT NOT NULL DEFAULT '100',");
			sql.append("`fps_numerator` INT(11) NOT NULL DEFAULT '0',");
			sql.append("`fps_denominator` INT(11) NOT NULL DEFAULT '1',");
			sql.append("`name` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL,");
			sql.append("`path` VARCHAR(512) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL,");
			sql.append("`operate` INT(11) NULL DEFAULT NULL,");
			sql.append("`initial_active` INT(11) NULL DEFAULT NULL,");
			sql.append("`framerate` VARCHAR(32) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL,");
			sql.append("`image_format` INT(11) NULL DEFAULT NULL,");
			sql.append("PRIMARY KEY (`id`) )");
			upgradeDao.executeUpdate(sql.toString());
		}
	}

}
