<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="TSAdvancedOptions ParamTableBody">	
	<div class="paramCol1">
		<span class="lbl" style="font-weight: bold;"><s:text name="output.advanced_options"/></span>
		<span class="val"></span>
	</div>

	<div class="paramCol1">
		<span class="TaskLabelText lbl"><s:text name="avi.split_audio"/>:</span>
		<span class="val">${containerSetting.splitAudio==1?'YES':'NO'}</span>
	</div>
	<div class="paramCol1">
		<span class="TaskLabelText lbl"><s:text name="avi.audio_path"/>:</span>
		<span class="val"><s:property value="[0].containerSetting.audioPath" /></span>
	</div>
	<div class="paramCol2">
		<span class="TaskLabelText lbl"><s:text name="avi.audio_name"/>:</span>
		<span class="val"><s:property value="[0].containerSetting.audioName" /></span>
	</div>
	<div class="paramCol2">
		<span class="TaskLabelText lbl"><s:text name="output.extension"/>:</span>
		<span class="val"><s:property value="[0].containerSetting.audioExt" /></span>
	</div>


</div>