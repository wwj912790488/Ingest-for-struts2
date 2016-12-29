<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="TSAdvancedOptions ParamTableBody">	
	<div class="paramCol1">
		<span class="lbl" style="font-weight: bold;"><s:text name="output.advanced_options"/></span>
		<span class="val"></span>
	</div>

	<div class="paramCol1">
		<span class="TaskLabelText lbl">Operational Pattern:</span>
		<span class="val">
		<s:if test='containerSetting.operationalPattern==0'>OP1A</s:if>
		<s:elseif test='containerSetting.operationalPattern==1'>OP-ATOM</s:elseif>
		<s:else>AVID OP-ATOM</s:else>
		</span>
	</div>
	<div class="paramCol3">
		<span class="TaskLabelText lbl"><s:text name="output.mxf_setting.audio_track_follow_source"/>:</span>
		<span class="val">${containerSetting.audioTrackFollowSource==1?'YES':'NO' }</span>
	</div>
	<div class="paramCol3">
		<span class="TaskLabelText lbl"><s:text name="output.mxf_setting.audio_channel_split"/>:</span>
		<span class="val">${containerSetting.audioChannelSplit==1?'YES':'NO' }</span>
	</div>


</div>