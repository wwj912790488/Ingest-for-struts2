package com.arcsoft.commander.service.upgrade.impl.transcoder;

import com.arcsoft.commander.service.upgrade.impl.DatabaseUpgradeHandlerSupport;

/**
 * 098_add_sdi_group_settings.sql
 * 
 * @author fjli
 */
public class TranscoderDatabaseUpgradeHandler099 extends DatabaseUpgradeHandlerSupport {

	@Override
	public void upgrade() {
		if (!upgradeDao.isExistTable("sdi_group_settings")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `sdi_group_settings` (");
			sql.append("`id` INT(11) NOT NULL AUTO_INCREMENT ,");
			sql.append("`destination_id` INT(11) NULL DEFAULT NULL ,");
			sql.append("`port` INT(11) NULL DEFAULT NULL ,");
			sql.append("`created_at` DATETIME NULL DEFAULT NULL ,");
			sql.append("`updated_at` DATETIME NULL DEFAULT NULL ,");
			sql.append("PRIMARY KEY (`id`)");
			sql.append(") ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;");
			upgradeDao.executeUpdate(sql.toString());
		}
	}

}
