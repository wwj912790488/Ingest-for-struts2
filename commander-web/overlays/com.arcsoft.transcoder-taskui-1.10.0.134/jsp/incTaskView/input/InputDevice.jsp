<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>


	<div class="row">
		<span class="TaskLabelText lbl"><s:text name="common.port"/>:</span>
		<span class="val"><s:property value='[0].body.channel'/></span>
	</div>
	
	<div class="row">
		<span class="TaskLabelText lbl"></span>
		<span class="val">
			<s:set name="mediaInfoObject" value="#input.body.mediaInfoObject==null ? '' : #input.body.mediaInfoObject" scope="request"/>
			<%@ include file="InputMediaInfo.jsp" %>
		</span>
	</div>
	
	<div class="row">
		<span class="TaskLabelText lbl"></span>
		<span class="val">
			<%@ include file="../../common/MediaInfoSimpleDescription.jsp" %>
		</span>
	</div>
