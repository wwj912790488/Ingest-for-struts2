<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<%
jspContext.addJSRef("js/settings/dns.js");
jspContext.addCssRef("css/settings/dns.css");
%>

<script>
var id = '<s:property value="id"/>';
var isLocal = '<s:property value="isLocal"/>';
var title = '<s:text name="msg.dialog.title.warning" />';
var buttonOK = '<s:text name="msg.ok" />';
var msgAddFailed = '<s:text name="msg.error.server.network.dns.add" />';
var msgDeleteFailed = '<s:text name="msg.error.server.network.dns.delete" />';
$(function(){
	var dao = new DnsDAO();
	dao.init();
});
</script>

<div class="dns_content">
	<div>
		<table id="table_add_dns">
		<s:iterator value="dnsList" var="var" status="st">
		<tr>
			<td><s:text name="server.network.dns.dnsserver"/>:</td>
			<td class="dns_ip" id="ip_<s:property value="#st.index+1"/>"><s:property value="#var.ip" /></td>
			<td class="deleteBtn" align="center"><a class="deleteBtn" index="<s:property value="#st.index+1"/>"></a></td>
		</tr>
		</s:iterator>
		<tr>
			<td><s:text name="server.network.dns.dnsserver"/>:</td>
			<td><input id="dns_add" type="text" value="" /></td>
			<td><button type="button" id="add_button"><s:text name="server.network.add" /></button><td>
		<tr>
		</table>
	</div>
</div>