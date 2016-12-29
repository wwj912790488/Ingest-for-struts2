<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.arcsoft.transcoder.xml.*" %>
<%
	// --------------------------------------------------------------------
	// one line description for video setting in native transcoder xml
	// eg. H264 640x480 VBR 1000Kbps
	// --------------------------------------------------------------------
if(request.getAttribute("videoSetting")!=null){
	ParamXmlKV.NodeProperties vs = (ParamXmlKV.NodeProperties)request.getAttribute("videoSetting");
%>
<span>
	<span><%=vs.get("CodecType")%></span>
	<span><%=vs.get("Width")%></span>x<span><%=vs.get("Width")%></span>
	<span><%=vs.get("RC")%></span>
	<span><%=vs.get("BitRate")%>Kbps</span>
</span>
<%} %>
