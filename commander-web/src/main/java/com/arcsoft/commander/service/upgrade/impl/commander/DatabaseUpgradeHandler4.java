package com.arcsoft.commander.service.upgrade.impl.commander;

import com.arcsoft.commander.service.upgrade.impl.DatabaseUpgradeHandlerSupport;


/**
 * 
 * @author ybzhang
 */
public class DatabaseUpgradeHandler4 extends DatabaseUpgradeHandlerSupport {

	@Override
	public void upgrade() {
		
		// add table matrix
		if(!upgradeDao.isExistTable("matrix")){
			StringBuffer createRoleResSQL = new StringBuffer("CREATE TABLE `matrix` (");
			createRoleResSQL.append("`id` int(11) NOT NULL AUTO_INCREMENT,");
			createRoleResSQL.append("`ip` varchar(45) COLLATE utf8_unicode_ci NOT NULL,");
			createRoleResSQL.append("`name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,");
			createRoleResSQL.append("`remarks` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,");
			createRoleResSQL.append(" `group_id` int(11) NOT NULL,");
			createRoleResSQL.append("`port` int(11) DEFAULT NULL,");
			createRoleResSQL.append("PRIMARY KEY (`id`),");
			createRoleResSQL.append(" KEY `FK_MS_idx` (`group_id`),");
			createRoleResSQL.append("CONSTRAINT `FK_MS` FOREIGN KEY (`group_id`) REFERENCES `tbl_server_groups` (`group_id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
			createRoleResSQL.append(") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;");
			upgradeDao.executeUpdate(createRoleResSQL.toString());
		}
		
		// add table matrix_setting
		if (!upgradeDao.isExistTable("matrix_setting")) {

			StringBuffer createRoleResSQL = new StringBuffer("CREATE TABLE `matrix_setting` (");
			createRoleResSQL.append("`id` int(11) NOT NULL AUTO_INCREMENT,");
			createRoleResSQL.append("`matrix_id` int(11) NOT NULL,");
			createRoleResSQL.append("`server_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,");
			createRoleResSQL.append("`sdi_port` int(11) DEFAULT NULL,");
			createRoleResSQL.append("`matrix_out` int(11) DEFAULT NULL,");
			createRoleResSQL.append("`matrix_master_in` int(11) DEFAULT NULL,");
			createRoleResSQL.append("`matrix_slave_in` int(11) DEFAULT NULL,");
			createRoleResSQL.append("`remarks` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,");
			createRoleResSQL.append("PRIMARY KEY (`id`),");
			createRoleResSQL.append("KEY `FK_MMS_idx` (`matrix_id`),");
			createRoleResSQL.append("KEY `FK_SMS_idx` (`server_id`),");
			createRoleResSQL.append("CONSTRAINT `FK_MMS` FOREIGN KEY (`matrix_id`) REFERENCES `matrix` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,");
			createRoleResSQL.append("CONSTRAINT `FK_SMS` FOREIGN KEY (`server_id`) REFERENCES `tbl_servers` (`server_id`) ON DELETE CASCADE ON UPDATE CASCADE");
			createRoleResSQL.append(") ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;");
			upgradeDao.executeUpdate(createRoleResSQL.toString());
		}
	}

}
