<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="VideoDescription">
	<s:if test='#liveOutput.streamAssembly.videoDescription.passthrough'>
		<span class="TaskLabelText">Pass through</span>
	</s:if>
	<s:else>					
		<div class="ParamTable">
			<div class="ParamTableTitle"><s:text name="video.codec"/></div>
			<s:if test='#liveOutput.streamAssembly.videoDescription.settingsType.equalsIgnoreCase("H264")'>
				<%@ include file="VideoH264.jsp" %>
			</s:if>
			<s:if test='#liveOutput.streamAssembly.videoDescription.settingsType.equalsIgnoreCase("AVS")'>
				<%@ include file="VideoAVS.jsp" %>
			</s:if>
			<s:if test='#liveOutput.streamAssembly.videoDescription.settingsType.equalsIgnoreCase("H265")'>	
				<%@ include file="VideoH265.jsp" %>
			</s:if>
			<s:elseif test='#liveOutput.streamAssembly.videoDescription.settingsType.equalsIgnoreCase("MPEG2")'>
				<%@ include file="VideoMPEG2.jsp" %>
			</s:elseif>
			<s:elseif test='#liveOutput.streamAssembly.videoDescription.settingsType.equalsIgnoreCase("MPEG1")'>
				<%@ include file="VideoMPEG1.jsp" %>
			</s:elseif>
			<s:elseif test='#liveOutput.streamAssembly.videoDescription.settingsType.equalsIgnoreCase("H263")'>
				<%@ include file="VideoH263.jsp" %>
			</s:elseif>
			<s:elseif test='#liveOutput.streamAssembly.videoDescription.settingsType.equalsIgnoreCase("DV")'>
				<%@ include file="VideoDV.jsp" %>
			</s:elseif>
			<s:elseif test='#liveOutput.streamAssembly.videoDescription.settingsType.equalsIgnoreCase("S263")'>
				<%@ include file="VideoS263.jsp" %>
			</s:elseif>
			<s:elseif test='#liveOutput.streamAssembly.videoDescription.settingsType.equalsIgnoreCase("VC-1")'>
				<%@ include file="VideoWMV.jsp" %>
			</s:elseif>
			<s:elseif test='#liveOutput.streamAssembly.videoDescription.settingsType.equalsIgnoreCase("MPEG4")'>
				<%@ include file="VideoMPEG4.jsp" %>
			</s:elseif>
			<s:elseif test='#liveOutput.streamAssembly.videoDescription.settingsType.equalsIgnoreCase("DNxHD")'>
				<%@ include file="VideoDNxHD.jsp" %>
			</s:elseif>
			<s:elseif test='#liveOutput.streamAssembly.videoDescription.settingsType.equalsIgnoreCase("ProRes")'>
				<%@ include file="VideoProRes.jsp" %>
			</s:elseif>
		</div>
		<div class="ParamTable">
			<div class="ParamTableTitle"><s:text name="video.process"/></div>
			<%@ include file="VideoProcessing.jsp" %>
		</div>
		<div class="ParamTable">
			<div class="ParamTableTitle"><s:text name="video.output_editor"/></div>
			<%@ include file="VideoEditing.jsp" %>
		</div>

	</s:else>
</div>
