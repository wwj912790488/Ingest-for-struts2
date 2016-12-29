<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<div id="dialog_export_task">

	<div class="template_title">
		<s:text name="title.export.tasks"/>
	</div>
	<div class="template_content">
<%
jspContext.addCssRef("css/task/taskexport.css");
%>
		<div id="export_task_detail">
			<form id="export_task_form">
			<div id="exportTitle"><s:text name="title.export.select.tasks"/></div>
			<div id="exportContent">
				<table style="width: 100%;">
				<s:iterator value="results" var="result">
				<tr>
					<td class="servers">
						<input type="checkbox" name="selectedServers" value="${result.server.id}"/> ${result.server.name}
					</td>
					<td>
						<s:iterator value="#result.data" var="task">
						<div>${task.name}</div>
						</s:iterator>
					</td>
				</tr>
				</s:iterator>
				</table>
			</div>
			</form>
		</div>
	</div>
	<div class="template_button">
		<div class="div_space"></div>
		<div class="div_buttons">
			<table align="center">
			<tr>
				<td><input type="button" id="btnExport" value="<s:text name='action.export'/>" /></td>
				<td class="td_space"></td>
				<td><input type="button"id="btnCancel" value="<s:text name='msg.cancel'/>" /></td>
			<tr>
			</table>
		</div>
	</div>
</div>
