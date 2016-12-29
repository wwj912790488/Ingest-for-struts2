<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.arcsoft.arcvideo.web.jsp.JspContext"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix='sec' uri='http://www.springframework.org/security/tags' %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<title>ArcVideo Commander</title>
<%
JspContext jspContext = new JspContext(request, response, out);
jspContext.addFavicon("images/favicon.ico");
jspContext.addJSRef("js/jquery.js");
jspContext.addJSRef("js/jquery.get.js");
jspContext.addJSRef("js/common.js");
jspContext.addCssRef("css/common.css");
jspContext.addJSRef("js/appui.listview.js");
%>
</head>
<body>
