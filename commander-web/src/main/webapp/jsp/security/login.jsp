<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ page import="org.springframework.web.context.WebApplicationContext"%>
<%@ page import="org.springframework.security.web.WebAttributes"%>
<%@ page import="org.springframework.security.core.AuthenticationException"%>
<%@ page import="org.springframework.security.authentication.BadCredentialsException"%>
<%@ page import="org.springframework.security.core.userdetails.UsernameNotFoundException"%>
<%@ page import="org.springframework.security.authentication.DisabledException" %>
<%@ include file="/jsp/include/header.jsp"%>

<%
	jspContext.addCssRef("css/security/login.css");
	jspContext.addJSRef("js/security/login.js");
	jspContext.addJSRef("js/jquery-md5.js");
	
	WebApplicationContext wac = (WebApplicationContext) config.getServletContext().getAttribute(
					WebApplicationContext.ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE);
	String strAccount = wac.getMessage("account", null, request.getLocale());
	String strPassword = wac.getMessage("accountPassword", null, request.getLocale());
	String strLogin = wac.getMessage("login", null, request.getLocale());
%>

<script language="javascript"> 

function form_submit(){
	$("input[name='username']").val($("input[name='username_1']").val());
	$("input[name='password']").val($.md5($("input[name='password_1']").val()));
	$("#login").submit();
}

$(function(){
	if (top.window != window) {
		top.window.location.reload(true);
	} else {
		var login = new Login();
		login.init();
	}
});

</script> 

<div class="content">
	<form class="login_form">
		<table>
			<tr>
				<td><label><%=strAccount%>:</label></td>
				<td><input type="text" name="username_1" value="" /></td>
			</tr>
			<tr class="tr_space">
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td><label><%=strPassword%>:</label></td>
				<td><input type="password" name="password_1" value="" /></td>
			</tr>
			<tr class="tr_space">
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td></td>
				<td><input type="button" value="<%=strLogin%>" class="input_submit" onClick="form_submit();"/></td>
			</tr>
			<%
				String error = "";
				Object obj = request
						.getAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
				if (obj instanceof UsernameNotFoundException
					|| obj instanceof BadCredentialsException 
					|| obj instanceof DisabledException) {
					error = ((Exception) obj).getMessage();
				}
			%>
			<tr>
				<td></td>
				<td class="error" style="height: 30px; line-height: 30px"><%=error%></td>
			<tr>
		</table>
	</form>
	<form id="login" action="auth" method="post" style="display:none">
			<input type="text" name="username" value="" />
			<input type="password" name="password" value="" />
	</form>
</div>

<%@ include file="/jsp/include/footer.jsp"%>
