<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>


	<div class="row">		
		<span class="TaskLabelText lbl"><s:text name="input.fileLocation"/>:</span>
		<span class="val"><s:property value="[0].body.uri" /></span>		
	</div>
	
	<div class="row">
		<span class="TaskLabelText lbl">&nbsp;</span>
		<span class="val">		
			<s:set value="[0].body.getMediaInfoObject()" var="mediaInfoObject" scope="request"/>	
			<%@ include file="InputMediaInfo.jsp" %>
		</span>		
	</div>
	
	<div class="row">
		<span class="TaskLabelText lbl"><s:text name="input.media_info"/>:</span>
		<span class="val"><%@ include file="../../common/MediaInfoSimpleDescription.jsp" %></span>
	</div>
