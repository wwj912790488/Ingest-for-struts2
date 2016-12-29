<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<!DOCTYPE HTML>
<html>
<head>

<s:include value="/jsp/pattern2/task/taskjs.jsp"/>
</head>

<body class="task_body" onload="OnPageReady()">
	<div class="TaskContentPos">
		<s:include value="/jsp/pattern2/task/TaskBody.jsp"/>
	</div>
	
	<div id="TemplateLib" style="display: none">
		<s:include value="/jsp/pattern2/task/tasktemplate.jsp"/>
	</div>
</body>
</html>
