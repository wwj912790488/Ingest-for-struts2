package com.arcsoft.commander.action.task;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;

import javax.servlet.ServletContext;

import org.apache.log4j.Logger;

import com.arcsoft.commander.domain.server.Server;

/**
 * Get media file thumb from the specified server.
 * 
 * @author fjli
 */
public class GetMediaFileThumbAction extends BaseGetMediaFileInfoAction {

	private static final Logger log = Logger.getLogger(GetMediaFileThumbAction.class);
	private static final long serialVersionUID = 7807864619008941459L;
	private static final String DEFAULT_IMAGE_PATH = "/images/progress_thumb_waiting.jpg";
	private static final int DEFAULT_THUMB_WIDTH = 120;

	private ServletContext servletContext;
	private int width = DEFAULT_THUMB_WIDTH;

	public void setServletContext(ServletContext servletContext) {
		this.servletContext = servletContext;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	/**
	 * Get the media thumb stream.
	 */
	public InputStream getThumbStream() throws Exception {
		byte[] data = getMediaThumb();
		if (data == null) {
			String file = servletContext.getRealPath(DEFAULT_IMAGE_PATH);
			try {
				data = Files.readAllBytes(Paths.get(file));
			} catch (IOException e) {
				log.error("read default thumb image file failed.");
			}
		}
		if (data == null)
			data = new byte[0];
		return new ByteArrayInputStream(data);
	}

	/**
	 * Get media thumb.
	 */
	protected byte[] getMediaThumb() {
		byte[] buf = null;
		Server agent = getServer();
		try {
			buf = cmdMediaInfoService.getMediaThumb(agent, uri, eth, width);
		} catch (RuntimeException e) {
			log.error("get media thumb " + uri + " from " + agent.getIp() + " failed.", e);
		}
		return buf;
	}

}
