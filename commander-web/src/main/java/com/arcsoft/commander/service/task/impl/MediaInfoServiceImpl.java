package com.arcsoft.commander.service.task.impl;

import java.io.ByteArrayInputStream;
import java.net.URISyntaxException;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;

import org.apache.log4j.Logger;

import com.arcsoft.commander.cluster.action.task.GetMediaInfoRequest;
import com.arcsoft.commander.cluster.action.task.GetMediaInfoResponse;
import com.arcsoft.commander.cluster.action.task.GetMediaThumbRequest;
import com.arcsoft.commander.cluster.action.task.GetMediaThumbResponse;
import com.arcsoft.commander.domain.media.MediaInfo;
import com.arcsoft.commander.domain.server.Server;
import com.arcsoft.commander.exception.server.RemoteException;
import com.arcsoft.commander.service.remote.RemoteExecutorServiceSupport;
import com.arcsoft.commander.service.task.MediaInfoService;
import com.arcsoft.transcoder.MediaInfoTool;

/**
 * The media info service implementation.
 * 
 * @author fjli
 */
public class MediaInfoServiceImpl extends RemoteExecutorServiceSupport implements MediaInfoService {

	private static final int DEFAULT_EXEXUTE_TIMEOUT = 30000;
	private static final int DEFAULT_CONNECTION_TIMEOUT = 5000;

	private Logger log = Logger.getLogger(MediaInfoServiceImpl.class);
	private int connectionTimeout = DEFAULT_CONNECTION_TIMEOUT;
	private int executeTimeout = DEFAULT_EXEXUTE_TIMEOUT;

	public void setConnectionTimeout(int connectionTimeout) {
		this.connectionTimeout = connectionTimeout;
	}

	public void setExecuteTimeout(int executeTimeout) {
		this.executeTimeout = executeTimeout;
	}

	@Override
	public MediaInfo getMediaInfoObject(Server server, String uri, String eth) {
		byte[] data = getMediaInfo(server, uri, eth);
		if (data != null && data.length > 0) {
			try {
				JAXBContext context = JAXBContext.newInstance(MediaInfo.class);
				Unmarshaller um = context.createUnmarshaller();
				return (MediaInfo) um.unmarshal(new ByteArrayInputStream(data));
			} catch (Exception e) {
				log.error("convert data to media info failed.", e);
			}
		}
		return null;
	}

	@Override
	public byte[] getMediaInfo(Server server, String uri, String eth) {
		if (server != null) {
			GetMediaInfoRequest request = new GetMediaInfoRequest();
			request.setUri(uri);
			request.setEth(eth);
			GetMediaInfoResponse response = remoteExecute(request, server, connectionTimeout, executeTimeout);
			if (!response.isSuccess())
				throw new RemoteException(server);
			return response.getInfo();
		} else {
			try {
				return new MediaInfoTool(uri).getInfo();
			} catch (URISyntaxException e) {
				return null;
			}
		}
	}

	@Override
	public byte[] getMediaThumb(Server server, String uri, String eth, Integer width) {
		GetMediaThumbRequest request = new GetMediaThumbRequest();
		request.setUri(uri);
		request.setEth(eth);
		request.setWidth(width);
		GetMediaThumbResponse response = remoteExecute(request, server, connectionTimeout, executeTimeout);
		if (!response.isSuccess())
			throw new RemoteException(server);
		return response.getData();
	}

}
