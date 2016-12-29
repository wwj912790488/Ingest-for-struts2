package com.arcsoft.commander.service.upgrade.impl.commander;

import com.arcsoft.commander.service.upgrade.impl.DatabaseUpgradeHandlerSupport;


/**
 * Upgrade database from version 0 to version 1.
 * 
 * @author fjli
 */
public class DatabaseUpgradeHandler1 extends DatabaseUpgradeHandlerSupport {

	@Override
	public void upgrade() {
		// add columns to tbl_servers
		upgradeDao.addColumn("tbl_servers", "max_tasks_count", "INT", 11, null);
		upgradeDao.addColumn("tbl_servers", "max_output_count", "INT", 11, null);
		upgradeDao.addColumn("tbl_servers", "max_sd_count", "INT", 11, null);
		upgradeDao.addColumn("tbl_servers", "max_hd_count", "INT", 11, null);

		// update admin user display name
		upgradeDao.executeUpdate("UPDATE `tbl_users` SET `real_name`='超级管理员' WHERE `name`='Admin' and `real_name`='管理員'");

		// add columns to live_events
		upgradeDao.addColumn("live_events", "group_id", "INT", 11, null);

		// update task group id
		if (upgradeDao.isExistColumn("live_events", "server_or_group_id")) {
			// update task group id
			upgradeDao.executeUpdate("UPDATE `live_events` a, `tbl_servers` b SET a.`group_id`=b.`group_id` WHERE a.`server_or_group_id`=b.`server_id`");
			// drop clumn server_or_group_id
			upgradeDao.dropColumn("live_events", "server_or_group_id");
		}
	}

}
