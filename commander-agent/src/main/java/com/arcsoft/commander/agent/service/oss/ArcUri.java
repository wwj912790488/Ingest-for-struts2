package com.arcsoft.commander.agent.service.oss;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

import org.apache.commons.httpclient.URI;
import org.apache.commons.httpclient.URIException;
import org.apache.log4j.Logger;

import com.arcsoft.arcvideo.common.utils.StringHelper;

public class ArcUri {
	private static Logger logger = Logger.getLogger(ArcUri.class);
	private String originalUri;
	private String userInfoNotDecoded;
	private String fileName;
	private String path;
	private URI uriForParseSchemaAndHost;

	public ArcUri(String uri) throws URIException {
		originalUri = uri;
		uriForParseSchemaAndHost = new URI(originalUri, false);
		userInfoNotDecoded = parseUserInfo();
		fileName = parsefileName();
		path = parsePath();
	}
	
	public String getRawUri(){
		return originalUri;
	}
	
	public int getPort(){
		return uriForParseSchemaAndHost.getPort();
	}

	public String getScheme() {
		return uriForParseSchemaAndHost.getScheme();
	}

	public String getHost() throws URIException {
		return uriForParseSchemaAndHost.getHost();
	}

	public String getPath() {
		return path;
	}

	public String getSuffix() {
		int index = fileName.lastIndexOf(".");
		if (index == -1)
			return "";
		return fileName.substring(index);
	}

	public String getFileName() {
		return fileName;
	}

	public String baseUriFolder() {
		String baseFileName = fileName;
		return originalUri.replace(baseFileName, "");
	}

	public String[] getUserInfo(boolean decode) {
		if (StringHelper.isEmpty(userInfoNotDecoded)){
			return new String[0];
		}
		
		if (decode) {
			String[] infos = userInfoNotDecoded.split(":", 2);
			for (int i = 0; i < infos.length; i++){
				try {
					infos[i] = URLDecoder.decode(infos[i], "UTF-8");
				} catch (UnsupportedEncodingException e) {
					logger.info(e);
				}
			}		
			return infos;
		} else {
			return userInfoNotDecoded.split(":", 2);
		}
	}

	private String parsePath() {
		String uriWithoutSchema = originalUri.replace(
				String.format("%s://", uriForParseSchemaAndHost.getScheme()),
				"");
		return uriWithoutSchema.substring(uriWithoutSchema.indexOf("/"));
	}

	private String parseUserInfo() {
		String uriWithoutSchema = originalUri.replace(
				String.format("%s://", uriForParseSchemaAndHost.getScheme()),
				"");
		String uriWithoutSchemaAndPath = uriWithoutSchema.substring(0,
				uriWithoutSchema.indexOf("/"));
		int index = uriWithoutSchemaAndPath.lastIndexOf("@");
		if (index == -1)
			return "";
		return uriWithoutSchema.substring(0, index);
	}

	private String parsefileName() {
		int index = originalUri.lastIndexOf("/");
		if (index != -1) {
			String fileBaseName = originalUri.substring(index).replace("/", "");
			return fileBaseName;
		}
		return "";
	}
}
