package com.arcsoft.commander.service.upgrade.impl.record;

import com.arcsoft.commander.service.upgrade.impl.DatabaseUpgradeHandlerSupport;

/**
 * Upgrade database from version 1 to version 2.
 * 
 * @author fjli
 */
public class RecordDatabaseUpgradeHandler3 extends DatabaseUpgradeHandlerSupport {

	@Override
	public void upgrade() {
		// add columns to tbl_channels
		upgradeDao.addColumn("tbl_channels", "audioAll", "VARCHAR", 255);

		upgradeDao.addColumn("tbl_record_base", "create_folder_map", "VARCHAR", 255);

		upgradeDao.addColumn("tbl_record_base", "ftp_option", "bit", 1);
		upgradeDao.addColumn("tbl_record_base", "ftp_path", "varchar", 255);
		upgradeDao.addColumn("tbl_record_base", "ftp_ApiOption", "bit", 1);
		upgradeDao.addColumn("tbl_record_base", "ftp_ApiIP", "varchar", 255);
		upgradeDao.addColumn("tbl_record_base", "ftp_ApiUserName", "varchar", 255);
		upgradeDao.addColumn("tbl_record_base", "ftp_ApiPassWord", "varchar", 255);
		upgradeDao.addColumn("tbl_record_base", "ftp_ApiPath", "varchar", 255);


	}

}
