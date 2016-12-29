package com.arcsoft.commander.domain.media;

import java.util.List;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlRootElement(name = "program")
@XmlType(propOrder = { "name", "used", "canseek", "videos", "audios", "subtitles" })
public class ProgramInfo {

	private Integer id;
	private String name;
	private Boolean used;
	private Boolean canseek;
	private List<VideoInfo> videos;
	private List<AudioInfo> audios;
	private List<SubtitleInfo> subtitles;

	@XmlAttribute(name="idx")
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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

	public Boolean getCanseek() {
		return canseek;
	}

	public void setCanseek(Boolean canseek) {
		this.canseek = canseek;
	}

	@XmlElementWrapper(name = "videos")
	@XmlElement(name = "video")
	public List<VideoInfo> getVideos() {
		return videos;
	}

	public void setVideos(List<VideoInfo> videos) {
		this.videos = videos;
	}

	@XmlElementWrapper(name = "audios")
	@XmlElement(name = "audio")
	public List<AudioInfo> getAudios() {
		return audios;
	}

	public void setAudios(List<AudioInfo> audios) {
		this.audios = audios;
	}

	@XmlElementWrapper(name = "subtitles")
	@XmlElement(name = "subtitle")
	public List<SubtitleInfo> getSubtitles() {
		return subtitles;
	}

	public void setSubtitles(List<SubtitleInfo> subtitles) {
		this.subtitles = subtitles;
	}

}
