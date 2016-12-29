<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<%
jspContext.addJSRef("js/system/sysinit.js");
jspContext.addCssRef("css/system/sysinit.css");
%>

<script type="text/javascript">
<!--
var SYSINIT_INFO = '<s:text name="msg.dialog.title.info"/>';
var SYSINIT_SAVE_SUCCESS = '<s:text name="msg.success.save"/>';
var SYSINIT_SAVE_FAILED = '<s:text name="settings.err.save.failed"/>';
$(function() {
	var sysinit = new SysInitAction();
	sysinit.init();
});
//-->
</script>

<div id="sysinit_main">
<form id="sysinit_form">
<table id="sysinit_table" width="100%" align="center">
<tr>
	<th><s:text name="settings.cluster.type"/></th>
	<td><s:select name="settings.clusterType"
		list="clusterTypes" listKey="key" listValue="value"
		headerKey="" headerValue="%{getText('common.select.text')}">
		</s:select><span id="sysinit_clusterType" class="cm_fieldError"></span></td>
</tr>
<tr>
	<th><s:text name="settings.cluster.ip"/></th>
	<td><s:textfield name="settings.clusterIp"/><span id="sysinit_clusterIp" class="cm_fieldError"></span></td>
</tr>
<tr>
	<th><s:text name="settings.cluster.port"/></th>
	<td><s:textfield name="settings.clusterPort"/><span id="sysinit_clusterPort" class="cm_fieldError"></span></td>
</tr>
<tr>
	<th><s:text name="settings.cluster.bindAddr"/></th>
	<td><s:select name="settings.bindAddr"
		list="networks" listKey="key" listValue="value"
		headerKey="" headerValue="%{getText('common.select.text')}">
		</s:select><span id="sysinit_bindAddr" class="cm_fieldError"></span></td>
</tr>
<tr>
	<th><s:text name="settings.cluster.ttl"/></th>
	<td><s:textfield name="settings.timeToLive"/><span id="sysinit_timeToLive" class="cm_fieldError"></span></td>
</tr>
<tr>
	<th><s:text name="settings.cluster.search.type"/></th>
	<td><s:select name="settings.clusterSearchType"
		list="clusterSearchTypes" listKey="key" listValue="value"
		headerKey="" headerValue="%{getText('common.select.text')}">
		</s:select><span id="sysinit_clusterSearchType" class="cm_fieldError"></span></td>
</tr>
<tr>
	<th><s:text name="settings.cluster.heartbeat.interval"/></th>
	<td><s:textfield name="settings.heartbeatInterval"/><span id="sysinit_heartbeatInterval" class="cm_fieldError"></span></td>
</tr>
<tr>
	<th><s:text name="settings.cluster.heartbeat.timeout"/></th>
	<td><s:textfield name="settings.heartbeatTimeout"/><span id="sysinit_heartbeatTimeout" class="cm_fieldError"></span></td>
</tr>
<tr>
	<td colspan="2" id="sysinit_buttons"><input type="button" id="sysinit_saveButton" value="<s:text name='settings.save'/>" /></td>
</tr>
</table>
</form>
</div>

