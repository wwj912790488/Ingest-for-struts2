<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<title>ERROR</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body> 
<div id="global"> <s:actionerror/>
</div>
ERROR!!!
<%
	Object obj = request.getAttribute("exception");
	if (obj != null) {
		((Throwable)obj).printStackTrace();
	}
%>
</body>
</html>

