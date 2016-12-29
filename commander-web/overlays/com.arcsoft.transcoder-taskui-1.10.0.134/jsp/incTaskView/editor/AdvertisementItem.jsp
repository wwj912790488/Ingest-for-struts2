<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="AdClip list2columns">
	<div class="row">
		<span class="TaskLabelText lbl"><s:text name="editor.enter_point"/>:</span>
		<span class="val">
			<s:property value='[0].entry' />
			<span>(<s:text name="%{#clip.cropping ? 'editor.enabled' : 'editor.disabled'}"/>)</span>
		</span>
	</div>
	<div class="row">
		<span class="TaskLabelText lbl"><s:text name="editor.ads_location"/>:</span>
		<span class="val"><s:property value='[0].uri' /></span>
	</div>	
	<div class="row">
		<span class="TaskLabelText lbl">&nbsp;</span>
		<s:set value="#clip.getMediaInfoObject()" var="mediaInfoObject" scope="request"/>
		<span class="val"><%@ include file="../input/InputMediaInfo.jsp" %></span>	
	</div>
	
	<div class="row">
		<span class="TaskLabelText lbl"><s:text name="input.media_info"/>:</span>
		<span class="val"><%@ include file="../../common/MediaInfoSimpleDescription.jsp" %></span>
	</div>

	<div class="row">		
		<span class="TaskLabelText lbl"><s:text name="editor.ads_clipping"/>:</span>
		<span class="val"><s:property value='[0].start' />~<s:property value='[0].end' /></span>
	</div>
</div>