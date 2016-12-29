<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.arcsoft.web4transcoder.domain.output.LiveOutput" %>
<%@ page import="com.arcsoft.web4transcoder.domain.audio.AudioDescription" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<% 
	 /****************  output description in a single line ***********/
	  
	 // - liveOutput in request attributes;
	 LiveOutput liveOutput = (LiveOutput)request.getAttribute("liveOutput");
%>
<span>	
	<!-- Video info -->
	<%if(liveOutput.getStreamAssembly().getVideoDescription()==null) {%>
		No Video
	<%}else{%>
		<s:if test="streamAssembly.videoDescription.passthrough">
			Pass through
		</s:if>
		<s:else>
			${liveOutput.streamAssembly.videoDescription.settingsType }
			<s:if test='streamAssembly.videoDescription.width > 0 && streamAssembly.videoDescription.height > 0' >
			${liveOutput.streamAssembly.videoDescription.width}x${liveOutput.streamAssembly.videoDescription.height}
			</s:if>										
			<s:if test='streamAssembly.videoDescription.videoSetting.framerateFollowSource'>
			</s:if>																			
			<s:elseif test='streamAssembly.videoDescription.videoSetting.getFramerate().toString()!="0"'>
				@${liveOutput.streamAssembly.videoDescription.videoSetting.getFramerate()}fps
			</s:elseif>	
			<s:if test="streamAssembly.videoDescription.settingsType !='DNxHD' && streamAssembly.videoDescription.settingsType !='ProRes' && streamAssembly.videoDescription.settingsType !='DV'">									
				${liveOutput.streamAssembly.videoDescription.videoSetting.rateControlMode}
			</s:if>
			${liveOutput.streamAssembly.videoDescription.videoSetting.bitrate}Kbps 
		</s:else>	
	<%} %>
	|
	<!-- Audio info -->
	<%if(liveOutput.getStreamAssembly().getAudioDescriptions().size()==0) {%>
		No Audio
	<%}else{%>
		<%for(int i=0;i<liveOutput.getStreamAssembly().getAudioDescriptions().size();i++) {
				AudioDescription audioDescription = liveOutput.getStreamAssembly().getAudioDescriptions().get(i);
				request.setAttribute("audioDescription", audioDescription);
		%>
			<s:if test="#request.audioDescription.passthrough">
				Pass through
			</s:if>
			<s:else>
				${audioDescription.settingsType}	
				<s:property
					value="getSampleRateOption(#request.audioDescription.audioSetting.sampleRate)" />kHz
				${audioDescription.audioSetting.channels}
				<s:text name="label.channels" />
				<s:property
					value="getBitRateOption(#request.audioDescription.audioSetting.bitrate)" />
				Kbps
			</s:else>
			<%if(i>=0){break;}/*only output one audio*/ %>
		<%}%>
	<%}%>
</span>