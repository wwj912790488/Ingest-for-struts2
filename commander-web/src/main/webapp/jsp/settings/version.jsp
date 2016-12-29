<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<%
jspContext.addCssRef("css/settings/version.css");
%>

<div id="version_content">
	<table align="center">
	<s:if test="isLocal">
	<tr>
		<td class="version_view_label">Commander Version: </td>
		<td class="version_view_data"><s:property value="commanderVersion"/></td>
	</tr>
	</s:if>
	<s:else>
	<tr>
		<td class="version_view_label">Agent Version: </td>
		<td class="version_view_data"><s:property value="version.agentVersion"/></td>
	</tr>
	<tr>
		<td class="version_view_label">Engine Version: </td>
		<td class="version_view_data"><s:property value="version.transcoderVersion"/></td>
	</tr>
	</s:else>
	</table>
</div>
