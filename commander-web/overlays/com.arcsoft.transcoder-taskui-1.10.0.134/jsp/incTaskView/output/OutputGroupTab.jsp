<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div id="OutputGroupTabs" class="OutputGroupTabs">
	<s:iterator value="[0].getOutputGroups()" var="outputGroup" status="outputGroupIterStatus">
		<div class="OutputGroupTab">
			<div class="Title" style="font-weight:bold;">
				<span class="IconExpand" onclick="toggleViewBlock(this, this.parentNode.parentNode)"></span>
				<span>[<s:property value="#outputGroupIterStatus.count"/>]. </span>
				<span><s:property value="[0].settingsType" /></span> - 
				<span><s:property value="[0].container" /></span> : 
				<span><s:property value="[0].description" /></span>
			</div>
			<div class="Body">		
				<%@ include file="OutputGroup.jsp" %>
			</div>
		</div>	
	</s:iterator>
</div>

