<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="AudioEditor">
	<!-- line3 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="VideoColumn1 LabelAlign LicenseAudioVolumeMode">
				<span class="TaskLabelText"><s:text name="audio.volume_mode"/>:</span>
			</td>
			<td class="LabelEndSpacing LicenseAudioVolumeMode"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2 LicenseAudioVolumeMode">
				<select name="AudioVolumeMode" class="TaskContentText AudioSelect">
					<option value="<s:property value="[0].audioSetting.volumeMode" />" selected="selected"></option>
				</select>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<!-- line4 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="VideoColumn1 LabelAlign LicenseAudioBoost">
				<span class="TaskLabelText"><s:text name="audio.boost_level"/>:</span>
			</td>
			<td class="LabelEndSpacing LicenseAudioBoost"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2 LicenseAudioBoost">
				<select name="AudioBoostLevel" class="TaskContentText AudioSelect">
					<option value="<s:property value="[0].audioSetting.boostLevel" />" selected="selected"></option>
				</select>
			</td>
			<td class="VideoColumn1 LabelAlign LicenseAudioBalance">
				<span class="TaskLabelText"><s:text name="audio.balance_level"/>:</span>
			</td>
			<td class="LabelEndSpacing LicenseAudioBalance"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2 LicenseAudioBalance">
				<select name="AudioBalanceLevel" class="TaskContentText AudioSelect">
					<option value="<s:property value="[0].audioSetting.balanceLevel"/>" selected="selected"></option>
				</select>
			</td>
			<td class="VideoColumn1 LabelAlign LicenseAudioBalance">
				<span class="TaskLabelText"><s:text name="audio.balance_db"/>:</span>
			</td>
			<td class="LabelEndSpacing LicenseAudioBalance"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2 LicenseAudioBalance">
				<input type="text" name="AudioBalanceDb" class="TaskContentText AudioText" 
					value="<s:property value="[0].audioSetting.balanceDb"/>"/>
				<span class="TaskContentText">db</span>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	<div class="AudioRuntimeNotSupport">
	<!-- line5 -->
	<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="VideoColumn1 LabelAlign LicenseChannelProcessing">
				<span class="TaskLabelText"><s:text name="audio.channel_processing"/>:</span>
			</td>
			<td class="LabelEndSpacing LicenseChannelProcessing"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2 LicenseChannelProcessing">
				<select name="AudioChannelProcessing" class="TaskContentText AudioSelect">
					<option value="<s:property value='[0].audioSetting.channelProcessing'/>" selected="selected"></option>
				</select>
			</td>
			<td class="VideoColumn1 LabelAlign LicenseAudioDenoise">
				<span class="TaskLabelText"><s:text name="audio.denoise"/>:</span>
			</td>
			<td class="LabelEndSpacing LicenseAudioDenoise"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2 LicenseAudioDenoise">
				<input type="checkbox" name="AudioDenoise" class="DefaultCheckbox" value="1"
					<s:if test='[0].audioSetting.denoise'>checked="checked"</s:if> />
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div>
	</div>
	<!-- line6 -->
	<%--<div class="LineSpacing"></div>
	<table>
		<tr>
			<td class="VideoColumn1 LabelAlign LicenseFillOnAudioLost">
				<span class="TaskLabelText"><s:text name="audio.fill_on_audio_lost"/>:</span>
			</td>
			<td class="LabelEndSpacing LicenseFillOnAudioLost"><div class="LinePlaceHolder"></div></td>
			<td class="VideoColumn2 LicenseFillOnAudioLost">
				<input type="checkbox" name="FillOnAudioLost" class="DefaultCheckbox" value="1"
					<s:if test='[0].audioSetting.fillOnAudioLost'>checked="checked"</s:if> />
			</td>
			<td><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
	<div class="LineSpacing"></div> --%>
	<!-- line6.1 -->
	<div class="LicenseAudioPlayRate">
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="VideoColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="video.video_play_rate"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="VideoColumn2">
					<input type="text" name="AudioPlayRate" class="TaskContentText AudioText"
						value="<s:property value='[0].audioPlayRate'/>"/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
	</div>
	
	<!-- line7 -->
	<div class="LicenseAudioCodecId">
		<div class="LineSpacing"></div>
		<table>
			<tr>
				<td class="VideoColumn1 LabelAlign">
					<span class="TaskLabelText"><s:text name="audio.audio_codec_id"/>:</span>
				</td>
				<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
				<td class="VideoColumn2">
					<input type="text" name="AudioCodecId" class="TaskContentText AudioText"
						value="<s:property value='[0].audioCodecId'/>"/>
				</td>
				<td><div class="LinePlaceHolder"></div></td>
			</tr>
		</table>
		<div class="LineSpacing"></div>
	</div>
</div>