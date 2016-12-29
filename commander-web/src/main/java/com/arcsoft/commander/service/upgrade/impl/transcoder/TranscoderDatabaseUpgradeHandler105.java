package com.arcsoft.commander.service.upgrade.impl.transcoder;

import com.arcsoft.commander.service.upgrade.impl.DatabaseUpgradeHandlerSupport;

/**
 * 105_device_input_switch_mode.sql
 * 
 * @author fjli
 */
public class TranscoderDatabaseUpgradeHandler105 extends DatabaseUpgradeHandlerSupport {

	@Override
	public void upgrade() {
		upgradeDao.addColumn("device_inputs", "switch_mode", "INT", 11, null);
	}

}
