package com.arcsoft.commander.domain.media;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlRootElement(name="audio")
@XmlType(propOrder = { "pid", "name", "used", "language", "codec", "duration", "bitrate", "channel", "samplerate", "bitdepth" })
public class AudioInfo {

	private Integer pid;
	private String name;
	private Boolean used;
	private String language;
	private String codec;
	private Long duration;
	private String bitrate;
	private Integer channel;
	private String samplerate;
	private Integer bitdepth;

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

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
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

	public Integer getChannel() {
		return channel;
	}

	public void setChannel(Integer channel) {
		this.channel = channel;
	}

	public String getSamplerate() {
		return samplerate;
	}

	public void setSamplerate(String samplerate) {
		this.samplerate = samplerate;
	}

	public Integer getBitdepth() {
		return bitdepth;
	}

	public void setBitdepth(Integer bitdepth) {
		this.bitdepth = bitdepth;
	}

}
