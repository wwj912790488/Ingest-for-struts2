package com.arcsoft.commander.service.upgrade.impl.commander;

import com.arcsoft.commander.service.upgrade.impl.DatabaseUpgradeHandlerSupport;

/**
 * support network input-output
 * add table tbl_nios
 * 
 * @author wtsun
 */
public class DatabaseUpgradeHandler8 extends DatabaseUpgradeHandlerSupport {

	@Override
	public void upgrade() {
		// add table tbl_nios
		if(!upgradeDao.isExistTable("tbl_nios")){
			StringBuffer createRoleResSQL = new StringBuffer("CREATE TABLE `tbl_nios` (");
			createRoleResSQL.append("`id` int(11) NOT NULL AUTO_INCREMENT,");
			createRoleResSQL.append("`name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,");
			createRoleResSQL.append("`type` int(11) DEFAULT NULL,");
			createRoleResSQL.append("PRIMARY KEY (`id`)");
			createRoleResSQL.append(")");
			upgradeDao.executeUpdate(createRoleResSQL.toString());
		}
	}

}
