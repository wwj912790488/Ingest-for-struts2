package com.arcsoft.commander.service.upgrade.impl.commander;

import com.arcsoft.commander.service.upgrade.impl.DatabaseUpgradeHandlerSupport;

/**
 * Support fault process
 * 
 * @author wtsun
 */
public class DatabaseUpgradeHandler10 extends DatabaseUpgradeHandlerSupport {

	@Override
	public void upgrade() {
		// add fault_disabled to tbl_servers
		upgradeDao.addColumn("tbl_servers", "fault_disabled", "INT", null, "0");

		// add table tbl_ipmis
		if(!upgradeDao.isExistTable("tbl_ipmis")){
			StringBuffer createRoleResSQL = new StringBuffer("CREATE TABLE `tbl_ipmis` (");
			createRoleResSQL.append("`id` VARCHAR(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'server_id of table tbl_servers',");
			createRoleResSQL.append("`ip` VARCHAR(255) COLLATE utf8_unicode_ci NOT NULL ,");
			createRoleResSQL.append("`user` VARCHAR(255) COLLATE utf8_unicode_ci NOT NULL ,");
			createRoleResSQL.append("`password` VARCHAR(255) COLLATE utf8_unicode_ci DEFAULT NULL ,");
			createRoleResSQL.append("PRIMARY KEY (`id`)");
			createRoleResSQL.append("UNIQUE KEY `id` (`id`)");
			createRoleResSQL.append(")");
			upgradeDao.executeUpdate(createRoleResSQL.toString());
		}

		// add table tbl_switchs
		if(!upgradeDao.isExistTable("tbl_switchs")){
			StringBuffer createRoleResSQL = new StringBuffer("CREATE TABLE `tbl_switchs` (");
			createRoleResSQL.append("`id` int(11) NOT NULL AUTO_INCREMENT,");
			createRoleResSQL.append("`server_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'server_id of table tbl_servers',");
			createRoleResSQL.append("`community` varchar(255) COLLATE utf8_unicode_ci NOT NULL,");
			createRoleResSQL.append("`ifindex` int(11) NOT NULL COMMENT 'snmp interface entry index of swtich port used by the server',");
			createRoleResSQL.append("PRIMARY KEY (`id`)");
			createRoleResSQL.append("UNIQUE KEY `id` (`id`)");
			createRoleResSQL.append(")");
			upgradeDao.executeUpdate(createRoleResSQL.toString());
		}
		
		// add table tbl_switchs_sync
		if(!upgradeDao.isExistTable("tbl_switchs_sync")){
			StringBuffer createRoleResSQL = new StringBuffer("CREATE TABLE `tbl_switchs_sync` (");
			createRoleResSQL.append("`server_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,");
			createRoleResSQL.append("PRIMARY KEY (`server_id`),");
			createRoleResSQL.append("UNIQUE KEY `server_id` (`server_id`)");
			createRoleResSQL.append(")");
			upgradeDao.executeUpdate(createRoleResSQL.toString());
		}		
	}
}
