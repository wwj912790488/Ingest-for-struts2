<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="org.springframework.web.context.WebApplicationContext"%>
<%@ page import="org.springframework.security.web.WebAttributes"%>
<%@ page import="org.springframework.security.access.AccessDeniedException"%>
<%@ include file="/jsp/include/header.jsp"%>

<div style="width: 500px; margin: 50px auto">

	<p style="color: red">
		<%
			String error = ""; 
			Object obj = request.getAttribute(WebAttributes.ACCESS_DENIED_403);
			if (obj	instanceof AccessDeniedException) { 
				error =	((AccessDeniedException) obj).getMessage(); 
			}
		%>
		<%=error%>
	</p>
	<p>
		<a href="#" onclick="history.go(-1)"></a>
	</p>

</div>

<%@ include file="/jsp/include/footer.jsp"%>