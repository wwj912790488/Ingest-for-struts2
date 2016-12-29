package com.arcsoft.commander.service.upgrade.impl.commander;

import com.arcsoft.commander.service.upgrade.impl.DatabaseUpgradeHandlerSupport;

/**
 * Merge from arcvideo 1.6.x.x.
 * 
 * 067_add_prores_settings.sql
 * ...
 * 072_add_top_field_first.sql
 * 
 * @author wtsun
 */
public class DatabaseUpgradeHandler11 extends DatabaseUpgradeHandlerSupport {

	@Override
	public void upgrade() {
		// 067_add_prores_settings.sql
		upgradeDao.addColumn("prores_settings", "bitrate", "INT", 11, "'0'");
		
		// 068_add_dnxhd_settings.sql
		if (!upgradeDao.isExistTable("dnxhd_settings")) {
			StringBuffer sql = new StringBuffer("CREATE  TABLE IF NOT EXISTS `dnxhd_settings` (");
			sql.append("`id` INT(11) NOT NULL AUTO_INCREMENT ,");
			sql.append("`codec_profile` VARCHAR(32) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL ,");
			sql.append("`created_at` DATETIME NULL DEFAULT NULL ,");
			sql.append("`updated_at` DATETIME NULL DEFAULT NULL ,");
			sql.append("`rate_control_mode` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NULL DEFAULT NULL ,");
			sql.append("`interlace_mode_id` INT(11) NULL DEFAULT '1' ,");
			sql.append("`bitrate` INT(11) NULL DEFAULT '5000000' ,");
			sql.append("`framerate_numerator` INT(11) NULL DEFAULT NULL ,");
			sql.append("`framerate_denominator` INT(11) NULL DEFAULT NULL ,");
			sql.append("`framerate_follow_source` TINYINT(1) NULL DEFAULT '1' ,");
			sql.append("`par_numerator` INT(11) NULL DEFAULT NULL ,");
			sql.append("`par_denominator` INT(11) NULL DEFAULT NULL ,");
			sql.append("`par_follow_source` TINYINT(1) NULL DEFAULT '1' ,");
			sql.append("`interpolate_frc` TINYINT(1) NULL DEFAULT '0' ,");
			sql.append("PRIMARY KEY (`id`) )");
			upgradeDao.executeUpdate(sql.toString());
		}
		
		// 069_add_deviceid_qualitylevel.sql
		upgradeDao.addColumn("mpeg2_settings", "device_id", "INT", 11);
		upgradeDao.addColumn("mpeg2_settings", "quality_level", "INT", 11);

		upgradeDao.addColumn("h265_settings", "device_id", "INT", 11);
		upgradeDao.addColumn("h265_settings", "quality_level", "INT", 11);
		
		// 070_video_codec_imageedit_alg.sql
		upgradeDao.addColumn("image_editors", "deinterlaceAlg", "INT", null);
		upgradeDao.addColumn("image_editors", "resizeAlg", "INT", null);
		
		// 071_add_private_metadata_type.sql
		upgradeDao.addColumn("m2ts_settings", "private_metadata_type", "INT", null);

		// 072_add_top_field_first.sql
		upgradeDao.addColumn("h264_settings", "top_field_first", "INT", null);
		upgradeDao.addColumn("avs_settings", "top_field_first", "INT", null);
		upgradeDao.addColumn("mpeg2_settings", "top_field_first", "INT", null);
		upgradeDao.addColumn("prores_settings", "top_field_first", "INT", null);
		upgradeDao.addColumn("dnxhd_settings", "top_field_first", "INT", null);

		upgradeDao.addColumn("prores_settings", "rate_control_mode", "VARCHAR", 255);
	}

}
