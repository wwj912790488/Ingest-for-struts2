<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="HttpStreaming" class="OutputGroupSpecial">
	<div class="paramCol1">
		<span class="TaskLabelText lbl"><s:text name="output.distribution_point"/>:</span>
		<span class="val">${urlbase}/<s:property value="[0].outputGroupSetting.location.uri" /></span>
	</div>
	
	<s:if test="[0].container=='TSOverHTTP'">	
		<%@ include file="TSAdvancedOptions.jsp" %>
	</s:if>	
	
</div>