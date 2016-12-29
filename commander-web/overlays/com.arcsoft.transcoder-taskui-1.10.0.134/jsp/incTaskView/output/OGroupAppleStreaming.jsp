<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="AppleStreaming" class="OutputGroupSpecial">
	<div class="paramCol1">
		<span class="TaskLabelText lbl"><s:text name="output.destination"/>:</span>
		<span class="val"><s:property value="[0].outputGroupSetting.location.uri" /></span>
	</div>
	<div class="paramCol1">
		<span class="TaskLabelText lbl"><s:text name="output.targetName"/>:</span>
		<span class="val"><s:property value="[0].outputGroupSetting.targetName" />.m3u8</span>
	</div>
	<div class="paramCol1">
		<span class="TaskLabelText lbl"><s:text name="output.playlist_name"/>:</span>
		<span class="val"><s:property value="[0].outputGroupSetting.playlistName" />.m3u8</span>
	</div>
	<div class="paramCol1">
		<span class="TaskLabelText lbl"><s:text name="output.segment_name"/>:</span>
		<span class="val"><s:property value="[0].outputGroupSetting.segmentName" />.ts</span>
	</div>
	<div class="paramCol2">
		<span class="TaskLabelText lbl"><s:text name="output.segmentLength"/>:</span>
		<span class="val"><s:property value="[0].outputGroupSetting.segmentLength" /></span>
	</div>

	<div class="paramCol2">
		<span class="TaskLabelText lbl"><s:text name="output.delete_expired"/>:</span>
		<span class="val"><s:property value="[0].outputGroupSetting.deleteUploaded ? 'Yes':'No' "/></span>	
	</div>
	
</div>