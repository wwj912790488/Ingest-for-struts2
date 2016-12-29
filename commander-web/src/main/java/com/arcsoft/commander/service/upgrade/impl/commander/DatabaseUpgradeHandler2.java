package com.arcsoft.commander.service.upgrade.impl.commander;

import com.arcsoft.commander.service.upgrade.impl.DatabaseUpgradeHandlerSupport;

/**
 * Upgrade security relation database
 * 
 * @author ybzhang
 */
public class DatabaseUpgradeHandler2 extends DatabaseUpgradeHandlerSupport {

	@Override
	public void upgrade() {
		// must drop foreign key before update tbl_roles.role_id
		upgradeDao.dropForeignKey("tbl_users", "21");
		upgradeDao.dropIndex("tbl_users", "21");

		// upgrade tbl_roles
		upgradeDao.executeUpdate("ALTER TABLE `tbl_roles` CHANGE COLUMN `role_id` `role_id` INT(10) NOT NULL AUTO_INCREMENT");
		if (!upgradeDao.isExistColumn("tbl_roles", "createtime")) {
			upgradeDao.addColumn("tbl_roles", "createtime", "TIMESTAMP", null, false, "CURRENT_TIMESTAMP");
			upgradeDao.executeUpdate("update `tbl_roles` set createtime=CURRENT_TIMESTAMP");
		}
		upgradeDao.addColumn("tbl_roles", "canceltime", "TIMESTAMP", null);
		upgradeDao.addColumn("tbl_roles", "remarks", "VARCHAR", 255, null);
		upgradeDao.addColumn("tbl_roles", "isEnabled", "TINYINT", 1, false, "1");

		// update tbl_users
		upgradeDao.modifyColumn("tbl_users", "role_id", "INT", 10);
		upgradeDao.addForeignKey("tbl_users", "fk_tbl_users_role_id", new String[] { "role_id" }, "tbl_roles", new String[] { "role_id" }, "ON DELETE SET NULL ON UPDATE CASCADE");

		// add table role_resource
		if(!upgradeDao.isExistTable("role_operator")){
			StringBuffer createRoleResSQL = new StringBuffer("CREATE TABLE `role_operator` (");
			createRoleResSQL.append("`id` int(10) NOT NULL AUTO_INCREMENT,");
			createRoleResSQL.append("`role_id` int(10) NOT NULL,");
			createRoleResSQL.append("`operator_id` int(10) NOT NULL,");
			createRoleResSQL.append("PRIMARY KEY (`id`),");
			createRoleResSQL.append("KEY `rr_rolid_idx` (`role_id`),");
			createRoleResSQL.append("KEY `FKAEE599B7A37E8F93` (`operator_id`),");
			createRoleResSQL.append("CONSTRAINT `rr_rolid` FOREIGN KEY (`role_id`) REFERENCES `tbl_roles` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE");
			createRoleResSQL.append(") ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;");
			upgradeDao.executeUpdate(createRoleResSQL.toString());
			upgradeDao.executeUpdate("INSERT INTO `role_operator` VALUES (1,3,33),(2,3,53),(3,3,93),(4,3,43),(5,3,83)");
			upgradeDao.executeUpdate("INSERT INTO `role_operator` VALUES (6,2,43),(7,2,53),(8,2,31),(9,2,83),(10,2,41),(11,2,52),(12,2,50),(13,2,30),(14,2,40),(15,2,51),(16,2,42),(17,2,93),(18,2,32),(19,2,33)");
		}
	}

}
