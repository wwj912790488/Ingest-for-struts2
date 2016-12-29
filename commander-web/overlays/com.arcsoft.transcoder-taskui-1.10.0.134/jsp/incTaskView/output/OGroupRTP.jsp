<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="RtpStreaming" class="OutputGroupSpecial">
	<div class="paramCol1">
		<span class="TaskLabelText lbl"><s:text name="output.destination"/>:</span>
		<span class="val"><s:property value="[0].outputGroupSetting.location.uri" /></span>
	</div>
	<div class="paramCol1">
		<span class="TaskLabelText lbl"><s:text name="output.buffer_size"/>:</span>
		<span class="val"><s:property value="[0].outputGroupSetting.bufferSize" /></span>
	</div>
	
	<s:if test="[0].container=='RTPOverES'">	
		<%@ include file="ESSetting.jsp" %>
	</s:if>	
	<s:else>
		<%@ include file="TSOverRTPSetting.jsp" %>
	</s:else>
</div>