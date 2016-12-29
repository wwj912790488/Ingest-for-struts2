<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<div id="dialog_task_runtimesetting">
	<div class="template_title">
		<s:text name="action.rtsettings"/>-${task.name}
	</div>
	<div class="template_content">
		<div id="task_runtimesetting_detail">
			<s:if test="allowProgramIdChanged != null">
				<form id="task_runtimesetting_form">
				<input type="hidden" name="taskId" value="${taskId}"/>
				<s:checkbox name="allowProgramIdChanged" /> <s:text name="task.runtime.allow_program_id_changed"/>
				</form>
			</s:if>
			<s:else>
				N/A
			</s:else>
		</div>
	</div>
	<div class="template_button">
		<div class="div_space"></div>
		<div class="div_buttons">
			<table align="center">
			<tr>
				<s:if test="allowProgramIdChanged != null">
				<td><input type="button" id="btnSave" value="<s:text name='common.action.save'/>" /></td>
				<td class="td_space"></td>
				</s:if>
				<td><input type="button"id="btnCancel" value="<s:text name='msg.cancel'/>" /></td>
			<tr>
			</table>
		</div>
	</div>
</div>
