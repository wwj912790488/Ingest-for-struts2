<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<%-- <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">--%>
<!DOCTYPE HTML>
<html>
<head>
<%@ include file="/jsp/include/urlbase.jsp" %>

<s:include value="/jsp/task/taskjs.jsp"/>
</head>

<body onload="OnPageReady()">
	<%request.setAttribute("__topTabActive__", "taskmgr");%><%@ include file="/jsp/include/top.jsp" %>

	<div class="TaskContentPos">
		<s:include value="/jsp/task/TaskBody.jsp"/>
		<s:include value="/jsp/task/taskbutton.jsp"/>
	</div>
	<div style="height: 100px"></div>
	
	<div id="TemplateLib" style="display: none">
		<s:include value="/jsp/task/tasktemplate.jsp"/>
	</div>
</body>
</html>
