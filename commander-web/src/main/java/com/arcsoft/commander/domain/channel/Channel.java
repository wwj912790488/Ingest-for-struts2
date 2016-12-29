package com.arcsoft.commander.domain.channel;

import java.util.Date;

import com.arcsoft.commander.domain.server.ServerGroup;

public class Channel {

	private Integer id;
	private String name;
	private SourceType type;
	private String uri;
	private Integer programId;
	private Integer videoId;
	private Integer audioId;
	private Date created;
	private Date lastModified;
	private ServerGroup group;
	private String videoInfo;
	private String audioInfo;
	private String defRecordPath;
	private String screenshotPath;
	private String audioAll;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public SourceType getType() {
		return type;
	}

	public void setType(SourceType type) {
		this.type = type;
	}

	public String getUri() {
		return uri;
	}

	public void setUri(String uri) {
		this.uri = uri;
	}

	public Integer getProgramId() {
		return programId;
	}

	public void setProgramId(Integer programId) {
		this.programId = programId;
	}

	public Integer getVideoId() {
		return videoId;
	}

	public void setVideoId(Integer videoId) {
		this.videoId = videoId;
	}

	public Integer getAudioId() {
		return audioId;
	}

	public void setAudioId(Integer audioId) {
		this.audioId = audioId;
	}

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}

	public Date getLastModified() {
		return lastModified;
	}

	public void setLastModified(Date lastModified) {
		this.lastModified = lastModified;
	}

	public ServerGroup getGroup() {
		return group;
	}

	public void setGroup(ServerGroup group) {
		this.group = group;
	}

	public String getVideoInfo() {
		return videoInfo;
	}

	public void setVideoInfo(String videoInfo) {
		this.videoInfo = videoInfo;
	}

	public String getAudioInfo() {
		return audioInfo;
	}

	public void setAudioInfo(String audioInfo) {
		this.audioInfo = audioInfo;
	}

	public String getDefRecordPath() {
		return defRecordPath;
	}

	public void setDefRecordPath(String defRecordPath) {
		this.defRecordPath = defRecordPath;
	}

	public String getScreenshotPath() {
		return screenshotPath;
	}

	public void setScreenshotPath(String screenshotPath) {
		this.screenshotPath = screenshotPath;
	}

	public String getAudioAll() {
		return audioAll;
	}

	public void setAudioAll(String audioAll) {
		this.audioAll = audioAll;
	}
}
