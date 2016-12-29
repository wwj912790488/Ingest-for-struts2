<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.arcsoft.util.MediaInfo" %>
<%@ page import="java.util.*" %>
<%@ page import="com.arcsoft.util.DateTimeHelper" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
	/****************  media info description in a single html line ***********/
	
	 //	parameters in request attributes:
	 // 	- mediaInfo : com.arcsoft.util.MediaInfo
	 //		- programId
	 //		- audioTrackId
	 //		- subtitleId
	 
if(request.getAttribute("mediaInfoObject") instanceof MediaInfo){
	
	MediaInfo.TSMediaInfo.Program 	program			= null;
	MediaInfo.VideoInfo 			videoInfo 		= null;
	MediaInfo.AudioInfo 			audioInfo 		= null;
	MediaInfo.SubTitleInfo 			subtitleInfo 	= null;
	String 							mediaDuration	= null;

	String programId 	= request.getAttribute("programId")==null ? null : request.getAttribute("programId").toString();
	String audioTrackId = request.getAttribute("audioTrackId")==null? null : request.getAttribute("audioTrackId").toString();
	String subtitleId 	= request.getAttribute("subtitleId")==null? null : request.getAttribute("subtitleId").toString();
	Object mediaInfo 	= request.getAttribute("mediaInfoObject");
	
	if (mediaInfo instanceof MediaInfo.CommonMediaInfo) {
		MediaInfo.CommonMediaInfo cmi = (MediaInfo.CommonMediaInfo) mediaInfo;
		videoInfo = cmi.getVideoInfo();
		audioInfo = cmi.getAudioInfo();	
		try{mediaDuration = DateTimeHelper.formatDuration(Long.parseLong(cmi.getDuration())/1000);}catch(Exception e){}
	} else {
		MediaInfo.TSMediaInfo tmi = (MediaInfo.TSMediaInfo) mediaInfo;
		List<MediaInfo.TSMediaInfo.Program> programs = tmi.getPrograms();
		for(MediaInfo.TSMediaInfo.Program p : tmi.getPrograms()){
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
				try{mediaDuration = DateTimeHelper.formatDuration(Long.parseLong(videoInfo!=null ? videoInfo.get("duration") : audioInfo.get("duration"))/1000);}catch(Exception e){}
				
				break;
			}			
		}
	}
	
	request.setAttribute("program", program);
	request.setAttribute("videoInfo", videoInfo);
	request.setAttribute("audioInfo", audioInfo);
	request.setAttribute("subtitleInfo", subtitleInfo);
	request.setAttribute("mediaDuration", mediaDuration);
}else{
	request.setAttribute("program", null);
	request.setAttribute("videoInfo", null);
	request.setAttribute("audioInfo", null);
	request.setAttribute("subtitleInfo", null);
	request.setAttribute("mediaDuration", null);
}
%>	
<span>
	<span><s:text name="input.program"/>: ${program==null ? "N/A" : program.name}</span>
	<span><s:text name="input.audio_track"/>: ${audioInfo==null ? "N/A" : audioInfo.get("name")}</span>
	<span><s:text name="input.subtitle"/>: ${subtitleInfo==null ? "N/A" : subtitleInfo.get("name")}</span>
</span>	



	

	



