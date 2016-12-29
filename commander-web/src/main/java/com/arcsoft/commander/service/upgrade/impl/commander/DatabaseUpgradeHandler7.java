package com.arcsoft.commander.service.upgrade.impl.commander;

import com.arcsoft.commander.service.upgrade.impl.DatabaseUpgradeHandlerSupport;

/**
 * Merge from arcvideo 1.1.3.x.
 * 
 * 060_m2tssetting_tot_tdt.sql
 * ...
 * 065_add_timestamp_to_alerts.sql
 * 
 * @author fjli
 */
public class DatabaseUpgradeHandler7 extends DatabaseUpgradeHandlerSupport {

	@Override
	public void upgrade() {
		// 060_m2tssetting_tot_tdt.sql
		upgradeDao.addColumn("m2ts_settings", "insert_tot_tdt", "INT", null, "0");
		upgradeDao.addColumn("m2ts_settings", "period_tot_tdt", "INT", null, "0");

		// 061_add_signal_settings.sql
		upgradeDao.addColumn("source_signal_items", "warning_check", "TINYINT");
		upgradeDao.addColumn("source_signal_items", "warning_timeout", "INT");
		upgradeDao.addColumn("source_signal_items", "warning_param", "INT");

		// 062_add_gpu_id.sql
		upgradeDao.addColumn("live_events", "gpu_id", "INT");
		upgradeDao.addColumn("live_profiles", "gpu_id", "INT");
		upgradeDao.addColumn("schedules", "gpu_id", "INT");

		// 063_add_to_m2tssetting.sql
		upgradeDao.addColumn("m2ts_settings", "pat_period", "INT");
		upgradeDao.addColumn("m2ts_settings", "sdt_period", "INT");
		upgradeDao.addColumn("m2ts_settings", "original_network_id", "INT");

		// 064_add_allow_program_id_change.sql
		upgradeDao.addColumn("network_inputs", "allow_program_id_change", "tinyint");
		upgradeDao.addColumn("device_inputs", "allow_program_id_change", "tinyint");

		// 065_add_timestamp_to_alerts.sql
		upgradeDao.addColumn("alerts", "time_stamp", "BIGINT");
	}

}
