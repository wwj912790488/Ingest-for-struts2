package com.arcsoft.commander.agent.service.task.impl;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.util.List;

import com.arcsoft.arcvideo.common.utils.IOUtils;
import com.arcsoft.cluster.app.ActionException;
import com.arcsoft.cluster.app.Request;
import com.arcsoft.cluster.app.Response;
import com.arcsoft.commander.agent.service.settings.NetworkConfigService;
import com.arcsoft.commander.agent.service.settings.NetworkConfiguration;
import com.arcsoft.commander.cluster.action.ActionErrorCode;
import com.arcsoft.commander.cluster.action.ActionHandler;
import com.arcsoft.commander.cluster.action.Actions;
import com.arcsoft.commander.cluster.action.task.GetMediaInfoRequest;
import com.arcsoft.commander.cluster.action.task.GetMediaInfoResponse;
import com.arcsoft.commander.cluster.action.task.GetMediaThumbRequest;
import com.arcsoft.commander.cluster.action.task.GetMediaThumbResponse;
import com.arcsoft.commons.utils.app.App;
import com.arcsoft.commons.utils.app.ShellException;
import com.arcsoft.transcoder.MediaInfoTool;

/**
 * Get media information service.
 * 
 * @author fjli
 */
public class MediaInfoServiceImpl implements ActionHandler {

	private NetworkConfigService networkConfigService;

	public void setNetworkConfigService(NetworkConfigService networkConfigService) {
		this.networkConfigService = networkConfigService;
	}

	@Override
	public int[] getActions() {
		return new int[] {
				Actions.GET_MEDIA_INFO,
				Actions.GET_MEDIA_THUMB
			};
	}

	@Override
	public Response execute(Request request) throws ActionException {
		if (request instanceof GetMediaInfoRequest) {
			return getMediaInfo(((GetMediaInfoRequest) request));
		} else if (request instanceof GetMediaThumbRequest) {
			return getMediaThumb(((GetMediaThumbRequest) request));
		}
		return null;
	}

	private GetMediaInfoResponse getMediaInfo(GetMediaInfoRequest request) {
		GetMediaInfoResponse response = new GetMediaInfoResponse();
		MediaInfoTool mediaInfoTool;
		try {
			mediaInfoTool = new MediaInfoTool(request.getUri());
			mediaInfoTool.setLocalIp(getLocalIpByNio(request.getEth()));
			response.setInfo(mediaInfoTool.getInfo());
			response.setErrorCode(ActionErrorCode.SUCCESS);
		} catch (URISyntaxException e) {
			response.setErrorCode(ActionErrorCode.UNKNOWN_ERROR);
		}
		return response;
	}

	private GetMediaThumbResponse getMediaThumb(GetMediaThumbRequest request) {
		MediaInfoTool mediaInfoTool = null;
		try {
			mediaInfoTool = new MediaInfoTool(request.getUri(), request.getWidth());
			mediaInfoTool.setLocalIp(getLocalIpByNio(request.getEth()));
		} catch (URISyntaxException e) {
			GetMediaThumbResponse response = new GetMediaThumbResponse();
			response.setErrorCode(ActionErrorCode.UNKNOWN_ERROR);
			return response;
		}

		GetMediaThumbResponse response = new GetMediaThumbResponse();
		InputStream is = mediaInfoTool.getThumbnail();
		if (is != null) {
			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			try {
				byte[] buf = new byte[4096];
				int len = 0;
				while ((len = is.read(buf)) != -1) {
					bos.write(buf, 0, len);
				}
				response.setData(bos.toByteArray());
				response.setErrorCode(ActionErrorCode.SUCCESS);
			} catch(IOException e) {
				response.setErrorCode(ActionErrorCode.IO_ERROR);
			} finally {
				IOUtils.closeQuietly(is);
				IOUtils.closeQuietly(bos);
			}
		} else {
			response.setErrorCode(ActionErrorCode.UNKNOWN_ERROR);
		}
		return response;
	}

	private String getLocalIpByNio(String strNio) {
		if (strNio == null)
			return null;
		int nio;
		try {
			nio = Integer.parseInt(strNio);
		} catch (NumberFormatException e) {
			return null;
		}
		NetworkConfiguration config;
		try {
			config = networkConfigService.readConfig();
		} catch (IOException e) {
			return null;
		}
		String eth = config.getEthByNio(nio);
		if (eth == null || eth.isEmpty())
			return null;
		try {
			List<String> results = App.runShell("ifconfig " + eth + " | grep \"inet addr:\" | awk '{split($2, x, \":\"); print x[2]}'");
			if (results != null && !results.isEmpty())
				return results.get(0);
		} catch (ShellException e) {
		}
		return null;
	}

}
