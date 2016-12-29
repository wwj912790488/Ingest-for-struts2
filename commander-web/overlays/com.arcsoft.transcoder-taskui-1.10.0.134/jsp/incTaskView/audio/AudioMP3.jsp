<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="AudioMP3" class="AudioDetail">
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="audio.codec"/>:</span>
		<span class="val"><s:property value='#audioDescription.settingsType'/></span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="audio.profile"/>:</span>
		<span class="val"><s:property value='#audioDescription.audioSetting.codecProfile'/></span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="audio.channel"/>:</span>
		<span class="val"><s:text name="%{'AudioChannelMode.' + #audioDescription.audioSetting.channels}" /></span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="audio.sampleRate"/>:</span>
		<span class="val"><s:property value="#audioDescription.audioSetting.sampleRate/1000f"/>KHz</span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="audio.bitrate"/>:</span>
		<span class="val"><s:property value="#audioDescription.audioSetting.bitrate/1000f"/>Kbps</span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="audio.volume_mode"/>:</span>
		<span class="val"><s:text name="%{'AudioVolumnMode.' + #audioDescription.audioSetting.volumeMode}" /></span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="audio.boost_level"/>:</span>
		<span class="val"><s:property value="#audioDescription.audioSetting.boostLevel" /></span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="audio.balance_level"/>:</span>
		<span class="val"><s:property value="#audioDescription.audioSetting.balanceLevel"/></span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="audio.balance_db"/>:</span>
		<span class="val"><s:property value="#audioDescription.audioSetting.balanceDb"/></span>
	</div>
	<div class="param">
		<span class="TaskLabelText lbl"><s:text name="audio.channel_processing"/>:</span>
		<span class="val"><s:text name="%{'AudioChannelProcessingMode.' + #audioDescription.audioSetting.channelProcessing}"/></span>
	</div>
</div>