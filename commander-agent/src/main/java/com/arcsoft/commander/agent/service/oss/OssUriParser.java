package com.arcsoft.commander.agent.service.oss;

import org.apache.log4j.Logger;

import com.arcsoft.arcvideo.common.utils.StringHelper;

public class OssUriParser {

	private static Logger logger = Logger.getLogger(OssUriParser.class);

	public static OssSettings parse(String url) {

		OssSettings settings = new OssSettings();
		settings.setUri(url);
		try {
			String uri4Parse = url;
			ArcUri ossUri = new ArcUri(uri4Parse);
			if (ossUri.getScheme().equals("oss")) {
				String host = ossUri.getHost();
				if (StringHelper.isNotEmpty(host)) {
					settings.setEndpoint("http://" + host);
				}
				
				String[] result = ossUri.getUserInfo(true);
				for (int i = 0; i < result.length ;i++){
					if (i == 0){
						settings.setAccessId(result[i]);
					}
					
					if (i == 1){
						settings.setAccessSecret(result[i]);
					}
				}
			}

			String pathWithBucketName = ossUri.getPath();
			if (StringHelper.isNotEmpty(pathWithBucketName)) {
				pathWithBucketName = pathWithBucketName.substring(1);
				String[] spilted = pathWithBucketName.split("/");
				if (spilted.length > 1) {
					settings.setBucket(spilted[0]);
					settings.setKey(pathWithBucketName.replace(
							spilted[0] + "/", ""));
				}
			}

		} catch (Exception e) {
			logger.error(e);
		}
		return settings;
	}
}