<!DOCTYPE HTML>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<%@ page import="com.arcsoft.arcvideo.web.jsp.JspContext"%>


<html>
<head>

<%@ include file="/jsp/include/urlbase.jsp" %>

<%
JspContext jspContext = new JspContext(request, response, out);

jspContext.addCssRef("style/UIStyle.css");
jspContext.addCssRef("style/TaskDetail.css");

jspContext.addJSRef("js/common/CommonDefine.js");
jspContext.addJSRef("js/common/jquery.js");
jspContext.addJSRef("js/common/util.js");
jspContext.addJSRef("js/common/uictrl.js");

%>
</head>

<body onload="OnContentPackagingLoad()">
	<%request.setAttribute("__topTabActive__", "taskmgr");%><%@ include file="/jsp/include/top.jsp" %>

	<div class="ContentPos">
		<div style="height:10px"></div>
		<s:include value="/jsp/material/MaterialBody.jsp"/>
	</div>
</body>
</html>
