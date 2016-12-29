<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
	//stack[0]: outputGroup
%>
<div id="OutputGroup" class="OutputGroup">

	<s:if test='[0].settingsType.equalsIgnoreCase("AppleStreaming")'>
		<%@ include file="OGroupAppleStreaming.jsp" %>
	</s:if>
	<s:elseif test='[0].settingsType.equalsIgnoreCase("FlashStreaming")'>
		<%@ include file="OGroupFlash.jsp" %>
	</s:elseif>
	<s:elseif test='[0].settingsType.equalsIgnoreCase("FileArchive")'>
		<%@ include file="OGroupArchive.jsp" %>
	</s:elseif>
	<s:elseif test='[0].settingsType.equalsIgnoreCase("UdpStreaming")'>
		<%@ include file="OGroupUDP.jsp" %>
	</s:elseif>
	<s:elseif test='[0].settingsType.equalsIgnoreCase("RtpStreaming")'>
		<%@ include file="OGroupRTP.jsp" %>
	</s:elseif>
	<s:elseif test='[0].settingsType.equalsIgnoreCase("MSStreaming")'>
		<%@ include file="OGroupMSS.jsp" %>
	</s:elseif>
	<s:elseif test='[0].settingsType.equalsIgnoreCase("HttpStreaming")'>
		<%@ include file="OGroupHTTP.jsp"%>
	</s:elseif>
	<s:elseif test='[0].settingsType.equalsIgnoreCase("ASIStreaming")'>
		<%@ include file="OGroupASI.jsp"%>
	</s:elseif>

	<s:if test="[0].drmDescription != null">
		<%@ include file="DRMOptions.jsp" %>
	</s:if>

	<div class="OutputStreams">
		<div class="HeadTitle">
			<s:text name="output.streamSetting"/>
		</div>		
		<s:iterator value="[0].getLiveOutputs()" var="liveOutput">
			<%@ include file="Output.jsp" %>
		</s:iterator>
	</div>		
							
</div>
