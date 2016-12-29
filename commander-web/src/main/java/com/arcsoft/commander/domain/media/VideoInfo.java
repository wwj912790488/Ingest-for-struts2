package com.arcsoft.commander.domain.media;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlRootElement(name = "video")
@XmlType(propOrder = { "pid", "name", "used", "codec", "duration", "bitrate", "framerate", "resolution", "aspectRatio" })
public class VideoInfo {

	private Integer pid;
	private String name;
	private Boolean used;
	private String codec;
	private Long duration;
	private String bitrate;
	private Float framerate;
	private String resolution;
	private String aspectRatio;

	public Integer getPid() {
		return pid;
	}

	public void setPid(Integer pid) {
		this.pid = pid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Boolean getUsed() {
		return used;
	}

	public void setUsed(Boolean used) {
		this.used = used;
	}

	public String getCodec() {
		return codec;
	}

	public void setCodec(String codec) {
		this.codec = codec;
	}

	public Long getDuration() {
		return duration;
	}

	public void setDuration(Long duration) {
		this.duration = duration;
	}

	public String getBitrate() {
		return bitrate;
	}

	public void setBitrate(String bitrate) {
		this.bitrate = bitrate;
	}

	public Float getFramerate() {
		return framerate;
	}

	public void setFramerate(Float framerate) {
		this.framerate = framerate;
	}

	public String getResolution() {
		return resolution;
	}

	public void setResolution(String resolution) {
		this.resolution = resolution;
	}

	@XmlElement(name = "aspect_ratio")
	public String getAspectRatio() {
		return aspectRatio;
	}

	public void setAspectRatio(String aspectRatio) {
		this.aspectRatio = aspectRatio;
	}

}
