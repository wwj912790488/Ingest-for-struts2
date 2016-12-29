<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<%
jspContext.addJSRef("js/settings/loggingsetting.js");
jspContext.addCssRef("css/settings/loggingsetting.css");
%>

<script type="text/javascript">
<!--
$(function() {
	var loggingSetting = new LoggingSetting();
	loggingSetting.init();
});
-->
</script>
<div id="logging_content">
	<form id="loggingFrom">
	<s:hidden name="id" />
	<s:hidden name="isLocal" />
	<s:hidden name="setting.version" value="1"/>
	<s:hidden name="setting.description" value="ArcVideo Logging Service"/>
	<s:hidden name="setting.compress.type" value="zip"/>
	<s:hidden name="setting.compress.cpulimit" value="true"/>
	<s:hidden name="setting.compress.threads" value="1"/>
	<s:hidden name="setting.entires[0].type" value="ASLOG"/>
	<s:hidden name="setting.entires[0].keepTime"/>
	<s:hidden name="setting.entires[0].scanPeriod"/>
	<s:hidden name="setting.entires[0].deletePeriod"/>
	<table align="center">
	<tr>
		<td class="logging_view_label"><s:text name="logging.source.path"/>: </td>
		<td><s:textfield name="setting.entires[0].source" cssStyle="width: 400px"/></td>
	</tr>
	<tr>
		<td class="logging_view_label"><s:text name="logging.archive.path"/>: </td>
		<td><s:textfield name="setting.entires[0].archive" cssStyle="width: 400px"/></td>
	</tr>
	<tr>
		<td class="logging_view_label"><s:text name="logging.compress.option"/>: </td>
		<td>
			<s:set var="passwordSet" value="setting.compress.password != null && setting.compress.password.length()>0"></s:set>
			<input type="checkbox" name="enableEncrypt"<s:if test="#passwordSet">checked="checked"</s:if>/>
			<s:text name="logging.compress.password"/>
			<input type="password" name="setting.compress.password" value="<s:property value="setting.compress.password"/>"/>
		</td>
	</tr>
	<tr>
		<td class="logging_view_label"></td>
		<td><s:checkbox name="setting.entires[0].deleteSource"/><s:text name="logging.delete.source"/></td>
	</tr>
	<tr>
		<td class="logging_view_label"><s:text name="logging.keep.time"/>: </td>
		<td><input type="text" name="keepTime" style="width: 30px; text-align:center"/><s:text name="common.unit.day"/></td>
	</tr>
	<tr>
		<td class="logging_view_label"><s:text name="logging.scan.period"/>: </td>
		<td><input type="text" name="scanPeriod" style="width: 30px; text-align:center"/><s:text name="common.unit.minute"/></td>
	</tr>
	<tr>
		<td class="logging_view_label"><s:text name="logging.delete.period"/>: </td>
		<td><input type="text" name="deletePeriod" style="width: 30px; text-align:center"/><s:text name="common.unit.minute"/></td>
	</tr>
	<tr>
		<td colspan=2 align="center"><input type="button" id="btnUpdateLogging" value="<s:text name="common.action.save"/>"/></td>
	</tr>
	</table>
	</form>
</div>
