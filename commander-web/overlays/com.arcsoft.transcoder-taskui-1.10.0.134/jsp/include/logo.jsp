<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<%if( "temobi".equalsIgnoreCase((String)request.getAttribute("logo")) ){%>
	<div class="HeadLogo" style="width:200px;height:75px;background-image:url('images/icons/logo_temobi.png')"></div>
<%}else if( "ARCVIDEO".equalsIgnoreCase((String)request.getAttribute("logo")) ){%>
	<div class="HeadLogo"></div>
<%}else{ %>
	<div class=""></div>
<%} %>
