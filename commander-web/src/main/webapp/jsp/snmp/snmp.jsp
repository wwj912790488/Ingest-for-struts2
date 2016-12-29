<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<%
jspContext.addJSRef("js/snmp/snmp.js");
jspContext.addCssRef("css/snmp/snmp.css");
%>

<script type="text/javascript">
<!--
var SNMP_INFO = '<s:text name="msg.dialog.title.info"/>';
var SNMP_SAVE_SUCCESS = '<s:text name="msg.success.save"/>';
var SNMP_SAVE_FAILED = '<s:text name="settings.err.save.failed"/>';
$(function() {
	var snmp = new SnmpManager();
	snmp.init();
});
//-->
</script>

<div id="snmp_content">
	<form onsubmit="return false" id="snmp_form">
	<input type="hidden" name="id" value="<s:property value='id' />" />
	<input type="hidden" name="isLocal" value="<s:property value='isLocal' />" />
	<fieldset>
	    <legend><s:text name="snmp.agent"/></legend>
		<table align="center">
		<tr>
			<td class="view_label"><s:text name="snmp.agent.status"/></td>
			<td class="view_data">
				<s:radio list="#{'true':getText('snmp.agent.on'),'false':getText('snmp.agent.off')}" name="snmp.snmpRun"/>
			</td>
			<td class="view_error" id="snmp_agent_status_error"></td>
		</tr>
		<tr>
			<td class="view_label"><s:text name="snmp.agent.community"/></td>
			<td class="view_data"><s:textfield name="snmp.community"/></td>
			<td class="view_error" id="snmp_agent_community_error"></td>
		</tr>
		</table>
	</fieldset>
	<s:if test="arcVideoSnmpEnabled==true">
	<div class="line_space"></div>
	<fieldset>
	    <legend><s:text name="snmp.trap"/></legend>
		<table align="center">
		<tr>
			<td class="view_label"><s:text name="snmp.trap.allowed"/></td>
			<td class="view_data">
				<s:radio list="#{'true':getText('snmp.trap.yes'),'false':getText('snmp.trap.no')}" name="snmp.trapAllowed"/>
			</td>
			<td class="view_error" id="snmp_trap_allowed_error"></td>
		</tr>
		<tr>
			<td class="view_label"><s:text name="snmp.trap.community"/></td>
			<td class="view_data"><s:textfield name="snmp.trapCommunity"/></td>
			<td class="view_error" id="snmp_trap_community_error"></td>
		</tr>
			<tr>
			<td class="view_label"><s:text name="snmp.trap.host"/></td>
			<td class="view_data"><s:textfield name="snmp.trapHost"/></td>
			<td class="view_error" id="snmp_trap_host_error"></td>
		</tr>
		</table>
	</fieldset>
	</s:if>
	<center>
		<input type="button" id="btnSaveSnmp" value="<s:text name="snmp.button.save"/>"/>
	</center>
	</form>
</div>
