package com.arcsoft.commander.service.upgrade.impl.commander;

import com.arcsoft.commander.service.upgrade.impl.DatabaseUpgradeHandlerSupport;

/**
 * Merge from arcvideo 1.3.x.x.
 * 
 * 066_add igmp_source_ip to udp_group_settings.sql
 * 
 * @author fjli
 */
public class DatabaseUpgradeHandler9 extends DatabaseUpgradeHandlerSupport {

	@Override
	public void upgrade() {
		// 066_add igmp_source_ip to udp_group_settings.sql
		upgradeDao.addColumn("udp_group_settings", "igmp_source_ip", "VARCHAR", 256);
		upgradeDao.addColumn("candidate_outputs", "igmp_source_ip", "VARCHAR", 256);
	}

}
