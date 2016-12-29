package com.arcsoft.commander.service.upgrade.impl.transcoder;

import com.arcsoft.commander.service.upgrade.impl.DatabaseUpgradeHandlerSupport;

/**
 * 097_audio_denoise.sql
 * 
 * @author fjli
 */
public class TranscoderDatabaseUpgradeHandler097 extends DatabaseUpgradeHandlerSupport {

	@Override
	public void upgrade() {
		upgradeDao.addColumn("aac_settings", "denoise", "TINYINT", 1, true, "0");
		upgradeDao.addColumn("ac3_settings", "denoise", "TINYINT", 1, true, "0");
		upgradeDao.addColumn("amr_settings", "denoise", "TINYINT", 1, true, "0");
		upgradeDao.addColumn("ddp_settings", "denoise", "TINYINT", 1, true, "0");
		upgradeDao.addColumn("mpa_settings", "denoise", "TINYINT", 1, true, "0");
		upgradeDao.addColumn("pcm_settings", "denoise", "TINYINT", 1, true, "0");
		upgradeDao.addColumn("wma2_settings", "denoise", "TINYINT", 1, true, "0");
		upgradeDao.addColumn("wma_settings", "denoise", "TINYINT", 1, true, "0");
		upgradeDao.addColumn("vorbis_settings", "denoise", "TINYINT", 1, true, "0");
	}

}
