package com.arcsoft.commander.service.upgrade.impl.transcoder;

import com.arcsoft.commander.service.upgrade.impl.DatabaseUpgradeHandlerSupport;

/**
 * 101_video_codec_raw.sql
 * 
 * @author fjli
 */
public class TranscoderDatabaseUpgradeHandler102 extends DatabaseUpgradeHandlerSupport {

	@Override
	public void upgrade() {
		if (!upgradeDao.isExistTable("video_raw_settings")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `video_raw_settings` (");
			sql.append("`id` int not null AUTO_INCREMENT PRIMARY KEY,");
			sql.append("`framerate_numerator` int NULL,");
			sql.append("`framerate_denominator` int NULL ,");
			sql.append("`framerate_follow_source` tinyint NULL default 1,");
			sql.append("`interpolate_frc` tinyint NULL default 0,");
			sql.append("`par_numerator` int NULL,");
			sql.append("`par_denominator` int NULL,");
			sql.append("`par_follow_source` tinyint NULL default 1,");
			sql.append("`interlace_mode_id` int NULL default 1,");
			sql.append("`codec_profile` varchar(32) NULL,");
			sql.append("`created_at` datetime NULL,");
			sql.append("`updated_at` datetime NULL,");
			sql.append("`bitrate` int NULL default 0,");
			sql.append("`top_field_first` int NULL,");
			sql.append("`rate_control_mode` varchar(255) NULL,");
			sql.append("`fill_on_lost` tinyint NULL default 0");
			sql.append(") ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;");
			upgradeDao.executeUpdate(sql.toString());
		}
	}

}
