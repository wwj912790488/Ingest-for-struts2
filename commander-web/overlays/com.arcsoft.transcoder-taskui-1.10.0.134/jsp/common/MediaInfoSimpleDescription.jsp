<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.arcsoft.util.MediaInfo" %>
<%@ page import="com.arcsoft.util.DateTimeHelper" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
	/****************  media info description in a single html line ***********/
	
	 //	parameters in request attributes:
	 // 	- videoInfo 
	 //		- audioInfo
	 //		- subtitleInfo
	 //		- mediaDuration

	 
	//MediaInfo.VideoInfo 	videoInfo 		= (MediaInfo.VideoInfo)request.getAttribute("videoInfo");
	//MediaInfo.AudioInfo 	audioInfo 		= (MediaInfo.AudioInfo)request.getAttribute("audioInfo");
	//MediaInfo.SubTitleInfo 	subtitleInfo 	= (MediaInfo.SubTitleInfo)request.getAttribute("subtitleInfo");
	//String 					mediaDuration	= (String)request.getAttribute("mediaDuration");

%>
<span>	
	<!-- Video info -->
	<%if(request.getAttribute("videoInfo")==null){ %>
		<span>N/A</span>
	<%}else{ %>
		<span>${videoInfo.get("codec")}</span>
		<span>${videoInfo.get("resolution")}</span>
		<span>${videoInfo.get("framerate")}fps</span>
		<span>${videoInfo.get("bitrate")}</span>
	<%}%>
	<span>|</span><!-- Audio info -->
	<%if(request.getAttribute("audioInfo")==null){ %>
		<span>N/A</span>
	<%}else{ %>
		<span>${audioInfo.get("codec")}</span>
		<span>${audioInfo.get("samplerate")}</span>
		<span>${audioInfo.get("channel")} channels</span>
		<span>${audioInfo.get("bitrate")}</span>
		<span>${audioInfo.get("bitdepth")==null?'':audioInfo.get("bitdepth")}${empty audioInfo.get("bitdepth") ? '': 'bit'}</span>
	<%} %>
	<span>|</span><!-- duration -->
	<span>${mediaDuration==null ? "N/A" : mediaDuration}</span>
</span>
