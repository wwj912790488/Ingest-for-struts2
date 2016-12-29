<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<!DOCTYPE HTML>
<html>
<head>
	<%--<%@ include file="/jsp/include/urlbase.jsp" %>--%>

        <s:include value="/jsp/pattern2/task/taskjs.jsp"/>
<style type="text/css">
html, body {
	overflow: hidden;
}
.ContentPos {
	width: 100%;
	margin-left: 0px;
	margin-right: 0px;
	position: absolute;
	top: 13px;
	bottom: 0px;
	left: 0px;
	right: 0px;
	overflow-y: auto;
	background-color: #fff;
}
.Task {
	width: 100%;
}

</style>
</head>

<body onload="OnPageReady()">
	<div class="ContentPos">
		<s:include value="/jsp/pattern2/profile/FrameProfileBody.jsp"/>
	</div>
	<div style="height: 100px"></div>
	<div id="TemplateLib" style="display: none">
		<s:include value="/jsp/pattern2/task/tasktemplate.jsp"/>
	</div>
</body>
</html>
