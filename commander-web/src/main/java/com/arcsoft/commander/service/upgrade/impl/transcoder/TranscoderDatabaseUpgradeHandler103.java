package com.arcsoft.commander.service.upgrade.impl.transcoder;

import com.arcsoft.commander.service.upgrade.impl.DatabaseUpgradeHandlerSupport;

/**
 * 103_framerate_source_mode.sql
 * 
 * @author fjli
 */
public class TranscoderDatabaseUpgradeHandler103 extends DatabaseUpgradeHandlerSupport {

	@Override
	public void upgrade() {
		upgradeDao.addColumn("avs_settings", "framerate_source_mode", "TINYINT", 1, true, "0");
		upgradeDao.addColumn("dnxhd_settings", "framerate_source_mode", "TINYINT", 1, true, "0");
		upgradeDao.addColumn("h263_settings", "framerate_source_mode", "TINYINT", 1, true, "0");
		upgradeDao.addColumn("h264_settings", "framerate_source_mode", "TINYINT", 1, true, "0");
		upgradeDao.addColumn("h265_settings", "framerate_source_mode", "TINYINT", 1, true, "0");
		upgradeDao.addColumn("mpeg2_settings", "framerate_source_mode", "TINYINT", 1, true, "0");
		upgradeDao.addColumn("mpeg4_settings", "framerate_source_mode", "TINYINT", 1, true, "0");
		upgradeDao.addColumn("prores_settings", "framerate_source_mode", "TINYINT", 1, true, "0");
		upgradeDao.addColumn("wmv_settings", "framerate_source_mode", "TINYINT", 1, true, "0");
		upgradeDao.addColumn("video_raw_settings", "framerate_source_mode", "TINYINT", 1, true, "0");
	}

}
