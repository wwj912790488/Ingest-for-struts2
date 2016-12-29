<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="ESOverRTPSetting">
	<input type="hidden" name="VideoRtpUri"
		value="<s:property value="[0].body.VideoRtpUri" />"/>
	<%--<div class="LineSpacing"></div>
	<table >
		<tr>
			<td class="InputColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="esoverrtp.audio_uri"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="InputURIInput">
				<input type="text" name="AudioRtpUri" class="TaskContentText InputURIInput"
					value="<s:property value="[0].body.audioRtpUri" />"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<div class="LineSpacing"></div>
	<table >
		<tr>
			<td class="InputColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="esoverrtp.video_rtcp"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="InputURIInput">
				<input type="text" name="VideoRtcpUri" class="TaskContentText InputURIInput"
					value="<s:property value="[0].body.videoRtcpUri" />"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<div class="LineSpacing"></div>
	<table >
		<tr>
			<td class="InputColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="esoverrtp.audio_rtcp"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="InputURIInput">
				<input type="text" name="AudioRtcpUri" class="TaskContentText InputURIInput"
					value="<s:property value="[0].body.audioRtcpUri" />"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div> --%>
	<div class="LineSpacing"></div>
	<table >
		<tr>
			<td class="InputColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="esoverrtp.sdp_file"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="InputURIInput">
				<input type="text" name="SDPURI" class="TaskContentText InputURIInput"
					value="<s:property value="[0].body.sdp" />"/>
			</td>
			<td class="PreButtonSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="InputOpenFileButton">
				<table class="OpenSDPTrigger MouseHover">
					<tr class="BTN_Container">
						<td class="BTN_Left"></td>
						<td class="BTN_Center">
							<span class="TaskLabelText"><s:text name="common.select"/></span>
						</td>
						<td class="BTN_Right"></td>
					</tr>
				</table>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
</div>