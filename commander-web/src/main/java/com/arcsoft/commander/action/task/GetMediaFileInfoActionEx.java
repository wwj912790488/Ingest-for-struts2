package com.arcsoft.commander.action.task;

import java.util.List;

import com.arcsoft.util.DateTimeHelper;
import com.arcsoft.util.MediaInfo;

/**
 * Get media file info and display as one line text.
 * 
 * @author fjli
 */
public class GetMediaFileInfoActionEx extends GetMediaFileInfoAction {

	private static final long serialVersionUID = 131383884014148862L;

	private String programId;
	private String audioTrackId;
	private String subtitleId;

	private MediaInfo.TSMediaInfo.Program program;
	private MediaInfo.VideoInfo videoInfo;
	private MediaInfo.AudioInfo audioInfo;
	private MediaInfo.SubTitleInfo subtitleInfo;
	private String mediaDuration;

	public void setProgramId(String programId) {
		this.programId = programId;
	}

	public void setAudioTrackId(String audioTrackId) {
		this.audioTrackId = audioTrackId;
	}

	public void setSubtitleId(String subtitleId) {
		this.subtitleId = subtitleId;
	}

	public MediaInfo.TSMediaInfo.Program getProgram() {
		return program;
	}

	public MediaInfo.VideoInfo getVideoInfo() {
		return videoInfo;
	}

	public MediaInfo.AudioInfo getAudioInfo() {
		return audioInfo;
	}

	public MediaInfo.SubTitleInfo getSubtitleInfo() {
		return subtitleInfo;
	}

	public String getMediaDuration() {
		return mediaDuration;
	}

	@Override
	public String execute() throws Exception {
		try {
			showOneLineInfo();
		} catch (Exception e) {
		}
		return SUCCESS;
	}

	private void showOneLineInfo() throws Exception {
		byte[] mitInfo = getMediaInfo();
		if(mitInfo==null)
			return;
		
		Object mediaInfo = MediaInfo.getMediaInfo(new String(mitInfo,"UTF-8"));
		
		if(mediaInfo==null)
			return;
		
		if (mediaInfo instanceof MediaInfo.CommonMediaInfo) {
			MediaInfo.CommonMediaInfo cmi = (MediaInfo.CommonMediaInfo) mediaInfo;
			videoInfo = cmi.getVideoInfo();
			audioInfo = cmi.getAudioInfo();	
			try {
				mediaDuration = DateTimeHelper.formatDuration(Long
						.parseLong(cmi.getDuration())/1000);
			} catch (Exception e) {
			}
		} else {
			MediaInfo.TSMediaInfo tmi = (MediaInfo.TSMediaInfo) mediaInfo;
			List<MediaInfo.TSMediaInfo.Program> programs = tmi.getPrograms();
			for(MediaInfo.TSMediaInfo.Program p : programs){
				if(programs.size()==1 || 
						p.getId() != null &&
						( p.getId().equalsIgnoreCase(programId) ||
							(programId==null||programId.equals("-1")) && p.isUsed() ) )
				{
					program = p;
					for(MediaInfo.VideoInfo vi : p.getVideoInfos()){
						//if(vi.getId()!=null && vi.getId().equalsIgnoreCase(videoTrackId)){
						videoInfo = vi;
						break;
						//}
					}
					List<MediaInfo.AudioInfo> audioInfos = p.getAudioInfos();
					for(MediaInfo.AudioInfo au : audioInfos){
						if(audioInfos.size()==1 ||
								au.getId()!=null && 
								( au.getId().equalsIgnoreCase(audioTrackId) || 
										(audioTrackId==null||audioTrackId.equals("-1")) && au.isUsed() ) )
						{
							audioInfo = au;
							break;
						}
					}
					List<MediaInfo.SubTitleInfo> subTitleInfos = p.getSubTitleInfos();
					for(MediaInfo.SubTitleInfo au : subTitleInfos){
						if(subTitleInfos.size()==1 ||
								au.getId()!=null && 
								( au.getId().equalsIgnoreCase(subtitleId) ||
										(subtitleId==null||subtitleId.equals("-2")) && au.isUsed() ) )
						{
							subtitleInfo = au;
							break;
						}
					}
					try {
						mediaDuration = DateTimeHelper.formatDuration(Long
								.parseLong(videoInfo != null ? videoInfo
										.get("duration") : audioInfo
										.get("duration")) / 1000);
					} catch (Exception e) {
					}
					
					break; //~if program
				}
			}//~for
		}
	}

}
