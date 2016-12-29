package com.arcsoft.commander.service.upgrade.impl.transcoder;

import com.arcsoft.commander.service.upgrade.impl.DatabaseUpgradeHandlerSupport;

/**
 * 096_add_vorbis.sql
 * 
 * @author fjli
 */
public class TranscoderDatabaseUpgradeHandler096 extends DatabaseUpgradeHandlerSupport {

	@Override
	public void upgrade() {
		if (!upgradeDao.isExistTable("vorbis_settings")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `vorbis_settings` (");
			sql.append("`id` INT(11) NOT NULL AUTO_INCREMENT ,");
			sql.append("`bitrate` INT NULL,");
			sql.append("`sample_rate` INT NULL,");
			sql.append("`channels` INT NULL,");
			sql.append("`created_at` DATETIME NULL ,");
			sql.append("`updated_at` DATETIME NULL,");
			sql.append("`rate_control_mode_id` INT NULL,");
			sql.append("`boost_level` INT NULL DEFAULT 0 ,");
			sql.append("`latm_loas` TINYINT NULL DEFAULT 0 ,");
			sql.append("`fill_on_lost` TINYINT NULL DEFAULT 0,");
			sql.append("`mpeg2` TINYINT NULL DEFAULT 0 ,");
			sql.append("`codec_profile` VARCHAR(32) NULL,");
			sql.append("`channel_processing` VARCHAR(32) NULL,");
			sql.append("`vbr_quality` VARCHAR(255) NULL,");
			sql.append("`volume_mode` VARCHAR(32) NULL,");
			sql.append("`balance_db` INT NULL,");
			sql.append("`balance_level` INT NULL,");
			sql.append("PRIMARY KEY (`id`)");
			sql.append(") ENGINE=InnoDB AUTO_INCREMENT=258 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;");
			upgradeDao.executeUpdate(sql.toString());
		}
	}

}
