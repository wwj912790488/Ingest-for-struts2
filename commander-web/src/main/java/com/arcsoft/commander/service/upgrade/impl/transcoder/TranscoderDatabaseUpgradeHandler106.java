package com.arcsoft.commander.service.upgrade.impl.transcoder;

import com.arcsoft.commander.service.upgrade.impl.DatabaseUpgradeHandlerSupport;

/**
 * 106_denoise_method.sql
 * 
 * @author fjli
 */
public class TranscoderDatabaseUpgradeHandler106 extends DatabaseUpgradeHandlerSupport {

	@Override
	public void upgrade() {
		upgradeDao.addColumn("image_editors", "denoise_method", "INT", 11, null);
	}

}
