package com.arcsoft.commander.agent.service.oss;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;

import org.apache.log4j.Logger;

import com.aliyun.oss.OSSClient;
import com.aliyun.oss.model.CompleteMultipartUploadRequest;
import com.aliyun.oss.model.CompleteMultipartUploadResult;
import com.aliyun.oss.model.InitiateMultipartUploadRequest;
import com.aliyun.oss.model.InitiateMultipartUploadResult;
import com.aliyun.oss.model.ObjectMetadata;
import com.aliyun.oss.model.PartETag;
import com.aliyun.oss.model.UploadPartRequest;
import com.aliyun.oss.model.UploadPartResult;

/**
 * 
 * @author xpeng
 */
public class OssUploadItem {
	private Logger logger = Logger.getLogger(getClass());

	private OssSettings settings;
	private OSSClient client;
	private String uploadId;
	private PartETag[] partETags;
	private long fileSize;
	private long partSize;

	public OssUploadItem(OssSettings settings) {
		this.settings = settings;
	}

	public void initOSSClient() {
		client = new OSSClient(settings.getEndpoint(), settings.getAccessId(),
				settings.getAccessSecret());
	}

	public int initMultiUpload(long fileSize, long partSize) {
		this.fileSize = fileSize;
		this.partSize = partSize;
		int partCount = (int) ((fileSize + partSize - 1) / partSize);
		this.partETags = new PartETag[partCount];

		// 开始Multipart Upload
		InitiateMultipartUploadRequest initiateMultipartUploadRequest = new InitiateMultipartUploadRequest(
				settings.getBucket(), settings.getKey());
		InitiateMultipartUploadResult initiateMultipartUploadResult = client
				.initiateMultipartUpload(initiateMultipartUploadRequest);

		uploadId = initiateMultipartUploadResult.getUploadId();
		// 打印UploadId
		logger.debug("UploadId: " + uploadId);
		return partCount;
	}

	public int initMultiUpload(long fileSize, long partSize,
			ObjectMetadata metadata) {
		this.fileSize = fileSize;
		this.partSize = partSize;
		int partCount = (int) ((fileSize + partSize - 1) / partSize);
		this.partETags = new PartETag[partCount];

		// 开始Multipart Upload
		InitiateMultipartUploadRequest initiateMultipartUploadRequest = new InitiateMultipartUploadRequest(
				settings.getBucket(), settings.getKey(), metadata);
		InitiateMultipartUploadResult initiateMultipartUploadResult = client
				.initiateMultipartUpload(initiateMultipartUploadRequest);

		uploadId = initiateMultipartUploadResult.getUploadId();
		// 打印UploadId
		logger.debug("UploadId: " + uploadId);
		return partCount;
	}

	public void completeMultiUpload() {
		CompleteMultipartUploadRequest completeMultipartUploadRequest = new CompleteMultipartUploadRequest(
				settings.getBucket(), settings.getKey(), uploadId,
				Arrays.asList(partETags));

		// 完成分块上传
		CompleteMultipartUploadResult completeMultipartUploadResult = client
				.completeMultipartUpload(completeMultipartUploadRequest);

		// 打印Object的ETag
		logger.debug(completeMultipartUploadResult.getETag());
	}

	public void multiUpload(int index, InputStream is) throws IOException {
		// 获取文件流

		// 跳到每个分块的开头
		long skipBytes = partSize * index;
		is.skip(skipBytes);

		// 计算每个分块的大小
		long size = partSize < fileSize - skipBytes ? partSize : fileSize
				- skipBytes;
		// 创建UploadPartRequest，上传分块
		UploadPartRequest uploadPartRequest = new UploadPartRequest();
		uploadPartRequest.setBucketName(settings.getBucket());
		uploadPartRequest.setKey(settings.getKey());
		uploadPartRequest.setUploadId(uploadId);
		uploadPartRequest.setInputStream(is);
		uploadPartRequest.setPartSize(size);
		uploadPartRequest.setPartNumber(index + 1);

		logger.debug("multi upload start index: " + index + ", size: " + size);
		UploadPartResult uploadPartResult = client
				.uploadPart(uploadPartRequest);
		logger.debug("multi upload end index: " + index + ", tag: "
				+ uploadPartResult.getPartETag());

		// 将返回的PartETag保存到List中。
		partETags[index] = uploadPartResult.getPartETag();
		// 关闭文件
		is.close();

	}

}
