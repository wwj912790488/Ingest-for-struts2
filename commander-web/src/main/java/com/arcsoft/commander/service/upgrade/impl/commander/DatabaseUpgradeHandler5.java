package com.arcsoft.commander.service.upgrade.impl.commander;

import com.arcsoft.commander.service.upgrade.impl.DatabaseUpgradeHandlerSupport;

/**
 * Merge from arcvideo 1.1.2.x.
 * 
 * 045_add_to_archive_group_settings.sql
 * ...
 * 059_watch_folder_user.sql
 * 
 * @author fjli
 */
public class DatabaseUpgradeHandler5 extends DatabaseUpgradeHandlerSupport {

	@Override
	public void upgrade() {
		// 045_add_to_archive_group_settings.sql
		upgradeDao.addColumn("archive_group_settings", "segment_name", "varchar", 255);
		upgradeDao.addColumn("archive_group_settings", "playlist_name", "varchar", 255);
		upgradeDao.addColumn("archive_group_settings", "use_custom_naming", "TINYINT", 1, "0");
		upgradeDao.addColumn("archive_group_settings", "delete_uploaded", "TINYINT", 1, "0");

		// 046_add_to_http_group_settings.sql
		upgradeDao.addColumn("http_group_settings", "custom_uri", "varchar", 255);
		upgradeDao.addColumn("http_group_settings", "path_uri", "varchar", 255);

		// 047_add_balance_mode.sql
		upgradeDao.addColumn("aac_settings", "volume_mode", "varchar", 32, "'1'");
		upgradeDao.addColumn("aac_settings", "balance_db", "INT", 11, "-30");
		upgradeDao.addColumn("aac_settings", "balance_level", "INT", 11, "0");

		upgradeDao.addColumn("amr_settings", "volume_mode", "varchar", 32, "'1'");
		upgradeDao.addColumn("amr_settings", "balance_db", "INT", 11, "-30");
		upgradeDao.addColumn("amr_settings", "balance_level", "INT", 11, "0");
		
		upgradeDao.addColumn("ac3_settings", "volume_mode", "varchar", 32, "'1'");
		upgradeDao.addColumn("ac3_settings", "balance_db", "INT", 11, "-30");
		upgradeDao.addColumn("ac3_settings", "balance_level", "INT", 11, "0");
		
		upgradeDao.addColumn("ddp_settings", "volume_mode", "varchar", 32, "'1'");
		upgradeDao.addColumn("ddp_settings", "balance_db", "INT", 11, "-30");
		upgradeDao.addColumn("ddp_settings", "balance_level", "INT", 11, "0");

		upgradeDao.addColumn("mpa_settings", "volume_mode", "varchar", 32, "'1'");
		upgradeDao.addColumn("mpa_settings", "balance_db", "INT", 11, "-30");
		upgradeDao.addColumn("mpa_settings", "balance_level", "INT", 11, "0");

		upgradeDao.addColumn("wma_settings", "volume_mode", "varchar", 32, "'1'");
		upgradeDao.addColumn("wma_settings", "balance_db", "INT", 11, "-30");
		upgradeDao.addColumn("wma_settings", "balance_level", "INT", 11, "0");

		upgradeDao.addColumn("pcm_settings", "volume_mode", "varchar", 32, "'1'");
		upgradeDao.addColumn("pcm_settings", "balance_db", "INT", 11, "-30");
		upgradeDao.addColumn("pcm_settings", "balance_level", "INT", 11, "0");

		// 048_add_combination_inputs.sql
		if (!upgradeDao.isExistTable("combination_inputs")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `combination_inputs` (");
			sql.append("`id` INT(11) NOT NULL AUTO_INCREMENT,");
			sql.append("`uri` VARCHAR(1024) DEFAULT NULL,");
			sql.append("`media_info` TEXT DEFAULT NULL,");
			sql.append("`created_at` DATETIME DEFAULT NULL,");
			sql.append("`updated_at` DATETIME DEFAULT NULL,");
			sql.append("PRIMARY KEY (`id`))");
			upgradeDao.executeUpdate(sql.toString());
		}

		// 049_add_to_audio_descriptions.sql
		upgradeDao.addColumn("audio_descriptions", "candidate_location_id", "INT", 11);

		// 050_add_mpeg4_settings_table.sql
		if (!upgradeDao.isExistTable("mpeg4_settings")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `mpeg4_settings` (");
			sql.append("`id` INT(11) NOT NULL AUTO_INCREMENT,");
			sql.append("`framerate_numerator` INT(11) DEFAULT NULL,");
			sql.append("`framerate_denominator` INT(11) DEFAULT NULL,");
			sql.append("`framerate_follow_source` TINYINT(1) NULL DEFAULT '1',");
			sql.append("`bitrate` INT(11) DEFAULT '5000000',");
			sql.append("`max_bitrate` INT(11) DEFAULT NULL,");
			sql.append("`buf_size` INT(11) DEFAULT NULL,");
			sql.append("`buf_fill_pct` INT(11) DEFAULT NULL,");
			sql.append("`gop_size` INT(11) DEFAULT '12',");
			sql.append("`gop_num_b_frames` INT(11) DEFAULT '2',");
			sql.append("`gop_closed_cadence` INT(11) DEFAULT '1',");
			sql.append("`scd` TINYINT(1) DEFAULT '1',");
			sql.append("`qp` INT(11) DEFAULT NULL,");
			sql.append("`min_qp` INT(11) DEFAULT NULL,");
			sql.append("`max_qp` INT(11) DEFAULT NULL,");
			sql.append("`qp_step` INT(11) DEFAULT NULL,");
			sql.append("`par_numerator` INT(11) DEFAULT NULL,");
			sql.append("`par_denominator` INT(11) DEFAULT NULL,");
			sql.append("`par_follow_source` TINYINT(1) DEFAULT '1',");
			sql.append("`passes` INT(11) DEFAULT '1',");
			sql.append("`interlace_mode_id` INT(11) DEFAULT '1',");
			sql.append("`rate_control_mode` VARCHAR(255) DEFAULT NULL,");
			sql.append("`gop_mode_id` INT(11) DEFAULT '2',");
			sql.append("`codec_profile` VARCHAR(255) DEFAULT NULL,");
			sql.append("`codec_level_id` INT(11) DEFAULT NULL,");
			sql.append("`created_at` DATETIME DEFAULT NULL,");
			sql.append("`updated_at` DATETIME DEFAULT NULL,");
			sql.append("`interpolate_frc` TINYINT(1) DEFAULT '0',");
			sql.append("`pulldown` TINYINT(1) DEFAULT '0',");
			sql.append("`adaptive_quantization` VARCHAR(255) DEFAULT 'off',");
			sql.append("`d10_syntax` TINYINT(1) DEFAULT '0',");
			sql.append("`look_ahead_rate_control` VARCHAR(255) DEFAULT 'medium',");
			sql.append("`encoding_option` VARCHAR(32) DEFAULT NULL,");
			sql.append("`denoise_strength` INT(11) DEFAULT NULL,");
			sql.append("PRIMARY KEY (`id`))");
			upgradeDao.executeUpdate(sql.toString());
		}

		// 051_add_candidate_outputs_table.sql
		if (!upgradeDao.isExistTable("candidate_outputs")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `candidate_outputs` (");
			sql.append("`id` INT(11) NOT NULL AUTO_INCREMENT,");
			sql.append("`base_object_type` VARCHAR(64) DEFAULT NULL,");
			sql.append("`base_object_id` INT(11) DEFAULT NULL,");
			sql.append("`uri` VARCHAR(1024) DEFAULT NULL,");
			sql.append("`port` INT(11) DEFAULT NULL,");
			sql.append("`src_ip` VARCHAR(256) DEFAULT NULL,");
			sql.append("`ttl` INT(11) DEFAULT NULL,");
			sql.append("`buffer_size` INT(11) DEFAULT NULL,");
			sql.append("`created_at` DATETIME DEFAULT NULL,");
			sql.append("`updated_at` DATETIME DEFAULT NULL,");
			sql.append("PRIMARY KEY (`id`))");
			upgradeDao.executeUpdate(sql.toString());
		}

		// 052_add_audio_delay_to_inputs.sql
		upgradeDao.addColumn("inputs", "audio_delay", "INT", 11, "0");

		// 053_add_ip_to_alerts.sql
		upgradeDao.addColumn("alerts", "ip", "VARCHAR", 255);

		// 054_add_signal_settings.sql
		// skip source_switch_conditions
		upgradeDao.addColumn("network_inputs", "switch_mode", "INT", 11);

		// 055_add watchfolders_follow_src_dir.sql
		upgradeDao.addColumn("watch_folders", "follow_src_dir", "TINYINT", 1, "0");

		// 056_update_failover_time.sql
		upgradeDao.modifyColumn("inputs", "failover_time", "BIGINT", 19);

		// 057_delete_profile_tiny_optimized.sql
		upgradeDao.addIndex("watch_folders", "wf_profile_id_idx", new String[] {"profile_id"});
		upgradeDao.addIndex("resolution_filters", "rf_parent_id_idx", new String[] {"parent_id"});

		// 058_add_signal_settings.sql
		if (!upgradeDao.isExistTable("source_signal_items")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `source_signal_items` (");
			sql.append("`type` INT(11) NOT NULL,");
			sql.append("`switch_timeout` INT(11),");
			sql.append("`warning_period` INT(11),");
			sql.append("`check_enabled` TINYINT(1),");
			sql.append("`check_param` INT(11),");
			sql.append("PRIMARY KEY (`type`))");
			upgradeDao.executeUpdate(sql.toString());
		}

		// 059_watch_folder_user.sql
		upgradeDao.addColumn("watch_folders", "owner", "INT", 11, "0");
	}

}
