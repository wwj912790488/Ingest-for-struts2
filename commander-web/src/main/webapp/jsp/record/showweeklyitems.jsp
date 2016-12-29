<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/jsp/include/jsonheader.jsp"%>

<div class="template_title">
	<s:text name="record.task.type.weekly" />
</div>
<div class="template_content">
	<div style="height: 15px"></div>
	<table style="width: 100%" cellspacing="0" cellpadding="0">
		<tr>
			<td valign="top" style="width: 100px">
				<div style="float: right; width: 5px; height: 275px; background-color: lightgray" ></div>
				<s:iterator value="groupView.groupList" var="group">
					<div class="tab_bar" style="float: left; text-align: center; width: 95px">
						<span class="tab_bar_toggle" style="cursor: hand; line-height: 24px">${group.name}</span>
					</div>
				</s:iterator>
			</td>
			<td>
				<table style="width: 100%; height: 24px; background-color: lightgray">
				<tr>
					<td width="260px"><s:text name="channel.program_name"/></td>
					<td width="80px"><s:text name="record.task.start.time"/></td>
					<td><s:text name="record.task.end.time"/></td>
				</tr>
				</table>
				<div style="height: 250px; overflow-y: auto; border: 1px solid lightgray">
				<s:iterator value="groupView.groupList" var="group">
				<table class="tab_content" id="tab_content_${group.name}" style="display: none; width: 100%">
				<s:iterator value="#group.list" var="weeklyItem">
				<tr class="epg_record_line" style="border-bottom: 1px dotted gray">
					<td width="260px">
						${weeklyItem.name}
					</td>
					<td width="80px">
						<s:date name="#weeklyItem.schedule.startTime" format="HH:mm:ss" />
					</td>
					<td>
						<s:date name="#weeklyItem.schedule.endTime" format="HH:mm:ss" />
					</td>
				</tr>
				</s:iterator>
				</table>
				</s:iterator>
				</div>
			</td>
		</tr>
	</table>
	<div style="height: 15px"></div>
</div>
<div class="template_button">
	<div class="div_space"></div>
	<div class="div_buttons" align="center">
		<input type="button" id="btnOk" value="<s:text name='msg.ok'/>" />
	</div>
</div>
