package com.arcsoft.commander.service.upgrade.impl.transcoder;

import com.arcsoft.commander.service.upgrade.impl.DatabaseUpgradeHandlerSupport;

/**
 * 099_videodesc_drm.sql
 * 
 * @author fjli
 */
public class TranscoderDatabaseUpgradeHandler098 extends DatabaseUpgradeHandlerSupport {

	@Override
	public void upgrade() {
		upgradeDao.addColumn("video_descriptions", "drm_desc_id", "INT", 11, true, "0");
	}

}
