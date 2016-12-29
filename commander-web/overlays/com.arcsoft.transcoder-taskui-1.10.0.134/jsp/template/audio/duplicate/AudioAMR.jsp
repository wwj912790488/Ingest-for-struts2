<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="AudioAMR" class="AudioDetail">
	<!-- line0 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="audio.codec"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="AudioCodec" class="SummaryTrigger TaskContentText AudioSelect">
					<option value="AMR" selected="selected">AMR</option>
				</select>
				<input type="hidden" name="AudioSetting" value="AMR"/>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- line1 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="audio.profile"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="AudioCodecProfile" class="SummaryTrigger TaskContentText AudioSelect">
					<option value="NB" selected="selected">NB</option>
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
					<option value="1" selected="selected"></option>
				</select>
			</td>
			<td class="VideoColumn1 LabelAlign">
				<span class="TaskLabelText"><s:text name="audio.sampleRate"/>:</span>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2">
				<select name="AudioSampleRate" class="SummaryTrigger TaskContentText AudioSelect">
					<option value="1" selected="selected"></option>
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
					value="4750"/>
				<span class="TaskContentText">Kbps</span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<s:include value="/jsp/template/audio/duplicate/AudioEditor.jsp"/>
</div>