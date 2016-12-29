package com.arcsoft.commander.service.upgrade.impl.commander;

import com.arcsoft.commander.service.upgrade.impl.DatabaseUpgradeHandlerSupport;

/**
 * Add commander tasks.
 * 
 * @author fjli
 */
public class DatabaseUpgradeHandler6 extends DatabaseUpgradeHandlerSupport {

	@Override
	public void upgrade() {
		if (!upgradeDao.isExistTable("tbl_commander_tasks")) {
			StringBuffer sql = new StringBuffer("CREATE TABLE IF NOT EXISTS `tbl_commander_tasks` (");
			sql.append("`task_id` INT(11) NOT NULL,");
			sql.append("`task_type` INT(11) DEFAULT NULL,");
			sql.append("`group_id` INT(11) DEFAULT NULL,");
			sql.append("`server_id` VARCHAR(255) DEFAULT NULL,");
			sql.append("PRIMARY KEY (`task_id`),");
			sql.append("KEY `fk_commander_tasks_id` (`task_id`),");
			sql.append("CONSTRAINT `fk_commander_tasks_id` FOREIGN KEY (`task_id`) REFERENCES `live_events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE");
			sql.append(")");
			upgradeDao.executeUpdate(sql.toString());

			// upgrade task data.
			upgradeDao.executeUpdate("insert into tbl_commander_tasks(task_id, task_type, group_id, server_id) select id, group_type, group_id, cur_server_id from live_events");

			// drop columns
			upgradeDao.dropColumn("live_events", "group_type");
			upgradeDao.dropColumn("live_events", "group_id");
			upgradeDao.dropColumn("live_events", "cur_server_id");
		}
	}

}
