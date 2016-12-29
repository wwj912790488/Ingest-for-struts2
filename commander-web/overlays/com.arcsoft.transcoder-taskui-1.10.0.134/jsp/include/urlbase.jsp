<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.arcsoft.web4transcoder.AppVersion" %>
<%@ page import="com.arcsoft.web4transcoder.AppConfig" %>

<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="shortcut icon" href="images/favicon.ico"/>
<title>ArcVideo</title>

<%
//js,css version number
final String VERSION = AppVersion.getProperty(AppVersion.KEY_WEB_VERSION);
String rnd = "rnd=" + VERSION; // (int)(Math.random()*10000000);
request.setAttribute("rnd", rnd);

String cxtPath = request.getContextPath();
String urlbase = request.getScheme()+"://"+request.getServerName() +":" +request.getServerPort() + request.getContextPath();
request.setAttribute("urlbase", urlbase);
%>
