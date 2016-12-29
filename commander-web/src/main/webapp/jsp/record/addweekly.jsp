<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<div class="template_title">
	<s:text name="taskDetail.newTask"/> - <s:text name="record.task.type.weekly" />
</div>
<div class="template_content">
	<form>
	<table style="width: 100%">
		<tr>
			<td class="form_input_label" style="width: 90px">
				<s:text name="channel.name"/>
			</td>
			<td class="form_input_field">
				<s:select name="task.channelId" cssStyle="max-width: 200px"
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
				<s:select name="task.profile" cssStyle="max-width: 200px"
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
				<s:textfield name="task.outputPath" cssStyle="width: 380px"/><input type="button" id="btnFileView" value='<s:text name="common.select.text"/>'>
			</td>
		</tr>
		<tr>
			<td class="form_input_label">
				<s:text name="record.task.file.name" />
			</td>
			<td class="form_input_field">
				<s:textfield name="task.fileName" cssStyle="width: 450px"/>
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
		<tr id="endDateTr">
			<td class="form_input_label">
				<s:text name="record.task.end.date" />
			</td>
			<td class="form_input_field">
				<s:textfield name="task.schedule.repeatEndDate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" readonly="true">
					<s:param name="value">
						<s:date name="task.schedule.repeatEndDate" format="yyyy-MM-dd"/>
					</s:param>
				</s:textfield>
			</td>
		</tr>
		<tr>
			<td class="form_input_label">
				<s:text name="record.task.advanced.options" />
			</td>
			<td class="form_input_field">
				<s:checkbox name="task.generateThumb" id="generateThumb"/><label for="generateThumb"><s:text name="record.task.generate.thumb" /></label>
				(<s:textfield name="task.thumbWidth" cssStyle="width: 30px"/>x<s:textfield name="task.thumbHeight" cssStyle="width: 30px" value="-1"/>)
			</td>
		</tr>
	</table>
	<div style="height: 5px"></div>
	<table style="width: 100%" cellspacing="0" cellpadding="0" id="epgTable">
		<tr>
			<td valign="top" style="width: 100px">
				<div style="float: right; width: 5px; height: 325px; background-color: lightgray" ></div>
				<div style="float: left; width: 95px">
					<input type="checkbox" id="tab_bar_toggle_all"/><span style="line-height: 24px"><s:text name="common.select.all"/></span>
				</div>
				<s:iterator value="groupView.groupList" var="group">
					<div class="tab_bar" style="float: left; width: 95px">
						<input type="checkbox"/>
						<span class="tab_bar_toggle" style="cursor: pointer; line-height: 24px;">
							<s:if test='#group.name == "1"'>
								<s:text name="common.week.day0"/>
							</s:if>
							<s:elseif test='#group.name == "2"'>
								<s:text name="common.week.day1"/>
							</s:elseif>
							<s:elseif test='#group.name == "4"'>
								<s:text name="common.week.day2"/>
							</s:elseif>
							<s:elseif test='#group.name == "8"'>
								<s:text name="common.week.day3"/>
							</s:elseif>
							<s:elseif test='#group.name == "16"'>
								<s:text name="common.week.day4"/>
							</s:elseif>
							<s:elseif test='#group.name == "32"'>
								<s:text name="common.week.day5"/>
							</s:elseif>
							<s:elseif test='#group.name == "64"'>
								<s:text name="common.week.day6"/>
							</s:elseif>
							<input type="hidden" value="${group.value}"/></span>
					</div>
				</s:iterator>
			</td>
			<td>
				<table style="width: 100%; text-align: center; background-color: lightgray">
				<tr>
					<td width="25px" height="21px"></td>
					<td width="235px"><s:text name="channel.program_name"/></td>
					<td width="80px"><s:text name="record.task.start.time"/></td>
					<td><s:text name="record.task.end.time"/></td>
				</tr>
				</table>
				<div style="height: 300px; overflow-y: auto; border: 1px solid lightgray">
				<s:iterator value="groupView.groupList" var="group">
				<table class="tab_content" id="tab_content_${group.value}" style="display: hidden">
				<s:iterator value="#group.list" var="weeklyItem">
				<tr class="epg_record_line">
					<td width="25px" align="center">
						<input type="checkbox" value="true" <s:if test="!#weeklyItem.schedule.disabled"></s:if> />
						<input type="hidden" name="startDate" value="${weeklyItem.schedule.startDate}"/>
						<input type="hidden" name="weeklyday" value="${group.name}"/>
					</td>
					<td width="235px">
						<input type="text" name="programName" value="${weeklyItem.name}" style="width: 230px"/>
					</td>
					<td width="80px">
						<input type="text" name="startTime" value="<s:date name="#weeklyItem.schedule.startTime" format="HH:mm:ss" />" style="width: 75px"/>
					</td>
					<td width="80px">
						<input type="text" name="endTime" value="<s:date name="#weeklyItem.schedule.endTime" format="HH:mm:ss" />" style="width: 75px"/>
					</td>
				</tr>
				</s:iterator>
				</table>
				</s:iterator>
				</div>
			</td>
		</tr>
	</table>
	</form>
</div>
<div class="template_button">
	<div class="div_space"></div>
	<div class="div_buttons">
		<table align="center">
		<tr>
			<td><input type="button" id="btnSave" value="<s:text name='common.action.save'/>" /></td>
			<td class="td_space"></td>
			<td><input type="button" id="btnCancel" value="<s:text name='msg.cancel'/>" /></td>
		<tr>
		</table>
	</div>
</div>
