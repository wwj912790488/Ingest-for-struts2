package com.arcsoft.commander.domain.record;

/**
 * Schedule delete file.
 * 
 * @author jt
 */
public class EpgInfo {

	private Integer id;
	private Integer channelId;
	private String filePath;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getChannelId() {
		return channelId;
	}

	public void setChannelId(Integer channelId) {
		this.channelId = channelId;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
}
