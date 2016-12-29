<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<!DOCTYPE HTML>
<html>
<head>
<%@ include file="/jsp/include/jsonheader.jsp" %>
<%@ include file="/jsp/include/urlbase.jsp" %>

<%jspContext.addCssRef("css/common.css");%>

<s:include value="/jsp/pattern2/task/taskjs.jsp"/>

<%jspContext.addJSRef("js/jquery.extend.js");%>
<%jspContext.addJSRef("js/task/taskextension.js");%>

<style type="text/css">
html, body {
	overflow: hidden;
}
.ContentPos {
	position: absolute;
	top: 0px;
	bottom: 0px;
	left: 0px;
	right: 0px;
	overflow-x: hidden;
	overflow-y: auto;
	width: 100%;
	background-color: #fff;
}
.Task {
	width: 100%;
}

</style>
</head>

<body onload="OnTaskExtensionPageReady()">
	<div class="ContentPos">
		<s:include value="/jsp/pattern2/task/TaskBody.jsp"/>
	</div>
	<div style="height: 100px"></div>
	<div id="TemplateLib" style="display: none">
		<s:include value="/jsp/pattern2/task/tasktemplate.jsp"/>
	</div>
</body>
</html>
