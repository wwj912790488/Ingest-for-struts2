package com.arcsoft.commander.service.upgrade.impl.transcoder;

import com.arcsoft.commander.service.upgrade.impl.DatabaseUpgradeHandlerSupport;

/**
 * 102_drm_description_add_owner.sql
 * 
 * @author fjli
 */
public class TranscoderDatabaseUpgradeHandler101 extends DatabaseUpgradeHandlerSupport {

	@Override
	public void upgrade() {
		upgradeDao.addColumn("drm_descriptions", "owner_id", "INT", 11, true, "0");
		upgradeDao.addColumn("drm_descriptions", "owner_type", "VARCHAR", 32);
	}

}
