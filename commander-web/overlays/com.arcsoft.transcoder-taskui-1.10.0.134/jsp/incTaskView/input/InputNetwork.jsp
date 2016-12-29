<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>


	<div class="row">
		<span class="TaskLabelText lbl"><s:text name="input.protocol_type"/>:</span>
		<span class="val">
			<s:property value="[0].body.protocol" />
			<span style="margin-left:160px;">
				<s:text name="input.allow_program_id_change"/>:  ${body.allowProgramIdChange==1?'YES':'NO'}
			</span>
		</span>
	</div>
	<!--  
	<div class="row">
		<span class="TaskLabelText lbl"><s:text name="input.failoverTime"/>:</span>
		<span class="val"><s:property value="[0].failoverTime" />ms </span>
	</div>
	-->
	<div class="row">
		<span class="TaskLabelText lbl"><s:text name="input.localEth"/>:</span>
		<span class="val"><s:property value="getLocalIpOption(#input.body.srcIp)" /></span>
	</div>	
	<div class="row">
		<span class="TaskLabelText lbl"><s:text name="label.inputUrl"/>:</span>
		<span class="val"><s:property value="[0].body.uri" /></span>
	</div>
		
	<div class="row">
		<span class="TaskLabelText lbl"></span>
		<span class="val">
			<s:set value="[0].body.getMediaInfoObject()" var="mediaInfoObject" scope="request"/>	
			<%@ include file="InputMediaInfo.jsp" %>
		</span>
	</div>
	
	<div class="row">
		<span class="TaskLabelText lbl"><s:text name="input.media_info"/>:</span>
		<span class="val"><%@ include file="../../common/MediaInfoSimpleDescription.jsp" %></span>
	</div>
	
<s:if test="[0].body.protocol=='ESOverRTP'">
		
	<div class="row">
		<span class="TaskLabelText lbl"><s:text name="esoverrtp.audio_uri"/>:</span>
		<span class="val"><s:property value="[0].body.audioRtpUri" /></span>
	</div>
	<div class="row">	
		<span class="TaskLabelText lbl"><s:text name="esoverrtp.video_rtcp"/>:</span>
		<span class="val"><s:property value="[0].body.videoRtcpUri" /></span>
	</div>
	<div class="row">
		<span class="TaskLabelText lbl"><s:text name="esoverrtp.audio_rtcp"/>:</span>
		<span class="val"><s:property value="[0].body.audioRtcpUri" /></span>
	</div>
	<div class="row">
		<span class="TaskLabelText lbl"><s:text name="esoverrtp.sdp_file"/>:</span>
		<span class="val"><s:property value="[0].body.sdp" />	</span>		
	</div>
		
</s:if>
	

