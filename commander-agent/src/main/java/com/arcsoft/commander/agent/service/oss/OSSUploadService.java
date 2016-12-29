package com.arcsoft.commander.agent.service.oss;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Properties;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

import org.apache.commons.httpclient.URIException;
import org.apache.log4j.Logger;

import com.aliyun.oss.model.ObjectMetadata;
import com.arcsoft.arcvideo.common.utils.IOUtils;
import com.arcsoft.arcvideo.common.utils.StringHelper;
import com.arcsoft.util.SystemExecutor;

public class OSSUploadService {

	private Logger logger = Logger.getLogger(OSSUploadService.class);
	private boolean featureEnabled;
	private String mappedLocalPath;
	private long partSize;
	private long maxAge;
	private Properties mimeTypes;

	public void setFeatureEnabled(boolean featureEnabled) {
		this.featureEnabled = featureEnabled;
	}

	public void setMappedLocalPath(String mappedLocalPath) {
		this.mappedLocalPath = mappedLocalPath;
	}

	public void setPartSize(long partSize) {
		this.partSize = partSize;
	}

	public void setMaxAge(long maxAge) {
		this.maxAge = maxAge;
	}

	public void setMimeTypes(Properties mimeTypes) {
		this.mimeTypes = mimeTypes;
	}

	private String getMimeType(String uri) {
		try {
			return mimeTypes.getProperty("mime.type" + new ArcUri(uri).getSuffix());
		} catch (URIException e) {
			return null;
		}
	}

	/**
	 * Is upload to OSS feature enabled.
	 */
	public boolean isFeatureEnabled() {
		return featureEnabled;
	}

	/**
	 * Mapping OSS path to local path.
	 * 
	 * @param uri - the oss path
	 * @return mapped local path.
	 */
	public String mappingToLocalPath(String uri) {
		String hashKey = null;
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			hashKey = StringHelper.toHexString(md.digest(uri.getBytes()));
		} catch (NoSuchAlgorithmException e) {
			hashKey = uri.replaceAll("[/\\?\\*\\>\\<\\|\\\"\\:\\\\]", "_");
		}
		return mappedLocalPath + "/" + hashKey;
	}

	/**
	 * Upload local file to OSS.
	 * 
	 * @param file - the local file to upload
	 * @param ossUri - the oss uri
	 */
	public void upload(final File file, String ossUri) throws InterruptedException, IOException {
		long t = System.nanoTime();
		final OssSettings ossSettings = OssUriParser.parse(ossUri);
		logger.info("upload " + file.getAbsolutePath() + " to " + ossSettings.getKey());

		final OssUploadItem uploadItem = new OssUploadItem(ossSettings);
		uploadItem.initOSSClient();

		ObjectMetadata meta = new ObjectMetadata();
		meta.setContentLength(file.length());
		meta.setCacheControl(String.format("max-age=%d", maxAge));
		String contentType = getMimeType(ossSettings.getUri());
		if (!StringHelper.isEmpty(contentType)) {
			meta.setContentType(contentType);
		}
		int partCount = uploadItem.initMultiUpload(file.length(), partSize, meta);

		final CountDownLatch counter = new CountDownLatch(partCount);
		final boolean[] results = new boolean[partCount];
		for (int i = 0; i < partCount; i++) {
			final int partIndex = i;
			SystemExecutor.getThreadPoolExecutor().execute(new Runnable() {

				@Override
				public void run() {
					logger.info(String.format("upload oss file %s,index=%d,begin", ossSettings.getUri(), partIndex));
					FileInputStream inputstream = null;
					try {
						inputstream = new FileInputStream(file);
						uploadItem.multiUpload(partIndex, inputstream);
						results[partIndex] = true;
					} catch (Exception e) {
						logger.error("upload multipart[" + partIndex + "] failed: " + e.getMessage(), e);
					} finally {
						IOUtils.closeQuietly(inputstream);
						counter.countDown();
						logger.info(String.format("upload oss file %s,index=%d,end", ossSettings.getUri(), partIndex));
					}
				}
			});
		}
		counter.await();
		uploadItem.completeMultiUpload();
		logger.info("upload " + ossSettings.getKey() + " spent " + TimeUnit.NANOSECONDS.toSeconds(System.nanoTime() - t) + "s.");
		for (int i = 0; i < partCount; i++) {
			if (!results[i]) {
				throw new IOException("one or more parts upload failed.");
			}
		}
	}

}
