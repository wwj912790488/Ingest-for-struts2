package com.arcsoft.commander.controller;

import java.util.ArrayList;
import java.util.List;

public class LiveInput {

	private String uri;
	private Integer programId;
	private Integer videoId;
	private Integer audioId;

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

}
