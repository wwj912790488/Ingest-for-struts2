<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<div class="template_title">
	<s:text name="taskDetail.newTask"/> - <s:text name="record.task.type.weekly" />
</div>
<div class="template_content">
	<table style="width: 300px" align="center">
		<tr>
			<td>
				<div id="fileTitle"><s:text name="record.task.weekly.file"/>:</div>
				<input type="file" id="weeklyFile" name="weeklyFile" style="width: 300px"/>
			</td>
		</tr>
	</table>
</div>
<div class="template_button">
	<div class="div_space"></div>
	<div class="div_buttons">
		<table align="center">
		<tr>
			<td><input type="button" id="btnNext" value="<s:text name='common.action.next'/>" /></td>
			<td class="td_space"></td>
			<td><input type="button"id="btnCancel" value="<s:text name='msg.cancel'/>" /></td>
		<tr>
		</table>
	</div>
</div>
