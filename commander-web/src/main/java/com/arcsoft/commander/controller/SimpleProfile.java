package com.arcsoft.commander.controller;

import org.w3c.dom.Document;
import org.w3c.dom.Element;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.ByteArrayOutputStream;
import java.io.UnsupportedEncodingException;

@XmlRootElement(name = "SimpleProfile")
public class SimpleProfile {


	private String videoCodec;
	private String videoResolution;
	private String videoPARDisp;
	private String videoFrameRateDisp;
	private String videoRateControl;
	private String videoBitrate;
	private String videoMaxBitrate;
	private String videoGopSize;
	private String videoBFrame;
	private String videoReferenceFrame;
	private String qualityLevelDisp;
	private String audioCodec;
	private String audioChannel;
	private String audioSampleRate;
	private String audioVolumeMode;
	private String audioBitrateKbps;
	private String audioBoostLevel;
	private String audioChannelProcessing;
	private String audioCodecProfile;
	private String audioDenoise;

	@XmlElement(name = "VideoCodec")
	public String getVideoCodec() {
		return videoCodec;
	}

	public void setVideoCodec(String videoCodec) {
		this.videoCodec = videoCodec;
	}

	@XmlElement(name = "VideoResolution")
	public String getVideoResolution() {
		return videoResolution;
	}

	public void setVideoResolution(String videoResolution) {
		this.videoResolution = videoResolution;
	}

	@XmlElement(name = "VideoPARDisp")
	public String getVideoPARDisp() {
		return videoPARDisp;
	}

	public void setVideoPARDisp(String videoPARDisp) {
		this.videoPARDisp = videoPARDisp;
	}

	@XmlElement(name = "VideoFrameRateDisp")
	public String getVideoFrameRateDisp() {
		return videoFrameRateDisp;
	}

	public void setVideoFrameRateDisp(String videoFrameRateDisp) {
		this.videoFrameRateDisp = videoFrameRateDisp;
	}

	@XmlElement(name = "VideoRateControl")
	public String getVideoRateControl() {
		return videoRateControl;
	}

	public void setVideoRateControl(String videoRateControl) {
		this.videoRateControl = videoRateControl;
	}

	@XmlElement(name = "VideoBitrate")
	public String getVideoBitrate() {
		return videoBitrate;
	}

	public void setVideoBitrate(String videoBitrate) {
		this.videoBitrate = videoBitrate;
	}

	@XmlElement(name = "VideoMaxBitrate")
	public String getVideoMaxBitrate() {
		return videoMaxBitrate;
	}

	public void setVideoMaxBitrate(String videoMaxBitrate) {
		this.videoMaxBitrate = videoMaxBitrate;
	}

	@XmlElement(name = "VideoGopSize")
	public String getVideoGopSize() {
		return videoGopSize;
	}

	public void setVideoGopSize(String videoGopSize) {
		this.videoGopSize = videoGopSize;
	}

	@XmlElement(name = "VideoBFrame")
	public String getVideoBFrame() {
		return videoBFrame;
	}

	public void setVideoBFrame(String videoBFrame) {
		this.videoBFrame = videoBFrame;
	}

	@XmlElement(name = "VideoReferenceFrame")
	public String getVideoReferenceFrame() {
		return videoReferenceFrame;
	}

	public void setVideoReferenceFrame(String videoReferenceFrame) {
		this.videoReferenceFrame = videoReferenceFrame;
	}

	@XmlElement(name = "QualityLevelDisp")
	public String getQualityLevelDisp() {
		return qualityLevelDisp;
	}

	public void setQualityLevelDisp(String qualityLevelDisp) {
		this.qualityLevelDisp = qualityLevelDisp;
	}

	@XmlElement(name = "AudioCodec")
	public String getAudioCodec() {
		return audioCodec;
	}

	public void setAudioCodec(String audioCodec) {
		this.audioCodec = audioCodec;
	}

	@XmlElement(name = "AudioChannel")
	public String getAudioChannel() {
		return audioChannel;
	}

	public void setAudioChannel(String audioChannel) {
		this.audioChannel = audioChannel;
	}

	@XmlElement(name = "AudioSampleRate")
	public String getAudioSampleRate() {
		return audioSampleRate;
	}

	public void setAudioSampleRate(String audioSampleRate) {
		this.audioSampleRate = audioSampleRate;
	}

	@XmlElement(name = "AudioVolumeMode")
	public String getAudioVolumeMode() {
		return audioVolumeMode;
	}

	public void setAudioVolumeMode(String audioVolumeMode) {
		this.audioVolumeMode = audioVolumeMode;
	}

	@XmlElement(name = "AudioBitrateKbps")
	public String getAudioBitrateKbps() {
		return audioBitrateKbps;
	}

	public void setAudioBitrateKbps(String audioBitrateKbps) {
		this.audioBitrateKbps = audioBitrateKbps;
	}

	@XmlElement(name = "AudioBoostLevel")
	public String getAudioBoostLevel() {
		return audioBoostLevel;
	}

	public void setAudioBoostLevel(String audioBoostLevel) {
		this.audioBoostLevel = audioBoostLevel;
	}

	@XmlElement(name = "AudioChannelProcessing")
	public String getAudioChannelProcessing() {
		return audioChannelProcessing;
	}

	public void setAudioChannelProcessing(String audioChannelProcessing) {
		this.audioChannelProcessing = audioChannelProcessing;
	}

	@XmlElement(name = "AudioCodecProfile")
	public String getAudioCodecProfile() {
		return audioCodecProfile;
	}

	public void setAudioCodecProfile(String audioCodecProfile) {
		this.audioCodecProfile = audioCodecProfile;
	}

	@XmlElement(name = "AudioDenoise")
	public String getAudioDenoise() {
		return audioDenoise;
	}

	public void setAudioDenoise(String audioDenoise) {
		this.audioDenoise = audioDenoise;
	}

	public Document toXmlDOM(){
		Document doc = null;
//		try {
//			doc = DocumentBuilderFactory.newInstance().newDocumentBuilder().newDocument();
//
//			Element e;
//			Element root;
//			//root
//			root = doc.createElement("result");
//			root.setAttribute("id", String.valueOf(this.taskId));
//
//			//status
//			if(this.status!=null){
//				e = doc.createElement("status");
//				e.appendChild(doc.createTextNode(this.status.getKey()));
//				root.appendChild(e);
//			}
//			//startAt
//			if(this.startAt!=null){
//				e = doc.createElement("startAt");
//				e.appendChild(doc.createTextNode(this.startAt));
//				root.appendChild(e);
//			}
//			//completeAt
//			if(this.completeAt!=null){
//				e = doc.createElement("completeAt");
//				e.appendChild(doc.createTextNode(this.completeAt));
//				root.appendChild(e);
//			}
//			//lastError
//			if(this.lastError!=null){
//				e = doc.createElement("lastError");
//				e.appendChild(doc.createTextNode(this.lastError));
//				root.appendChild(e);
//			}
//			//progress
//			if(this.progress!=null){
//				Element p = doc.createElement("progress");
//				for(int i=0;i<this.progress.length;i++){
//					e = doc.createElement("input");
//					e.setAttribute("index", String.valueOf(i));
//					e.setAttribute("time", DateTimeHelper.formatDuration(this.progress[i].getTimeConsumed()));
//					e.setAttribute("power", String.format("%.1f",this.progress[i].getPower()/100.0f));
//					e.setAttribute("ProgressFormat", String.valueOf(this.progress[i].getProgressFromatStatus()));
//					e.appendChild(doc.createTextNode(String.valueOf(this.progress[i].getValue())));
//
//					p.appendChild(e);
//				}
//				root.appendChild(p);
//			}
//			//fps
//			if(this.framerate!=null){
//				e = doc.createElement("framerate");
//				e.appendChild(doc.createTextNode(String.valueOf(this.framerate.toString())));
//				root.appendChild(e);
//			}
//			//cpu_count
//			if(this.cpuCount!=null){
//				e = doc.createElement("cpu_count");
//				e.appendChild(doc.createTextNode(String.valueOf(this.cpuCount.intValue())));
//				root.appendChild(e);
//			}
//			//gpu_count
//			if(this.gpuCount!=null){
//				e = doc.createElement("gpu_count");
//				e.appendChild(doc.createTextNode(String.valueOf(this.gpuCount.intValue())));
//				root.appendChild(e);
//			}
//			//cpu_usage
//			if(this.cpuUsage!=null){
//				e = doc.createElement("cpu_usage");
//				e.appendChild(doc.createTextNode(String.valueOf(this.cpuUsage.intValue())));
//				root.appendChild(e);
//			}
//			//gpu_usage
//			if(this.gpuUsage!=null){
//				e = doc.createElement("gpu_usage");
//				e.appendChild(doc.createTextNode(String.valueOf(this.gpuUsage.intValue())));
//				root.appendChild(e);
//			}
//
//			doc.appendChild(root);
//		} catch (Exception e) {
//			com.arcsoft.util.LOG.error(getClass(), null,e);
//		}
		return doc;
	}

	@Override
	public String toString() {
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		try {
			Document doc = toXmlDOM();
			Element elem = doc.getDocumentElement();
			Transformer trans = TransformerFactory.newInstance().newTransformer();
			trans.transform(new DOMSource(elem), new StreamResult(out));
		} catch (Exception e) {
			com.arcsoft.util.LOG.error(getClass(), null,e);
		}
		try {
			return out.toString("UTF-8");
		} catch (UnsupportedEncodingException e) {
			com.arcsoft.util.LOG.error(getClass(), null,e);
		}
		return "";
	}
}

