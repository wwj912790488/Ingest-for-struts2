SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';
SET NAMES utf8;

DROP SCHEMA IF EXISTS `ingestdb`;
CREATE SCHEMA IF NOT EXISTS `ingestdb` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `ingestdb`;


--
-- Table structure for table `tbl_system_settings`
--
DROP TABLE IF EXISTS `tbl_system_settings`;

CREATE TABLE `tbl_system_settings` (
  `setting_key` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `setting_value` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`setting_key`),
  UNIQUE KEY `setting_key` (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Table data for table `tbl_system_settings`
--
INSERT INTO `tbl_system_settings`(`setting_key`,`setting_value`) VALUES ('db.version','15');
INSERT INTO `tbl_system_settings`(`setting_key`,`setting_value`) VALUES ('recorddb.version','3');
INSERT INTO `tbl_system_settings`(`setting_key`,`setting_value`) VALUES ('transcoderdb.version','95');

--
-- Table structure for table `tbl_server_groups`
--
DROP TABLE IF EXISTS `tbl_server_groups`;

CREATE TABLE `tbl_server_groups` (
  `group_id` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `group_type` int(11) DEFAULT NULL,
  PRIMARY KEY (`group_id`),
  UNIQUE KEY `group_id` (`group_id`),
  UNIQUE KEY `group_name` (`group_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


--
-- Table structure for table `tbl_servers`
--
DROP TABLE IF EXISTS `tbl_servers`;

CREATE TABLE `tbl_servers` (
  `server_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `server_type` int(11) DEFAULT NULL,
  `server_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `server_ip` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `server_port` int(11) DEFAULT NULL,
  `server_state` int(11) DEFAULT NULL,
  `server_isbackup` int(11) DEFAULT NULL,
  `server_isalive` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `max_tasks_count` int(11) DEFAULT NULL,
  `max_output_count` int(11) DEFAULT NULL,
  `max_sd_count` int(11) DEFAULT NULL,
  `max_hd_count` int(11) DEFAULT NULL,
  `fault_disabled` int(11) DEFAULT '0',
  PRIMARY KEY (`server_id`),
  UNIQUE KEY `server_id` (`server_id`),
  UNIQUE KEY `server_name` (`server_name`),
  KEY `FK8B70820F50E81961` (`group_id`),
  CONSTRAINT `FK8B70820F50E81961` FOREIGN KEY (`group_id`) REFERENCES `tbl_server_groups` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


--
-- Table structure for table `tbl_storages`
--
DROP TABLE IF EXISTS `tbl_storages`;

CREATE TABLE `tbl_storages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `path` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


--
-- Table structure for table `tbl_roles`
--
DROP TABLE IF EXISTS `tbl_roles`;
CREATE TABLE `tbl_roles` (
  `role_id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `canceltime` timestamp NULL DEFAULT NULL,
  `remarks` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `isEnabled` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Table data for table `tbl_roles`
--
INSERT INTO `tbl_roles` (`role_id`, `name`, `createtime`, `canceltime`, `remarks`, `isEnabled`) VALUES (1,'administrator','2014-06-13 09:26:28',NULL,NULL,1);
INSERT INTO `tbl_roles` (`role_id`, `name`, `createtime`, `canceltime`, `remarks`, `isEnabled`) VALUES (2,'operator','2014-06-13 09:26:28',NULL,NULL,1);
INSERT INTO `tbl_roles` (`role_id`, `name`, `createtime`, `canceltime`, `remarks`, `isEnabled`) VALUES (3,'visitor','2014-06-13 09:26:28',NULL,NULL,1);

--
-- Table structure for table `role_operator`
--
DROP TABLE IF EXISTS `role_operator`;
CREATE TABLE `role_operator` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `role_id` int(10) NOT NULL,
  `operator_id` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rr_rolid_idx` (`role_id`),
  KEY `FKAEE599B7A37E8F93` (`operator_id`),
  CONSTRAINT `rr_rolid` FOREIGN KEY (`role_id`) REFERENCES `tbl_roles` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Table data for table `tbl_roles`
--
INSERT INTO `role_operator` VALUES (1,3,33),(2,3,53),(3,3,93),(4,3,43),(5,3,83),(6,2,43),(7,2,53),(8,2,31),(9,2,83),(10,2,41),(11,2,52),(12,2,50),(13,2,30),(14,2,40),(15,2,51),(16,2,42),(17,2,93),(18,2,32),(19,2,33);

--
-- Table structure for table `tbl_users`
--

DROP TABLE IF EXISTS `tbl_users`;

CREATE TABLE `tbl_users` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `real_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `register_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `unregister_time` timestamp NULL,
  `remarks` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT '1',
  `isEnabled` tinyint(1) NOT NULL DEFAULT '1',
  `role_id` int(10),
  PRIMARY KEY (`id`),
  KEY `fk_tbl_users_role_id` (`role_id`),
  CONSTRAINT `fk_tbl_users_role_id` FOREIGN KEY (`role_id`) REFERENCES `tbl_roles` (`role_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Table data for table `tbl_users`
--
INSERT INTO `tbl_users`(`name`, `password`, `real_name`, `isEnabled`, `role_id`) VALUES ('Admin', '319d13257a0f1058a95afd022d3730ab', '超级管理员', '1', '1');

--
-- Table structure for table `tbl_commander_tasks`
--
DROP TABLE IF EXISTS `tbl_commander_tasks`;

CREATE TABLE `tbl_commander_tasks` (
  `task_id` int(11) NOT NULL,
  `task_type` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `server_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`task_id`),
  KEY `fk_commander_tasks_id` (`task_id`),
  CONSTRAINT `fk_commander_tasks_id` FOREIGN KEY (`task_id`) REFERENCES `live_events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Table structure for table `tbl_channels`
--
DROP TABLE IF EXISTS `tbl_channels`;

CREATE TABLE `tbl_channels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `uri` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `program_id` int(11) DEFAULT NULL,
  `video_id` int(11) DEFAULT NULL,
  `audio_id` int(11) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `last_modified` datetime DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `videoInfo` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `audioInfo` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `defRecordPath` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_channel_group_id` (`group_id`),
  CONSTRAINT `fk_channel_group_id` FOREIGN KEY (`group_id`) REFERENCES `tbl_server_groups` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Table structure for table `tbl_schedules`
--
DROP TABLE IF EXISTS `tbl_schedules`;

CREATE TABLE `tbl_schedules` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `source` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `schedule_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `start_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `start_date` date DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `end_date` date DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `repeat_end_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `repeat_end_date` date DEFAULT NULL,
  `repeat_interval` int(11) DEFAULT NULL,
  `repeat_days` int(11) DEFAULT NULL,
  `next_time` datetime DEFAULT NULL,
  `last_time` datetime DEFAULT NULL,
  `create_at` datetime DEFAULT NULL,
  `disabled` bit(1) DEFAULT NULL,
  `finished` bit(1) DEFAULT NULL,
  `first_time` datetime DEFAULT NULL,
  `final_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Table structure for table `tbl_schedule_events`
--
DROP TABLE IF EXISTS `tbl_schedule_events`;

CREATE TABLE `tbl_schedule_events` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `schedule_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_SCHEDULE_EVENTS_SCHEDULE_ID` (`schedule_id`),
  CONSTRAINT `FK_SCHEDULE_EVENTS_SCHEDULE_ID` FOREIGN KEY (`schedule_id`) REFERENCES `tbl_schedules` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Table structure for table `tbl_schedule_triggers`
--
DROP TABLE IF EXISTS `tbl_schedule_triggers`;

CREATE TABLE `tbl_schedule_triggers` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `event_id` bigint(20) DEFAULT NULL,
  `schedule_time` datetime DEFAULT NULL,
  `triggered` bit(1) DEFAULT NULL,
  `finished` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK6C73702226E1E541` (`event_id`),
  CONSTRAINT `FK6C73702226E1E541` FOREIGN KEY (`event_id`) REFERENCES `tbl_schedule_events` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Table structure for table `tbl_record_base`
--
DROP TABLE IF EXISTS `tbl_record_base`;
CREATE TABLE `tbl_record_base` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `channel_id` int(11) DEFAULT NULL,
  `profile_id` int(11) DEFAULT NULL,
  `record_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `output_path` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `file_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `schedule_id` bigint(20) DEFAULT NULL,
  `generate_thumb` bit(1) DEFAULT NULL,
  `thumb_width` int(11) DEFAULT NULL,
  `thumb_height` int(11) DEFAULT NULL,
  `ftp_option` bit(1) DEFAULT b'0',
  `ftp_path` varchar(255) COLLATE utf8_unicode_ci DEFAULT '',
  `ftp_ApiOption` bit(1) COLLATE utf8_unicode_ci DEFAULT b'0',
  `ftp_ApiIP` varchar(255) COLLATE utf8_unicode_ci DEFAULT '',
  `ftp_ApiUserName` varchar(255) COLLATE utf8_unicode_ci DEFAULT '',
  `ftp_ApiPassWord` varchar(255) COLLATE utf8_unicode_ci DEFAULT '',
  `ftp_ApiPath` varchar(255) COLLATE utf8_unicode_ci DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `FKF704CEFEC3B1CD7C` (`schedule_id`),
  CONSTRAINT `FKF704CEFEC3B1CD7C` FOREIGN KEY (`schedule_id`) REFERENCES `tbl_schedules` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Table structure for table `tbl_record_fulltime`
--
DROP TABLE IF EXISTS `tbl_record_fulltime`;

CREATE TABLE `tbl_record_fulltime` (
  `id` int(11) NOT NULL,
  `segment_length` int(11) DEFAULT NULL,
  `keep_times` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKF0117F89791D5D22` (`id`),
  CONSTRAINT `FKF0117F89791D5D22` FOREIGN KEY (`id`) REFERENCES `tbl_record_base` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Table structure for table `tbl_record_epg`
--
-- not used, no tbl_epglist
DROP TABLE IF EXISTS `tbl_record_epg`;

CREATE TABLE `tbl_record_epg` (
  `id` int(11) NOT NULL,
  `epg_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK524A874F791D5D22` (`id`),
  KEY `FK524A874F504F2090` (`epg_id`),
  CONSTRAINT `FK524A874F504F2090` FOREIGN KEY (`epg_id`) REFERENCES `tbl_epglist` (`id`),
  CONSTRAINT `FK524A874F791D5D22` FOREIGN KEY (`id`) REFERENCES `tbl_record_base` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Table structure for table `tbl_record_epg_info`
--
DROP TABLE IF EXISTS `tbl_record_epg_info`;

CREATE TABLE `tbl_record_epg_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `channelId` int(11) DEFAULT NULL,
  `filePath` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Table structure for table `tbl_record_epgitems`
--
DROP TABLE IF EXISTS `tbl_record_epgitems`;

CREATE TABLE `tbl_record_epgitems` (
  `id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK76FE99D1791D5D22` (`id`),
  KEY `FK76FE99D1863FE343` (`parent_id`),
  CONSTRAINT `FK76FE99D1791D5D22` FOREIGN KEY (`id`) REFERENCES `tbl_record_base` (`id`),
  CONSTRAINT `FK76FE99D1863FE343` FOREIGN KEY (`parent_id`) REFERENCES `tbl_record_epg` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Table structure for table `tbl_record_tasks`
--
DROP TABLE IF EXISTS `tbl_record_tasks`;

CREATE TABLE `tbl_record_tasks` (
  `task_id` int(11) NOT NULL,
  `task_type` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `server_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `record_id` int(11) DEFAULT NULL,
  `schedule_event_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`task_id`),
  KEY `FKEA92B90196AD7752` (`task_id`),
  CONSTRAINT `FKEA92B90196AD7752` FOREIGN KEY (`task_id`) REFERENCES `live_events` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Table structure for table `tbl_record_delete_files`
--
DROP TABLE IF EXISTS `tbl_record_delete_files`;

CREATE TABLE `tbl_record_delete_files` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `file_name` varchar(2048) COLLATE utf8_unicode_ci DEFAULT NULL,
  `delete_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for `aac_settings`
-- ----------------------------
DROP TABLE IF EXISTS `aac_settings`;
CREATE TABLE `aac_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vbr_quality` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `rate_control_mode_id` int(11) DEFAULT '2',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `codec_profile` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bitrate` int(11) DEFAULT '64000',
  `sample_rate` int(11) DEFAULT '48000',
  `channels` int(11) DEFAULT '2',
  `boost_level` int(11) DEFAULT '0',
  `latm_loas` tinyint(1) DEFAULT '0',
  `mpeg2` tinyint(1) DEFAULT '0',
  `channel_processing` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `volume_mode` varchar(32) COLLATE utf8_unicode_ci DEFAULT '1',
  `balance_db` int(11) DEFAULT '-30',
  `balance_level` int(11) DEFAULT '0',
  `fill_on_lost` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of aac_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `ac3_settings`
-- ----------------------------
DROP TABLE IF EXISTS `ac3_settings`;
CREATE TABLE `ac3_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `coding_mode` varchar(255) COLLATE utf8_unicode_ci DEFAULT '2_0',
  `dynamic_range_compression` tinyint(1) DEFAULT '1',
  `lfe_filter` tinyint(1) DEFAULT '0',
  `bitrate` int(11) DEFAULT '192000',
  `sample_rate` int(11) DEFAULT '48000',
  `channels` int(11) DEFAULT '2',
  `boost_level` int(11) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `dialnorm` int(11) DEFAULT NULL,
  `channel_processing` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `volume_mode` varchar(32) COLLATE utf8_unicode_ci DEFAULT '1',
  `balance_db` int(11) DEFAULT '-30',
  `balance_level` int(11) DEFAULT '0',
  `fill_on_lost` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of ac3_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `advertisement_inserters`
-- ----------------------------
DROP TABLE IF EXISTS `advertisement_inserters`;

-- ----------------------------
-- Records of advertisement_inserters
-- ----------------------------
CREATE TABLE `advertisement_inserters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enabled` tinyint(1) DEFAULT '0',
  `parent_id` int(11) DEFAULT NULL,
  `parent_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `advertisement_inserters_parent_id_idx` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for `aiff_settings`
-- ----------------------------
DROP TABLE IF EXISTS `aiff_settings`;
CREATE TABLE `aiff_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sample_rate` int(11) DEFAULT '44100',
  `channels` int(11) DEFAULT '2',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of aiff_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `alerts`
-- ----------------------------
DROP TABLE IF EXISTS `alerts`;
CREATE TABLE `alerts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `alertable_id` int(11) DEFAULT NULL,
  `alertable_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `set` tinyint(1) DEFAULT '0',
  `last_set` datetime DEFAULT NULL,
  `quiet` tinyint(1) NOT NULL DEFAULT '0',
  `threshold` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `message` text COLLATE utf8_unicode_ci,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `output_id` int(11) DEFAULT NULL,
  `output_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `node_id` int(11) DEFAULT NULL,
  `eme_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `task_id` int(11) DEFAULT NULL,
  `level` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `error_code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ip` varchar(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `time_stamp` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_alerts_on_alertable_id_and_alertable_type` (`alertable_id`,`alertable_type`),
  KEY `index_alerts_on_set_and_quiet` (`set`,`quiet`),
  KEY `index_alerts_on_output_id_and_output_type` (`output_id`,`output_type`),
  KEY `idx_task_id` (`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of alerts
-- ----------------------------

-- ----------------------------
-- Table structure for `amr_settings`
-- ----------------------------
DROP TABLE IF EXISTS `amr_settings`;
CREATE TABLE `amr_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vbr_quality` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `rate_control_mode_id` int(11) DEFAULT '2',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `codec_profile` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bitrate` int(11) DEFAULT '64000',
  `sample_rate` int(11) DEFAULT '48000',
  `channels` int(11) DEFAULT '2',
  `boost_level` int(11) DEFAULT '0',
  `latm_loas` tinyint(1) DEFAULT '0',
  `mpeg2` tinyint(1) DEFAULT '0',
  `channel_processing` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `volume_mode` varchar(32) COLLATE utf8_unicode_ci DEFAULT '1',
  `balance_db` int(11) DEFAULT '-30',
  `balance_level` int(11) DEFAULT '0',
  `fill_on_lost` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of amr_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `ancillary_source_settings`
-- ----------------------------
DROP TABLE IF EXISTS `ancillary_source_settings`;
CREATE TABLE `ancillary_source_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `destination_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'Embedded',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of ancillary_source_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `apple_live_group_settings`
-- ----------------------------
DROP TABLE IF EXISTS `apple_live_group_settings`;
CREATE TABLE `apple_live_group_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `segment_length` int(11) DEFAULT '10',
  `generate_meta_file` tinyint(1) DEFAULT '1',
  `base_url` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `vod_mode` tinyint(1) DEFAULT '0',
  `keep_segments` int(11) DEFAULT '21',
  `index_n_segments` int(11) DEFAULT '10',
  `use_subdirectories` tinyint(1) DEFAULT '0',
  `segments_per_subdirectory` int(11) DEFAULT NULL,
  `destination_id` int(11) DEFAULT NULL,
  `target_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cdn` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `salt` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `connection_retry_interval` int(11) DEFAULT '2',
  `num_retries` int(11) DEFAULT '10',
  `encryption_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `key_rotation_count` int(11) DEFAULT '3',
  `iv_follows_segment_number` tinyint(1) DEFAULT '1',
  `constant_iv` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `log_uploads` tinyint(1) DEFAULT '0',
  `chunked_transfer` tinyint(1) DEFAULT '0',
  `keyprovider_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `keyprovider_settings_id` int(11) DEFAULT NULL,
  `keyprovider_settings_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `key_save_location_id` int(11) DEFAULT NULL,
  `key_prefix` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `segment_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `playlist_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `use_custom_naming` tinyint(1) DEFAULT '0',
  `delete_uploaded` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of apple_live_group_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `apple_live_settings`
-- ----------------------------
DROP TABLE IF EXISTS `apple_live_settings`;
CREATE TABLE `apple_live_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `priority_output` tinyint(1) DEFAULT '0',
  `audio_only_output` tinyint(1) DEFAULT '0',
  `audio_only_image_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of apple_live_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `arcdrm_settings`
-- ----------------------------
DROP TABLE IF EXISTS `arcdrm_settings`;

CREATE TABLE `arcdrm_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `customer_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of arcdrm_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `archive_group_settings`
-- ----------------------------
DROP TABLE IF EXISTS `archive_group_settings`;
CREATE TABLE `archive_group_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `destination_id` int(11) DEFAULT NULL,
  `target_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `extension` varchar(8) COLLATE utf8_unicode_ci DEFAULT NULL,
  `segment_length` int(11) DEFAULT '10',
  `rollover_interval` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `segment_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `playlist_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `use_custom_naming` tinyint(1) DEFAULT '0',
  `delete_uploaded` tinyint(1) DEFAULT '0',
  `segment_type` tinyint(4) DEFAULT '0',
  `segment_record_length` int(11) DEFAULT '0',
  `segment_offset` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `archive_group_settings_destination_id_idx` (`destination_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of archive_group_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `asf_settings`
-- ----------------------------
DROP TABLE IF EXISTS `asf_settings`;
CREATE TABLE `asf_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `progressive_downloading` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of asf_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `asi_group_settings`
-- ----------------------------
DROP TABLE IF EXISTS `asi_group_settings`;
CREATE TABLE `asi_group_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `destination_id` int(11) DEFAULT NULL,
  `port` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of asi_group_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `audio_descriptions`
-- ----------------------------
DROP TABLE IF EXISTS `audio_descriptions`;
CREATE TABLE `audio_descriptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `audio_codec_id` int(11) DEFAULT '3',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `audio_track` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `base_object_id` int(11) DEFAULT NULL,
  `base_object_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `settings_id` int(11) DEFAULT NULL,
  `settings_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `remix_settings_id` int(11) DEFAULT NULL,
  `order_id` int(11) DEFAULT '1',
  `stream_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `language_code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `audio_normalization_settings_id` int(11) DEFAULT NULL,
  `passthrough` tinyint(1) DEFAULT '0',
  `candidate_location_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_audio_descriptions_on_base_object_id_and_base_object_type` (`base_object_id`,`base_object_type`),
  KEY `index_audio_descriptions_on_settings_id_and_settings_type` (`settings_id`,`settings_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of audio_descriptions
-- ----------------------------

-- ----------------------------
-- Table structure for `audio_normalization_settings`
-- ----------------------------
DROP TABLE IF EXISTS `audio_normalization_settings`;
CREATE TABLE `audio_normalization_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `log_loudness` tinyint(1) DEFAULT '1',
  `real_time_correction` tinyint(1) DEFAULT NULL,
  `target_lkfs` float DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `algorithm` varchar(255) COLLATE utf8_unicode_ci DEFAULT '1770-1',
  `truepeak` tinyint(1) DEFAULT '0',
  `correct_audio` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of audio_normalization_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `authentication_configs`
-- ----------------------------
DROP TABLE IF EXISTS `authentication_configs`;
CREATE TABLE `authentication_configs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cluster_id` int(11) DEFAULT NULL,
  `authentication_on` tinyint(1) DEFAULT '0',
  `ldap_authentication_on` tinyint(1) DEFAULT '0',
  `passwords_expire` tinyint(1) DEFAULT '0',
  `passwords_expire_after_days` int(11) DEFAULT '90',
  `failed_login_limit` int(11) DEFAULT '20',
  `failed_login_ban_minutes` int(11) DEFAULT '120',
  `session_inactivity_timeout` int(11) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of authentication_configs
-- ----------------------------

-- ----------------------------
-- Table structure for `avail_blankings`
-- ----------------------------
DROP TABLE IF EXISTS `avail_blankings`;
CREATE TABLE `avail_blankings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enabled` tinyint(1) DEFAULT '0',
  `avail_blanking_image_id` int(11) DEFAULT NULL,
  `avail_blankable_id` int(11) DEFAULT NULL,
  `avail_blankable_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of avail_blankings
-- ----------------------------

DROP TABLE IF EXISTS `avi_settings`;

CREATE TABLE `avi_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `split_audio` tinyint(1) DEFAULT NULL,
  `split_audio_channel` tinyint(1) DEFAULT NULL,
  `audio_container` varchar(31) COLLATE utf8_unicode_ci DEFAULT NULL,
  `audio_path` varchar(511) COLLATE utf8_unicode_ci DEFAULT NULL,
  `audio_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `audio_ext` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- ----------------------------
-- Table structure for `avs_settings`
-- ----------------------------
DROP TABLE IF EXISTS `avs_settings`;
CREATE TABLE `avs_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cabac` tinyint(1) DEFAULT '1',
  `adaptive_quantization` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'off',
  `slices` int(11) DEFAULT '1',
  `qp` int(11) DEFAULT NULL,
  `min_qp` int(11) DEFAULT NULL,
  `max_qp` int(11) DEFAULT NULL,
  `qp_step` int(11) DEFAULT NULL,
  `codec_profile` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `codec_level_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `rate_control_mode` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cq_quantizer` int(11) DEFAULT NULL,
  `gop_mode_id` int(11) DEFAULT '2',
  `interlace_mode_id` int(11) DEFAULT '1',
  `bitrate` int(11) DEFAULT '5000000',
  `max_bitrate` int(11) DEFAULT NULL,
  `transform_8x8` tinyint(1) DEFAULT '0',
  `intra_prediction_8x8` tinyint(1) DEFAULT '0',
  `framerate_numerator` int(11) DEFAULT NULL,
  `framerate_denominator` int(11) DEFAULT NULL,
  `gop_size` int(11) DEFAULT '80',
  `scd` tinyint(1) DEFAULT '1',
  `gop_num_b_frames` int(11) DEFAULT '2',
  `par_numerator` int(11) DEFAULT NULL,
  `par_denominator` int(11) DEFAULT NULL,
  `framerate_follow_source` tinyint(1) DEFAULT '1',
  `par_follow_source` tinyint(1) DEFAULT '1',
  `gop_closed_cadence` int(11) DEFAULT '1',
  `passes` int(11) DEFAULT '1',
  `buf_size` int(11) DEFAULT NULL,
  `buf_fill_pct` int(11) DEFAULT NULL,
  `interpolate_frc` tinyint(1) DEFAULT '0',
  `pulldown` tinyint(1) DEFAULT '0',
  `num_ref_frames` int(11) DEFAULT '1',
  `force_field_pictures` tinyint(1) DEFAULT '0',
  `look_ahead_rate_control` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'medium',
  `encoding_option` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `denoise_strength` int(11) DEFAULT NULL,
  `two_passes` bit(1) DEFAULT NULL,
  `top_field_first` int(11) DEFAULT NULL,
  `fill_on_lost` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of avs_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `backup_groups`
-- ----------------------------
DROP TABLE IF EXISTS `backup_groups`;
CREATE TABLE `backup_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of backup_groups
-- ----------------------------

-- ----------------------------
-- Table structure for `backup_groups_devices`
-- ----------------------------
DROP TABLE IF EXISTS `backup_groups_devices`;
CREATE TABLE `backup_groups_devices` (
  `backup_group_id` int(11) DEFAULT NULL,
  `device_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of backup_groups_devices
-- ----------------------------

-- ----------------------------
-- Table structure for `backup_groups_nodes`
-- ----------------------------
DROP TABLE IF EXISTS `backup_groups_nodes`;
CREATE TABLE `backup_groups_nodes` (
  `backup_group_id` int(11) DEFAULT NULL,
  `node_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of backup_groups_nodes
-- ----------------------------

-- ----------------------------
-- Table structure for `bd_inputs`
-- ----------------------------
DROP TABLE IF EXISTS `bd_inputs`;
CREATE TABLE `bd_inputs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uri` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `media_info` text COLLATE utf8_unicode_ci,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of bd_inputs
-- ----------------------------

-- ----------------------------
-- Table structure for `candidate_locations`
-- ----------------------------
DROP TABLE IF EXISTS `candidate_locations`;
CREATE TABLE `candidate_locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `base_object_type` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `base_object_id` int(11) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `uri` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `port` int(11) DEFAULT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `media_info` text COLLATE utf8_unicode_ci,
  `udp_igmp_source` text COLLATE utf8_unicode_ci,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `program_id` int(11) DEFAULT NULL,
  `video_track_id` int(11) DEFAULT NULL,
  `audio_track_id` int(11) DEFAULT NULL,
  `subtitle_id` int(11) DEFAULT NULL,
  `start` varchar(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `entry` varchar(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cropping` tinyint(1) DEFAULT '0',
  `end` varchar(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `src_ip` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `audio_track_ids` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `angle_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `candidate_locations_base_object_id_idx` (`base_object_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of candidate_locations
-- ----------------------------

-- ----------------------------
-- Table structure for `candidate_outputs`
-- ----------------------------
DROP TABLE IF EXISTS `candidate_outputs`;

CREATE TABLE `candidate_outputs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `base_object_type` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `base_object_id` int(11) DEFAULT NULL,
  `uri` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `port` int(11) DEFAULT NULL,
  `src_ip` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ttl` int(11) DEFAULT NULL,
  `buffer_size` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `igmp_source_ip` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of candidate_outputs
-- ----------------------------

-- ----------------------------
-- Table structure for `caption_descriptions`
-- ----------------------------
DROP TABLE IF EXISTS `caption_descriptions`;
CREATE TABLE `caption_descriptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `base_object_id` int(11) DEFAULT NULL,
  `base_object_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `order` int(11) DEFAULT '1',
  `source_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'Embedded',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `source_settings_id` int(11) DEFAULT NULL,
  `source_settings_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `language_description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `language_code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of caption_descriptions
-- ----------------------------

-- ----------------------------
-- Table structure for `changelog`
-- ----------------------------
DROP TABLE IF EXISTS `changelog`;
CREATE TABLE `changelog` (
  `change_number` bigint(20) NOT NULL,
  `complete_dt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `applied_by` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`change_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of changelog
-- ----------------------------
INSERT INTO `changelog` VALUES ('1', '2013-10-15 11:12:37', 'root@localhost', '001_add changelog table.sql');
INSERT INTO `changelog` VALUES ('2', '2013-10-15 11:13:53', 'root@localhost', '002_init tables.sql');
INSERT INTO `changelog` VALUES ('3', '2013-10-15 11:13:53', 'root@localhost', '003_enable task guid.sql');
INSERT INTO `changelog` VALUES ('4', '2013-10-15 11:13:54', 'root@localhost', '004_add logs table.sql');
INSERT INTO `changelog` VALUES ('5', '2013-10-15 11:13:59', 'root@localhost', '005_add alerts table.sql');

-- ----------------------------
-- Table structure for `clusters`
-- ----------------------------
DROP TABLE IF EXISTS `clusters`;
CREATE TABLE `clusters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `primary_management_id` int(11) DEFAULT NULL,
  `secondary_management_id` int(11) DEFAULT NULL,
  `manager_uri` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `job_archive_days` int(11) DEFAULT '7',
  `img_cleanup_days` int(11) DEFAULT '7',
  `job_delete_days` int(11) DEFAULT '0',
  `external_db` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `database` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of clusters
-- ----------------------------

-- ----------------------------
-- Table structure for `color_correctors`
-- ----------------------------
DROP TABLE IF EXISTS `color_correctors`;
CREATE TABLE `color_correctors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `brightness` int(11) DEFAULT '50',
  `contrast` int(11) DEFAULT '50',
  `hue` int(11) DEFAULT '0',
  `saturation` int(11) DEFAULT '50',
  `expand_colorspace` tinyint(1) DEFAULT '0',
  `convert_601_to_709` tinyint(1) DEFAULT '0',
  `convert_709_to_601` tinyint(1) DEFAULT '0',
  `video_description_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_color_correctors_on_video_description_id` (`video_description_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of color_correctors
-- ----------------------------

-- ----------------------------
-- Table structure for `combination_inputs`
-- ----------------------------
DROP TABLE IF EXISTS `combination_inputs`;
CREATE TABLE `combination_inputs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uri` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `media_info` text COLLATE utf8_unicode_ci,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of combination_inputs
-- ----------------------------

-- ----------------------------
-- Table structure for `ddp_settings`
-- ----------------------------
DROP TABLE IF EXISTS `ddp_settings`;
CREATE TABLE `ddp_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vbr_quality` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `rate_control_mode_id` int(11) DEFAULT '2',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `codec_profile` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bitrate` int(11) DEFAULT '64000',
  `sample_rate` int(11) DEFAULT '48000',
  `channels` int(11) DEFAULT '2',
  `boost_level` int(11) DEFAULT '0',
  `latm_loas` tinyint(1) DEFAULT '0',
  `mpeg2` tinyint(1) DEFAULT '0',
  `channel_processing` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `volume_mode` varchar(32) COLLATE utf8_unicode_ci DEFAULT '1',
  `balance_db` int(11) DEFAULT '-30',
  `balance_level` int(11) DEFAULT '0',
  `fill_on_lost` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of ddp_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `deinterlacers`
-- ----------------------------
DROP TABLE IF EXISTS `deinterlacers`;
CREATE TABLE `deinterlacers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `deinterlace_mode` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'Deinterlace',
  `video_description_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `algorithm` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'interpolate',
  PRIMARY KEY (`id`),
  KEY `index_deinterlacers_on_video_description_id` (`video_description_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of deinterlacers
-- ----------------------------

-- ----------------------------
-- Table structure for `deleted_items`
-- ----------------------------
DROP TABLE IF EXISTS `deleted_items`;
CREATE TABLE `deleted_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `deletable_id` int(11) DEFAULT NULL,
  `deletable_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of deleted_items
-- ----------------------------

-- ----------------------------
-- Table structure for `devices`
-- ----------------------------
DROP TABLE IF EXISTS `devices`;
CREATE TABLE `devices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `device_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `device_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `device_number` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `channels` int(11) DEFAULT NULL,
  `node_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of devices
-- ----------------------------

-- ----------------------------
-- Table structure for `device_formats`
-- ----------------------------
DROP TABLE IF EXISTS `device_formats`;
CREATE TABLE `device_formats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `format_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `device_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of device_formats
-- ----------------------------

-- ----------------------------
-- Table structure for `device_inputs`
-- ----------------------------
DROP TABLE IF EXISTS `device_inputs`;
CREATE TABLE `device_inputs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `device_id` int(11) DEFAULT NULL,
  `channel` int(11) DEFAULT '1',
  `input_format` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'Auto',
  `media_info` text COLLATE utf8_unicode_ci,
  `allow_program_id_change` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of device_inputs
-- ----------------------------


-- -----------------------------------------------------
-- Table `dnxhd_settings`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dnxhd_settings` ;

CREATE  TABLE IF NOT EXISTS `dnxhd_settings` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `codec_profile` VARCHAR(32) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL ,
  `created_at` DATETIME NULL DEFAULT NULL ,
  `updated_at` DATETIME NULL DEFAULT NULL ,
  `rate_control_mode` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL ,  
  `interlace_mode_id` INT(11) NULL DEFAULT '1' ,
  `bitrate` INT(11) NULL DEFAULT '5000000' ,
  `framerate_numerator` INT(11) NULL DEFAULT NULL ,
  `framerate_denominator` INT(11) NULL DEFAULT NULL ,
  `framerate_follow_source` TINYINT(1) NULL DEFAULT '1' ,
  `par_numerator` INT(11) NULL DEFAULT NULL ,
  `par_denominator` INT(11) NULL DEFAULT NULL ,
  `par_follow_source` TINYINT(1) NULL DEFAULT '1' ,
  `interpolate_frc` TINYINT(1) NULL DEFAULT '0' ,
  `top_field_first` int NULL DEFAULT NULL,
  `fill_on_lost` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8 COLLATE = utf8_unicode_ci;

-- ----------------------------
-- Records of dnxhd_settings
-- ----------------------------


-- ----------------------------
-- Table structure for `drm_descriptions`
-- ----------------------------
DROP TABLE IF EXISTS `drm_descriptions`;
CREATE TABLE `drm_descriptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enabled` tinyint(1) DEFAULT '0',
  `settings_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `settings_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of drm_descriptions
-- ----------------------------

-- ----------------------------
-- Table structure for `dvb_sub_source_settings`
-- ----------------------------
DROP TABLE IF EXISTS `dvb_sub_source_settings`;
CREATE TABLE `dvb_sub_source_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `destination_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'DVB-Sub',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of dvb_sub_source_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `dynamic_texts`
-- ----------------------------
DROP TABLE IF EXISTS `dynamic_texts`;

CREATE TABLE `dynamic_texts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner_id` int(11) DEFAULT NULL,
  `owner_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `label` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `font` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `font_size` int(11) DEFAULT NULL,
  `english_font` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `english_size` int(11) DEFAULT NULL,
  `pos_x` int(11) DEFAULT NULL,
  `pos_y` int(11) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `color` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `opacity` int(11) DEFAULT NULL,
  `bg_color` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bg_opacity` int(11) DEFAULT NULL,
  `animation_type` int(11) DEFAULT NULL,
  `scroll_mode` int(11) DEFAULT NULL,
  `scroll_speed` int(11) DEFAULT NULL,
  `scroll_count` int(11) DEFAULT NULL,
  `scroll_interval` int(11) DEFAULT NULL,
  `operate` int(11) DEFAULT NULL,
  `initial_active` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- ----------------------------
-- Table structure for `embedded_source_settings`
-- ----------------------------
DROP TABLE IF EXISTS `embedded_source_settings`;
CREATE TABLE `embedded_source_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `destination_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'Embedded',
  `source_608_track_number` int(11) DEFAULT '1',
  `source_608_channel_number` int(11) DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of embedded_source_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `eth_configs`
-- ----------------------------
DROP TABLE IF EXISTS `eth_configs`;
CREATE TABLE `eth_configs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `network_config_id` int(11) DEFAULT NULL,
  `eth_dev` int(11) DEFAULT NULL,
  `dhcp` tinyint(1) DEFAULT '1',
  `ip_addr` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `netmask` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gateway` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `management` tinyint(1) DEFAULT '0',
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of eth_configs
-- ----------------------------

-- ----------------------------
-- Table structure for `external_outputs`
-- ----------------------------
DROP TABLE IF EXISTS `external_outputs`;
CREATE TABLE `external_outputs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `output_group_id` int(11) DEFAULT NULL,
  `external_uri` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bandwidth` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `order` int(11) DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_external_outputs_on_output_group_id` (`output_group_id`),
  KEY `index_external_outputs_on_order` (`order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of external_outputs
-- ----------------------------

-- ----------------------------
-- Table structure for `f4v_settings`
-- ----------------------------
DROP TABLE IF EXISTS `f4v_settings`;
CREATE TABLE `f4v_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `progressive_downloading` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of f4v_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `failover_configs`
-- ----------------------------
DROP TABLE IF EXISTS `failover_configs`;
CREATE TABLE `failover_configs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cluster_id` int(11) DEFAULT NULL,
  `heartbeat_frequency` int(11) DEFAULT '1',
  `failover_threshold` int(11) DEFAULT '4',
  `auto_rejoin` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of failover_configs
-- ----------------------------

-- ----------------------------
-- Table structure for `failure_rules`
-- ----------------------------
DROP TABLE IF EXISTS `failure_rules`;
CREATE TABLE `failure_rules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `priority` int(11) DEFAULT '50',
  `backup_rule` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `restart_on_failure` tinyint(1) DEFAULT '0',
  `backoff_time` int(11) DEFAULT '30',
  `max_failures` int(11) DEFAULT '3',
  `failure_ruleable_id` int(11) DEFAULT NULL,
  `failure_ruleable_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `failure_count` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of failure_rules
-- ----------------------------

-- ----------------------------
-- Table structure for `file_source_settings`
-- ----------------------------
DROP TABLE IF EXISTS `file_source_settings`;
CREATE TABLE `file_source_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `destination_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'Embedded',
  `source_file_id` int(11) DEFAULT NULL,
  `time_delta` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of file_source_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `file_system_mounts`
-- ----------------------------
DROP TABLE IF EXISTS `file_system_mounts`;
CREATE TABLE `file_system_mounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mount_point_config_id` int(11) DEFAULT NULL,
  `file_system_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'cifs',
  `server_share` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `mount_folder` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_mounted` tinyint(1) DEFAULT '0',
  `unmount` tinyint(1) DEFAULT '0',
  `del` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of file_system_mounts
-- ----------------------------

-- ----------------------------
-- Table structure for `firewall_configs`
-- ----------------------------
DROP TABLE IF EXISTS `firewall_configs`;
CREATE TABLE `firewall_configs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `node_id` int(11) DEFAULT NULL,
  `firewall_on` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of firewall_configs
-- ----------------------------

-- ----------------------------
-- Table structure for `firewall_ports`
-- ----------------------------
DROP TABLE IF EXISTS `firewall_ports`;
CREATE TABLE `firewall_ports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firewall_config_id` int(11) DEFAULT NULL,
  `port` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `port_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of firewall_ports
-- ----------------------------

-- ----------------------------
-- Table structure for `flv_settings`
-- ----------------------------
DROP TABLE IF EXISTS `flv_settings`;
CREATE TABLE `flv_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `progressive_downloading` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of flv_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `frame_capture_settings`
-- ----------------------------
DROP TABLE IF EXISTS `frame_capture_settings`;
CREATE TABLE `frame_capture_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quality` int(11) DEFAULT '80',
  `instruction` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'at 5s',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `append_sequence_number` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of frame_capture_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `h263_settings`
-- ----------------------------
DROP TABLE IF EXISTS `h263_settings`;
CREATE TABLE `h263_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `framerate_numerator` int(11) DEFAULT NULL,
  `framerate_denominator` int(11) DEFAULT NULL,
  `framerate_follow_source` tinyint(1) DEFAULT '1',
  `bitrate` int(11) DEFAULT '5000000',
  `max_bitrate` int(11) DEFAULT NULL,
  `buf_size` int(11) DEFAULT NULL,
  `buf_fill_pct` int(11) DEFAULT NULL,
  `gop_size` int(11) DEFAULT '12',
  `gop_closed_cadence` int(11) DEFAULT '1',
  `scd` tinyint(1) DEFAULT '1',
  `qp` int(11) DEFAULT NULL,
  `min_qp` int(11) DEFAULT NULL,
  `max_qp` int(11) DEFAULT NULL,
  `qp_step` int(11) DEFAULT NULL,
  `par_numerator` int(11) DEFAULT NULL,
  `par_denominator` int(11) DEFAULT NULL,
  `par_follow_source` tinyint(1) DEFAULT '1',
  `passes` int(11) DEFAULT '1',
  `interlace_mode_id` int(11) DEFAULT '1',
  `rate_control_mode` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gop_mode_id` int(11) DEFAULT '2',
  `codec_profile` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `codec_level_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `interpolate_frc` tinyint(1) DEFAULT '0',
  `pulldown` tinyint(1) DEFAULT '0',
  `adaptive_quantization` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'off',
  `d10_syntax` tinyint(1) DEFAULT '0',
  `look_ahead_rate_control` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'medium',
  `encoding_option` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `denoise_strength` int(11) DEFAULT NULL,
  `fill_on_lost` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of h263_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `h264_settings`
-- ----------------------------
DROP TABLE IF EXISTS `h264_settings`;
CREATE TABLE `h264_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cabac` tinyint(1) DEFAULT '1',
  `adaptive_quantization` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'off',
  `slices` int(11) DEFAULT '1',
  `qp` int(11) DEFAULT NULL,
  `min_qp` int(11) DEFAULT NULL,
  `max_qp` int(11) DEFAULT NULL,
  `qp_step` int(11) DEFAULT NULL,
  `codec_profile` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `codec_level_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `rate_control_mode` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cq_quantizer` int(11) DEFAULT NULL,
  `gop_mode_id` int(11) DEFAULT '2',
  `interlace_mode_id` int(11) DEFAULT '1',
  `bitrate` int(11) DEFAULT '5000000',
  `max_bitrate` int(11) DEFAULT NULL,
  `transform_8x8` tinyint(1) DEFAULT '0',
  `intra_prediction_8x8` tinyint(1) DEFAULT '0',
  `framerate_numerator` int(11) DEFAULT NULL,
  `framerate_denominator` int(11) DEFAULT NULL,
  `gop_size` int(11) DEFAULT '80',
  `scd` tinyint(1) DEFAULT '1',
  `gop_num_b_frames` int(11) DEFAULT '2',
  `par_numerator` int(11) DEFAULT NULL,
  `par_denominator` int(11) DEFAULT NULL,
  `framerate_follow_source` tinyint(1) DEFAULT '1',
  `par_follow_source` tinyint(1) DEFAULT '1',
  `gop_closed_cadence` int(11) DEFAULT '1',
  `passes` int(11) DEFAULT '1',
  `buf_size` int(11) DEFAULT NULL,
  `buf_fill_pct` int(11) DEFAULT NULL,
  `interpolate_frc` tinyint(1) DEFAULT '0',
  `pulldown` tinyint(1) DEFAULT '0',
  `num_ref_frames` int(11) DEFAULT '1',
  `force_field_pictures` tinyint(1) DEFAULT '0',
  `look_ahead_rate_control` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'medium',
  `encoding_option` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `denoise_strength` int(11) DEFAULT NULL,
  `two_passes` bit(1) DEFAULT NULL,
  `device_id` int(11) DEFAULT NULL,
  `quality_level` int(11) DEFAULT NULL,
  `top_field_first` int(11) DEFAULT NULL,
  `fill_on_lost` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of h264_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `h265_settings`
-- ----------------------------
DROP TABLE IF EXISTS `h265_settings`;
CREATE TABLE `h265_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adaptive_quantization` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'off',
  `slices` int(11) DEFAULT '1',
  `qp` int(11) DEFAULT NULL,
  `min_qp` int(11) DEFAULT NULL,
  `max_qp` int(11) DEFAULT NULL,
  `qp_step` int(11) DEFAULT NULL,
  `codec_profile` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `codec_level_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `rate_control_mode` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cq_quantizer` int(11) DEFAULT NULL,
  `gop_mode_id` int(11) DEFAULT '2',
  `bitrate` int(11) DEFAULT '5000000',
  `max_bitrate` int(11) DEFAULT NULL,
  `framerate_numerator` int(11) DEFAULT NULL,
  `framerate_denominator` int(11) DEFAULT NULL,
  `gop_size` int(11) DEFAULT '80',
  `scd` tinyint(1) DEFAULT '1',
  `gop_num_b_frames` int(11) DEFAULT '2',
  `par_numerator` int(11) DEFAULT NULL,
  `par_denominator` int(11) DEFAULT NULL,
  `framerate_follow_source` tinyint(1) DEFAULT '1',
  `par_follow_source` tinyint(1) DEFAULT '1',
  `gop_closed_cadence` int(11) DEFAULT '1',
  `passes` int(11) DEFAULT '1',
  `buf_size` int(11) DEFAULT NULL,
  `buf_fill_pct` int(11) DEFAULT NULL,
  `interpolate_frc` tinyint(1) DEFAULT '0',
  `pulldown` tinyint(1) DEFAULT '0',
  `num_ref_frames` int(11) DEFAULT '1',
  `force_field_pictures` tinyint(1) DEFAULT '0',
  `look_ahead_rate_control` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'medium',
  `encoding_option` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `denoise_strength` int(11) DEFAULT NULL,
  `two_passes` bit(1) DEFAULT NULL,
  `max_cu` int(11) DEFAULT '4',
  `max_cu_depth` int(11) DEFAULT '2',
  `max_tu` int(11) DEFAULT '4',
  `min_tu` int(11) DEFAULT '4',
  `max_inter_tu_depth` int(11) DEFAULT '1',
  `max_intra_tu_depth` int(11) DEFAULT '1',
  `sao` int(11) DEFAULT '0',
  `amp` int(11) DEFAULT '0',
  `loop_filter` int(11) DEFAULT '0',
  `device_id` int(11) DEFAULT NULL,
  `quality_level` int(11) DEFAULT NULL,
  `fill_on_lost` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of h265_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `hls_settings`
-- ----------------------------
DROP TABLE IF EXISTS `hls_settings`;
CREATE TABLE `hls_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `progressive_downloading` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of hls_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `http_group_settings`
-- ----------------------------
DROP TABLE IF EXISTS `http_group_settings`;
CREATE TABLE `http_group_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `destination_id` int(11) DEFAULT NULL,
  `port` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `custom_uri` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `path_uri` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of http_group_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `image_editors`
-- ----------------------------
DROP TABLE IF EXISTS `image_editors`;
CREATE TABLE `image_editors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `denoise` int(11) DEFAULT '0',
  `deinterlace` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `delight` int(11) DEFAULT NULL,
  `deblock` tinyint(1) DEFAULT '0',
  `sharpen` int(11) DEFAULT NULL,
  `anti_alias` tinyint(1) DEFAULT '0',
  `brightness` int(11) DEFAULT NULL,
  `saturation` int(11) DEFAULT NULL,
  `contrast` int(11) DEFAULT NULL,
  `hue` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `insertable_id` int(11) DEFAULT NULL,
  `insertable_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `AntiShaking` int(11) DEFAULT '0',
  `anti_shaking` int(11) DEFAULT NULL,
  `deinterlaceAlg` int(11) DEFAULT NULL,
  `resizeAlg` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `image_editors_insertable_id_idx` (`insertable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of image_editors
-- ----------------------------
-- ----------------------------
-- Table structure for `image_grabbings`
-- ----------------------------
DROP TABLE IF EXISTS `image_grabbings`;

CREATE TABLE `image_grabbings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `target_path` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `target_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `target_ext` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `time_interval` int(11) DEFAULT NULL,
  `max_count` int(11) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `operate` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `insertable_id` int(11) DEFAULT NULL,
  `insertable_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of image_grabbings
-- ----------------------------


-- ----------------------------
-- Table structure for `image_inserters`
-- ----------------------------
DROP TABLE IF EXISTS `image_inserters`;
CREATE TABLE `image_inserters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enabled` tinyint(1) DEFAULT '0',
  `opacity` int(11) DEFAULT '50',
  `constrain_proportion` tinyint(1) DEFAULT '0',
  `image_x` int(11) DEFAULT NULL,
  `image_y` int(11) DEFAULT NULL,
  `image_width` int(11) DEFAULT NULL,
  `image_height` int(11) DEFAULT NULL,
  `image_inserter_input_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `enable_rest` tinyint(1) DEFAULT '0',
  `image_insertable_id` int(11) DEFAULT NULL,
  `image_insertable_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `image_inserters_on_image_insertable` (`image_insertable_id`,`image_insertable_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of image_inserters
-- ----------------------------

-- ----------------------------
-- Table structure for `input_clippings`
-- ----------------------------
DROP TABLE IF EXISTS `input_clippings`;
CREATE TABLE `input_clippings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `input_id` int(11) DEFAULT NULL,
  `start_timecode` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `end_timecode` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of input_clippings
-- ----------------------------

-- ----------------------------
-- Table structure for `inputs`
-- ----------------------------
DROP TABLE IF EXISTS `inputs`;
CREATE TABLE `inputs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `video_input_id` int(11) DEFAULT NULL,
  `video_input_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `audio_input_id` int(11) DEFAULT NULL,
  `audio_input_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `loop_flag` tinyint(1) DEFAULT '0',
  `failover_time` bigint(19) DEFAULT NULL,
  `program_id` int(11) DEFAULT NULL,
  `video_track_id` int(11) DEFAULT NULL,
  `audio_track_id` int(11) DEFAULT NULL,
  `subtitle_id` int(11) DEFAULT NULL,
  `base_object_id` int(11) DEFAULT NULL,
  `base_object_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `order_id` int(11) DEFAULT '1',
  `active` tinyint(1) DEFAULT '0',
  `deblock_enable` tinyint(1) DEFAULT '0',
  `deblock_strength` int(11) DEFAULT '5',
  `padding_image` varchar(1024) COLLATE utf8_unicode_ci DEFAULT '',
  `audio_delay` int(11) DEFAULT '0',
  `audio_track_ids` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `angle_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_inputs_on_base_object_id_and_base_object_type` (`base_object_id`,`base_object_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for `jobs`
-- ----------------------------
DROP TABLE IF EXISTS `jobs`;
CREATE TABLE `jobs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `destination_id` int(11) DEFAULT NULL,
  `priority` int(11) DEFAULT '50',
  `lock_version` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deadline` datetime DEFAULT NULL,
  `pending` tinyint(1) DEFAULT '1',
  `running` tinyint(1) DEFAULT '0',
  `suspended` tinyint(1) DEFAULT '0',
  `complete` tinyint(1) DEFAULT '0',
  `error` tinyint(1) DEFAULT '0',
  `node_id` int(11) DEFAULT NULL,
  `cancelled` tinyint(1) DEFAULT '0',
  `user_data` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `search_field` text COLLATE utf8_unicode_ci,
  `pre` tinyint(1) DEFAULT '0',
  `post` tinyint(1) DEFAULT '0',
  `archive` tinyint(1) DEFAULT '0',
  `avsync_enable` tinyint(1) DEFAULT '1',
  `completed_at` datetime DEFAULT NULL,
  `started_at` datetime DEFAULT NULL,
  `timecode_source` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'embedded',
  PRIMARY KEY (`id`),
  KEY `index_jobs_on_created_at` (`created_at`),
  KEY `index_jobs_on_archive_and_created_at` (`archive`,`created_at`),
  KEY `index_jobs_on_archive_and_pending_and_created_at` (`archive`,`pending`,`created_at`),
  KEY `index_jobs_on_archive_and_running_and_created_at` (`archive`,`running`,`created_at`),
  KEY `index_jobs_on_archive_and_complete_and_created_at` (`archive`,`complete`,`created_at`),
  KEY `index_jobs_on_archive_and_cancelled_and_created_at` (`archive`,`cancelled`,`created_at`),
  KEY `index_jobs_on_archive_and_error_and_created_at` (`archive`,`error`,`created_at`),
  KEY `index_jobs_on_archive_and_pre_and_created_at` (`archive`,`pre`,`created_at`),
  KEY `index_jobs_on_archive_and_post_and_created_at` (`archive`,`post`,`created_at`),
  KEY `index_jobs_on_archive_and_suspended_and_created_at` (`archive`,`suspended`,`created_at`),
  KEY `index_jobs_on_node_id_and_complete_and_updated_at` (`node_id`,`complete`,`updated_at`),
  KEY `index_jobs_on_running` (`running`),
  KEY `index_jobs_on_pending_and_suspended` (`pending`,`suspended`),
  KEY `index_jobs_on_completed_at` (`completed_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of jobs
-- ----------------------------

-- ----------------------------
-- Table structure for `live_events`
-- ----------------------------
DROP TABLE IF EXISTS `live_events`;
CREATE TABLE `live_events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `destination_id` int(11) DEFAULT NULL,
  `lock_version` int(11) DEFAULT NULL,
  `deadline` datetime DEFAULT NULL,
  `state` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pre` tinyint(1) DEFAULT '0',
  `post` tinyint(1) DEFAULT '0',
  `archive` tinyint(1) DEFAULT '0',
  `node_id` int(11) DEFAULT NULL,
  `user_data` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `search_field` text COLLATE utf8_unicode_ci,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  `name` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `encoding_option` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `priority` int(11) DEFAULT '5',
  `initial_audio_gain` int(11) DEFAULT '0',
  `avsync_enable` tinyint(1) DEFAULT '1',
  `input_buffer_size` int(11) DEFAULT '60',
  `buffer_avg` int(11) DEFAULT NULL,
  `buffer_max` int(11) DEFAULT NULL,
  `dropped_frames` int(11) DEFAULT NULL,
  `completed_at` datetime DEFAULT NULL,
  `started_at` datetime DEFAULT NULL,
  `transcoding_duration` int(11) DEFAULT NULL,
  `postprocessing_duration` int(11) DEFAULT NULL,
  `timecode_source` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'embedded',
  `audio_gain` int(11) DEFAULT NULL,
  `loop_all_inputs` tinyint(1) DEFAULT '0',
  `gop_timecode` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `frame` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `output_file_duration` bigint(20) DEFAULT NULL,
  `last_errorcode` int(11) DEFAULT NULL,
  `last_errordesc` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `run_seq` int(11) NOT NULL DEFAULT '0',
  `created_user` int(11) DEFAULT NULL,
  `gpu_id` int(11) DEFAULT NULL,
  `video_decoding` tinyint(1) DEFAULT NULL,
  `version` tinyint(4) DEFAULT '0',
  `tmpl_id` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `live_events_state_idx` (`state`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of live_events
-- ----------------------------

-- ----------------------------
-- Table structure for `live_outputs`
-- ----------------------------
DROP TABLE IF EXISTS `live_outputs`;
CREATE TABLE `live_outputs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `output_group_id` int(11) DEFAULT NULL,
  `stream_assembly_id` int(11) DEFAULT NULL,
  `output_settings_id` int(11) DEFAULT NULL,
  `output_settings_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `container_id` int(11) DEFAULT NULL,
  `name_modifier` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `extension` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `started_at` datetime DEFAULT NULL,
  `completed_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `errored_at` datetime DEFAULT NULL,
  `cancelled_at` datetime DEFAULT NULL,
  `scte35_passthrough` tinyint(1) DEFAULT '0',
  `container_settings_id` int(11) DEFAULT NULL,
  `container_settings_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `klv_passthrough` tinyint(1) DEFAULT '0',
  `ebif_passthrough` tinyint(1) DEFAULT '0',
  `status` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `start_paused` tinyint(1) DEFAULT '0',
  `full_uri` text COLLATE utf8_unicode_ci,
  `order_id` int(11) DEFAULT NULL,
  `log_edit_points` tinyint(1) DEFAULT '0',
  `insert_timed_metadata` tinyint(1) DEFAULT '0',
  `insert_private_metadata` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `index_live_outputs_on_completed_at` (`completed_at`),
  KEY `index_live_outputs_on_stream_assembly_id` (`stream_assembly_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of live_outputs
-- ----------------------------

-- ----------------------------
-- Table structure for `live_output_groups`
-- ----------------------------
DROP TABLE IF EXISTS `live_output_groups`;
CREATE TABLE `live_output_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `output_group_parent_id` int(11) DEFAULT NULL,
  `output_group_parent_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `container` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `settings_id` int(11) DEFAULT NULL,
  `settings_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `drmdescription_id` int(11) DEFAULT NULL,
  `container_setting_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `src_ip` varchar(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `src_port` int(11) DEFAULT '0',
  `smart_output` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `live_output_group_parent_id_idx` (`output_group_parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of live_output_groups
-- ----------------------------

-- ----------------------------
-- Table structure for `live_profiles`
-- ----------------------------
DROP TABLE IF EXISTS `live_profiles`;
CREATE TABLE `live_profiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `builtin` tinyint(1) DEFAULT '1',
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `encoding_option` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `priority` int(11) DEFAULT '5',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `initial_audio_gain` int(11) DEFAULT '0',
  `input_buffer_size` int(11) DEFAULT '60',
  `timecode_source` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'embedded',
  `loop_all_inputs` tinyint(1) DEFAULT '0',
  `gpu_id` int(11) DEFAULT NULL,
  `video_decoding` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_live_profiles_on_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of live_profiles
-- ----------------------------

-- ----------------------------
-- Table structure for `locations`
-- ----------------------------
DROP TABLE IF EXISTS `locations`;
CREATE TABLE `locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uri` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `use_source_basename` tinyint(1) DEFAULT NULL,
  `media_info` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of locations
-- ----------------------------

-- ----------------------------
-- Table structure for `logs`
-- ----------------------------
DROP TABLE IF EXISTS `logs`;
CREATE TABLE `logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `user` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(2048) COLLATE utf8_unicode_ci DEFAULT NULL,
  `attachment` longtext COLLATE utf8_unicode_ci,
  `notes` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of logs
-- ----------------------------

-- ----------------------------
-- Table structure for `m2ts_settings`
-- ----------------------------
DROP TABLE IF EXISTS `m2ts_settings`;
CREATE TABLE `m2ts_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bitrate` int(11) DEFAULT '0',
  `server_name` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `service_provider` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `service_id` int(11) DEFAULT '480',
  `pmt_pid` int(11) DEFAULT '480',
  `video_pid` int(11) DEFAULT '481',
  `audio_pid` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `program_num` int(11) DEFAULT NULL,
  `pcr_every_pes` tinyint(1) DEFAULT '1',
  `pcr_period` int(11) DEFAULT NULL,
  `pcr_pid` int(11) DEFAULT NULL,
  `transport_stream_id` int(11) DEFAULT NULL,
  `psi_repeat_rate` float DEFAULT '8',
  `scte35_pid` int(11) DEFAULT NULL,
  `vbr` tinyint(1) DEFAULT '0',
  `dvb` tinyint(1) DEFAULT '0',
  `null_packet_bitrate` float DEFAULT NULL,
  `audio_packets_per_pes` int(11) DEFAULT '2',
  `segmentation_time` float DEFAULT NULL,
  `segmentation_markers` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'none',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `timed_metadata_pid` int(11) DEFAULT NULL,
  `private_metadata_pid` int(11) DEFAULT NULL,
  `total_bitrate` int(11) DEFAULT '0',
  `insert_tot_tdt` int(11) DEFAULT '0',
  `period_tot_tdt` int(11) DEFAULT '0',
  `pat_period` int(11) DEFAULT NULL,
  `sdt_period` int(11) DEFAULT NULL,
  `original_network_id` int(11) DEFAULT NULL,
  `private_metadata_type` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of m2ts_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `m3u8_settings`
-- ----------------------------
DROP TABLE IF EXISTS `m3u8_settings`;
CREATE TABLE `m3u8_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pmt_pid` int(11) DEFAULT '480',
  `video_pid` int(11) DEFAULT '481',
  `audio_pid` int(11) DEFAULT '482',
  `program_num` int(11) DEFAULT NULL,
  `pcr_every_pes` tinyint(1) DEFAULT '1',
  `pcr_period` int(11) DEFAULT NULL,
  `pcr_pid` int(11) DEFAULT NULL,
  `transport_stream_id` int(11) DEFAULT NULL,
  `psi_repeat_rate` float DEFAULT '0',
  `scte35_pid` int(11) DEFAULT NULL,
  `audio_packets_per_pes` int(11) DEFAULT '16',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `timed_metadata_pid` int(11) DEFAULT NULL,
  `private_metadata_pid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of m3u8_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `margins`
-- ----------------------------
DROP TABLE IF EXISTS `margins`;
CREATE TABLE `margins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enabled` tinyint(1) DEFAULT '0',
  `left_top_x` int(11) DEFAULT NULL,
  `left_top_y` int(11) DEFAULT NULL,
  `left_bottom_x` int(11) DEFAULT NULL,
  `left_bottom_y` int(11) DEFAULT NULL,
  `right_top_x` int(11) DEFAULT NULL,
  `right_top_y` int(11) DEFAULT NULL,
  `right_bottom_x` int(11) DEFAULT NULL,
  `right_bottom_y` int(11) DEFAULT NULL,
  `color` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `parent_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of margins
-- ----------------------------

-- ----------------------------
-- Table structure for `media`
-- ----------------------------
DROP TABLE IF EXISTS `media`;
CREATE TABLE `media` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_modifier` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `output_subdirectory` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `extension` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `container_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `started_at` datetime DEFAULT NULL,
  `completed_at` datetime DEFAULT NULL,
  `preset_id` int(11) DEFAULT NULL,
  `media_polymorphic_id` int(11) DEFAULT NULL,
  `media_polymorphic_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `output_settings_id` int(11) DEFAULT NULL,
  `output_settings_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `output_group_id` int(11) DEFAULT NULL,
  `errored_at` datetime DEFAULT NULL,
  `cancelled_at` datetime DEFAULT NULL,
  `scte35_passthrough` tinyint(1) DEFAULT '0',
  `container_settings_id` int(11) DEFAULT NULL,
  `container_settings_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `video_description_id` int(11) DEFAULT NULL,
  `klv_passthrough` tinyint(1) DEFAULT '0',
  `ebif_passthrough` tinyint(1) DEFAULT '0',
  `full_uri` text COLLATE utf8_unicode_ci,
  `log_edit_points` tinyint(1) DEFAULT '0',
  `insert_timed_metadata` tinyint(1) DEFAULT '0',
  `insert_private_metadata` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `index_media_on_media_polymorphic_id_and_media_polymorphic_type` (`media_polymorphic_id`,`media_polymorphic_type`),
  KEY `index_media_on_completed_at` (`completed_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of media
-- ----------------------------

-- ----------------------------
-- Table structure for `messages`
-- ----------------------------
DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `code` int(11) DEFAULT NULL,
  `message` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `messageable_id` int(11) DEFAULT NULL,
  `messageable_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_messages_on_messageable_id_and_messageable_type` (`messageable_id`,`messageable_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of messages
-- ----------------------------

-- ----------------------------
-- Table structure for `mosaic_inserters`
-- ----------------------------
DROP TABLE IF EXISTS `mosaic_inserters`;
CREATE TABLE `mosaic_inserters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enabled` tinyint(1) DEFAULT '0',
  `image_x` int(11) DEFAULT NULL,
  `image_y` int(11) DEFAULT NULL,
  `image_width` int(11) DEFAULT NULL,
  `image_height` int(11) DEFAULT NULL,
  `grain` int(11) DEFAULT '50',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `image_insertable_id` int(11) DEFAULT NULL,
  `image_insertable_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `mosaic_type` int(11) DEFAULT '0',
  `start` varchar(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `end` varchar(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `active_time` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `mosaic_inserters_image_insertable_id_idx` (`image_insertable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of mosaic_inserters
-- ----------------------------

-- ----------------------------
-- Table structure for `motion_icons`
-- ----------------------------
DROP TABLE IF EXISTS `motion_icons`;

CREATE TABLE `motion_icons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner_id` int(11) NOT NULL DEFAULT '0',
  `owner_type` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pox_x` int(11) DEFAULT NULL,
  `pox_y` int(11) DEFAULT NULL,
  `opacity` tinyint(4) NOT NULL DEFAULT '100',
  `fps_numerator` int(11) NOT NULL DEFAULT '0',
  `fps_denominator` int(11) NOT NULL DEFAULT '1',
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `path` varchar(512) COLLATE utf8_unicode_ci DEFAULT NULL,
  `operate` int(11) DEFAULT NULL,
  `initial_active` int(11) DEFAULT NULL,
  `framerate` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `image_format` int(11) DEFAULT NULL,
  `pos_x` int(11) DEFAULT NULL,
  `pos_y` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of motion_icons
-- ----------------------------

-- ----------------------------
-- Table structure for `mount_point_configs`
-- ----------------------------
DROP TABLE IF EXISTS `mount_point_configs`;
CREATE TABLE `mount_point_configs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mount_folder` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `node_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of mount_point_configs
-- ----------------------------

-- ----------------------------
-- Table structure for `mov_settings`
-- ----------------------------
DROP TABLE IF EXISTS `mov_settings`;
CREATE TABLE `mov_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'self_contained',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of mov_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `mp2_settings`
-- ----------------------------
DROP TABLE IF EXISTS `mp2_settings`;
CREATE TABLE `mp2_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bitrate` int(11) DEFAULT '192000',
  `sample_rate` int(11) DEFAULT '48000',
  `channels` int(11) DEFAULT '2',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of mp2_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `mp4_settings`
-- ----------------------------
DROP TABLE IF EXISTS `mp4_settings`;
CREATE TABLE `mp4_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `progressive_downloading` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of mp4_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `mpa_settings`
-- ----------------------------
DROP TABLE IF EXISTS `mpa_settings`;
CREATE TABLE `mpa_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vbr_quality` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `rate_control_mode_id` int(11) DEFAULT '2',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `codec_profile` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bitrate` int(11) DEFAULT '64000',
  `sample_rate` int(11) DEFAULT '48000',
  `channels` int(11) DEFAULT '2',
  `boost_level` int(11) DEFAULT '0',
  `latm_loas` tinyint(1) DEFAULT '0',
  `mpeg2` tinyint(1) DEFAULT '0',
  `channel_processing` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `volume_mode` varchar(32) COLLATE utf8_unicode_ci DEFAULT '1',
  `balance_db` int(11) DEFAULT '-30',
  `balance_level` int(11) DEFAULT '0',
  `fill_on_lost` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of mpa_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `mpeg2_settings`
-- ----------------------------
DROP TABLE IF EXISTS `mpeg2_settings`;
CREATE TABLE `mpeg2_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `framerate_numerator` int(11) DEFAULT NULL,
  `framerate_denominator` int(11) DEFAULT NULL,
  `framerate_follow_source` tinyint(1) DEFAULT '1',
  `bitrate` int(11) DEFAULT '5000000',
  `max_bitrate` int(11) DEFAULT NULL,
  `buf_size` int(11) DEFAULT NULL,
  `buf_fill_pct` int(11) DEFAULT NULL,
  `gop_size` int(11) DEFAULT '12',
  `gop_num_b_frames` int(11) DEFAULT '2',
  `gop_closed_cadence` int(11) DEFAULT '1',
  `scd` tinyint(1) DEFAULT '1',
  `qp` int(11) DEFAULT NULL,
  `min_qp` int(11) DEFAULT NULL,
  `max_qp` int(11) DEFAULT NULL,
  `qp_step` int(11) DEFAULT NULL,
  `par_numerator` int(11) DEFAULT NULL,
  `par_denominator` int(11) DEFAULT NULL,
  `par_follow_source` tinyint(1) DEFAULT '1',
  `passes` int(11) DEFAULT '1',
  `interlace_mode_id` int(11) DEFAULT '1',
  `rate_control_mode` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gop_mode_id` int(11) DEFAULT '2',
  `codec_profile` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `codec_level_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `interpolate_frc` tinyint(1) DEFAULT '0',
  `pulldown` tinyint(1) DEFAULT '0',
  `adaptive_quantization` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'off',
  `d10_syntax` tinyint(1) DEFAULT '0',
  `look_ahead_rate_control` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'medium',
  `encoding_option` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `denoise_strength` int(11) DEFAULT NULL,
  `device_id` int(11) DEFAULT NULL,
  `quality_level` int(11) DEFAULT NULL,
  `top_field_first` int(11) DEFAULT NULL,
  `fill_on_lost` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of mpeg2_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `mpeg4_settings`
-- ----------------------------
DROP TABLE IF EXISTS `mpeg4_settings`;

CREATE TABLE `mpeg4_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `framerate_numerator` int(11) DEFAULT NULL,
  `framerate_denominator` int(11) DEFAULT NULL,
  `framerate_follow_source` tinyint(1) DEFAULT '1',
  `bitrate` int(11) DEFAULT '5000000',
  `max_bitrate` int(11) DEFAULT NULL,
  `buf_size` int(11) DEFAULT NULL,
  `buf_fill_pct` int(11) DEFAULT NULL,
  `gop_size` int(11) DEFAULT '12',
  `gop_num_b_frames` int(11) DEFAULT '2',
  `gop_closed_cadence` int(11) DEFAULT '1',
  `scd` tinyint(1) DEFAULT '1',
  `qp` int(11) DEFAULT NULL,
  `min_qp` int(11) DEFAULT NULL,
  `max_qp` int(11) DEFAULT NULL,
  `qp_step` int(11) DEFAULT NULL,
  `par_numerator` int(11) DEFAULT NULL,
  `par_denominator` int(11) DEFAULT NULL,
  `par_follow_source` tinyint(1) DEFAULT '1',
  `passes` int(11) DEFAULT '1',
  `interlace_mode_id` int(11) DEFAULT '1',
  `rate_control_mode` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gop_mode_id` int(11) DEFAULT '2',
  `codec_profile` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `codec_level_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `interpolate_frc` tinyint(1) DEFAULT '0',
  `pulldown` tinyint(1) DEFAULT '0',
  `adaptive_quantization` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'off',
  `d10_syntax` tinyint(1) DEFAULT '0',
  `look_ahead_rate_control` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'medium',
  `encoding_option` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `denoise_strength` int(11) DEFAULT NULL,
  `fill_on_lost` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of mpeg4_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `ms_smooth_group_settings`
-- ----------------------------
DROP TABLE IF EXISTS `ms_smooth_group_settings`;
CREATE TABLE `ms_smooth_group_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fragment_length` int(11) DEFAULT '3',
  `push_mode` tinyint(1) DEFAULT '1',
  `publish_point_id` int(11) DEFAULT NULL,
  `target_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `connection_retry_interval` int(11) DEFAULT '2',
  `num_retries` int(11) DEFAULT '10',
  `drm_system` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `encryption_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `iv_size` int(11) DEFAULT '128',
  `initial_iv` varchar(255) COLLATE utf8_unicode_ci DEFAULT '1',
  `key_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `key_seed` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content_key` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `license_url` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ui_license_url` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `custom_attributes` text COLLATE utf8_unicode_ci,
  `event_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `actual_event_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `timestamp_offset` date DEFAULT '2011-01-01',
  `use_event_id` tinyint(1) DEFAULT '1',
  `timestamp_delta_seconds` int(11) DEFAULT NULL,
  `timestamp_delta_milliseconds` int(11) DEFAULT NULL,
  `send_eos` tinyint(1) DEFAULT '1',
  `send_stream_manifest` tinyint(1) DEFAULT '1',
  `timestamp_offset_today` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of ms_smooth_group_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `mv_enlight`
-- ----------------------------
DROP TABLE IF EXISTS `mv_enlight`;
CREATE TABLE `mv_enlight` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `base_object_type` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `base_object_id` int(11) DEFAULT NULL,
  `total_duration` varchar(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `uri` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `program_id` int(11) DEFAULT '1',
  `video_track_id` int(11) DEFAULT '1',
  `audio_track_id` int(11) DEFAULT '1',
  `subtitle_id` int(11) DEFAULT '1',
  `padding` int(11) DEFAULT NULL,
  `logo_uri` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `logo_program_id` int(11) DEFAULT '1',
  `logo_video_track_id` int(11) DEFAULT '1',
  `logo_audio_track_id` int(11) DEFAULT '1',
  `logo_subtitle_id` int(11) DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `mv_enlight_base_object_id_idx` (`base_object_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of mv_enlight
-- ----------------------------

-- ----------------------------
-- Table structure for `mxf_settings`
-- ----------------------------
DROP TABLE IF EXISTS `mxf_settings`;
CREATE TABLE `mxf_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `operational_pattern` int(11) DEFAULT '0',
  `audio_track_follow_source` int(11) DEFAULT '0',
  `audio_channel_split` int(11) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `target_path` varchar(511) COLLATE utf8_unicode_ci DEFAULT NULL,
  `target_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `target_ext` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of mxf_settings
-- ----------------------------


-- ----------------------------
-- Table structure for `network_configs`
-- ----------------------------
DROP TABLE IF EXISTS `network_configs`;
CREATE TABLE `network_configs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `node_id` int(11) DEFAULT NULL,
  `hostname` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nameservers` text COLLATE utf8_unicode_ci,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `ntp_servers` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of network_configs
-- ----------------------------

-- ----------------------------
-- Table structure for `network_inputs`
-- ----------------------------
DROP TABLE IF EXISTS `network_inputs`;
CREATE TABLE `network_inputs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `protocol` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `uri` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `port` int(11) DEFAULT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `use_source_basename` tinyint(1) DEFAULT NULL,
  `media_info` text COLLATE utf8_unicode_ci,
  `udp_igmp_source` text COLLATE utf8_unicode_ci,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `sdp` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `src_ip` varchar(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `src_port` int(11) DEFAULT '0',
  `video_rtp_uri` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `audio_rtp_uri` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `video_rtcp_uri` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `audio_rtcp_uri` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `switch_mode` int(11) DEFAULT NULL,
  `allow_program_id_change` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of network_inputs
-- ----------------------------

-- ----------------------------
-- Table structure for `nodes`
-- ----------------------------
DROP TABLE IF EXISTS `nodes`;
CREATE TABLE `nodes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hostname` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ip_addr` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `management` tinyint(1) DEFAULT '0',
  `active` tinyint(1) DEFAULT '0',
  `cluster_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `eth0_mac` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `management_node_id` int(11) DEFAULT NULL,
  `gpus` int(11) DEFAULT NULL,
  `runner_uri` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `timezone` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'Pacific Time (US & Canada)',
  `out_of_disk_space` tinyint(1) DEFAULT '0',
  `eth_devices` int(11) DEFAULT '2',
  `version` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `variant_str` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `acknowledged` tinyint(1) DEFAULT '0',
  `standalone` tinyint(1) DEFAULT '0',
  `waiting` tinyint(1) DEFAULT '0',
  `failed` tinyint(1) DEFAULT '0',
  `configuring` tinyint(1) DEFAULT '0',
  `conductor` tinyint(1) DEFAULT '0',
  `port` int(11) DEFAULT '80',
  `headless` tinyint(1) DEFAULT '0',
  `shutdown` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of nodes
-- ----------------------------

-- ----------------------------
-- Table structure for `noise_reducers`
-- ----------------------------
DROP TABLE IF EXISTS `noise_reducers`;
CREATE TABLE `noise_reducers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `strength` int(11) DEFAULT '1',
  `filter` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'Bilateral',
  `video_description_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of noise_reducers
-- ----------------------------

-- ----------------------------
-- Table structure for `notifications`
-- ----------------------------
DROP TABLE IF EXISTS `notifications`;
CREATE TABLE `notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `web_callback_url` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `event` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `notifiable_id` int(11) DEFAULT NULL,
  `notifiable_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_notifications_on_notifiable_id_and_notifiable_type` (`notifiable_id`,`notifiable_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of notifications
-- ----------------------------

-- ----------------------------
-- Table structure for `oss_inputs`
-- ----------------------------
DROP TABLE IF EXISTS `oss_inputs`;

CREATE TABLE `oss_inputs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `_key` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `media_info` text COLLATE utf8_unicode_ci,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- ----------------------------
-- Table structure for `output_groups`
-- ----------------------------
DROP TABLE IF EXISTS `output_groups`;
CREATE TABLE `output_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `settings_id` int(11) DEFAULT NULL,
  `settings_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of output_groups
-- ----------------------------

-- ----------------------------
-- Table structure for `output_locks`
-- ----------------------------
DROP TABLE IF EXISTS `output_locks`;
CREATE TABLE `output_locks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `output_lockable_id` int(11) DEFAULT NULL,
  `output_lockable_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `live_event_url` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of output_locks
-- ----------------------------

-- ----------------------------
-- Table structure for `output_stats`
-- ----------------------------
DROP TABLE IF EXISTS `output_stats`;
CREATE TABLE `output_stats` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `output_id` int(11) DEFAULT NULL,
  `output_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pct` int(11) DEFAULT NULL,
  `elapsed` int(11) DEFAULT NULL,
  `remaining` int(11) DEFAULT NULL,
  `fps` float DEFAULT NULL,
  `psnr` float DEFAULT NULL,
  `pct_rt` int(11) DEFAULT NULL,
  `audio_level` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_output_stats_on_output_id_and_output_type_and_updated_at` (`output_id`,`output_type`,`updated_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of output_stats
-- ----------------------------

-- ----------------------------
-- Table structure for `pass_through_settings`
-- ----------------------------
DROP TABLE IF EXISTS `pass_through_settings`;
CREATE TABLE `pass_through_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of pass_through_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `pcm_settings`
-- ----------------------------
DROP TABLE IF EXISTS `pcm_settings`;
CREATE TABLE `pcm_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vbr_quality` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `rate_control_mode_id` int(11) DEFAULT '2',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `codec_profile` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bitrate` int(11) DEFAULT '64000',
  `sample_rate` int(11) DEFAULT '48000',
  `channels` int(11) DEFAULT '2',
  `boost_level` int(11) DEFAULT '0',
  `latm_loas` tinyint(1) DEFAULT '0',
  `mpeg2` tinyint(1) DEFAULT '0',
  `channel_processing` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bits_per_sample` int(11) DEFAULT NULL,
  `volume_mode` varchar(32) COLLATE utf8_unicode_ci DEFAULT '1',
  `balance_db` int(11) DEFAULT '-30',
  `balance_level` int(11) DEFAULT '0',
  `fill_on_lost` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of pcm_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `pip_inserters`
-- ----------------------------
DROP TABLE IF EXISTS `pip_inserters`;

CREATE TABLE `pip_inserters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uri` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `program_id` int(11) DEFAULT NULL,
  `video_track_id` int(11) DEFAULT NULL,
  `audio_track_id` int(11) DEFAULT NULL,
  `subtitle_id` int(11) DEFAULT NULL,
  `pos_x` int(11) DEFAULT NULL,
  `pos_y` int(11) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `alpha` int(11) DEFAULT '50',
  `insert_time` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pip_insertable_id` int(11) DEFAULT NULL,
  `pip_insertable_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pip_inserters_on_pip_insertable` (`pip_insertable_id`,`pip_insertable_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of pip_inserters
-- ----------------------------


-- ----------------------------
-- Table structure for `post_processes`
-- ----------------------------
DROP TABLE IF EXISTS `post_processes`;
CREATE TABLE `post_processes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `delete_source` tinyint(1) DEFAULT '0',
  `processed_id` int(11) DEFAULT NULL,
  `post_processable_id` int(11) DEFAULT NULL,
  `post_processable_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `script_id` int(11) DEFAULT NULL,
  `uri` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `post_processable` (`post_processable_id`,`post_processable_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of post_processes
-- ----------------------------

-- ----------------------------
-- Table structure for `presets`
-- ----------------------------
DROP TABLE IF EXISTS `presets`;
CREATE TABLE `presets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `editable` tinyint(1) DEFAULT '1',
  `container_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `preset_category_id` int(11) DEFAULT NULL,
  `scte35_passthrough` tinyint(1) DEFAULT '0',
  `container_settings_id` int(11) DEFAULT NULL,
  `container_settings_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `video_description_id` int(11) DEFAULT NULL,
  `klv_passthrough` tinyint(1) DEFAULT '0',
  `ebif_passthrough` tinyint(1) DEFAULT '0',
  `log_edit_points` tinyint(1) DEFAULT '0',
  `insert_timed_metadata` tinyint(1) DEFAULT '0',
  `insert_private_metadata` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of presets
-- ----------------------------

-- ----------------------------
-- Table structure for `preset_categories`
-- ----------------------------
DROP TABLE IF EXISTS `preset_categories`;
CREATE TABLE `preset_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of preset_categories
-- ----------------------------
INSERT INTO `preset_categories` VALUES ('8', 'stream', '2013-10-15 14:03:57', null);

-- ----------------------------
-- Table structure for `pre_processes`
-- ----------------------------
DROP TABLE IF EXISTS `pre_processes`;
CREATE TABLE `pre_processes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `copy_local` tinyint(1) DEFAULT '0',
  `script_id` int(11) DEFAULT NULL,
  `pre_processable_id` int(11) DEFAULT NULL,
  `pre_processable_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pre_processes_idx` (`pre_processable_id`,`pre_processable_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of pre_processes
-- ----------------------------

-- ----------------------------
-- Table structure for `prioritization_schemes`
-- ----------------------------
DROP TABLE IF EXISTS `prioritization_schemes`;
CREATE TABLE `prioritization_schemes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of prioritization_schemes
-- ----------------------------


-- ----------------------------
-- Table structure for `profile_disk_file`
-- ----------------------------
DROP TABLE IF EXISTS `profile_disk_file`;

CREATE TABLE `profile_disk_file` (
  `disk_path` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `task_tmpl_id` int(11) NOT NULL DEFAULT '0',
  `last_modified` datetime NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `notes` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`disk_path`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- ----------------------------
-- Table structure for `profiles`
-- ----------------------------
DROP TABLE IF EXISTS `profiles`;
CREATE TABLE `profiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `priority` int(11) DEFAULT '50',
  `destination_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `timecode_source` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'embedded',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of profiles
-- ----------------------------

-- ----------------------------
-- Table structure for `prores_settings`
-- ----------------------------
DROP TABLE IF EXISTS `prores_settings`;
CREATE TABLE `prores_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `framerate_numerator` int(11) DEFAULT NULL,
  `framerate_denominator` int(11) DEFAULT NULL,
  `framerate_follow_source` tinyint(1) DEFAULT '1',
  `interpolate_frc` tinyint(1) DEFAULT '0',
  `par_numerator` int(11) DEFAULT NULL,
  `par_denominator` int(11) DEFAULT NULL,
  `par_follow_source` tinyint(1) DEFAULT '1',
  `interlace_mode_id` int(11) DEFAULT '1',
  `codec_profile` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `bitrate` int(11) DEFAULT '0',
  `top_field_first` int(11) DEFAULT NULL,
  `rate_control_mode` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fill_on_lost` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of prores_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `rectangles`
-- ----------------------------
DROP TABLE IF EXISTS `rectangles`;
CREATE TABLE `rectangles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enabled` tinyint(1) DEFAULT '0',
  `x` int(11) DEFAULT NULL,
  `y` int(11) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `parent_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `rectangles_parent_id_idx` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of rectangles
-- ----------------------------

-- ----------------------------
-- Table structure for `remix_settings`
-- ----------------------------
DROP TABLE IF EXISTS `remix_settings`;
CREATE TABLE `remix_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_preset` tinyint(1) DEFAULT '0',
  `preset_id` int(11) DEFAULT NULL,
  `channels_in` int(11) DEFAULT '16',
  `channels_out` int(11) DEFAULT '2',
  `channel_mapping` text COLLATE utf8_unicode_ci,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_remix_settings_on_is_preset` (`is_preset`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of remix_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `resolution_filters`
-- ----------------------------
DROP TABLE IF EXISTS `resolution_filters`;
CREATE TABLE `resolution_filters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT '0',
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `rf_parent_id_idx` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of resolution_filters
-- ----------------------------

-- ----------------------------
-- Table structure for `roles`
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `editable` tinyint(1) DEFAULT '1',
  `admin` tinyint(1) DEFAULT '0',
  `can_create_jobs` tinyint(1) DEFAULT '0',
  `can_update_jobs` tinyint(1) DEFAULT '0',
  `can_archive` tinyint(1) DEFAULT '0',
  `can_set_priority` tinyint(1) DEFAULT '0',
  `can_resubmit` tinyint(1) DEFAULT '0',
  `can_start` tinyint(1) DEFAULT '0',
  `can_stop` tinyint(1) DEFAULT '0',
  `can_cancel` tinyint(1) DEFAULT '0',
  `can_reset` tinyint(1) DEFAULT '0',
  `can_control_output_groups` tinyint(1) DEFAULT '0',
  `can_control_outputs` tinyint(1) DEFAULT '0',
  `can_control_audio` tinyint(1) DEFAULT '0',
  `can_stream_metadata` tinyint(1) DEFAULT '0',
  `can_create_presets` tinyint(1) DEFAULT '0',
  `can_update_presets` tinyint(1) DEFAULT '0',
  `can_delete_presets` tinyint(1) DEFAULT '0',
  `can_manage_preset_categories` tinyint(1) DEFAULT '0',
  `can_manage_audio_presets` tinyint(1) DEFAULT '0',
  `can_create_profiles` tinyint(1) DEFAULT '0',
  `can_update_profiles` tinyint(1) DEFAULT '0',
  `can_delete_profiles` tinyint(1) DEFAULT '0',
  `can_manage_schedules` tinyint(1) DEFAULT '0',
  `can_create_watchfolders` tinyint(1) DEFAULT '0',
  `can_update_watchfolders` tinyint(1) DEFAULT '0',
  `can_delete_watchfolders` tinyint(1) DEFAULT '0',
  `can_activate_watchfolders` tinyint(1) DEFAULT '0',
  `can_manage_settings` tinyint(1) DEFAULT '0',
  `can_manage_alerts` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `can_manage_clustered_nodes` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of roles
-- ----------------------------

-- ----------------------------
-- Table structure for `matrix`
-- ----------------------------

DROP TABLE IF EXISTS `matrix`;
CREATE TABLE `matrix` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `remarks` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `group_id` int(11) NOT NULL,
  `port` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_MS_idx` (`group_id`),
  CONSTRAINT `FK_MS` FOREIGN KEY (`group_id`) REFERENCES `tbl_server_groups` (`group_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- ----------------------------
-- Table structure for `matrix_setting`
-- ----------------------------

DROP TABLE IF EXISTS `matrix_setting`;
CREATE TABLE `matrix_setting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `matrix_id` int(11) NOT NULL,
  `server_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `sdi_port` int(11) DEFAULT NULL,
  `matrix_out` int(11) DEFAULT NULL,
  `matrix_master_in` int(11) DEFAULT NULL,
  `matrix_slave_in` int(11) DEFAULT NULL,
  `remarks` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_MMS_idx` (`matrix_id`),
  KEY `FK_SMS_idx` (`server_id`),
  CONSTRAINT `FK_MMS` FOREIGN KEY (`matrix_id`) REFERENCES `matrix` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_SMS` FOREIGN KEY (`server_id`) REFERENCES `tbl_servers` (`server_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



-- ----------------------------
-- Table structure for `route_configs`
-- ----------------------------
DROP TABLE IF EXISTS `route_configs`;
CREATE TABLE `route_configs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `eth_config_id` int(11) DEFAULT NULL,
  `network` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `netmask` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gateway` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of route_configs
-- ----------------------------

-- ----------------------------
-- Table structure for `rtmp_group_settings`
-- ----------------------------
DROP TABLE IF EXISTS `rtmp_group_settings`;
CREATE TABLE `rtmp_group_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `destination_id` int(11) DEFAULT NULL,
  `cdn` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of rtmp_group_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `rtmp_settings`
-- ----------------------------
DROP TABLE IF EXISTS `rtmp_settings`;
CREATE TABLE `rtmp_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rtmp_endpoint_id` int(11) DEFAULT NULL,
  `connection_retry_interval` int(11) DEFAULT '2',
  `stream_name` text COLLATE utf8_unicode_ci,
  `num_retries` int(11) DEFAULT '10',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of rtmp_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `rtp_group_settings`
-- ----------------------------
DROP TABLE IF EXISTS `rtp_group_settings`;
CREATE TABLE `rtp_group_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `destination_id` int(11) DEFAULT NULL,
  `ttl` int(11) DEFAULT NULL,
  `buffer_size` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'Auto',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of rtp_group_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `rtpoveres_settings`
-- ----------------------------
DROP TABLE IF EXISTS `rtpoveres_settings`;
CREATE TABLE `rtpoveres_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `video_port` int(11) DEFAULT NULL,
  `audio_port` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `target_path` varchar(1024) COLLATE utf8_unicode_ci DEFAULT '',
  `target_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT '',
  `extension` varchar(11) COLLATE utf8_unicode_ci DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of rtpoveres_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `rtpoverts_settings`
-- ----------------------------
DROP TABLE IF EXISTS `rtpoverts_settings`;
CREATE TABLE `rtpoverts_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `port` int(11) DEFAULT NULL,
  `ttl` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of rtpoverts_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `scheduled_tasks`
-- ----------------------------
DROP TABLE IF EXISTS `scheduled_tasks`;
CREATE TABLE `scheduled_tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `taskable_id` int(11) DEFAULT NULL,
  `taskable_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `start` datetime DEFAULT NULL,
  `interval` int(11) DEFAULT NULL,
  `remaining` int(11) DEFAULT NULL,
  `last_run` datetime DEFAULT NULL,
  `arguments` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of scheduled_tasks
-- ----------------------------

-- ----------------------------
-- Table structure for `schedules`
-- ----------------------------
DROP TABLE IF EXISTS `schedules`;
CREATE TABLE `schedules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `profile_id` int(11) DEFAULT NULL,
  `encoding_option` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `priority` int(11) DEFAULT '5',
  `until` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'forever',
  `end_date` datetime DEFAULT NULL,
  `schedule_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'daily',
  `daily_x` int(11) DEFAULT '1',
  `weekly_x` int(11) DEFAULT '1',
  `weekly_sunday` tinyint(1) DEFAULT '0',
  `weekly_monday` tinyint(1) DEFAULT '0',
  `weekly_tuesday` tinyint(1) DEFAULT '0',
  `weekly_wednesday` tinyint(1) DEFAULT '0',
  `weekly_thursday` tinyint(1) DEFAULT '0',
  `weekly_friday` tinyint(1) DEFAULT '0',
  `weekly_saturday` tinyint(1) DEFAULT '0',
  `monthly_x` int(11) DEFAULT '1',
  `monthly_by` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'day',
  `monthly_day_of_month` int(11) DEFAULT NULL,
  `monthly_week_of_month` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `monthly_day_of_week` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `start_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'start_time',
  `start_time` datetime DEFAULT NULL,
  `end_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'end_time',
  `end_time` datetime DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `node_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gpu_id` int(11) DEFAULT NULL,
  `video_decoding` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of schedules
-- ----------------------------

-- ----------------------------
-- Table structure for `schema_migrations`
-- ----------------------------
DROP TABLE IF EXISTS `schema_migrations`;
CREATE TABLE `schema_migrations` (
  `version` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  UNIQUE KEY `unique_schema_migrations` (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of schema_migrations
-- ----------------------------
INSERT INTO `schema_migrations` VALUES ('1');

-- ----------------------------
-- Table structure for `secure_media_settings`
-- ----------------------------
DROP TABLE IF EXISTS `secure_media_settings`;
CREATE TABLE `secure_media_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `resourceid` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `secure_media_server_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of secure_media_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `sequencer_configs`
-- ----------------------------
DROP TABLE IF EXISTS `sequencer_configs`;
CREATE TABLE `sequencer_configs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `node_id` int(11) DEFAULT NULL,
  `pct_rt_threshold` int(11) DEFAULT '100',
  `kclks_per_gwu` int(11) DEFAULT '86760',
  `use_cpu_size` int(11) DEFAULT '307200',
  `use_cpu_rate` int(11) DEFAULT '800000',
  `use_cpu_threads` int(11) DEFAULT '20',
  `use_cpu_saturated` tinyint(1) DEFAULT '0',
  `disable_deblocking_filter` tinyint(1) DEFAULT '0',
  `job_poll_rate` int(11) DEFAULT '1',
  `watchfolder_poll_rate` int(11) DEFAULT '10',
  `stalejob_poll_rate` int(11) DEFAULT '5',
  `jobcancelled_poll_rate` int(11) DEFAULT '1',
  `throttle_poll_rate` int(11) DEFAULT '5',
  `max_jobs` int(11) DEFAULT '15',
  `copy_local_dir` varchar(255) COLLATE utf8_unicode_ci DEFAULT '/data/local_sources/',
  `first_msg_timeout` int(11) DEFAULT '60',
  `exclude_gpu_0` tinyint(1) DEFAULT '0',
  `exclude_gpu_1` tinyint(1) DEFAULT '0',
  `exclude_gpu_2` tinyint(1) DEFAULT '0',
  `exclude_gpu_3` tinyint(1) DEFAULT '0',
  `stalejob_age` int(11) DEFAULT '240',
  `is_updated` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of sequencer_configs
-- ----------------------------

-- ----------------------------
-- Table structure for `sessions`
-- ----------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `session_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `data` text COLLATE utf8_unicode_ci,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_sessions_on_session_id` (`session_id`),
  KEY `index_sessions_on_updated_at` (`updated_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of sessions
-- ----------------------------

-- ----------------------------
-- Table structure for `snmp_configs`
-- ----------------------------
DROP TABLE IF EXISTS `snmp_configs`;
CREATE TABLE `snmp_configs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cluster_id` int(11) DEFAULT NULL,
  `snmp_access` tinyint(1) DEFAULT '1',
  `snmp_trap_alerts` tinyint(1) DEFAULT '0',
  `snmp_trap_host` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `snmp_trap_port` int(11) DEFAULT '162',
  `snmp_trap_community` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of snmp_configs
-- ----------------------------

-- ----------------------------
-- Table structure for `source_signal_items`
-- ----------------------------
DROP TABLE IF EXISTS `source_signal_items`;
CREATE TABLE `source_signal_items` (
  `type` int(11) NOT NULL,
  `switch_timeout` int(11) DEFAULT NULL,
  `warning_period` int(11) DEFAULT NULL,
  `check_enabled` tinyint(1) DEFAULT NULL,
  `check_param` int(11) DEFAULT NULL,
  `warning_check` tinyint(1) DEFAULT NULL,
  `warning_timeout` int(11) DEFAULT NULL,
  `warning_param` int(11) DEFAULT NULL,
  PRIMARY KEY (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of source_signal_items
-- ----------------------------

-- ----------------------------
-- Table structure for `stat_monitors`
-- ----------------------------
DROP TABLE IF EXISTS `stat_monitors`;
CREATE TABLE `stat_monitors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `interval` int(11) DEFAULT '5',
  `rollup_function` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'AVERAGE',
  `host` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'localhost',
  `monitorable_id` int(11) DEFAULT NULL,
  `monitorable_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `units` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of stat_monitors
-- ----------------------------

-- ----------------------------
-- Table structure for `stat_monitor_items`
-- ----------------------------
DROP TABLE IF EXISTS `stat_monitor_items`;
CREATE TABLE `stat_monitor_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `data_source_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'DERIVE',
  `min` int(11) DEFAULT NULL,
  `max` int(11) DEFAULT NULL,
  `poller_key` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `stat_monitor_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of stat_monitor_items
-- ----------------------------

-- ----------------------------
-- Table structure for `stream_assemblies`
-- ----------------------------
DROP TABLE IF EXISTS `stream_assemblies`;
CREATE TABLE `stream_assemblies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `base_object_id` int(11) DEFAULT NULL,
  `base_object_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `preset_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `video_description_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_stream_assemblies_on_base_object_id_and_base_object_type` (`base_object_id`,`base_object_type`),
  KEY `stream_assemblies_base_object_id_idx` (`base_object_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of stream_assemblies
-- ----------------------------

-- ----------------------------
-- Table structure for `stream_stats`
-- ----------------------------
DROP TABLE IF EXISTS `stream_stats`;
CREATE TABLE `stream_stats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `base_object_id` int(11) DEFAULT NULL,
  `base_object_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `node_id` int(11) DEFAULT NULL,
  `inputs` int(11) DEFAULT NULL,
  `outputs` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of stream_stats
-- ----------------------------

-- ----------------------------
-- Table structure for `subtitle_inserters`
-- ----------------------------
DROP TABLE IF EXISTS `subtitle_inserters`;
CREATE TABLE `subtitle_inserters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enabled` tinyint(1) DEFAULT '0',
  `font` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `opacity` int(11) DEFAULT '50',
  `color` varchar(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sync` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `input_id` int(11) DEFAULT NULL,
  `insertable_id` int(11) DEFAULT NULL,
  `insertable_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `virtical_position` int(11) DEFAULT '90',
  `english_font` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `english_size` int(11) DEFAULT NULL,
  `pos_x` int(11) DEFAULT NULL,
  `pos_y` int(11) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `position_type` int(11) DEFAULT NULL,
  `font_info_type` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `subtitle_inserters_input_id_idx` (`input_id`),
  KEY `subtitle_inserters_insertable_id_idx` (`insertable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of subtitle_inserters
-- ----------------------------


-- ----------------------------
-- Table structure for `task_common_setting_param`
-- ----------------------------
DROP TABLE IF EXISTS `task_common_setting_param`;

CREATE TABLE `task_common_setting_param` (
  `param_owner` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `param` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `val` varchar(5000) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`param_owner`,`param`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- ----------------------------
-- Table structure for `task_group`
-- ----------------------------
DROP TABLE IF EXISTS `task_group`;

CREATE TABLE `task_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `seq` int(11) DEFAULT '0',
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- ----------------------------
-- Table structure for `task_group_rel`
-- ----------------------------
DROP TABLE IF EXISTS `task_group_rel`;

CREATE TABLE `task_group_rel` (
  `task_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`task_id`,`group_id`),
  KEY `task_group_rel_ibfk_2` (`group_id`),
  CONSTRAINT `task_group_rel_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `live_events` (`id`) ON DELETE CASCADE,
  CONSTRAINT `task_group_rel_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `task_group` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- ----------------------------
-- Table structure for `task_stat`
-- ----------------------------

DROP TABLE IF EXISTS `task_stat`;
CREATE TABLE `task_stat` (
  `id` bigint(20) NOT NULL DEFAULT '0',
  `task_id` int(11) DEFAULT NULL,
  `action_type` tinyint(4) DEFAULT NULL,
  `waitingAt` datetime DEFAULT NULL,
  `startedAt` datetime DEFAULT NULL,
  `completedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of task_stat
-- ----------------------------

-- ----------------------------
-- Table structure for `task_tmpl`
-- ----------------------------
DROP TABLE IF EXISTS `task_tmpl`;

CREATE TABLE `task_tmpl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ref_count` int(11) NOT NULL DEFAULT '0',
  `last_modified` datetime NOT NULL,
  `content_fmt` tinyint(4) NOT NULL DEFAULT '0',
  `content` blob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- ----------------------------
-- Table structure for `task_var_value`
-- ----------------------------
DROP TABLE IF EXISTS `task_var_value`;

CREATE TABLE `task_var_value` (
  `task_id` int(11) NOT NULL,
  `var_index` smallint(6) NOT NULL,
  `var_type` tinyint(4) NOT NULL DEFAULT '0',
  `val_type` tinyint(4) NOT NULL DEFAULT '0',
  `var` varchar(512) COLLATE utf8_unicode_ci NOT NULL,
  `val` varchar(5000) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`task_id`,`var_index`),
  CONSTRAINT `task_var_value_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `live_events` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- ----------------------------
-- Table structure for `teletext_source_settings`
-- ----------------------------
DROP TABLE IF EXISTS `teletext_source_settings`;
CREATE TABLE `teletext_source_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `destination_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'Teletext',
  `page_number` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of teletext_source_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `threegp_settings`
-- ----------------------------
DROP TABLE IF EXISTS `threegp_settings`;
CREATE TABLE `threegp_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of threegp_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `tianyudrm_settings`
-- ----------------------------
DROP TABLE IF EXISTS `tianyudrm_settings`;
CREATE TABLE `tianyudrm_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `server_ip` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `server_port` int(11) DEFAULT '1000',
  `content_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of tianyudrm_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `timeslice`
-- ----------------------------
DROP TABLE IF EXISTS `timeslice`;
CREATE TABLE `timeslice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `end` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `timeslice_clipping_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `timeslice_clipping_id_idx` (`timeslice_clipping_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of timeslice
-- ----------------------------

-- ----------------------------
-- Table structure for `timeslice_clipping`
-- ----------------------------
DROP TABLE IF EXISTS `timeslice_clipping`;
CREATE TABLE `timeslice_clipping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `enabled` tinyint(1) DEFAULT '0',
  `trimmed` tinyint(1) DEFAULT '0',
  `parent_id` int(11) DEFAULT NULL,
  `parent_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `timeslice_clipping_parent_id_idx` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of timeslice_clipping
-- ----------------------------

-- ----------------------------
-- Table structure for `timings`
-- ----------------------------
DROP TABLE IF EXISTS `timings`;
CREATE TABLE `timings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `live_event_id` int(11) DEFAULT NULL,
  `start_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'start_at',
  `start_at` datetime DEFAULT NULL,
  `start_timecode` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `end_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'end_at',
  `end_at` datetime DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `end_timecode` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `ignore` tinyint(1) DEFAULT '0',
  `start_at_buffer` int(11) DEFAULT '0',
  `schedule_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_timings_on_start_at` (`start_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of timings
-- ----------------------------

-- ----------------------------
-- Table structure for `ts_settings`
-- ----------------------------
DROP TABLE IF EXISTS `ts_settings`;
CREATE TABLE `ts_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bitrate` int(11) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `pmt_pid` int(11) DEFAULT '480',
  `video_pid` int(11) DEFAULT '481',
  `audio_pid` int(11) DEFAULT '482',
  `program_num` int(11) DEFAULT NULL,
  `pcr_every_pes` tinyint(1) DEFAULT '1',
  `pcr_period` int(11) DEFAULT NULL,
  `pcr_pid` int(11) DEFAULT NULL,
  `transport_stream_id` int(11) DEFAULT NULL,
  `pat_repeat_rate` float DEFAULT '8',
  `pmt_repeat_rate` float DEFAULT '8',
  `scte35_pid` int(11) DEFAULT NULL,
  `vbr` tinyint(1) DEFAULT '0',
  `dvb` tinyint(1) DEFAULT '0',
  `null_packet_bitrate` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of ts_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `udp_group_settings`
-- ----------------------------
DROP TABLE IF EXISTS `udp_group_settings`;
CREATE TABLE `udp_group_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `destination_id` int(11) DEFAULT NULL,
  `buffer_size` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'Auto',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `ttl` int(11) DEFAULT '0',
  `igmp_source_ip` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of udp_group_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `udp_settings`
-- ----------------------------
DROP TABLE IF EXISTS `udp_settings`;
CREATE TABLE `udp_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `destination_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `buffer_size` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'Auto',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of udp_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `uncompressed_settings`
-- ----------------------------
DROP TABLE IF EXISTS `uncompressed_settings`;
CREATE TABLE `uncompressed_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `framerate_numerator` int(11) DEFAULT NULL,
  `framerate_denominator` int(11) DEFAULT NULL,
  `framerate_follow_source` tinyint(1) DEFAULT '1',
  `interpolate_frc` tinyint(1) DEFAULT '0',
  `fourcc` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'I420',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of uncompressed_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  `password_hash` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password_salt` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password_created_at` datetime DEFAULT NULL,
  `persistence_token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `perishable_token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `single_access_token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `login_count` int(11) NOT NULL DEFAULT '0',
  `last_request_at` datetime DEFAULT NULL,
  `last_login_at` datetime DEFAULT NULL,
  `current_login_at` datetime DEFAULT NULL,
  `last_login_ip` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `current_login_ip` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `failed_login_count` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_users_on_login` (`login`),
  KEY `index_users_on_email` (`email`),
  KEY `index_users_on_persistence_token` (`persistence_token`),
  KEY `index_users_on_single_access_token` (`single_access_token`),
  KEY `index_users_on_last_request_at` (`last_request_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of users
-- ----------------------------

-- ----------------------------
-- Table structure for `user_sessions`
-- ----------------------------
DROP TABLE IF EXISTS `user_sessions`;
CREATE TABLE `user_sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `session_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `data` text COLLATE utf8_unicode_ci,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_user_sessions_on_session_id` (`session_id`),
  KEY `index_user_sessions_on_updated_at` (`updated_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of user_sessions
-- ----------------------------

-- ----------------------------
-- Table structure for `uvu_settings`
-- ----------------------------
DROP TABLE IF EXISTS `uvu_settings`;
CREATE TABLE `uvu_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `metadata` text COLLATE utf8_unicode_ci,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of uvu_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `verimatrix_settings`
-- ----------------------------
DROP TABLE IF EXISTS `verimatrix_settings`;
CREATE TABLE `verimatrix_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `resourceid` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `verimatrix_server_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of verimatrix_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `video_descriptions`
-- ----------------------------
DROP TABLE IF EXISTS `video_descriptions`;
CREATE TABLE `video_descriptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `video_codec_id` int(11) DEFAULT '1',
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `settings_id` int(11) DEFAULT NULL,
  `settings_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gpu` int(11) DEFAULT NULL,
  `anti_alias` tinyint(1) DEFAULT '0',
  `cpu_encode` tinyint(1) DEFAULT '0',
  `vbi_passthrough` tinyint(1) DEFAULT '0',
  `enable_border` tinyint(1) DEFAULT '0',
  `respond_to_afd` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'None',
  `afd_signaling` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'None',
  `fixed_afd` int(11) DEFAULT NULL,
  `timecode_passthrough` tinyint(1) DEFAULT '0',
  `selected_gpu` int(11) DEFAULT NULL,
  `passthrough` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `index_video_descriptions_on_settings_id_and_settings_type` (`settings_id`,`settings_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of video_descriptions
-- ----------------------------

-- ----------------------------
-- Table structure for `vorbis_settings`
-- ----------------------------
DROP TABLE IF EXISTS `vorbis_settings`;

CREATE TABLE `vorbis_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `codec_profile` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bitrate` int(11) DEFAULT NULL,
  `sample_rate` int(11) DEFAULT NULL,
  `fill_on_lost` tinyint(4) DEFAULT NULL,
  `channels` int(11) DEFAULT NULL,
  `boost_level` int(11) DEFAULT NULL,
  `channel_processing` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `volume_mode` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `balance_db` int(11) DEFAULT NULL,
  `balance_level` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- ----------------------------
-- Table structure for `watch_files`
-- ----------------------------
DROP TABLE IF EXISTS `watch_files`;
CREATE TABLE `watch_files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `watch_folder_id` int(11) DEFAULT NULL,
  `file_name` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `modify_at` datetime DEFAULT NULL,
  `flag` tinyint(4) DEFAULT NULL,
  `hash` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of watch_files
-- ----------------------------

-- ----------------------------
-- Table structure for `watch_folders`
-- ----------------------------
DROP TABLE IF EXISTS `watch_folders`;
CREATE TABLE `watch_folders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) DEFAULT '1',
  `watching_interval` int(11) DEFAULT NULL,
  `folder` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'None',
  `enable_filter` tinyint(1) DEFAULT '0',
  `filter` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'None',
  `profile_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `type` int(11) DEFAULT '0',
  `enable_subfolder` tinyint(1) DEFAULT '0',
  `file_ready_flag` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `subtitle` tinyint(1) DEFAULT '0',
  `follow_src_dir` tinyint(1) DEFAULT '0',
  `owner` int(11) DEFAULT '0',
  `file_ready_interval` int(11) DEFAULT '-1',
  PRIMARY KEY (`id`),
  KEY `wf_profile_id_idx` (`profile_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of watch_folders
-- ----------------------------

-- ----------------------------
-- Table structure for `watermarking_inserters`
-- ----------------------------
DROP TABLE IF EXISTS `watermarking_inserters`;

CREATE TABLE `watermarking_inserters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `font` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `font_size` int(11) DEFAULT NULL,
  `english_font` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `english_size` int(11) DEFAULT NULL,
  `opacity` int(11) DEFAULT NULL,
  `color` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pos_x` int(11) DEFAULT NULL,
  `pos_y` int(11) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `bg_opacity` int(11) DEFAULT NULL,
  `bg_color` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `insertable_id` int(11) DEFAULT NULL,
  `insertable_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `watermarking_type` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of watermarking_inserters
-- ----------------------------


-- ----------------------------
-- Table structure for `wav_settings`
-- ----------------------------
DROP TABLE IF EXISTS `wav_settings`;
CREATE TABLE `wav_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sample_rate` int(11) DEFAULT '44100',
  `channels` int(11) DEFAULT '2',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of wav_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `wma2_settings`
-- ----------------------------
DROP TABLE IF EXISTS `wma2_settings`;
CREATE TABLE `wma2_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bitrate` int(11) DEFAULT '96000',
  `sample_rate` int(11) DEFAULT '44100',
  `channels` int(11) DEFAULT '2',
  `boost_level` int(11) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `channel_processing` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fill_on_lost` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of wma2_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `wma_settings`
-- ----------------------------
DROP TABLE IF EXISTS `wma_settings`;
CREATE TABLE `wma_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codec_profile` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bitrate` int(11) DEFAULT '96000',
  `sample_rate` int(11) DEFAULT '44100',
  `channels` int(11) DEFAULT '2',
  `boost_level` int(11) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `channel_processing` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `volume_mode` varchar(32) COLLATE utf8_unicode_ci DEFAULT '1',
  `balance_db` int(11) DEFAULT '-30',
  `balance_level` int(11) DEFAULT '0',
  `fill_on_lost` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of wma_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `wmv_settings`
-- ----------------------------
DROP TABLE IF EXISTS `wmv_settings`;
CREATE TABLE `wmv_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `annex_l` tinyint(1) DEFAULT NULL,
  `qp` int(11) DEFAULT NULL,
  `codec_profile` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `codec_level_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `rate_control_mode` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gop_mode_id` int(11) DEFAULT '2',
  `interlace_mode_id` int(11) DEFAULT '1',
  `bitrate` int(11) DEFAULT '5000000',
  `max_bitrate` int(11) DEFAULT NULL,
  `framerate_numerator` int(11) DEFAULT NULL,
  `framerate_denominator` int(11) DEFAULT NULL,
  `gop_size` int(11) DEFAULT '80',
  `scd` tinyint(1) DEFAULT '1',
  `gop_num_b_frames` int(11) DEFAULT '2',
  `par_numerator` int(11) DEFAULT NULL,
  `par_denominator` int(11) DEFAULT NULL,
  `framerate_follow_source` tinyint(1) DEFAULT '1',
  `par_follow_source` tinyint(1) DEFAULT '1',
  `gop_closed_cadence` int(11) DEFAULT '1',
  `passes` int(11) DEFAULT '1',
  `buf_size` int(11) DEFAULT NULL,
  `buf_fill_pct` int(11) DEFAULT NULL,
  `min_qp` int(11) DEFAULT NULL,
  `max_qp` int(11) DEFAULT NULL,
  `qp_step` int(11) DEFAULT NULL,
  `interpolate_frc` tinyint(1) DEFAULT '0',
  `adaptive_quantization` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'off',
  `look_ahead_rate_control` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'medium',
  `denoise_strength` int(11) DEFAULT NULL,
  `slices` int(11) DEFAULT NULL,
  `cq_quantizer` int(11) DEFAULT NULL,
  `num_ref_frames` int(11) DEFAULT NULL,
  `encoding_option` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fill_on_lost` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of wmv_settings
-- ----------------------------

-- ----------------------------
-- Table structure for `tbl_nios`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_nios`;
CREATE TABLE `tbl_nios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for `tbl_ipmis`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_ipmis`;
CREATE  TABLE `tbl_ipmis` (
  `id` VARCHAR(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'server_id of table tbl_servers',
  `ip` VARCHAR(255) COLLATE utf8_unicode_ci NOT NULL ,
  `user` VARCHAR(255) COLLATE utf8_unicode_ci NOT NULL ,
  `password` VARCHAR(255) COLLATE utf8_unicode_ci DEFAULT NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for `tbl_switchs`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_switchs`;
CREATE TABLE `tbl_switchs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `server_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'server_id of table tbl_servers',
  `community` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ip` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `ifindex` int(11) NOT NULL COMMENT 'snmp interface entry index of swtich port used by the server',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for `tbl_switchs_sync`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_switchs_sync`;
CREATE TABLE `tbl_switchs_sync` (
  `server_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`server_id`),
  UNIQUE KEY `server_id` (`server_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- ----------------------------
-- View structure for `last_output_stats`
-- ----------------------------
DROP VIEW IF EXISTS `last_output_stats`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `last_output_stats` AS select `os`.`output_id` AS `output_id`,`os`.`output_type` AS `output_type`,max(`os`.`id`) AS `id` from `output_stats` `os` group by `os`.`output_id`,`os`.`output_type` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
