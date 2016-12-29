<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<div class="template_title">
	<s:text name="taskDetail.editTask"/>
</div>
<div class="template_content">
	<form>
	<table style="width: 100%">
		<tr>
			<td class="form_input_label" width="100px">
				<s:text name="record.task.type"/>
			</td>
			<td class="form_input_field">
				<s:text name="record.task.type.fulltime" />
			</td>
		</tr>
		<tr>
			<td class="form_input_label">
				<s:text name="channel.name"/>
			</td>
			<td class="form_input_field">
				<s:select name="task.channelId"
					list="channels" listKey="id" listValue="name"
					headerKey="" headerValue="%{getText('common.select.text')}">
				</s:select>
			</td>
		</tr>
		<tr>
			<td class="form_input_label">
				<s:text name="record.task.profile"/>
			</td>
			<td class="form_input_field">
				<s:select name="task.profile"
					list="profiles" listKey="id" listValue="name"
					headerKey="" headerValue="%{getText('common.select.text')}">
				</s:select>
			</td>
		</tr>
		<tr>
			<td class="form_input_label">
				<s:text name="record.task.segment.length" />
			</td>
			<td class="form_input_field">
				<s:select name="task.segmentLength"
					list="#{600:'10',900:'15',1200:'20',1800:'30',3600:'60',7200:'120'}"
					listKey="key" listValue="value"
					headerKey="" headerValue="%{getText('common.select.text')}">
				</s:select> (<s:text name="common.unit.minute"/>)
			</td>
		</tr>
		<tr>
			<td class="form_input_label">
				<s:text name="record.task.file.path" />
			</td>
			<td class="form_input_field">
				<s:textfield name="task.outputPath" cssStyle="width: 300px"/><input type="button" id="btnFileView" value='<s:text name="common.select.text"/>'>
			</td>
		</tr>
		<tr>
			<td class="form_input_label">
				<s:text name="record.task.segment.name" />
			</td>
			<td class="form_input_field">
				<s:textfield name="task.fileName" cssStyle="width: 400px"/>
			</td>
		</tr>
		<tr>
			<td class="form_input_label">
				<s:text name="record.task.start.time" />
			</td>
			<td class="form_input_field">
				<s:textfield name="task.schedule.startDate" cssStyle="width: 80px" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" readonly="true">
					<s:param name="value" ><s:date name="task.schedule.startDate" format="yyyy-MM-dd" /></s:param>
				</s:textfield>
				<s:textfield name="task.schedule.startTime" cssStyle="width: 80px" onclick="WdatePicker({dateFmt:'HH:mm:ss'})" readonly="true"/>
				<input type="checkbox" name="startNow" value="true"/><s:text name="record.task.start.now"/>
			</td>
		</tr>
		<tr>
			<td class="form_input_label">
				<s:text name="record.task.end.time" />
			</td>
			<td class="form_input_field">
				<s:textfield name="task.schedule.endDate" cssStyle="width: 80px" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" readonly="true">
					<s:param name="value" ><s:date name="task.schedule.endDate" format="yyyy-MM-dd" /></s:param>
				</s:textfield>
				<s:textfield name="task.schedule.endTime" cssStyle="width: 80px" onclick="WdatePicker({dateFmt:'HH:mm:ss'})" readonly="true"/>
				<s:checkbox name="alwaysLoop"/><s:text name="record.task.start.always.loop"/>
			</td>
		</tr>
	</table>
	<s:hidden name="task.id"/>
	<s:hidden name="task.schedule.id"/>
	<s:hidden name="task.schedule.name"/>
	<s:hidden name="task.schedule.source"/>
	<s:hidden name="task.schedule.scheduleType"/>
	<s:hidden name="task.schedule.startType"/>
	<s:hidden name="task.schedule.endType"/>
	</form>
</div>
<div class="template_button">
	<div class="div_space"></div>
	<div class="div_buttons">
		<table align="center">
		<tr>
			<td><input type="button" id="btnSave" value="<s:text name='common.action.save'/>" /></td>
			<td class="td_space"></td>
			<td><input type="button"id="btnCancel" value="<s:text name='msg.cancel'/>" /></td>
		<tr>
		</table>
	</div>
</div>
