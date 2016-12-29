<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<%
jspContext.addCssRef("css/settings/setting.css");
jspContext.addCssRef("css/settings/ipmi.css");
jspContext.addJSRef("js/settings/ipmi.js");
%>

<script>
	var id = '<s:property value="id"/>';
	var isLocal = '<s:property value="isLocal"/>';
	var title = '<s:text name="msg.dialog.title.warning" />';
	var buttonOK = '<s:text name="msg.ok" />';
	var msgInvalidIp = "<s:text name='settings.err.invalid.ip'/>";
	var msgInvalidUser = "<s:text name='xwork.default.invalid.fieldvalue'/>";
	var msgInvalidPassword = "<s:text name='xwork.default.invalid.fieldvalue'/>";
	var msgSaveFailed = '<s:text name="server.setting.fault.error.save.ipmi" />';
	$(function(){
		var ipmi = new Ipmi();
		ipmi.init();
	});
</script>

<div class="ipmi_content">
	<form>
	<table class="table_set_ipmi">
	<tr id="input_ip">
		<td class="ethLabel"><s:text name="server.setting.fault.ipmi.ip"/>:</td>
		<td class="ethVal"><input id="ipmi_ip" type="text" value='<s:property value="[0].ipmi.ip"/>'/></td>
		<td class="ethAlert"><span class="alert"></span></td>
	<tr>
	<tr id="input_user">
		<td class="ethLabel"><s:text name="server.setting.fault.ipmi.user"/>:</td>
		<td class="ethVal"><input id="ipmi_user" type="text" value='<s:property value="[0].ipmi.user"/>'/></td>
		<td class="ethAlert"><span class="alert"></span></td>
	<tr>
	<tr id="input_password">
		<td class="ethLabel"><s:text name="server.setting.fault.ipmi.password"/>:</td>
		<td class="ethVal"><input id="ipmi_password" type="password" value='<s:property value="[0].ipmi.password"/>'/></td>
		<td class="ethAlert"><span class="alert"></span></td>
	<tr>
	</table>
	<div style="text-align:center">
	<input class="submitBtn" id="resetIpmiBtn" type="button" value="<s:text name='server.setting.fault.reset' />" />				
	<input class="submitBtn" id="saveIpmiBtn" type="button" value="<s:text name='server.setting.fault.apply' />" />				
	</div>
	</form>			
</div>
