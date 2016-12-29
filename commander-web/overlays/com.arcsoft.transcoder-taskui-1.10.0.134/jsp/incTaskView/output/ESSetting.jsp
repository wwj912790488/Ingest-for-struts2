<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="ESSetting">
	<div class="paramCol1">
		<span class="lbl" style="font-weight: bold;"><s:text name="output.essetting"/></span>
		<span class="val"></span>
	</div>

	<div class="paramCol1">
		<span class="TaskLabelText lbl"><s:text name="output.destination"/>:</span>
		<span class="val"><s:property value="[0].containerSetting.targetPath" /></span>
	</div>

	<div class="paramCol1">
		<span class="TaskLabelText lbl"><s:text name="output.targetName"/>:</span>
		<span class="val"><s:property value="[0].containerSetting.targetName" /></span>
	</div>
	<div class="paramCol1">
		<span class="TaskLabelText lbl"><s:text name="output.extension"/>:</span>
		<span class="val"><s:property value="[0].containerSetting.extension" /></span>
	</div>
	<div class="paramCol2">
		<span class="TaskLabelText lbl"><s:text name="essetting.video_port"/>:</span>
		<span class="val"><s:property value="[0].containerSetting.videoPort" /></span>
	</div>
	<div class="paramCol2">
		<span class="TaskLabelText lbl"><s:text name="essetting.audio_port"/>:</span>
		<span class="val"><s:property value="[0].containerSetting.audioPort" /></span>
	</div>
	
</div>
