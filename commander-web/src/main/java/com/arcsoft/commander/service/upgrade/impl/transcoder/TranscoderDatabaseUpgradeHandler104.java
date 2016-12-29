package com.arcsoft.commander.service.upgrade.impl.transcoder;

import com.arcsoft.commander.service.upgrade.impl.DatabaseUpgradeHandlerSupport;

/**
 * 104_merge_audio_input.sql
 * 
 * @author fjli
 */
public class TranscoderDatabaseUpgradeHandler104 extends DatabaseUpgradeHandlerSupport {

	@Override
	public void upgrade() {
		upgradeDao.modifyColumn("audio_descriptions", "candidate_location_id", "VARCHAR", 255, true, "''");
	}

}
