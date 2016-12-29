<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
String port = "";
if(request.getServerPort() != 80) {
	port =":" + request.getServerPort();
}
request.setAttribute("urlbase", request.getScheme()+"://"+request.getServerName() + port + request.getContextPath());
%>
<div id="TaskBody" class="TaskBody" >
	<input type="hidden" id="TaskId" value="<s:property value="[0].taskId" />"/>
	<input type="hidden" id="FirstExpand" value="1"/>
	<%@ include file="ViewTaskInput.jsp" %>
	
	<div style="border-bottom:1px solid #dddddd; width:99%; height:12px;"></div>
		
	<%@ include file="ViewTaskOutput.jsp" %>

	<div style="height:15px;"></div>
</div>

