<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="FileArchive">
	<div class="paramCol1">
		<span class="TaskLabelText lbl"><s:text name="output.destination"/>:</span>
		<span class="val"><s:property value="[0].outputGroupSetting.location.uri" /></span>
	</div>		
	<div class="paramCol1">
		<span class="TaskLabelText lbl"><s:text name="output.targetName"/>:</span>
		<span class="val"><s:property value="[0].outputGroupSetting.targetName" /></span>
	</div>	
	
	<div class="paramCol1">		
		<span class="TaskLabelText lbl"><s:text name="output.extension"/>:</span>
		<span class="val"><s:property value="[0].outputGroupSetting.extension" /></span>
	</div>		
	
	<s:if test="[0].outputGroupSetting.hasProperty([0].container, 'playlistName')">
	<div class="paramCol1">	
		<span class="TaskLabelText lbl"><s:text name="output.playlist_name"/>:</span>
		<span class="val"><s:property value="[0].outputGroupSetting.playlistName" />.m3u8</span>
	</div>
	</s:if>
	
	<s:if test="[0].outputGroupSetting.hasProperty([0].container, 'segmentType')">
	<div class="paramCol1">		
		<span class="TaskLabelText lbl"><s:text name="output.segment_type"/>:</span>
		<span class="val">
			<span><s:text name="%{'SegmentType.' + [0].outputGroupSetting.segmentType}" /></span>
			<s:if test="[0].outputGroupSetting.segmentType==1">
			<span>(<s:text name="output.segmentLength"/>:<s:property value="[0].outputGroupSetting.SegmentRecordLength" /><s:text name="common.second"/>)</span>
			</s:if>
			<s:if test="[0].outputGroupSetting.segmentType==2">
			<span>(<s:text name="output.epg_file"/>:<s:property value="[0].outputGroupSetting.epgFile" />)</span>
			</s:if>
		</span>
	</div>
	</s:if>	
	
	<s:if test="[0].outputGroupSetting.hasProperty([0].container, 'segmentName')">
	<div class="paramCol1">		
		<span class="TaskLabelText lbl"><s:text name="output.segment_name"/>:</span>
		<span class="val"><s:property value="[0].outputGroupSetting.segmentName" />.ts</span>
	</div>
	</s:if>
		
	<s:if test="[0].outputGroupSetting.hasProperty([0].container, 'segmentLength') && [0].outputGroupSetting.segmentType==0">
	<div class="paramCol2">
		<span class="TaskLabelText lbl"><s:text name="output.segmentLength"/>:</span>				
		<span class="val"><s:property value="[0].outputGroupSetting.segmentLength" /> <s:text name="common.second"/></span>
	</div>	
	</s:if>		
	
	<s:if test="[0].outputGroupSetting.hasProperty([0].container, 'deleteUploaded')">
	<div class="paramCol2">				
		<span class="TaskLabelText lbl"><s:text name="output.delete_expired"/>:</span>
		<span class="val">		
			<s:text name="%{[0].outputGroupSetting.deleteUploaded ? 'output.delete_expired_yes' : 'output.delete_expired_no' }" />
		</span>
	</div>
	</s:if>
	
	<s:if test="[0].containerSetting.containerSettingType.item2=='TS'">	
		<%@ include file="TSAdvancedOptions.jsp" %>
	</s:if>	
	<s:if test="[0].containerSetting.containerSettingType.item2=='AVI'">	
		<%@ include file="AVIAdvancedOptions.jsp" %>
	</s:if>	
	<s:if test="[0].containerSetting.containerSettingType.item2=='MXF'">	
		<%@ include file="MXFAdvancedOptions.jsp" %>
	</s:if>			
</div>