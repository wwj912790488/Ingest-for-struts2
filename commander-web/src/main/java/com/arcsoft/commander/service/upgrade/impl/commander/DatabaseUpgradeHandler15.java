package com.arcsoft.commander.service.upgrade.impl.commander;

import com.arcsoft.commander.service.upgrade.impl.DatabaseUpgradeHandlerSupport;

/**
 * Add records relation tables.
 * 
 * @author fjli
 */
// Add PassThrough
public class DatabaseUpgradeHandler15 extends DatabaseUpgradeHandlerSupport {

	@Override
	public void upgrade() {

		// archive_group_settings
		if (upgradeDao.isExistTable("archive_group_settings")) {

			upgradeDao.addColumn("archive_group_settings", "tmp_ext", "VARCHAR", 256);
			upgradeDao.addColumn("archive_group_settings", "iframe_playlist", "INT", 11);
			upgradeDao.addColumn("archive_group_settings", "playlist_type", "INT", 11);
			upgradeDao.addColumn("archive_group_settings", "byteRangeMode", "INT", 11);
			upgradeDao.addColumn("archive_group_settings", "playlist_name_mode", "INT", 11);

			StringBuffer sql = new StringBuffer("INSERT INTO `archive_group_settings` VALUES ('1', '1', 'any', 'ts', null, null, null, null, '${starttime}-${id}-${seq}', '${id}', null, null, '0', '600', null, '', null, '0', '0');");
			upgradeDao.executeUpdate(sql.toString());
		}

		// audio_descriptions
		if (upgradeDao.isExistTable("audio_descriptions")) {
			StringBuffer sql = new StringBuffer("INSERT INTO `audio_descriptions` VALUES ('1', null, null, null, null, '1', 'StreamAssembly', null, 'PassThrough', null, null, null, null, null, '1', null);");
			upgradeDao.executeUpdate(sql.toString());
		}

		// image_editors
		if (upgradeDao.isExistTable("image_editors")) {
			StringBuffer sql = new StringBuffer("INSERT INTO `image_editors` VALUES ('1', '0', '2', '0', null, '0', null, '0', '0', '0', '0', null, null, '1', 'Video', '0', '-1', '3', '3', '0');");
			upgradeDao.executeUpdate(sql.toString());
		}

		// inputs
		if (upgradeDao.isExistTable("inputs")) {

			upgradeDao.addColumn("inputs", "hsyq_edit", "INT", 11);
			upgradeDao.addColumn("inputs", "fill_type", "INT", 11);
			upgradeDao.addColumn("inputs", "delay_output_time", "INT", 11);

			StringBuffer sql = new StringBuffer("INSERT INTO `inputs` VALUES ('1', '1', 'Network', null, null, null, null, null, null, null, '-1', '-1', '-1', '-2', '1', 'Profile', null, null, null, null, null, '0', null, null, '0', null, null);");
			upgradeDao.executeUpdate(sql.toString());
		}

		// live_output_groups
		if (upgradeDao.isExistTable("live_output_groups")) {

			upgradeDao.addColumn("live_output_groups", "label", "VARCHAR", 256);
			upgradeDao.addColumn("live_output_groups", "active", "INT", 11);

			StringBuffer sql = new StringBuffer("INSERT INTO `live_output_groups` VALUES ('1', '1', 'Profile', 'TS', '1', 'FileArchive', null, '1', null, 'PassThrough', null, null, null, null, '0', '1_0', '1');");
			upgradeDao.executeUpdate(sql.toString());
		}

		// live_outputs
		if (upgradeDao.isExistTable("live_outputs")) {

			upgradeDao.addColumn("live_outputs", "label", "VARCHAR", 256);
			upgradeDao.addColumn("live_outputs", "output_group_type", "VARCHAR", 256);
			upgradeDao.addColumn("live_outputs", "playlist_name", "VARCHAR", 256);

			StringBuffer sql = new StringBuffer("INSERT INTO `live_outputs` VALUES ('1', null, '1', '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '1_0-o0', 'OutputGroup', null);");
			upgradeDao.executeUpdate(sql.toString());
		}

		// live_profiles
		if (upgradeDao.isExistTable("live_profiles")) {
			StringBuffer sql = new StringBuffer("INSERT INTO `live_profiles` VALUES ('1', '1', 'PassThrough', '', 'Custom', '5', '2016-07-01 18:25:00', null, null, null, null, null, '-1', null);");
			upgradeDao.executeUpdate(sql.toString());
		}

		// locations
		if (upgradeDao.isExistTable("locations")) {
			StringBuffer sql = new StringBuffer("INSERT INTO `locations` VALUES ('1', 'any', null, null, null, null, null, null, null);");
			upgradeDao.executeUpdate(sql.toString());
		}

		// m2ts_settings
		if (upgradeDao.isExistTable("m2ts_settings")) {

			upgradeDao.addColumn("m2ts_settings", "bitrate_mode", "INT", 11);
			StringBuffer sql = new StringBuffer("INSERT INTO `m2ts_settings` VALUES ('1', null, '', '', null, null, null, '', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '-1');");
			upgradeDao.executeUpdate(sql.toString());
		}

		// network_inputs
		if (upgradeDao.isExistTable("network_inputs")) {

			upgradeDao.addColumn("network_inputs", "live_sync_mode", "INT", 11);
			StringBuffer sql = new StringBuffer("INSERT INTO `network_inputs` VALUES ('1', 'TSOverUDP', 'udp://', null, null, null, null, null, null, null, null, null, '', null, null, null, null, null, null, null, null);");
			upgradeDao.executeUpdate(sql.toString());
		}

		// stream_assemblies
		if (upgradeDao.isExistTable("stream_assemblies")) {
			StringBuffer sql = new StringBuffer("INSERT INTO `stream_assemblies` VALUES ('1', '1', 'Profile', '-1', null, null, '1');");
			upgradeDao.executeUpdate(sql.toString());
		}
		//video_descriptions
		if (upgradeDao.isExistTable("video_descriptions")) {

			upgradeDao.addColumn("video_descriptions", "drm_desc_id", "INT", 11);
			upgradeDao.addColumn("video_descriptions", "mark_id", "INT", 11);
			StringBuffer sql = new StringBuffer("INSERT INTO `video_descriptions` VALUES ('1', null, null, null, null, null, null, 'PassThrough', null, null, null, null, null, null, null, null, null, null, '1', null, '27765500');");
			upgradeDao.executeUpdate(sql.toString());
		}
	}
}
