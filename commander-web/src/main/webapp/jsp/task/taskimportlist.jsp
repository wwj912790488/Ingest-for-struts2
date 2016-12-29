<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<div id="dialog_import_task">

	<div class="template_title">
		<s:text name="title.importTasks"/>
	</div>
	<div class="template_content ">
<%
jspContext.addCssRef("css/task/taskimport.css");
%>
		<div id="import_task_detail">
			<form id="import_task_form">
			<s:hidden name="uploadKey"/>
			<div id="sourceTitle"><s:text name="title.import.select.source"/></div>
			<div id="sourceContent">
				<table style="width: 100%">
				<s:iterator value="data" var="result">
				<tr>
					<td class="servers">
						<input type="radio" name="sourceServer" value="${result.server.id}"/> 
						<s:text name="title.import.tasks.from">
							<s:param>${result.server.name}</s:param>
						</s:text>
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
			<div id="targetTitle"><s:text name="title.import.select.target"/></div>
			<div id="targetContent">
				<select name="targetServer">
				<option value=""><s:text name="common.select.text"></s:text></option>
				<s:iterator value="serverGroups" var="groups" status="stat">
					<s:if test="#groups.type == 1">
						<c:if test="stat.count == 1">
						<optgroup label="1+1">
						</c:if>
						<option value='<s:property value="id"/>'><s:property value="name"/></option>
						<c:if test="stat.count == 1">
						</optgroup>
						</c:if>
					</s:if>
				</s:iterator>
				<s:iterator value="serverGroups" var="group" status="stat">
					<s:if test="#group.type == 0">
						<c:if test="stat.count == 1">
							<optgroup label="<s:property value="name"/> (M+N)">
						</c:if>
						<s:iterator value="#group.servers">
						<s:if test="backup == 0">
							<option value='SERVER:<s:property value="id"/>'><s:property value="name"/></option>
						</s:if>
						</s:iterator>
						<c:if test="stat.count == 1">
							</optgroup>
						</c:if>
					</s:if>
				</s:iterator>
				</select>
			</div>
			</form>
		</div>
	</div>
	<div class="template_button">
		<div class="div_space"></div>
		<div class="div_buttons">
			<table align="center">
			<tr>
				<td><input type="button" id="btnImport" value="<s:text name='action.import'/>" /></td>
				<td class="td_space"></td>
				<td><input type="button"id="btnCancel" value="<s:text name='msg.cancel'/>" /></td>
			<tr>
			</table>
		</div>
	</div>
</div>
