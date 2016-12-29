package com.arcsoft.commander.action.task;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

import org.apache.log4j.Logger;

import com.arcsoft.commander.domain.server.Server;

/**
 * Get media file info.
 * 
 * @author fjli
 */
public class GetMediaFileInfoAction extends BaseGetMediaFileInfoAction {

	private static final long serialVersionUID = -2804157655988893779L;
	private static final Logger log = Logger.getLogger(GetMediaFileInfoAction.class);

	/**
	 * Get media info xml stream.
	 */
	public InputStream getInfoStream() {
		byte[] buf = getMediaInfo();
		if (buf == null)
			buf = new byte[0];
		return new ByteArrayInputStream(buf);
	}

	/**
	 * Get media info from sever.
	 */
	protected byte[] getMediaInfo() {
		byte[] buf = null;
		Server agent = getServer();
		try {
			buf = cmdMediaInfoService.getMediaInfo(agent, uri, eth);
		} catch(RuntimeException e) {
			log.error("get media info " + uri + " from " + agent.getIp() + " failed.", e);
		}
		return buf;
	}

}
