<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="AudioMP3" class="AudioDetail">
	<!-- line1 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="audio.codec"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="AudioCodec" class="SummaryTrigger TaskContentText AudioSelect">
					<option value="MP3" selected="selected">MP3</option>
				</select>
				<input type="hidden" name="AudioSetting" value="MP3"/>
				<span class="AudioCodecText TaskContentText Hide">MP3</span>
			</td>
			<td class="VideoColumn1 LabelAlign Hide">
				<span class="TaskLabelText"><s:text name="audio.profile"/>:</span>
			</td>
			<td class="LabelEndSpacing Hide"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2 Hide">
				<select name="AudioCodecProfile" class="SummaryTrigger TaskContentText AudioSelect">
					<option value="L3" selected="selected" >L3</option>
				</select>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- line2 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="audio.channel"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="AudioChannel" class="SummaryTrigger TaskContentText AudioSelect">
					<option value="<s:property value="[0].audioSetting.channels" />" selected="selected"></option>
				</select>
			</td>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="audio.sampleRate"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="AudioSampleRate" class="SummaryTrigger TaskContentText AudioSelect">
					<option value="<s:property value="[0].audioSetting.sampleRate"/>" selected="selected"></option>
				</select>
				<span class="TaskContentText">KHz</span>
			</td>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="audio.bitrate"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="AudioBitrate" class="SummaryTrigger TaskContentText AudioSelect">
					<option value="" selected="selected"></option>								
				</select>
				<input type="text" name="AudioBitrateKbps" class="SummaryTrigger TaskContentText AudioText" 
					value=""/>
				<input type="text" name="AudioBitrateBps" class="TaskContentText AudioText Hide" 
					value="<s:property value="[0].audioSetting.bitrate"/>"/>
				<span class="TaskContentText">Kbps</span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<s:include value="/jsp/template/audio/AudioEditor.jsp"/>
</div>