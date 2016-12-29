<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<%
jspContext.addJSRef("js/ajaxfileupload.js");
jspContext.addJSRef("js/settings/aslog.js");
jspContext.addCssRef("css/settings/aslog.css");
%>

<script type="text/javascript">
<!--
var ASLOG_UPDATE_FAILED = '<s:text name="aslog.error.update.fail"/>';

$(function() {
	var aslog = new ASLogManager();
	aslog.init();
});
//-->
</script>

<div id="aslog_content">
	<table align="center">
	<tr>
		<td class="license_view_label"><s:text name="aslog.label.update.aslog"/></td>
		<td class="license_view_data"><input type="file" id="aslogFile" name="file"/></td>
	</tr>
	</table>
	<center>
		<input type="button" id="btnUpdateASLog" value="<s:text name="aslog.button.update"/>"/>
	</center>
</div>
