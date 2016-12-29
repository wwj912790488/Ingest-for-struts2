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
				<s:text name="record.task.type.schedule" />
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
				<s:text name="channel.program_name"/>
			</td>
			<td class="form_input_field">
				<s:textfield name="task.name" cssStyle="width: 200px"/>
			</td>
		</tr>
		<tr>
			<td class="form_input_label">
				<s:text name="record.task.start.time" />
			</td>
			<td class="form_input_field">
				<s:textfield name="task.schedule.startTime" onclick="WdatePicker({dateFmt:'HH:mm:ss'})" readonly="true"/>
			</td>
		</tr>
		<tr>
			<td class="form_input_label">
				<s:text name="record.task.end.time" />
			</td>
			<td class="form_input_field">
				<s:textfield name="task.schedule.endTime" onclick="WdatePicker({dateFmt:'HH:mm:ss'})" readonly="true"/>
			</td>
		</tr>
		<tr>
			<td class="form_input_label">
				<s:text name="record.task.schedule.mode" />
			</td>
			<td class="form_input_field">
				<s:radio name="task.schedule.scheduleType" list="%{#{'ONCE':getText('record.task.times.once'),'WEEKLY':getText('record.task.times.loop')}}" theme="simple"/>
			</td>
		</tr>
		<tr>
			<td class="form_input_label">
				<s:text name="record.task.start.date" />
			</td>
			<td class="form_input_field">
				<s:textfield name="task.schedule.startDate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" readonly="true">
					<s:param name="value" ><s:date name="task.schedule.startDate" format="yyyy-MM-dd" /></s:param>
				</s:textfield>
			</td>
		</tr>
		<tr id="endDateTr">
			<td class="form_input_label">
				<s:text name="record.task.end.date" />
			</td>
			<td class="form_input_field">
				<s:textfield name="task.schedule.repeatEndDate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" readonly="true">
					<s:param name="value" ><s:date name="task.schedule.repeatEndDate" format="yyyy-MM-dd" /></s:param>
				</s:textfield>
			</td>
		</tr>
		<tr id="weekdayTr">
			<td class="form_input_label">
			</td>
			<td class="form_input_field">
				<input type="checkbox" name="weekday" value="1"/><label for="weekday0"><s:text name="common.week.day0"/></label>
				<input type="checkbox" name="weekday" value="2"/><label for="weekday1"><s:text name="common.week.day1"/></label>
				<input type="checkbox" name="weekday" value="4"/><label for="weekday2"><s:text name="common.week.day2"/></label>
				<input type="checkbox" name="weekday" value="8"/><label for="weekday3"><s:text name="common.week.day3"/></label>
				<input type="checkbox" name="weekday" value="16"/><label for="weekday4"><s:text name="common.week.day4"/></label>
				<input type="checkbox" name="weekday" value="32"/><label for="weekday5"><s:text name="common.week.day5"/></label>
				<input type="checkbox" name="weekday" value="64"/><label for="weekday6"><s:text name="common.week.day6"/></label>
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
				<s:text name="record.task.file.path" />
			</td>
			<td class="form_input_field">
				<s:textfield name="task.outputPath" cssStyle="width: 300px"/><input type="button" id="btnFileView" value='<s:text name="common.select.text"/>'>
			</td>
		</tr>
		<tr>
			<td class="form_input_label">
				<s:text name="record.task.file.name" />
			</td>
			<td class="form_input_field">
				<s:textfield name="task.fileName" cssStyle="width: 400px"/>
			</td>
		</tr>
	</table>
	<s:hidden name="task.id"/>
	<s:hidden name="task.recordType"/>
	<s:hidden name="task.schedule.id"/>
	<s:hidden name="task.schedule.name"/>
	<s:hidden name="task.schedule.source"/>
	<s:hidden name="task.schedule.startType"/>
	<s:hidden name="task.schedule.endType"/>
	<s:hidden name="task.schedule.endDate"/>
	<s:hidden name="task.schedule.interval"/>
	<s:hidden name="task.schedule.days"/>
	<s:hidden name="task.schedule.repeatEndType"/>
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
