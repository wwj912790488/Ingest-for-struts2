package com.arcsoft.commander.service.upgrade.impl.transcoder;

import com.arcsoft.commander.service.upgrade.impl.DatabaseUpgradeHandlerSupport;

/**
 * 100_epg_file.sql
 * 
 * @author fjli
 */
public class TranscoderDatabaseUpgradeHandler100 extends DatabaseUpgradeHandlerSupport {

	@Override
	public void upgrade() {
		upgradeDao.addColumn("archive_group_settings", "epg_file", "VARCHAR", 1024);
	}

}
