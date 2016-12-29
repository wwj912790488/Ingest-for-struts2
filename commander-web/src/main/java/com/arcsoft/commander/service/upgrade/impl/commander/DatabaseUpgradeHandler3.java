package com.arcsoft.commander.service.upgrade.impl.commander;

import com.arcsoft.commander.service.upgrade.impl.DatabaseUpgradeHandlerSupport;

/**
 * Merge from arcvideo 1.0.6.x.
 * 
 * 006_watchfolder_subfolder_included.sql
 * ...
 * 044_candidate_locations_src_ip.sql
 * 
 * 006-024: already exist in 1.0.4.x merge version
 * 025-044: added from 1.0.4.x to 1.0.6.x
 * 
 * @author fjli
 */
public class DatabaseUpgradeHandler3 extends DatabaseUpgradeHandlerSupport {

	@Override
	public void upgrade() {
		// extends for commander
		upgradeDao.addColumn("alerts", "ip", "varchar", 16);

		// 006_add ids to candidate_locations table.sql
		upgradeDao.addColumn("candidate_locations", "program_id", "INT", 11);
		upgradeDao.addColumn("candidate_locations", "video_track_id", "INT", 11);
		upgradeDao.addColumn("candidate_locations", "audio_track_id", "INT", 11);
		upgradeDao.addColumn("candidate_locations", "subtitle_id", "INT", 11);
		
		// 007_add rtp_group_settings table.sql
		if (!upgradeDao.isExistTable("rtp_group_settings")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `rtp_group_settings` (");
			sql.append("`id` INT(11) NOT NULL AUTO_INCREMENT,");
			sql.append("`destination_id` INT(11) DEFAULT NULL,");
			sql.append("`ttl` INT(11) DEFAULT NULL,");
			sql.append("`buffer_size` VARCHAR(255) DEFAULT 'Auto',");
			sql.append("`created_at` DATETIME DEFAULT NULL,");
			sql.append("`updated_at` DATETIME DEFAULT NULL,");
			sql.append("PRIMARY KEY (`id`))");
			upgradeDao.executeUpdate(sql.toString());
		}
		if (!upgradeDao.isExistTable("rtpoveres_settings")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `rtpoveres_settings` (");
			sql.append("`id` INT(11) NOT NULL AUTO_INCREMENT,");
			sql.append("`video_port` INT(11) DEFAULT NULL,");
			sql.append("`audio_port` INT(11) DEFAULT NULL,");
			sql.append("`created_at` DATETIME DEFAULT NULL,");
			sql.append("`updated_at` DATETIME DEFAULT NULL,");
			sql.append("PRIMARY KEY (`id`))");
			upgradeDao.executeUpdate(sql.toString());
		}

		// 008_add user table.sql
		// skip it

		// 009_add virtical position field.sql
		upgradeDao.addColumn("subtitle_inserters", "virtical_position", "INT", 11, "90");

		// 010_add watch folder type field.sql
		upgradeDao.addColumn("watch_folders", "type", "INT", 11, "0");

		// 011_add rtpoverts_settings table.sql
		if (!upgradeDao.isExistTable("rtpoverts_settings")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `rtpoverts_settings` (");
			sql.append("`id` INT(11) NOT NULL AUTO_INCREMENT,");
			sql.append("`port` INT(11) DEFAULT NULL,");
			sql.append("`ttl` INT(11) DEFAULT NULL,");
			sql.append("`created_at` DATETIME DEFAULT NULL,");
			sql.append("`updated_at` DATETIME DEFAULT NULL,");
			sql.append("PRIMARY KEY (`id`))");
			upgradeDao.executeUpdate(sql.toString());
		}

		// 012_add start field to candidate_locations table.sql
		upgradeDao.addColumn("candidate_locations", "start", "VARCHAR", 16);

		// 013_add srcIp to live_output_groups.sql
		upgradeDao.addColumn("live_output_groups", "src_ip", "VARCHAR", 16);
		upgradeDao.addColumn("live_output_groups", "src_port", "INT", 11, "0");
		upgradeDao.addColumn("live_output_groups", "smart_output", "TINYINT", 1, "0");

		// 014_add h265_settings table.sql
		if (!upgradeDao.isExistTable("h265_settings")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `h265_settings` (");
			sql.append("`id` INT(11) NOT NULL AUTO_INCREMENT,");
			sql.append("`adaptive_quantization` VARCHAR(255) DEFAULT 'off',");
			sql.append("`slices` INT(11) DEFAULT '1',");
			sql.append("`qp` INT(11) DEFAULT NULL,");
			sql.append("`min_qp` INT(11) DEFAULT NULL,");
			sql.append("`max_qp` INT(11) DEFAULT NULL,");
			sql.append("`qp_step` INT(11) DEFAULT NULL,");
			sql.append("`codec_profile` VARCHAR(32) DEFAULT NULL,");
			sql.append("`codec_level_id` INT(11) DEFAULT NULL,");
			sql.append("`created_at` DATETIME DEFAULT NULL,");
			sql.append("`updated_at` DATETIME DEFAULT NULL,");
			sql.append("`rate_control_mode` VARCHAR(255) DEFAULT NULL,");
			sql.append("`cq_quantizer` INT(11) DEFAULT NULL,");
			sql.append("`gop_mode_id` INT(11) DEFAULT '2',");
			sql.append("`bitrate` INT(11) DEFAULT '5000000',");
			sql.append("`max_bitrate` INT(11) DEFAULT NULL,");
			sql.append("`framerate_numerator` INT(11) DEFAULT NULL,");
			sql.append("`framerate_denominator` INT(11) DEFAULT NULL,");
			sql.append("`gop_size` INT(11) DEFAULT '80',");
			sql.append("`scd` TINYINT(1) DEFAULT '1',");
			sql.append("`gop_num_b_frames` INT(11) DEFAULT '2',");
			sql.append("`par_numerator` INT(11) DEFAULT NULL,");
			sql.append("`par_denominator` INT(11) DEFAULT NULL,");
			sql.append("`framerate_follow_source` TINYINT(1) DEFAULT '1',");
			sql.append("`par_follow_source` TINYINT(1) DEFAULT '1',");
			sql.append("`gop_closed_cadence` INT(11) DEFAULT '1',");
			sql.append("`passes` INT(11) DEFAULT '1',");
			sql.append("`buf_size` INT(11) DEFAULT NULL,");
			sql.append("`buf_fill_pct` INT(11) DEFAULT NULL,");
			sql.append("`interpolate_frc` TINYINT(1) DEFAULT '0',");
			sql.append("`pulldown` TINYINT(1) DEFAULT '0',");
			sql.append("`num_ref_frames` INT(11) DEFAULT '1',");
			sql.append("`force_field_pictures` TINYINT(1) DEFAULT '0',");
			sql.append("`look_ahead_rate_control` VARCHAR(255) DEFAULT 'medium',");
			sql.append("`encoding_option` varchar(32) DEFAULT NULL,");
			sql.append("`denoise_strength` INT(11) DEFAULT NULL,");
			sql.append("`two_passes` bit(1) DEFAULT NULL,");
			sql.append("`max_cu` INT(11) DEFAULT '4',");
			sql.append("`max_cu_depth` INT(11) DEFAULT '2',");
			sql.append("`max_tu` INT(11) DEFAULT '4',");
			sql.append("`min_tu` INT(11) DEFAULT '4',");
			sql.append("`max_inter_tu_depth` INT(11) DEFAULT '1',");
			sql.append("`max_intra_tu_depth` INT(11) DEFAULT '1',");
			sql.append("`sao` INT(11) DEFAULT '0',");
			sql.append("`amp` INT(11) DEFAULT '0',");
			sql.append("`loop_filter` INT(11) DEFAULT '0',");
			sql.append("PRIMARY KEY (`id`))");
			upgradeDao.executeUpdate(sql.toString());
		}

		// 015_add advertisement_inserters table.sql
		upgradeDao.addColumn("candidate_locations", "entry", "VARCHAR", 16);
		upgradeDao.addColumn("candidate_locations", "cropping", "TINYINT", 1, "0");
		upgradeDao.addColumn("candidate_locations", "end", "VARCHAR", 16);
		if (!upgradeDao.isExistTable("mv_enlight")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `mv_enlight` (");
			sql.append("`id` INT(11) NOT NULL AUTO_INCREMENT,");
			sql.append("`base_object_type` VARCHAR(64) DEFAULT NULL,");
			sql.append("`base_object_id` INT(11) DEFAULT NULL,");
			sql.append("`total_duration` VARCHAR(16) DEFAULT NULL,");
			sql.append("`uri` VARCHAR(1024) DEFAULT NULL,");
			sql.append("`program_id` INT(11) NULL DEFAULT '1',");
			sql.append("`video_track_id` INT(11) NULL DEFAULT '1',");
			sql.append("`audio_track_id` INT(11) NULL DEFAULT '1',");
			sql.append("`subtitle_id` INT(11) NULL DEFAULT '1',");
			sql.append("`padding` INT(11) NULL DEFAULT NULL,");
			sql.append("`logo_uri` VARCHAR(1024) DEFAULT NULL,");
			sql.append("`logo_program_id` INT(11) DEFAULT '1',");
			sql.append("`logo_video_track_id` INT(11) DEFAULT '1',");
			sql.append("`logo_audio_track_id` INT(11) DEFAULT '1',");
			sql.append("`logo_subtitle_id` INT(11) DEFAULT '1',");
			sql.append("`created_at` DATETIME DEFAULT NULL,");
			sql.append("`updated_at` DATETIME DEFAULT NULL,");
			sql.append("PRIMARY KEY (`id`))");
			upgradeDao.executeUpdate(sql.toString());
		}
		if (!upgradeDao.isExistTable("advertisement_inserters")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `advertisement_inserters` (");
			sql.append("`id` INT(11) NOT NULL AUTO_INCREMENT,");
			sql.append("`enabled` TINYINT(1) DEFAULT '0',");
			sql.append("`parent_id` INT(11) DEFAULT NULL,");
			sql.append("`parent_type` VARCHAR(255) DEFAULT NULL,");
			sql.append("`created_at` DATETIME DEFAULT NULL,");
			sql.append("`updated_at` DATETIME DEFAULT NULL,");
			sql.append("PRIMARY KEY (`id`))");
			upgradeDao.executeUpdate(sql.toString());
		}

		// 016_add resolution_filter table.sql
		if (!upgradeDao.isExistTable("resolution_filters")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `resolution_filters` (");
			sql.append("`id` INT(11) NOT NULL AUTO_INCREMENT,");
			sql.append("`parent_id` INT(11) DEFAULT NULL,");
			sql.append("`enabled` TINYINT(1) DEFAULT '0',");
			sql.append("`width` INT(11) DEFAULT NULL,");
			sql.append("`height` INT(11) DEFAULT NULL,");
			sql.append("`created_at` DATETIME DEFAULT NULL,");
			sql.append("`updated_at` DATETIME DEFAULT NULL,");
			sql.append("PRIMARY KEY (`id`))");
			upgradeDao.executeUpdate(sql.toString());
		}

		// 017_add total_bitrate to m2ts_settings.sql
		upgradeDao.addColumn("m2ts_settings", "total_bitrate", "INT", 11, "0");
		upgradeDao.addColumn("video_descriptions", "passthrough", "TINYINT", 1, "0");
		upgradeDao.addColumn("audio_descriptions", "passthrough", "TINYINT", 1, "0");

		// 018_add ttl to udp_group_settings.sql
		upgradeDao.addColumn("udp_group_settings", "ttl", "INT", 11, "0");

		// 019_add sdp to network_inputs.sql
		upgradeDao.addColumn("network_inputs", "sdp", "VARCHAR", 1024);

		// 020_add src_ip to network_inputs.sql
		upgradeDao.addColumn("network_inputs", "src_ip", "VARCHAR", 16);
		upgradeDao.addColumn("network_inputs", "src_port", "INT", 11, "0");

		// 021_add http_group_settings.sql
		if (!upgradeDao.isExistTable("http_group_settings")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `http_group_settings` (");
			sql.append("`id` INT(11) NOT NULL AUTO_INCREMENT,");
			sql.append("`destination_id` INT(11) DEFAULT NULL,");
			sql.append("`port` INT(11) DEFAULT NULL,");
			sql.append("`created_at` DATETIME DEFAULT NULL,");
			sql.append("`updated_at` DATETIME DEFAULT NULL,");
			sql.append("PRIMARY KEY (`id`))");
			upgradeDao.executeUpdate(sql.toString());
		}

		// 022_add video_rtp_uri to network_inputs.sql
		upgradeDao.addColumn("network_inputs", "video_rtp_uri", "VARCHAR", 1024);
		upgradeDao.addColumn("network_inputs", "audio_rtp_uri", "VARCHAR", 1024);
		upgradeDao.addColumn("network_inputs", "video_rtcp_uri", "VARCHAR", 1024);
		upgradeDao.addColumn("network_inputs", "audio_rtcp_uri", "VARCHAR", 1024);

		// 023_add avs_settings table.sql
		if (!upgradeDao.isExistTable("avs_settings")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `avs_settings` (");
			sql.append("`id` INT(11) NOT NULL AUTO_INCREMENT,");
			sql.append("`cabac` TINYINT(1) DEFAULT '1',");
			sql.append("`adaptive_quantization` VARCHAR(255) DEFAULT 'off',");
			sql.append("`slices` INT(11) DEFAULT '1',");
			sql.append("`qp` INT(11) DEFAULT NULL,");
			sql.append("`min_qp` INT(11) DEFAULT NULL,");
			sql.append("`max_qp` INT(11) DEFAULT NULL,");
			sql.append("`qp_step` INT(11) DEFAULT NULL,");
			sql.append("`codec_profile` VARCHAR(32) DEFAULT NULL,");
			sql.append("`codec_level_id` INT(11) DEFAULT NULL,");
			sql.append(" `created_at` DATETIME DEFAULT NULL,");
			sql.append("`updated_at` DATETIME DEFAULT NULL,");
			sql.append("`rate_control_mode` VARCHAR(255) DEFAULT NULL,");
			sql.append("`cq_quantizer` INT(11) DEFAULT NULL,");
			sql.append("`gop_mode_id` INT(11) DEFAULT '2',");
			sql.append("`interlace_mode_id` INT(11) DEFAULT '1',");
			sql.append("`bitrate` INT(11) DEFAULT '5000000',");
			sql.append("`max_bitrate` INT(11) DEFAULT NULL,");
			sql.append("`transform_8x8` TINYINT(1) DEFAULT '0',");
			sql.append("`intra_prediction_8x8` TINYINT(1) DEFAULT '0',");
			sql.append("`framerate_numerator` INT(11) DEFAULT NULL,");
			sql.append("`framerate_denominator` INT(11) DEFAULT NULL,");
			sql.append("`gop_size` INT(11) DEFAULT '80',");
			sql.append("`scd` TINYINT(1) DEFAULT '1',");
			sql.append("`gop_num_b_frames` INT(11) DEFAULT '2',");
			sql.append("`par_numerator` INT(11) DEFAULT NULL,");
			sql.append("`par_denominator` INT(11) DEFAULT NULL,");
			sql.append("`framerate_follow_source` TINYINT(1) DEFAULT '1',");
			sql.append("`par_follow_source` TINYINT(1) DEFAULT '1',");
			sql.append("`gop_closed_cadence` INT(11) DEFAULT '1',");
			sql.append("`passes` INT(11) DEFAULT '1',");
			sql.append("`buf_size` INT(11) DEFAULT NULL,");
			sql.append("`buf_fill_pct` INT(11) DEFAULT NULL,");
			sql.append("`interpolate_frc` TINYINT(1) DEFAULT '0',");
			sql.append("`pulldown` TINYINT(1) DEFAULT '0',");
			sql.append("`num_ref_frames` INT(11) DEFAULT '1',");
			sql.append("`force_field_pictures` TINYINT(1) DEFAULT '0',");
			sql.append("`look_ahead_rate_control` VARCHAR(255) DEFAULT 'medium',");
			sql.append("`encoding_option` varchar(32) DEFAULT NULL,");
			sql.append("`denoise_strength` INT(11) DEFAULT NULL,");
			sql.append("`two_passes` bit(1) DEFAULT NULL,");
			sql.append("PRIMARY KEY (`id`))");
			upgradeDao.executeUpdate(sql.toString());
		}

		// 024_add enable_subfolder to .sql
		upgradeDao.addColumn("watch_folders", "enable_subfolder", "TINYINT", 1, "0");

		// 025_watchfolder_subfolder_included.sql
		upgradeDao.executeUpdate("update watch_folders set watching_interval='-1' where id>0");
		upgradeDao.modifyColumn("watch_folders", "watching_interval", "int", 11);
		upgradeDao.addColumn("watch_folders", "file_ready_flag", "VARCHAR", 255);

		upgradeDao.modifyColumn("watch_files", "file_name", "VARCHAR", 1024);
		upgradeDao.addColumn("watch_files", "modify_at", "DATETIME", null);
		upgradeDao.addColumn("watch_files", "flag", "TINYINT", null);
		upgradeDao.addColumn("watch_files", "hash", "VARCHAR", 255);
		upgradeDao.addIndex("watch_files", "file_name_idx", "file_name");

		// 026_add_uri_to_post_processes.sql
		upgradeDao.addColumn("post_processes", "uri", "VARCHAR", 1024);

		// 027_task_power_lasterror.sql
		upgradeDao.addColumn("live_events", "output_file_duration", "BIGINT", 20);
		upgradeDao.addColumn("live_events", "last_errorcode", "int", 11);
		upgradeDao.addColumn("live_events", "last_errordesc", "varchar", 255);

		// 028_add_start_end_to_mosaic_inserters.sql
		upgradeDao.addColumn("mosaic_inserters", "mosaic_type", "int", 11, "0");
		upgradeDao.addColumn("mosaic_inserters", "start", "VARCHAR", 16);
		upgradeDao.addColumn("mosaic_inserters", "end", "VARCHAR", 16);
		upgradeDao.addColumn("mosaic_inserters", "active_time", "TINYINT", 1, "0");

		// 029_add_load_subtitle_to_watch_folders.sql
		upgradeDao.addColumn("watch_folders", "subtitle", "TINYINT", 1, "0");

		// 030_logs_enhancement.sql
		upgradeDao.modifyColumn("logs", "description", "varchar", 2048);
		upgradeDao.addColumn("logs", "notes", "varchar", 255);

		// 031_add_margins.sql
		if (!upgradeDao.isExistTable("margins")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `margins` (");
			sql.append("`id` INT(11) NOT NULL AUTO_INCREMENT,");
			sql.append("`enabled` TINYINT(1) DEFAULT '0',");
			sql.append("`left_top_x` INT(11) DEFAULT NULL,");
			sql.append("`left_top_y` INT(11) DEFAULT NULL,");
			sql.append("`left_bottom_x` INT(11) DEFAULT NULL,");
			sql.append("`left_bottom_y` INT(11) DEFAULT NULL,");
			sql.append("`right_top_x` INT(11) DEFAULT NULL,");
			sql.append("`right_top_y` INT(11) DEFAULT NULL,");
			sql.append("`right_bottom_x` INT(11) DEFAULT NULL,");
			sql.append("`right_bottom_y` INT(11) DEFAULT NULL,");
			sql.append("`color` INT(11) DEFAULT NULL,");
			sql.append("`created_at` DATETIME DEFAULT NULL,");
			sql.append("`updated_at` DATETIME DEFAULT NULL,");
			sql.append("`parent_id` INT(11) DEFAULT NULL,");
			sql.append("`parent_type` VARCHAR(255) DEFAULT NULL,");
			sql.append("PRIMARY KEY (`id`) )");
			upgradeDao.executeUpdate(sql.toString());
		}

		// 032_add_asi_group_settings.sql
		if (!upgradeDao.isExistTable("asi_group_settings")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `asi_group_settings` (");
			sql.append("`id` INT(11) NOT NULL AUTO_INCREMENT,");
			sql.append("`destination_id` INT(11) DEFAULT NULL,");
			sql.append("`port` INT(11) DEFAULT NULL,");
			sql.append("`created_at` DATETIME DEFAULT NULL,");
			sql.append("`updated_at` DATETIME DEFAULT NULL,");
			sql.append("PRIMARY KEY (`id`))");
			upgradeDao.executeUpdate(sql.toString());
		}

		// 033_add_to_rtpoveres_settings.sql
		upgradeDao.addColumn("rtpoveres_settings", "target_path", "varchar", 1024, "''");
		upgradeDao.addColumn("rtpoveres_settings", "target_name", "varchar", 255, "''");
		upgradeDao.addColumn("rtpoveres_settings", "extension", "varchar", 11, "''");

		// 034_add_to_inputs.sql
		upgradeDao.addColumn("inputs", "padding_image", "varchar", 1024, "''");

		// 035_task_statistic.sql
		if (!upgradeDao.isExistTable("task_stat")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `task_stat` (");
			sql.append("`id` bigint(20) NOT NULL DEFAULT 0,");
			sql.append("`task_id` int(11) DEFAULT NULL,");
			sql.append("`action_type` tinyint(4) DEFAULT NULL,");
			sql.append("`waitingAt` datetime DEFAULT NULL,");
			sql.append("`startedAt` datetime DEFAULT NULL,");
			sql.append("`completedAt` datetime DEFAULT NULL,");
			sql.append("`deletedAt` datetime DEFAULT NULL,");
			sql.append("`status` tinyint(4) DEFAULT NULL,");
			sql.append("PRIMARY KEY (`id`) )");
			upgradeDao.executeUpdate(sql.toString());
		}
		upgradeDao.addColumn("live_events", "run_seq", "int", 11, false, "0");
		upgradeDao.addColumn("live_events", "created_user", "int", 11);

		// 036_role_priv.sql
		// skip it

		// 037_add_device_id_quality_level.sql
		upgradeDao.addColumn("h264_settings", "device_id", "int", 11);
		upgradeDao.addColumn("h264_settings", "quality_level", "int", 11);

		// 038_task_query_optimize.sql
		upgradeDao.dropIndex("live_events", "index_live_events_on_created_at");
		upgradeDao.dropIndex("live_events", "index_live_events_on_archive_and_created_at");
		upgradeDao.dropIndex("live_events", "index_live_events_on_archive_and_pre_and_created_at");
		upgradeDao.dropIndex("live_events", "index_live_events_on_archive_and_post_and_created_at");
		upgradeDao.addIndex("live_events", "live_events_state_idx", "state");
		upgradeDao.addIndex("live_output_groups", "live_output_group_parent_id_idx", "output_group_parent_id");
		upgradeDao.addIndex("stream_assemblies", "stream_assemblies_base_object_id_idx", "base_object_id");
		upgradeDao.addIndex("archive_group_settings", "archive_group_settings_destination_id_idx", "destination_id");
		upgradeDao.addIndex("candidate_locations", "candidate_locations_base_object_id_idx", "base_object_id");
		upgradeDao.addIndex("mosaic_inserters", "mosaic_inserters_image_insertable_id_idx", "image_insertable_id");
		upgradeDao.addIndex("rectangles", "rectangles_parent_id_idx", "parent_id");
		upgradeDao.addIndex("advertisement_inserters", "advertisement_inserters_parent_id_idx", "parent_id");
		upgradeDao.addIndex("timeslice_clipping", "timeslice_clipping_parent_id_idx", "parent_id");
		upgradeDao.addIndex("timeslice", "timeslice_clipping_id_idx", "timeslice_clipping_id");
		upgradeDao.addIndex("image_editors", "image_editors_insertable_id_idx", "insertable_id");
		upgradeDao.addIndex("subtitle_inserters", "subtitle_inserters_input_id_idx", "input_id");
		upgradeDao.addIndex("subtitle_inserters", "subtitle_inserters_insertable_id_idx", "insertable_id");
		upgradeDao.addIndex("mv_enlight", "mv_enlight_base_object_id_idx", "base_object_id");

		// 039_add_pcm_table.sql
		if (!upgradeDao.isExistTable("pcm_settings")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `pcm_settings` (");
			sql.append("`id` int(11) NOT NULL AUTO_INCREMENT,");
			sql.append("`vbr_quality` VARCHAR(255) DEFAULT NULL,");
			sql.append("`rate_control_mode_id` INT(11) DEFAULT '2',");
			sql.append("`created_at` datetime DEFAULT NULL,");
			sql.append("`updated_at` datetime DEFAULT NULL,");
			sql.append("`codec_profile` varchar(255) DEFAULT NULL,");
			sql.append("`bitrate` INT(11) DEFAULT '64000',");
			sql.append("`sample_rate` INT(11) DEFAULT '48000',");
			sql.append("`channels` INT(11) DEFAULT '2',");
			sql.append("`boost_level` INT(11) DEFAULT '0',");
			sql.append("`latm_loas` TINYINT(1) DEFAULT '0',");
			sql.append("`mpeg2` TINYINT(1) DEFAULT '0',");
			sql.append("`channel_processing` VARCHAR(32) DEFAULT NULL,");
			sql.append("PRIMARY KEY (`id`) )");
			upgradeDao.executeUpdate(sql.toString());
		}

		// 040_add_bits_per_sample.sql
		upgradeDao.addColumn("pcm_settings", "bits_per_sample", "INT", 11);

		// 041_add_to_apple_live_group_settings.sql
		upgradeDao.addColumn("apple_live_group_settings", "segment_name", "VARCHAR", 255);
		upgradeDao.addColumn("apple_live_group_settings", "playlist_name", "VARCHAR", 255);
		upgradeDao.addColumn("apple_live_group_settings", "use_custom_naming", "TINYINT", 1, "0");
		upgradeDao.addColumn("apple_live_group_settings", "delete_uploaded", "TINYINT", 1, "0");

		// 042_add_to_subtitle_inserters.sql
		upgradeDao.addColumn("subtitle_inserters", "english_font", "varchar", 255);
		upgradeDao.addColumn("subtitle_inserters", "english_size", "INT", 11);
		upgradeDao.addColumn("subtitle_inserters", "pos_x", "INT", 11);
		upgradeDao.addColumn("subtitle_inserters", "pos_y", "INT", 11);
		upgradeDao.addColumn("subtitle_inserters", "width", "INT", 11);
		upgradeDao.addColumn("subtitle_inserters", "height", "INT", 11);

		// 043_add_to_subtitle_inserters.sql
		upgradeDao.addColumn("subtitle_inserters", "position_type", "INT", 11);
		upgradeDao.addColumn("subtitle_inserters", "font_info_type", "INT", 11);

		// 044_candidate_locations_src_ip.sql
		upgradeDao.addColumn("candidate_locations", "src_ip", "varchar", 255);
	}

}
