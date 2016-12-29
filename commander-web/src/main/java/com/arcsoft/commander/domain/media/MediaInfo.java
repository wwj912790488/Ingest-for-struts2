package com.arcsoft.commander.domain.media;

import java.util.List;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlRootElement(name = "mediaInfo")
@XmlType(propOrder = { "container", "size", "programs", "duration", "video", "audio" })
public class MediaInfo {

	private String name;
	private String container;
	private Long size;
	private List<ProgramInfo> programs;
	private Long duration;
	private VideoInfo video;
	private AudioInfo audio;

	@XmlAttribute(name = "name")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getContainer() {
		return container;
	}

	public void setContainer(String container) {
		this.container = container;
	}

	public Long getSize() {
		return size;
	}

	public void setSize(Long size) {
		this.size = size;
	}

	@XmlElementWrapper(name = "programs")
	@XmlElement(name = "program")
	public List<ProgramInfo> getPrograms() {
		return programs;
	}

	public void setPrograms(List<ProgramInfo> programs) {
		this.programs = programs;
	}

	public Long getDuration() {
		return duration;
	}

	public void setDuration(Long duration) {
		this.duration = duration;
	}

	public VideoInfo getVideo() {
		return video;
	}

	public void setVideo(VideoInfo video) {
		this.video = video;
	}

	public AudioInfo getAudio() {
		return audio;
	}

	public void setAudio(AudioInfo audio) {
		this.audio = audio;
	}

}
