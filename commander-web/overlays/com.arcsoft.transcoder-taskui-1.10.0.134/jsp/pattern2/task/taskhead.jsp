<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div>
	<table>
		<tr>
			<td class="BodyIndent"><div class="LinePlaceHolder"></div></td>
			<td style="width: 13px"><div class="LinePlaceHolder"></div></td>
			<td style="width: 8px; ">
				<div class="task_title_left" style="position:relative;top: 2px;"></div>
			</td>
			<td class="LabelEndSpacing"><div class="LinePlaceHolder"></div></td>
			<td style="width: 90px">
				<span class="TaskHeadText TaskTitle"><s:text name="taskDetail.editTask"/></span>
			</td>
			<td style="width:80px">
				<div class="BackTrigger top_button2" style="width: 80px"><s:text name="button.label.back"/></div>
			</td>
			<td><div class="LinePlaceHolder"></div></td>
			<td class="SaveAsProfile" style="width: 110px">
				<div class="TaskLabelText top_button1"><s:text name="taskDetail.saveAsProfile"/></div>
			</td>
			<td class="ImportProfileTrigger" style="width: 11px"></td>
			<td class="ImportProfileTrigger" style="width: 110px">
				<div class="TaskLabelText top_button1"><s:text name="taskDetail.importProfile"/></div>
			</td>
			<td class="SubmitTrigger" style="width: 11px"></td>
			<td class="SubmitTrigger" style="width: 110px">
				<div class="TaskLabelText top_button1"><s:text name="common.save"/></div>
			</td>
			<td class="ApplyTaskTrigger" style="width: 11px"></td>
			<td class="ApplyTaskTrigger" style="width: 110px">
				<div class="TaskLabelText top_button1"><s:text name="button.label.apply"/></div>
			</td>
			<td class="BodyIndent"><div class="LinePlaceHolder"></div></td>
		</tr>
	</table>
</div>